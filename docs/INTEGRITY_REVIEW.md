# Player Integrity Review

Included in the base league operations package.

## Purpose

Give authorized league staff a fast investigation view when a player is accused of sandbagging, smurfing or otherwise competing below their true skill level.

## Staff investigation view

Search a player and display:

- Identity / Activision / Discord information
- Current verification and eligibility status
- Rank and peak history by game season
- Games played at recorded ranks where available
- League team and roster history
- Season-by-season K/D, SPM, W/L and maps played
- Recent performance trend
- Per-mode performance
- Per-map performance
- Full match history
- Scoreboard / evidence links
- Previous eligibility reviews
- Suspensions, restrictions and exceptions
- Staff notes
- Stat corrections
- Audit history

## PostgreSQL access

The production plan uses Supabase/PostgreSQL. Authorized ownership / technical staff can use the Supabase SQL Editor to query raw league data directly.

The web interface is intended to cover common investigations quickly, while SQL access remains available for custom comparisons, outlier searches and deeper statistical analysis.

## Auditability

Sensitive changes should create append-only audit records containing:

- Actor
- Action
- Target player / team / match
- Before value
- After value
- Timestamp
- Optional staff reason

This is especially important for stat corrections, eligibility changes, roster transactions and disciplinary actions.

## Design principle

The integrity view should present evidence and history, not automatically label a player a sandbagger. Final eligibility / discipline decisions remain staff decisions based on league rules and the available evidence.
