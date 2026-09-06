# CyberShield

CyberShield is a polished cybersecurity awareness web application built for a college technology competition. Its tagline is **“Check Before You Trust.”** The product helps users inspect suspicious URLs, identify phishing-style messages, evaluate password strength locally, and practice practical cyber safety through a 10-question quiz.

## Key Features

- Responsive cybersecurity SaaS landing page and navigation
- Security dashboard with score cards, trend visualization, and recent activity
- Transparent rule-based URL scanner with loading, validation, and recommendations
- Demo phishing-message analyzer with plain-language warning signs
- Browser-only password strength checker that never stores or transmits passwords
- One-question-at-a-time cyber awareness quiz with a final performance report
- About, roadmap, disclaimer, empty, loading, and error states

## Technology

- React
- React Router
- Vite
- Lucide icons
- Custom responsive CSS and SVG data visualization
- Netlify SPA routing

The current analyzers deliberately use transparent local rules and mock data. They do not claim access to live threat intelligence or an AI model. The interface is structured so future Netlify Functions, authentication, database-backed scan history, and external analysis services can be connected cleanly.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. To create a production bundle, use `npm run build`.

## Privacy Notes

Password evaluation runs only in the browser. Passwords are not saved, logged, or sent to an external service. URL and message results are educational demo assessments and are not guarantees of safety.
