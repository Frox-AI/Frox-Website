# Frox Studio — Website

AI platform website built with **Next.js 14 (App Router)**, **React 18**, and **Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build   # production build
npm run start   # serve production build
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/chat` | AI chat interface |
| `/image` | Image generation studio |
| `/audio` | Voice / SFX / music studio |
| `/code` | AI coding workspace |
| `/3d` | 3D creation studio |
| `/pricing` | Plans & pricing |
| `/download` | Desktop & mobile apps |
| `/docs` | Documentation |
| `/blog` | Blog & news |
| `/about` | About the company |
| `/contact` | Contact form |
| `/careers` | Open positions |
| `/changelog` | Product changelog |
| `/security` | Security overview |
| `/dashboard` | User dashboard |
| `/settings` | Account settings |
| `/legal/terms` | Terms of Service |
| `/legal/privacy` | Privacy Policy |

## Theming

The site is light by default and honors `prefers-color-scheme`. A toggle in the
nav and chat header persists the choice in `localStorage` (`frox_theme`). Theme
tokens live in `app/globals.css` (`:root` for light, `html[data-theme="dark"]`
for dark) and are exposed to Tailwind via `rgb(var(--x-rgb) / <alpha-value>)` in
`tailwind.config.js`. Use the semantic classes (`bg-bg`, `text-text`,
`border-border`, `text-textDim`, …) rather than raw colors so both themes work.
Code and mock surfaces stay dark in both themes via `--code-bg` / the `.console`
class.

## SEO

`app/sitemap.js` and `app/robots.js` generate `/sitemap.xml` and `/robots.txt`.
Per-page `metadata` is set in each route.

## Authentication

Full auth flow under `/auth`:

- `/auth/login` — email/password, Google & GitHub OAuth buttons, remember-me
- `/auth/signup` — registration with password strength meter + terms consent
- `/auth/verify-email` — 6-digit OTP with auto-advance, paste, and 60s resend cooldown
- `/auth/forgot-password` — reset request (email-enumeration safe)
- `/auth/reset-password` — set new password via token

### API routes

`POST /api/auth/register`, `/login`, `/verify-email`, `/resend-verification`,
`/forgot-password`, `/reset-password`, `/logout`, and `GET /api/auth/me`.

The store is **in-memory** (`globalThis`) and resets on restart — swap the
store in each route for a real database (Postgres, Prisma, etc.) before
deploying. Verification and reset tokens are logged to the server console
in development (replace with a real email provider in production).

## Notes

- Auth responses set `httpOnly`, `sameSite=lax`, `secure` (in production) cookies.
- Rate limiting is applied per IP on all auth endpoints.
- Disposable email domains are blocked at registration.
