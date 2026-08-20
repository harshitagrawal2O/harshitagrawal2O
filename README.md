<div align="center">

<a href="https://harshitagrawal.ccbp.tech"><img src="assets/hero.svg" width="900" alt="Harshit Agrawal - Co-founder and Engineering Lead, GO-AT Technologies" /></a>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=17&pause=1400&color=8B949E&center=true&vCenter=true&width=760&height=42&lines=systems%2C+from+the+storage+engine+up;applied+AI+that+ships+to+real+users;Smart+India+Hackathon+2025+%E2%80%94+Runner-Up;open+to+software+engineering+roles" alt="" />

<a href="https://harshitagrawal.ccbp.tech"><img src="https://img.shields.io/badge/portfolio-0D1117?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0D1117" alt="Portfolio" /></a>
<a href="https://linkedin.com/in/harshitagrawal700"><img src="https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:harshitagra8092@gmail.com"><img src="https://img.shields.io/badge/email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
<img src="https://img.shields.io/badge/open_to_SWE_roles-3FB950?style=for-the-badge&logoColor=white" alt="Open to SWE roles" />
<img src="https://komarev.com/ghpvc/?username=harshitagrawal2O&style=for-the-badge&color=6366F1&label=views" alt="Profile views" />

</div>

### `~ whoami`

```ts
const harshit = {
  role:         "Co-founder & Engineering Lead @ GO-AT Technologies",
  alsoDoing:    "Intern & India Chapter Captain @ DeepStation",
  obsessedWith: ["applied AI", "systems internals", "shipping to real users"],
  building:     "MiniDB - a relational storage engine in C++, from zero",
  philosophy:   "understand the layer below the one you're paid to use",
} as const;
```

Final-year CS (AI/ML) student who works both ends of the stack: training and wiring up models on one
side, hand-rolling B+ trees and write-ahead logs on the other. Most of what I build ends up in front
of real users - clients, campuses, or a hackathon jury.

<br/>

## Anatomy of what I ship

<div align="center"><img src="assets/architecture.svg" width="900" alt="Five layers: client, API, async and inference, data, infrastructure" /></div>

<br/>

## Selected work

<!-- Repo links go here once these are public: [MiniDB](url) etc. -->

| Project | Why it is interesting |
| :--- | :--- |
| **MiniDB**<br/><sub>`C++` `B+ Tree` `WAL`</sub> | A relational storage engine written from scratch - disk-backed B+ tree index with node splitting, merging and range scans, a buffer pool with LRU eviction, and a write-ahead log that survives a hard kill. Fronted by a tokeniser and recursive-descent parser compiling a SQL subset into an execution plan. |
| **City Watch**<br/><sub>`Python` `OpenCV` `Deep Learning`</sub> | Computer-vision pipeline that spots road accidents and traffic violations straight off CCTV feeds and fires automated alerts to authorities. Frame sampling to object tracking to detection model, with generated incident summaries for human review. |
| **PriceLens**<br/><sub>`React` `FastAPI` `Redis` `BullMQ`</sub> | E-commerce price intelligence: a retry-safe multi-source scraping pipeline on a Redis/BullMQ job queue, feeding a regression model that forecasts price movement into a live dashboard. |
| **Parchhai**<br/><sub>`Next.js` `Expo` `Prisma` `Neon`</sub> | D2C fashion commerce, end to end - storefront, cross-platform mobile app, cart, checkout, order tracking and admin, all over one shared REST API on Neon Postgres. |
| **Proof-of-Inference**<br/><sub>`Solidity` `Polygon`</sub> | A browser-native cryptocurrency concept where **model inference is the proof of work**. Wrote the whitepaper and the smart contract specification. |

<details>
<summary><b>Also on the shelf</b> - smaller things I have shipped</summary>
<br/>

- **PaperForge** - self-hosted PDF toolkit for merge, split, annotation and conversion. `React` `FastAPI` `Docker`
- **GuestPay** - prepaid web wallet so you can pay from someone else's device without exposing credentials. `Node.js` `React` `Stripe` `PostgreSQL`
- **Judicial Delay Analysis** - study over 173,000+ Indian eCourts records, K-Means clustering plus gradient boosting to locate where delay actually accumulates. Manuscript in IEEEtran format, targeting *Springer AI and Law*.

</details>

<br/>

## One project, one level deeper

Most portfolios stop at "built a database". Here is what is actually inside MiniDB - every box is code
I wrote rather than a library I imported.

<div align="center"><img src="assets/minidb.svg" width="900" alt="MiniDB query lifecycle: SQL text, tokeniser, parser, plan, executor, then buffer pool, B+ tree and write-ahead log" /></div>

<br/>

## Toolbox

<div align="center">

<sub>**LANGUAGES**</sub><br/>
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=cplusplus&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=flat-square&logo=postgresql&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white)

<sub>**AI / ML**</sub><br/>
![Deep Learning](https://img.shields.io/badge/Deep_Learning-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikitlearn&logoColor=white)
![LLMs and RAG](https://img.shields.io/badge/LLMs_+_RAG-6366F1?style=flat-square&logo=openai&logoColor=white)

<sub>**BUILD AND RUN**</sub><br/>
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazonwebservices&logoColor=white)

</div>

<br/>

## Signals

- **Smart India Hackathon 2025** - Grand Finale Runner-Up, national level
- **Founded the DeepStation India chapter** - applied-AI sessions and workshops across Indian campuses
- **ISRO-IIRS Dehradun** intern - AI/ML for geodata: Google Earth Engine, random forests, satellite imagery
- **Founding core member, AWS Cloud Club RIT** &nbsp;·&nbsp; **Head of IT, RITMUNSOC** &nbsp;·&nbsp; IEEE member
- **9.48 CGPA** &nbsp;·&nbsp; mentored **100+ learners** as a Teaching Assistant at NxtWave CCBP 4.0

<br/>

<div align="center">

<img src="assets/stats.svg" width="900" alt="GitHub activity: repositories, contributions, commits and language distribution" />

<sub>That panel is not a third-party widget - <a href="scripts/render-stats.mjs">a script in this repo</a> queries the GitHub GraphQL API and renders the SVG on a schedule.</sub>

<br/><br/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/harshitagrawal2O/harshitagrawal2O/output/snake-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/harshitagrawal2O/harshitagrawal2O/output/snake.svg" />
  <img src="https://raw.githubusercontent.com/harshitagrawal2O/harshitagrawal2O/output/snake.svg" alt="Contribution snake" />
</picture>

<br/><br/>

**Open to software engineering roles where I can own features end to end.**

<sub>Bengaluru, India &nbsp;·&nbsp; <a href="mailto:harshitagra8092@gmail.com">harshitagra8092@gmail.com</a> &nbsp;·&nbsp; <a href="https://harshitagrawal.ccbp.tech">harshitagrawal.ccbp.tech</a></sub>

</div>
