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
- Team registration confirmations
- Roster-change notices
- Match scheduling reminders
- Match report / result notifications
- League 8s queue and ELO
- Veto session channels
- Caster assignments
- Staff logs

## Shared identity

Production should use Discord OAuth so the website account and Discord member can be tied to the same player profile.

A single user can then hold:
- Organization roster membership
- League roster membership
- Staff permissions
- Community 8s rating
- League 8s rating

without duplicating the user record.

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
