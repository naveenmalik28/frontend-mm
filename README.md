# Magnivel Frontend

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Run `npm run dev`.

## Vercel deployment

- Set the Vercel project root directory to `frontend-mm`.
- Add `VITE_API_BASE_URL=https://api.magnivel.com` in the Vercel Production environment.
- Add your live `VITE_RAZORPAY_KEY_ID` in Vercel if checkout is enabled.
- `vercel.json` includes the SPA rewrite needed for React Router deep links like `/about` or `/dashboard`.
