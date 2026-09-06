# CyberShield Project Guide

## Architecture

CyberShield is a React single-page application powered by Vite and React Router. All current interactions are frontend-only demonstrations. Netlify serves the SPA through `public/_redirects`.

## Key Files

- `src/main.jsx`: Routes, shared components, page views, sample data, quiz content, and local demo analysis functions.
- `src/styles.css`: Design tokens, responsive layout, component styles, animation, and accessibility preferences.
- `index.html`: Application metadata and root mount point.
- `public/_redirects`: Netlify history fallback for client-side routes.

## Conventions

- Reuse existing UI primitives such as `Button`, `RiskBadge`, `ScoreMeter`, `ScoreRing`, `PageShell`, and `DemoNotice`.
- Keep user-facing claims precise. Rule-based analysis must stay visibly labeled as demo behavior until a real service is connected.
- Never store or transmit passwords. Password checks must remain browser-local.
- Use Lucide icons instead of emoji or hand-drawn icon markup.
- Maintain keyboard focus states, semantic labels, reduced-motion support, and mobile layouts.
- Prefer CSS variables from `:root` over introducing one-off colors.

## Integration Direction

The pure analysis functions (`analyzeUrl`, `analyzeMessage`, and `ratePassword`) are the current service boundary. Replace URL and message functions with typed API clients when real Netlify Functions or external providers are added. Keep password analysis local. Persistent scan history or profiles should use Netlify Database rather than local JSON or in-memory storage.

## Non-Obvious Decisions

- The application uses realistic sample activity but does not persist it.
- The dashboard chart is a lightweight inline SVG to avoid a large charting dependency.
- Google Fonts are imported in CSS for the visual system; provide local fallbacks if an offline-only deployment becomes necessary.
