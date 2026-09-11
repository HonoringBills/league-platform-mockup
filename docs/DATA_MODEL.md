# Proposed Data Model

The key design rule is that **organization rosters and league competitors are not the same entity**.

## Shared identity

### `users`
- id
- email
- discord_user_id
- display_name
- avatar_url
- created_at

### `player_profiles`
- id
- user_id
- activision_id
- gamertag
- primary_role
- social_links
- verification_status
- eligibility_notes

A player can appear on an organization roster, a league roster, or both without duplicating the underlying person/account.

## Organization side

### `org_teams`
Represents a team owned / represented by the organization.
- id
- name
- tag
- game_title
- division_label
- logo_url
- active
- display_order

### `org_roster_members`
- org_team_id
- player_profile_id
- roster_role (`starter`, `sub`, `coach`, `creator`)
- position / game_role
- joined_at
- left_at

### `org_matches`
- org_team_id
- opponent_name / opponent_id
- event_name
- scheduled_at
- result
- score
- stream_url

### `content_posts`
- title
- slug
- category (`org`, `league`, `merch`, `partner`, `community`)
- body
- hero_media
- author_id
- published_at
- status

### `partners`
- name
- logo_url
- website_url
- placement
- active

### `merch_products`
Public-facing product metadata / links only. Final checkout should remain in Shopify / Printify.

## League side

### `seasons`
- id
- league_id
- name
- game_title
- registration_open_at
- registration_close_at
- roster_lock_at
- status
- ruleset_id

### `league_teams`
Independent teams registered to compete in the league.
- id
- season_id
- name
- tag
- logo_url
- captain_user_id
- approval_status
- division_id

### `league_roster_members`
- league_team_id
- player_profile_id
- roster_role
- eligibility_status
- approved_at

### `team_registrations`
Stores the submitted application before / during staff review.

### `roster_transactions`
- add / drop / role change
- submitted_by
- submitted_at
- approval_status
- staff_note

### `matches`
- season_id / tournament_id
- team_a_id
- team_b_id
- scheduled_at
- scheduling_status
- series_format
- result_status
- winner_id
- forfeit_status

### `maps`
- match_id
- map_number
- mode
- map_name
- team_a_score
- team_b_score
- screenshot_url

### `player_map_stats`
Per-player, per-map stat records used to roll up season and career leaderboards.

### `standings`
Can be materialized or derived from approved match records.

### `tournaments`
- name
- format
- registration rules
- bracket state
- status

### `tournament_entries`
Links approved competition teams / rosters into an event.

## 8s

### `eight_ladders`
- id
- name
- scope (`org_community`, `league`)
- discord_guild_id
- season / reset metadata

### `eight_ratings`
- ladder_id
- player_profile_id
- elo
- wins
- losses
- streak

### `eight_matches`
Independent match history for each ladder.

## Veto / ruleset

### `rulesets`
- game_title
- allowed_series (`BO3`, `BO5`, `BO7`)
- third_mode
- mode_order
- map_pool
- veto_rules

### `veto_sessions`
- match_id
- state
- current_action
- picks / bans
- created_channel_id
- resumable_payload

## Staff / governance

### `staff_roles`
Permission bundles such as owner, org admin, league commissioner, verifier, stats staff and caster admin.

### `audit_log`
Every sensitive staff action should record actor, target, action, before/after metadata and timestamp.

### `discipline`
Suspensions, bans, restrictions, eligibility exceptions and notes.

### `disputes`
Match / roster / stat dispute records with evidence and resolution.

## Why this split matters

An organization-owned roster can compete in the league, but that does not mean every league team belongs to the organization. Keeping `org_teams` and `league_teams` separate avoids branding, permissions, statistics and roster-management conflicts while still allowing shared player identities and match data.
