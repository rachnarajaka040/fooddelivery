# FoodRush 🍔 — Next.js Food Delivery App with Jenkins CI/CD

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?logo=jenkins)

A modern food delivery web application built with **Next.js 15** and deployed automatically using a **Jenkins CI/CD pipeline**.

---

## 🚀 Features

- 🏠 **Home Page** — Hero banner, popular items, restaurant highlights
- 🍽️ **Restaurant Listing** — Search, filter, sort with 6+ restaurants
- 📋 **Menu Page** — Full menu per restaurant with cart integration
- 🛒 **Cart** — Quantity controls, order summary, coupon field
- 🛵 **Order Tracking** — Animated real-time order progress tracker

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | CSS Variables + Glassmorphism |
| State | React Context + useReducer |
| CI/CD | Jenkins Declarative Pipeline |
| Container | Docker (Multi-stage build) |
| Orchestration | Docker Compose |

---

## 🔧 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/fooddelivery.git
cd fooddelivery

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🐳 Docker

```bash
# Build image
docker build -t foodrush-nextjs .

# Run container
docker run -p 3000:3000 foodrush-nextjs

# Or use Docker Compose
docker-compose up -d
```

---

## 🔁 Jenkins CI/CD Pipeline

The `Jenkinsfile` defines a **7-stage declarative pipeline**:

```
📥 Checkout → 📦 Install → 🔍 Lint → 🔨 Build → 🐳 Docker → 🚀 Staging → 🌟 Production
```

### Pipeline Stages Explained

| Stage | What it does |
|---|---|
| `Checkout` | Pulls source code from GitHub |
| `Install Dependencies` | Runs `npm ci` (clean install) |
| `Lint` | Runs ESLint to check code quality |
| `Build` | Runs `npm run build`, archives artifacts |
| `Docker Build` | Builds Docker image, pushes to Docker Hub |
| `Deploy Staging` | Deploys to port 3001 (develop branch only) |
| `Deploy Production` | Manual approval gate → deploy to port 3000 |

### Jenkins Setup Steps

1. Install Jenkins on your server or VM
2. Install plugins: **NodeJS**, **Docker Pipeline**, **Git**
3. Create a **Pipeline job** in Jenkins
4. Set `Pipeline script from SCM` → Git → your repo URL
5. Set branch: `*/main`
6. Add credentials:
   - `dockerhub-credentials` (Docker Hub username/password)
7. Save and click **Build Now**

---

## 📁 Project Structure

```
fooddelivery/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── restaurants/
│   │   │   ├── page.tsx          # Restaurant listing
│   │   │   └── [id]/page.tsx     # Restaurant detail + menu
│   │   ├── cart/page.tsx         # Cart page
│   │   └── track/page.tsx        # Order tracking
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── context/
│   │   └── CartContext.tsx       # Global cart state
│   └── lib/
│       └── data.ts               # Mock data + types
├── Jenkinsfile                   # CI/CD pipeline
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Docker Compose config
└── .env.example                  # Environment variables template
```

---

## 🎯 Interview Talking Points

> **"What is CI/CD?"**
> Continuous Integration automatically builds and tests code on every push. Continuous Delivery automatically deploys tested code to staging/production.

> **"How does your Jenkins pipeline work?"**
> When I push to GitHub, Jenkins automatically checks out the code, installs dependencies, runs lint checks, builds the Next.js app, creates a Docker image, pushes it to Docker Hub, and deploys to the appropriate environment.

> **"What is a Declarative Pipeline in Jenkins?"**
> It's a structured, human-readable way to define pipelines using a `pipeline {}` block with `stages`, `steps`, `post`, and `when` conditions — easier to read and maintain than Scripted pipelines.

> **"What is Docker multi-stage build?"**
> It uses multiple `FROM` statements to separate build environment from runtime. This keeps the final image small and secure — we only ship what's needed to run the app.

---

## 📄 License

MIT © 2024 FoodRush
