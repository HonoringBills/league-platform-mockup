# Discord Integration Scaffold

This folder represents the Discord side of the combined organization + league platform.

It intentionally does **not** connect to a live server in mock mode and does not consume a Discord token.

## Two Discord contexts

### Main Org / Community Discord
- Org announcements
- Community roles
- Creator / fan community
- Main Community 8s ladder
- Optional recruitment / application notifications

### League Discord
- Verified Player / Team Captain roles
- Active League Player / Free Agent roles
- Team registration confirmations
- Roster-change notices
- Match scheduling reminders
- Match report / result notifications
- League 8s queue and ELO
- Veto session channels
- Caster assignments
- Staff logs

## Discord as player identity

Production should use Discord OAuth during registration/sign-in.

The site should capture the authenticated user's immutable Discord user ID automatically rather than depending on a manually typed ID. The website keeps its own internal UUID as the database primary key and stores Discord ID as a unique external identity.

A single linked user can then hold:
- Organization roster membership
- League roster membership
- Staff permissions
- Community 8s rating
- League 8s rating
- Verification / eligibility history
- Roster transaction history

without duplicating the player record.

## Transaction-driven role sync

The database remains the source of truth. Approved website actions generate bot sync jobs.

Examples:
- Team approved → captain + active player roles assigned
- Player added → Free Agent removed, league/team roles added
- Player dropped → team role removed, Free Agent optionally restored
- Captain changed → captain role transferred
- Player verified → Verified Player added
- Suspension → competition roles removed / restriction role applied if configured
- Reinstatement → eligible roles restored
- Tournament approval → event role assigned
- 8s changes → configured ladder roles synchronized

Role IDs should be configurable in the staff dashboard instead of hard-coded.

## Reliability

Use a database-backed sync queue / transactional outbox pattern:

1. Website transaction commits successfully in PostgreSQL.
2. A Discord sync job is created.
3. Bot processes the requested role action.
4. Job is marked completed or failed.
5. Failed jobs can be retried from the staff dashboard.
6. All bot role changes are written to the audit log.

This prevents Discord outages or permission errors from corrupting league roster state and makes automated actions traceable.

## Planned command families

- `/registerteam`
- `/roster`
- `/freeagent`
- `/schedule`
- `/report`
- `/verify`
- `/startveto`
- `/resumeveto`
- `/cancelveto`
- `/8s join`
- `/8s leave`
- `/8s leaderboard`
- `/staff review`
- `/caster`

## Security

Keep these outside source control:
- Discord bot token
- OAuth client secret
- Guild IDs if private
- Supabase service-role key
- Payment / commerce secrets

Use environment variables / hosting secret storage for production.
