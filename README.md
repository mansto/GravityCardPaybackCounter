<div align="center">

# 🃏 Gravity Card Payback Counter

**A sleek PWA for tracking your Gravity Card purchases by category — with budget control and PIN protection.**

![PWA](https://img.shields.io/badge/PWA-ready-blueviolet?style=flat-square&logo=googlechrome)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f38020?style=flat-square&logo=cloudflare&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222?style=flat-square&logo=github)

</div>

---

## ✨ Features

| | |
|---|---|
| 🎿 **Ticket Counters** | Create custom ticket categories, each with its own color and price |
| 💰 **Budget Tracking** | Set the Gravity Card price and watch your remaining balance update in real time |
| 🔒 **PIN Protection** | 4-digit PIN screen with lockout after 5 failed attempts (5-minute cooldown) |
| 📱 **Installable PWA** | Add to home screen on iOS and Android for a native app experience |
| ☁️ **Cloud Storage** | All data stored in Cloudflare KV — reliable across browser restarts and devices |

---

## 📸 App Overview

```
┌─────────────────────────────┐
│   🔐 PIN Screen             │  4-digit entry · lockout after 5 wrong tries
├─────────────────────────────┤
│   💳 Budget Panel           │  Set Gravity Card price · live remaining balance in €
├─────────────────────────────┤
│   🎿 Ticket Cards           │  Per-ticket counter · increment / decrement
└─────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Vanilla JavaScript (ES2020+) |
| UI | HTML5 + CSS3, single-file SPA |
| Storage | Cloudflare Workers + KV |
| Auth | SHA-256 via `crypto.subtle` (PIN) + Bearer token (API) |
| PWA | Service Worker (cache-first) + Web App Manifest |
| Build | Node.js build script — injects API credentials at build time |
| CI/CD | GitHub Actions → GitHub Pages |
| Fonts | Google Fonts — Bebas Neue, IBM Plex Mono |

---

## 📁 Project Structure

```
├── src/
│   ├── index.html      # Application (HTML + CSS + JS), uses __API_URL__ / __API_TOKEN__ placeholders
│   ├── manifest.json   # PWA manifest
│   ├── sw.js           # Service Worker
│   ├── icon-192.jpg    # App icon
│   └── icon-512.jpg    # App icon (large)
├── dist/               # Built output (gitignored) — deployed to GitHub Pages
├── worker.js           # Cloudflare Worker (API + KV storage)
├── wrangler.toml       # Cloudflare Workers configuration
├── build.js            # Build script: injects secrets + copies assets to dist/
├── package.json
├── .env.example        # Template for local development
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD: build + deploy to gh-pages on push to main
```

---

## ☁️ Cloudflare Workers Setup

The app stores all data in a Cloudflare Worker backed by KV. This replaces local browser storage for reliable persistence across sessions and devices.

### First-time setup

**1. Install Wrangler and log in**
```bash
npm install -g wrangler
wrangler login
```

**2. Create the KV namespace**
```bash
wrangler kv namespace create GRAVITY_KV
```
Copy the returned `id` into `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "GRAVITY_KV"
id = "your-kv-id-here"
```

**3. Deploy the Worker**
```bash
wrangler deploy
```
Note the Worker URL printed at the end (e.g. `https://gravity-counter-api.XYZ.workers.dev`).

**4. Set the auth token**

Generate a strong random secret (e.g. a UUID) and register it as a Worker secret:
```bash
wrangler secret put AUTH_TOKEN
```

### API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Load all app data |
| `PUT` | `/` | Save all app data |

All requests require the header:
```
Authorization: Bearer <AUTH_TOKEN>
```

---

## 🚀 Deployment (GitHub Actions)

On every push to `main`, GitHub Actions builds the app and deploys it to the `gh-pages` branch.

### Required GitHub Repository Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|--------|-------|
| `API_TOKEN` | Same secret used in `wrangler secret put AUTH_TOKEN` |
| `API_URL` | Worker URL from `wrangler deploy` |

### GitHub Pages configuration

After the first successful workflow run, go to **Settings → Pages** and set the source branch to `gh-pages`.

---

## 💻 Local Development

**1. Copy and fill in `.env`**
```bash
cp .env.example .env
# edit .env with your API_TOKEN and API_URL
```

**2. Build**
```bash
npm install
npm run build
```

**3. Serve `dist/`**
```bash
npx serve dist
```

> **Default PIN:** `1357`

---

## 🔒 PIN & Lockout

- Enter a 4-digit PIN to access the app
- **5 wrong attempts** → locked for **5 minutes**
- A live countdown is shown during lockout
- Correct PIN resets the attempt counter

---

## 🎿 Tickets

Each ticket has:

- **Name** — e.g. *Wexltrails halbtags*, *Wexltrails ganztags*
- **Color** — pick from 8 accent colors
- **Ticket price** — every `+` click deducts this amount (in €) from the Gravity Card balance

---

## 💳 Budget

Enter the price of your Gravity Card. Every `+` click on any ticket deducts its price from the remaining balance. Every `−` click refunds it.

| Status | Color |
|--------|-------|
| Balance still positive (card not yet paid off) | 🔴 Red |
| Balance at zero or below (card has paid off) | 🟢 Green |
| No price set | ⚫ Gray |
