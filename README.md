# AZZAN

Frontend-only project scaffold for **Blue Horizon Hotel & Beach** in Hurghada, Egypt. Built with Next.js App Router, TypeScript, Tailwind CSS, and `next-intl`. There is no backend or database. The route is intentionally blank while the project structure and data are prepared.

## Run locally

Requires Node.js 20.9 or newer and npm. From this folder:

```powershell
npm install
npm run dev
```

Open http://localhost:3000 for English. Chinese, Russian, and German routes use `/zh`, `/ru`, and `/de`.

Translation files are in `messages/`; hotel content is in `data/hotel.ts`; the shared booking destination is `config/booking.ts`.
