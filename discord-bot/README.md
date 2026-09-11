# Discord Bot Scaffold

The production bot is intended to share the league database with the website rather than maintain separate JSON as the source of truth.

Planned workflows:

- Registration / verification notifications
- Approved-player role sync
- Team captain / team role sync
- Match scheduling reminders
- Match-room creation
- Configurable veto sessions + resume
- 8s queue / teams / ELO result handling
- Staff alerts for disputes and pending approvals
- Audit events for relevant staff actions

The current `src/index.js` is a safe mock scaffold and does **not** connect to Discord.
