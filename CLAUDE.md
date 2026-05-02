# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio backend API — Express.js deployed on Vercel as serverless function. Serves portfolio data (profile, skills, experiences, projects, articles, socials) with multi-language support (en, th, zh). All data is in-memory (no database).

## Architecture

```
server.js              → Express app (exported, not started here)
bin/start.js           → HTTP server entry point (imports server.js)
services/api.js        → Express Router — all /api routes
data/portfolioData.js  → In-memory data store (multi-language)
public/                → Static assets (profile images) served at /static
vercel.json            → Vercel deployment config (@vercel/node)
```

### Request Flow

`Client → server.js middleware (helmet, cors, rate-limit) → /api routes (services/api.js) → portfolioData.js → JSON { success, data }`

Language: `?lang=en|th|zh` query param or `Accept-Language` header.

### CORS

Uses `ALLOWED_ORIGINS` env var (comma-separated) for multiple origins. Falls back to `FRONTEND_URL` if `ALLOWED_ORIGINS` is not set. Dynamic origin check via callback — allows no-origin requests (server-to-server, curl).

## Commands

```bash
npm install
npm run dev       # nodemon (hot reload)
npm start         # production (node bin/start.js)
npm test          # node --test
```

## Environment Variables (`backend/.env`)

| Variable | Purpose | Default |
|----------|---------|---------|
| `PORT` | Server port | `3000` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | — |
| `FRONTEND_URL` | CORS fallback if ALLOWED_ORIGINS not set | `http://localhost:5173` |
| `NODE_ENV` | Environment | `development` |
| `STATIC_DIR` | Static file directory | `./public` |

## API Endpoints (all under `/api`)

- `GET /profile`, `/skills`, `/experiences`, `/projects`, `/socials`, `/articles`, `/all` — portfolio data
- `GET /projects/:id`, `/articles/:slug`, `/articles/featured` — single items
- `GET /notifications`, `POST /notifications/read` — notifications (in-memory state)
- `POST /todos`, `GET /todos`, `PUT /todos/:id`, `DELETE /todos/:id` — todo CRUD (in-memory)
- `POST /contact` — contact form (validation only, email sending TODO)
- `GET /health` — health check

## Deployment

Vercel auto-deploys from `main` branch. All routes forwarded to `server.js` via `vercel.json`.

- Production frontend: `chinnakrit.dev`, `www.chinnakrit.dev`
- Legacy Vercel domain: `portfolio-self-nu-59.vercel.app`
- Vercel env vars: `ALLOWED_ORIGINS`, `FRONTEND_URL`
