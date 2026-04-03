# Portfolio Project Setup

This is a Next.js 14 portfolio project.

## Prerequisites

- Node.js 18.18+ (Node.js 20+ recommended)
- A package manager:
  - `pnpm` (recommended), or
  - `npm`

## 1) Clone and install

```bash
git clone https://github.com/Kathir0478/portfolio.git
cd portfolio
pnpm install
```

If you prefer npm:

```bash
npm install
```

## 2) Configure environment variables

Create a `.env` file in the project root and add:

```env
NEXT_PUBLIC_API_URL=<your_chat_api_base_url>
SMTP_TEMPLATE=<your_emailjs_template_id>
SMTP_SERVICE_KEY=<your_emailjs_service_id>
SMTP_PUBLIC_KEY=<your_emailjs_public_key>
```

Notes:
- `NEXT_PUBLIC_API_URL` is used by the chatbot frontend.
- SMTP values are used for contact/email integration.
- Do not commit real secrets to git.

## 3) Run in development

Using pnpm:

```bash
pnpm dev
```

Using npm:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 4) Production build

```bash
pnpm build
pnpm start
```

Or with npm:

```bash
npm run build
npm run start
```

## 5) Lint

```bash
pnpm lint
```

Or:

```bash
npm run lint
```

## Project Scripts

- `dev`: Start local dev server
- `build`: Create production build
- `start`: Run production server
- `lint`: Run Next.js lint checks

## Tech Stack

- Next.js 14
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Troubleshooting

- If dependency installs fail, delete `node_modules` and reinstall.
- If port 3000 is busy, run:
  - `pnpm dev -- -p 3001`
- If environment values are changed, restart the dev server.

