<div align="center">

# 🃏 Gravity Card Payback Counter

**A sleek PWA for tracking your Gravity Card purchases by category — with budget control and PIN protection.**

![PWA](https://img.shields.io/badge/PWA-ready-blueviolet?style=flat-square&logo=googlechrome)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=flat-square)
![Offline](https://img.shields.io/badge/offline-supported-informational?style=flat-square&logo=serviceworker)

</div>

---

## ✨ Features

| | |
|---|---|
| 🎿 **Ticket Counters** | Create custom ticket categories, each with its own color and price |
| 💰 **Budget Tracking** | Set the Gravity Card price and watch your remaining balance update in real time |
| 🔒 **PIN Protection** | 4-digit PIN screen with lockout after 5 failed attempts (5-minute cooldown) |
| 📴 **Offline Support** | Service Worker caches the app — works without internet after first load |
| 📱 **Installable PWA** | Add to home screen on iOS and Android for a native app experience |
| 💾 **Persistent Storage** | All data saved to `localStorage` — survives browser restarts |

---

## 📸 App Overview

The app has three main areas:

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

## 🚀 Getting Started

No build tools, no dependencies. Just open the file or serve the directory.

### Option 1 — Open directly
```
open src/index.html
```

### Option 2 — Local server (recommended for PWA features)
```bash
python -m http.server 8000
# → http://localhost:8000/src
```

### Option 3 — VS Code Live Server
Right-click `src/index.html` → **Open with Live Server**

> **Default PIN:** `1357`

---

## 🎿 Tickets

Each ticket has:

- **Name** — e.g. *Wexltrails halbtags*, *Wexltrails ganztags*
- **Color** — pick from 8 accent colors
- **Ticket price** — every `+` click deducts this amount (in €) from the Gravity Card balance

The counter displays the **number of rides** prominently, with the **accumulated sum in €** shown below.

---

## 💳 Budget

Enter the price of your Gravity Card. Every `+` click on any ticket deducts its price from the remaining balance. Every `−` click refunds it. All amounts are displayed in **€** (Austrian locale).

| Status | Color |
|--------|-------|
| Balance still positive (card not yet paid off) | 🔴 Red |
| Balance at zero or below (card has paid off) | 🟢 Green |
| No price set | ⚫ Gray |

---

## 🔒 PIN & Lockout

- Enter a 4-digit PIN to access the app
- **5 wrong attempts** → locked for **5 minutes**
- A live countdown is shown during lockout
- Failed attempt count persists across page reloads (`localStorage`)
- Correct PIN resets the attempt counter

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Vanilla JavaScript (ES2020+) |
| UI | HTML5 + CSS3, single-file SPA |
| Storage | `localStorage` / `sessionStorage` |
| Auth | SHA-256 via `crypto.subtle` |
| PWA | Service Worker (cache-first) + Web App Manifest |
| Fonts | Google Fonts — Bebas Neue, IBM Plex Mono |

---

## 📁 Project Structure

```
src/
├── index.html      # Entire application (HTML + CSS + JS)
├── manifest.json   # PWA manifest
├── sw.js           # Service Worker (offline caching)
├── icon-192.png    # App icon
└── icon-512.png    # App icon (large)
```

---

## 🌐 Deployment

Deploy the contents of `src/` to any static host (GitHub Pages, Netlify, Vercel, etc.). No server-side processing required.

For full PWA functionality (install prompt, Service Worker), the app must be served over **HTTPS**.
