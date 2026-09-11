# Feature Map — Organization + League

## 1. Organization website

### Homepage
- Org-first hero and identity
- Featured match / next match
- Recent results
- Featured org teams
- Latest news / announcements
- Sponsors / partners
- Featured merch
- League promo / entry point

### Organization teams
- Separate org-owned rosters by game / division
- Starters, substitutes and coaches
- Player profile cards
- Competitive records
- Upcoming and past matches
- Accomplishments
- Creator / content roster support

### Content
- News posts
- Roster announcements
- Match recaps
- Creator spotlights
- Partner announcements
- League news surfaced to the org community
- Social / stream embeds later

### Merch
- Branded storefront presentation
- Shopify / Printify integration
- Product collections
- Jerseys / gamertag customization path
- Sponsor campaigns

### Organization admin
- Org roster editor
- Player / creator profiles
- News publishing
- Sponsor placement
- Merch links
- Staff / ownership profiles
- Match result publishing

## 2. Competitive league

### Registration + eligibility
- Team registration form
- Captain information
- Full roster + substitutes
- Discord OAuth identity linking
- Automatically captured immutable Discord user ID
- Activision IDs / competitive IDs
- Staff approve / reject / request changes
- Player verification
- Eligibility rules and notes
- Suspensions / restrictions
- Free Agent registration

### Season operations
- Registration windows
- Divisions / groups
- Active season selection
- Roster lock dates
- Schedule generation / management
- Team A / Team B scheduling workflow
- Match reminders
- Forfeits
- Match check-in
- Season rollover / archive

### Match reporting
- Series score
- Per-map score
- Scoreboard evidence uploads
- Opponent confirmation
- Staff correction
- Dispute workflow
- Optional CSV imports
- Optional scoreboard OCR

### Standings + playoffs
- Series W/L
- Map W/L
- Differential
- Tiebreakers
- Playoff qualification
- Bracket seeding
- Championship history

### Tournaments
- Tournament registration
- Check-in
- Single / double elimination path
- Pool play path
- Brackets
- Match reporting
- Veto integration
- Discord notifications

### Dual 8s
Two independent ladders:
1. Main Org / Community Discord 8s
2. League Discord 8s

Each can have:
- Independent ELO
- Queue
- Leaderboard
- Season reset
- Match history
- Discord roles / channels

### Veto system
- BO3 / BO5 / BO7
- HP only
- SnD only
- Standard competitive rotation
- Configurable third mode by title
- Configurable map pool
- Ban / pick flow
- Resume / recovery
- Staff override

### Statistics
- Player K/D
- Kills / deaths
- SPM
- Maps played
- W/L
- Mode-specific stats
- Team stats
- MVPs / awards
- Match history
- Season / playoff splits

### Player Integrity Review
Built for sandbagging, smurfing and eligibility investigations.

Staff can search a player and open a dedicated investigation view containing:
- Current and historical rank / peak information
- Season-by-season performance splits
- Per-map stat history
- Recent K/D, SPM and W/L trends
- Mode-specific performance trends
- Team and roster history
- Games / maps played at each recorded level
- Verification and eligibility history
- Staff notes and prior review decisions
- Suspensions / restrictions
- Linked match evidence / scoreboard uploads
- Stat corrections and edits
- Full audit trail showing what changed, who changed it and when

The investigation UI is backed by the same PostgreSQL data available through direct SQL access, so authorized owners can run their own custom queries for deeper analysis.

## 3. Discord identity + automation

Discord should be the primary external identity used to connect the website, players and bot actions.

### Identity linking
- Register / sign in with Discord OAuth
- Capture the real Discord user ID automatically instead of relying on manually typed IDs
- Store Discord ID against the website user / player profile
- Verify guild membership where required
- Use the same identity across registration, roster transactions, 8s, verification and integrity reviews

### Automatic role sync
Configurable role bindings can map website state to Discord roles, for example:
- Verified Player
- Team Captain
- Active League Player
- Free Agent
- Org Player / Creator
- League Staff / Caster
- Suspended / Restricted if the league wants a visible discipline role
- Champion / award roles if desired

### Transaction-driven bot actions
Website approvals should create Discord actions automatically. Examples:
- Team approved → add captain + active player roles to approved roster
- Player added to roster → remove Free Agent role and add Active League Player / team role
- Player dropped → remove team role and optionally restore Free Agent role
- Captain changed → move Team Captain role from old captain to new captain
- Player verified → add Verified Player role
- Suspension applied → remove competition roles / apply configured restriction role
- Suspension expired → restore eligible roles
- Tournament registration approved → add event role
- 8s queue / ladder changes → sync any configured 8s roles

### Reliability + logging
- Bot actions should be queued from committed database transactions rather than being the source of truth
- Each role sync action records pending / completed / failed status
- Failed bot actions can be retried without duplicating successful actions
- Every automated role add / remove is written to the audit log
- Staff dashboard shows Discord sync failures and allows manual retry
- Website data remains authoritative if Discord is temporarily unavailable

### Other Discord integrations
- Match reminders
- Registration confirmations
- Roster update notifications
- Veto channels / sessions
- 8s queue / result sync
- Announcement publishing
- Server / system logs

## 4. Unified staff dashboard

### Org queue
- Draft posts
- Org roster updates
- Match results
- Sponsor / merch content

### League queue
- Pending teams
- Pending roster changes
- Verification requests
- Eligibility reviews
- Player Integrity Reviews / sandbagging investigations
- Scheduling issues
- Unreported matches
- Disputes
- Suspensions
- Stat corrections

### Shared controls
- Role-based staff permissions
- Audit history
- Search by player / team
- Direct database / SQL access for authorized owners
- Discord integration status
- Discord role mapping configuration
- Failed / pending Discord transaction queue
- Manual Discord sync / retry controls
- Site settings
- Branding settings

## 5. Future extensions

- Caster Central
- Referral system
- Automated scorecard / MVP graphics
- Stream embeds
- Recruitment forms
- Sponsor dashboards
- Player awards
- Push / site notifications
- Game-by-game ruleset presets
