# Brand Swap Checklist

The mock is intentionally neutral so the organization identity can be dropped in without changing the platform architecture.

## Organization identity

Replace:
- Organization name
- Primary logo / icon
- Wordmark
- Primary / secondary / accent colors
- Typography
- Homepage headline / slogan
- About copy
- Social links
- Org roster names and player data
- Match history / schedule
- Sponsor logos / links
- Merch products / storefront links
- Staff / ownership profiles
- Creator profiles

## League identity

The league can either inherit the org brand or have a distinct sub-brand.

Replace / configure:
- League name
- League logo if separate
- League accent colors if separate
- Discord invite / guild IDs
- Registration copy
- Divisions / groups
- Rules / policies
- Season name
- Game title
- Map pool
- Third competitive mode
- Veto presets
- Standings / tiebreaker rules
- 8s ladder names

## Dual Discord configuration

The platform is designed for two independent Discord contexts:

1. **Main Org / Community Discord**
   - Community roles
   - Org announcements
   - Main 8s ladder
   - Creator / fan community

2. **League Discord**
   - League player / captain roles
   - Match operations
   - League announcements
   - League 8s ladder
   - Veto channels / sessions
   - Staff / caster workflows

## CSS swap points

The self-contained mock currently exposes top-level CSS variables in `index.html`:
- `--bg`
- `--bg2`
- `--panel`
- `--line`
- `--text`
- `--muted`
- `--accent`
- `--accent2`

In production these should move into a theme / tenant configuration so branding can be changed without editing components.

## Asset swap

Production asset folders / object storage should hold:
- Org logos
- League logo if different
- Team logos
- Player headshots
- Creator headshots
- Sponsor logos
- News / match graphics
- Product images
- Scoreboard evidence

Do not store Discord tokens, API keys, payment secrets or private credentials in the public repository.
