# MoneyMinds AI

AI-powered personal finance management app built with Next.js App Router, Clerk authentication, Prisma/PostgreSQL, Inngest background jobs, Arcjet protection, and Gemini-powered receipt scanning/insights.

---

## Features

- Clerk auth (protected dashboard/account/transaction routes)
- Multi-account management with default account support
- Transaction CRUD (income/expense) with recurring transaction scheduling
- AI receipt scanner (Gemini) for amount/date/category extraction
- Budget tracking + budget alerts
- Dashboard analytics and charts
- Monthly financial insight emails (Resend + Inngest)
- Currency display set to Indian Rupee (`₹`)

---

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Radix UI primitives
- Recharts
- React Hook Form + Zod
- Sonner toasts

### Backend / Data / Services
- Server Actions (Next.js)
- Prisma ORM
- PostgreSQL
- Clerk (Auth)
- Inngest (background jobs + cron)
- Arcjet (bot/shield + rate limiting)
- Google Generative AI SDK (Gemini)
- Resend (transactional email)

---

## Project Structure

```text
app/
  (main)/                 # Authenticated app pages (dashboard/account/transaction)
  api/
    inngest/route.js      # Inngest handler endpoint
    seed/route.js         # Dev seed endpoint
actions/                  # Server actions (accounts, transactions, budget, etc.)
components/               # Shared UI + header
data/                     # Landing data + categories
emails/                   # React Email template
lib/
  inngest/                # Inngest client and functions
  prisma.js               # Prisma client singleton
  checkUser.js            # Clerk user sync helper
  arcjet.js               # Arcjet config
  gemini.js               # Gemini model selection helpers
prisma/
  schema.prisma           # DB schema
```

---

## Environment Variables

Create a `.env` file in the project root.

### Required

```bash
DATABASE_URL=""
DIRECT_URL=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

ARCJET_KEY=""
GEMINI_API_KEY=""
RESEND_API_KEY=""
```

### Optional

```bash
GEMINI_MODEL="gemini-3-flash-preview"
```

> If `GEMINI_MODEL` is not set, the app defaults to `gemini-3-flash-preview` and falls back to `gemini-2.0-flash` when needed.

---

## Database

Prisma schema includes:

- `User` (maps Clerk user)
- `Account` (CURRENT/SAVINGS, default account)
- `Transaction` (income/expense, recurring metadata)
- `Budget` (per-user monthly budget)

Generate Prisma client:

```bash
npm install
```

Run migrations (when needed):

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Run app:

```bash
npm run dev
```

Open:

- App: `http://localhost:3000`
- Inngest endpoint: `http://localhost:3000/api/inngest`

---

## NPM Scripts

```bash
npm run dev      # Start Next.js dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (Next.js)
npm run email    # React Email dev preview
```

---

## API Endpoints

- `GET /api/inngest` - Inngest serve handler
- `POST /api/inngest` - Inngest events/webhooks
- `PUT /api/inngest` - Inngest support
- `GET /api/seed` - Seeds transactions for authenticated user/account

---

## Background Jobs (Inngest)

- `process-recurring-transaction` - processes one recurring transaction event
- `trigger-recurring-transactions` - daily cron (`0 0 * * *`)
- `generate-monthly-reports` - monthly cron (`0 0 1 * *`)
- `check-budget-alerts` - every 6 hours (`0 */6 * * *`)

---

## Security & Access Control

- Clerk middleware protects:
  - `/dashboard/**`
  - `/account/**`
  - `/transaction/**`
- Arcjet middleware provides:
  - Shield protection
  - Bot detection
- Arcjet token bucket guards account/transaction creation actions

---

## Notes

- Receipt scanner expects image uploads and returns parsed transaction fields.
- `checkUser()` keeps Clerk and local `User` table in sync.
- Financial values are stored as `Decimal` in DB and serialized to numbers for UI.

---

## Deployment Checklist

- Configure all required environment variables
- Run Prisma migrations against production database
- Ensure Clerk production keys are set
- Ensure Inngest endpoint is reachable at `/api/inngest`
- Ensure Resend sender/domain configuration is valid
