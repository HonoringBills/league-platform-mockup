# Unbranded Esports Org + League Platform Mock-up

A combined website concept for an esports organization that also operates its own competitive league. The public experience is **organization-first** while league operations live inside a dedicated League hub on the same platform.

This repo is intentionally brand-neutral. Final organization name, league name, logos, colors, typography, copy, social links, Discord IDs and real data can be swapped in after approval.

## Public organization side

- Org-first homepage and match center
- Organization teams / rosters
- Player and creator profiles
- Org results and upcoming matches
- News / content hub
- Sponsors / partners
- Merch storefront concept
- About / ownership / staff
- Accomplishments and history
- Recruiting / applications path

## Competitive league side

- League overview and season controls
- Team registration + staff approval
- Player verification / eligibility
- Roster management + roster locks
- Match scheduling and reporting
- Standings and playoffs
- Tournament brackets
- Dual 8s leaderboards
  - Main Org / Community Discord
  - League Discord
- Player / team statistics
- Configurable BO3 / BO5 / BO7 veto system
- HP-only / SnD-only / Standard formats
- Configurable third mode by title
- Player Integrity Review for sandbagging / smurfing investigations
- Direct PostgreSQL / Supabase SQL access for authorized owners
- Disputes, suspensions and audit logging
- Season archives / rollover
- Optional scoreboard OCR path

## Player Integrity Review

The staff side includes a dedicated player investigation view designed for sandbagging, smurfing and eligibility accusations. Staff can inspect:

- Current and historical rank / peak information
- Season-by-season performance
- Per-map stats and match history
- K/D, SPM and W/L trends
- Mode-specific performance
- Team / roster history
- Games or maps played at recorded ranks
- Verification and eligibility history
- Prior staff notes / decisions
- Suspensions / restrictions
- Scoreboard evidence
- Stat corrections
- Full audit history showing what changed, who changed it and when

The production database is planned as PostgreSQL through Supabase. Authorized owners can also use the Supabase SQL editor to query the raw data directly for custom investigations and reports.

## Important architecture decision

**Organization teams and league teams are separate entities.**

An org-owned COD roster represents the brand. A team that registers to compete in the league is an independent competition entry. They can share player/account records when appropriate, but they should never be stored as the same kind of team.

## Unified staff side

One permissioned backend can manage:

- Org rosters and player profiles
- Org news / media / sponsors / merch links
- League registrations and approvals
- Verification and eligibility
- Player integrity / sandbagging reviews
- Scheduling and match reports
- 8s and ELO
- Veto settings and map pools
- Discord role / notification sync
- Caster assignments
- Disputes / discipline
- Audit logs
- Direct SQL access for authorized ownership / technical staff

## Merch direction

Use the website for branded presentation and route production commerce through Shopify / Printify so checkout, card processing, taxes, shipping and fulfillment stay with the commerce provider.

## Run / preview

`index.html` is self-contained and can be served directly by GitHub Pages.

The production build can later move to React/Vite + Supabase/Postgres while preserving the same information architecture.

## Production direction

- React/Vite front end
- Supabase/Postgres for auth + data
- Discord OAuth for player/staff identity
- discord.js service for roles, alerts, vetoes and 8s workflows
- Object storage for logos, media and scoreboard screenshots
- Shopify/Printify storefront integration
- Optional OCR worker for scoreboard stat extraction

See `docs/FEATURES.md`, `docs/DATA_MODEL.md`, and `docs/BRAND_SWAP.md`.
