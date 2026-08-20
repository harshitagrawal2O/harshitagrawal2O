/**
 * Renders assets/stats.svg from live GitHub data.
 *
 * The public github-readme-stats instance is chronically rate-limited (503s),
 * so this repo renders its own panel and commits the result. Runs on a schedule
 * from .github/workflows/stats.yml.
 *
 * Usage: GITHUB_TOKEN=<token> node scripts/render-stats.mjs
 */

import { writeFile, mkdir } from "node:fs/promises";

const USER = process.env.STATS_USER || "harshitagrawal2O";
const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) {
  console.error("GITHUB_TOKEN is required");
  process.exit(1);
}

const QUERY = `
query($login: String!, $cursor: String) {
  user(login: $login) {
    followers { totalCount }
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
      contributionCalendar { totalContributions }
    }
    pullRequests { totalCount }
    repositories(first: 100, after: $cursor, ownerAffiliations: OWNER, isFork: false) {
      totalCount
      pageInfo { hasNextPage endCursor }
      nodes { stargazerCount primaryLanguage { name color } }
    }
  }
}`;

async function gql(cursor) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "profile-stats-renderer",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: USER, cursor } }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data.user;
}

// Linguist-ish colours, with an API fallback per repo.
const COLORS = {
  TypeScript: "#3178C6", JavaScript: "#F1E05A", Python: "#3572A5",
  "C++": "#F34B7D", C: "#89A0B0", Java: "#B07219", HTML: "#E34C26",
  CSS: "#563D7C", "Jupyter Notebook": "#DA5B0B", Rust: "#DEA584",
  Shell: "#89E051", Solidity: "#AA6746", Dart: "#00B4AB", Go: "#00ADD8",
  Awk: "#C30E9B", Kotlin: "#A97BFF", PHP: "#4F5D95", Ruby: "#701516",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const nf = (n) => new Intl.NumberFormat("en-US").format(n);

async function collect() {
  let cursor = null, nodes = [], user = null;
  do {
    user = await gql(cursor);
    nodes = nodes.concat(user.repositories.nodes);
    cursor = user.repositories.pageInfo.hasNextPage ? user.repositories.pageInfo.endCursor : null;
  } while (cursor);

  const langCount = new Map();
  const langColor = new Map();
  for (const r of nodes) {
    const l = r.primaryLanguage;
    if (!l) continue;
    langCount.set(l.name, (langCount.get(l.name) || 0) + 1);
    if (l.color) langColor.set(l.name, l.color);
  }

  const c = user.contributionsCollection;
  return {
    repos: user.repositories.totalCount,
    contributions: c.contributionCalendar.totalContributions,
    commits: c.totalCommitContributions + c.restrictedContributionsCount,
    stars: nodes.reduce((a, r) => a + r.stargazerCount, 0),
    langs: [...langCount.entries()].sort((a, b) => b[1] - a[1]),
    langTotal: [...langCount.values()].reduce((a, b) => a + b, 0),
    langColor,
  };
}

function render(d) {
  const W = 900, PAD = 30, INNER = W - PAD * 2;

  const cells = [
    { v: nf(d.repos), l: "REPOSITORIES", c: "#22D3EE" },
    { v: nf(d.contributions), l: "CONTRIBUTIONS / YR", c: "#818CF8" },
    { v: nf(d.commits), l: "COMMITS / YR", c: "#3FB950" },
    { v: nf(d.langs.length), l: "LANGUAGES SHIPPED", c: "#D29922" },
  ];
  const cw = (INNER - 20 * 3) / 4;
  const cellSvg = cells.map((c, i) => {
    const x = PAD + i * (cw + 20);
    return `    <rect x="${x.toFixed(1)}" y="52" width="${cw.toFixed(1)}" height="78" rx="10" fill="#161B22" stroke="#30363D"/>
    <text class="mono val" x="${(x + 18).toFixed(1)}" y="94" fill="${c.c}">${c.v}</text>
    <text class="mono key" x="${(x + 18).toFixed(1)}" y="115">${c.l}</text>`;
  }).join("\n");

  // Language distribution bar, top 6 plus the tail folded into "Other".
  const top = d.langs.slice(0, 6);
  const tail = d.langs.slice(6).reduce((a, [, n]) => a + n, 0);
  const segs = top.map(([name, n]) => ({
    name, pct: (n / d.langTotal) * 100, color: d.langColor.get(name) || COLORS[name] || "#6E7681",
  }));
  if (tail > 0) segs.push({ name: "Other", pct: (tail / d.langTotal) * 100, color: "#6E7681" });

  let x = PAD;
  const bar = segs.map((s) => {
    const w = Math.max(3, (s.pct / 100) * INNER);
    const r = `      <rect x="${x.toFixed(1)}" y="158" width="${w.toFixed(1)}" height="13" fill="${s.color}"/>`;
    x += w;
    return r;
  }).join("\n");

  const iw = INNER / segs.length;
  const legend = segs.map((s, i) => {
    const lx = PAD + i * iw;
    return `    <circle cx="${(lx + 4).toFixed(1)}" cy="196" r="4" fill="${s.color}"/>
    <text class="mono leg" x="${(lx + 15).toFixed(1)}" y="200">${esc(s.name)} <tspan fill="#6E7681">${s.pct.toFixed(1)}%</tspan></text>`;
  }).join("\n");

  const stamp = new Date().toISOString().slice(0, 10);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="220" viewBox="0 0 ${W} 220" role="img" aria-label="GitHub activity for ${USER}">
  <defs>
    <pattern id="gs" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1" fill="#30363D"/>
    </pattern>
    <clipPath id="barclip"><rect x="${PAD}" y="158" width="${INNER}" height="13" rx="6.5"/></clipPath>
    <style>
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; }
      .val { font-size: 27px; font-weight: 800; }
      .key { font-size: 10px; fill: #7D8590; letter-spacing: 1.1px; }
      .leg { font-size: 10.5px; fill: #8B949E; }
      .hdr { font-size: 12px; font-weight: 700; fill: #E6EDF3; letter-spacing: 1.3px; }
      .sub { font-size: 10.5px; fill: #484F58; }
    </style>
  </defs>

  <rect x="0.5" y="0.5" width="${W - 1}" height="219" rx="14" fill="#0D1117" stroke="#21262D"/>
  <rect x="1" y="1" width="${W - 2}" height="218" rx="13" fill="url(#gs)" opacity="0.4"/>

  <text class="mono hdr" x="${PAD}" y="34">BY THE NUMBERS</text>
  <text class="mono sub" x="${W - PAD}" y="34" text-anchor="end">self-rendered &#183; refreshed ${stamp}</text>

${cellSvg}

  <text class="mono key" x="${PAD}" y="148">PRIMARY LANGUAGE ACROSS ${d.repos} REPOSITORIES</text>
  <g clip-path="url(#barclip)">
${bar}
  </g>
${legend}
</svg>
`;
}

const data = await collect();
await mkdir("assets", { recursive: true });
await writeFile("assets/stats.svg", render(data), "utf8");
console.log(`stats.svg written: ${data.repos} repos, ${data.contributions} contributions, ${data.commits} commits, ${data.langs.length} languages`);
