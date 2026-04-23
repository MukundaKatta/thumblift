# Thumblift

> Thumbnails that actually get clicked.

Describe your video. Get ten MrBeast-quality thumbnails in thirty seconds, every time.

## Stack

- Next.js 15.3.1 · App Router · TypeScript strict
- Tailwind v4 (`@tailwindcss/postcss`, CSS-first, no config file)
- `next/font/google` for Inter
- `pnpm` lockfile committed

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to Vercel — Next.js is auto-detected. No environment variables required (waitlist API URL is public and hardcoded).

```bash
pnpm build   # verify clean build
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo thumbnails, features, waitlist signup |
| `/try` | Describe a video → 3 mocked thumbnail concepts (pure CSS, no image gen) |
| `/api/waitlist` | POST `{ email }` → forwards to waitlist-api-sigma with `product: "thumblift"` |

## Status

v0 skeleton. Landing page preserved from original `index.html`. `/try` page is a mock demo — full AI thumbnail generation coming later.
