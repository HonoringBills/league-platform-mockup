# Client Brand Swap Checklist

When the client provides branding:

1. Replace `brand` values in `src/data/mockData.js`.
2. Replace CSS accent tokens in `src/styles/global.css` (`--accent`, `--accent2`).
3. Add primary / alternate logos under `public/brand/`.
4. Replace placeholder copy with league/community language.
5. Add real social links.
6. Add real Discord invite and OAuth application IDs.
7. Replace mock teams / players / standings with database queries.
8. Connect merch destination (Shopify / Printify / other provider).
9. Configure season rules, map pools and the default third mode.
10. Configure the two 8s pool names and Discord guild/channel mappings.

The UI intentionally avoids client-specific artwork so this pass can be done quickly without structural rework.
