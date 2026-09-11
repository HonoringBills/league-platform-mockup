# LeagueOS — Unbranded League Platform Mock-up

A neutral front-end mock-up for a competitive COD league/community platform. It is intentionally brand-agnostic so a client logo, colors, name, copy, Discord IDs and production database can be dropped in after approval.

## Included mock screens

- Home / public landing page
- League season + standings + schedule
- Tournament engine concept
- Dual 8s leaderboards (Main Discord / League Discord)
- Teams + approved roster profiles
- Player / team statistics leaderboard
- Merch storefront integration concept
- Team registration form + staff approval flow
- Staff control center
- Configurable veto lab

## Features represented in the design

- Team registration and staff approval
- Player verification / eligibility
- Roster management + roster locks
- Match scheduling and reporting
- Standings + playoffs
- Tournament registration, check-in and brackets
- Dual-community 8s + ELO
- Discord role / notification sync
- BO3 / BO5 / BO7 veto presets
- HP-only / SnD-only / Standard veto formats
- Configurable third competitive game mode
- Player/team/per-map stats model
- Scoreboard upload / future OCR path
- Disputes, suspensions and staff audit logging
- Season archives / rollover concept
- Shopify / Printify-style merch integration

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Production direction

This repository is currently **mock mode**: UI interactions use local placeholder data and do not write production data.

Recommended production wiring:

- React/Vite front end (current repo)
- Supabase/Postgres for auth + league data
- Discord OAuth for player/staff identity
- discord.js service for roles, notifications, vetoes and 8s workflows
- Object storage for logos and scoreboard screenshots
- Shopify/Printify checkout or embedded storefront for merch
- Optional OCR worker for scoreboard stat extraction

See `docs/FEATURES.md`, `docs/DATA_MODEL.md`, and `docs/BRAND_SWAP.md`.
