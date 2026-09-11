# Proposed Data Model

The key design rule is that **organization rosters and league competitors are not the same entity**.

## Shared identity

### `users`
- id
- email
- discord_user_id
- discord_username
- discord_avatar_url
- display_name
- created_at

`discord_user_id` is the immutable external identity captured through Discord OAuth. The internal database UUID remains the primary key.

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

### `discord_guild_memberships`
Tracks which connected Discord server(s) the user belongs to.
- id
- user_id
- guild_id
- first_seen_at
- last_verified_at
- active

### `discord_role_bindings`
Configurable mapping between website state and Discord roles.
- id
- guild_id
- binding_key (`verified_player`, `team_captain`, `active_player`, `free_agent`, `org_player`, `caster`, etc.)
- role_id
- enabled

### `discord_sync_jobs`
Reliable queue of bot actions generated from committed website/database transactions.
- id
- user_id
- guild_id
- role_id
- action (`add_role`, `remove_role`, `sync_member`)
- source_type (`roster_transaction`, `verification`, `discipline`, `team_approval`, `eight_transaction`, etc.)
- source_id
- status (`pending`, `processing`, `completed`, `failed`)
- attempt_count
- last_error
- created_at
- completed_at

A deterministic source/action key should make jobs idempotent so retries do not duplicate successful changes.

### `player_rank_history`
Stores rank / peak history used for eligibility and integrity reviews.
- id
- player_profile_id
- game_title
- season_label
- rank
- peak_rank
- games_played
- source
- recorded_at

### `player_integrity_reviews`
Tracks sandbagging / smurfing / eligibility investigations.
- id
- player_profile_id
- opened_by
- reason
- status
- summary
- decision
- opened_at
- closed_at

### `player_integrity_review_notes`
- review_id
- author_id
- note
- evidence_url
- created_at

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
Stores the submitted application before / during staff review. Registration uses linked Discord identities rather than trusting manually-entered Discord IDs.

### `roster_transactions`
- id
- league_team_id
- player_profile_id
- transaction_type (`add`, `drop`, `role_change`, `captain_change`)
- submitted_by
- submitted_at
- approval_status
- approved_by
- approved_at
- staff_note

Approved roster transactions should enqueue the required Discord role changes in `discord_sync_jobs` inside the same database transaction or through a transactional outbox pattern.

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
Per-player, per-map stat records used to roll up season and career leaderboards and power integrity reviews.
Recommended fields include:
- player_profile_id
- map_id
- kills
- deaths
- assists
- score
- spm
- objective stats where applicable
- source / import method
- created_at
- corrected_at

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
Every sensitive staff action should record actor, target, action, before/after metadata and timestamp. Integrity reviews should be able to filter this log by player, team, match, stat correction and eligibility decision. Automated Discord role actions should also write success/failure records here.

### `discipline`
Suspensions, bans, restrictions, eligibility exceptions and notes.

Discipline changes can enqueue Discord role removals/additions while the website/database remains authoritative.

### `disputes`
Match / roster / stat dispute records with evidence and resolution.

## Example Discord transaction lifecycle

1. Captain submits a roster add for a Discord-linked player.
2. Staff approves the transaction.
3. PostgreSQL updates the roster record.
4. The same committed workflow creates Discord sync jobs.
5. The bot removes Free Agent if configured.
6. The bot adds Active League Player / team-specific roles if configured.
7. Success or failure is logged.
8. A failed role action can be retried without reversing or duplicating the roster transaction.

This same pattern can be used for captain changes, verification, suspension, reinstatement, team approval, tournament roles and 8s roles.

## Integrity / sandbagging review queries

Because the production database is PostgreSQL, authorized owners can query the raw data directly in Supabase's SQL editor. The Player Integrity Review UI should surface common investigation views without requiring SQL, while preserving direct access for deeper analysis.

Typical review data can include:
- Performance by season
- Performance by date range
- K/D and SPM trend lines
- Per-mode performance
- Per-map performance
- Games / maps played at a rank
- Team changes and roster history
- Rank / peak history
- Eligibility decisions
- Prior investigations
- Stat corrections
- Match evidence
- Audit history

## Why this split matters

An organization-owned roster can compete in the league, but that does not mean every league team belongs to the organization. Keeping `org_teams` and `league_teams` separate avoids branding, permissions, statistics and roster-management conflicts while still allowing shared player identities and match data.
