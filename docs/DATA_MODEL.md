# Proposed Production Data Model

Core tables / collections:

- `users`
- `player_profiles`
- `discord_accounts`
- `seasons`
- `divisions`
- `teams`
- `team_memberships`
- `roster_change_requests`
- `eligibility_reviews`
- `discipline_actions`
- `matches`
- `match_schedule_proposals`
- `match_maps`
- `player_map_stats`
- `match_reports`
- `match_evidence`
- `match_disputes`
- `tournaments`
- `tournament_entries`
- `bracket_matches`
- `veto_presets`
- `veto_sessions`
- `veto_actions`
- `eights_pools`
- `eights_players`
- `eights_matches`
- `eights_results`
- `staff_roles`
- `staff_permissions`
- `audit_events`
- `announcements`

Important design rule: season-scoped competitive data should never be overwritten when a new season or title starts. New seasons reference their own ruleset, map pool and mode configuration so historical results remain intact.
