# Smoky Akara

Smoky Akara is a playful Nigerian akara ordering MVP built with Next.js. It turns a trend-inspired food idea into a small business website with real pages, a simple menu, a WhatsApp ordering flow, mock authentication, and social links.

Akara is a Nigerian fried bean cake, also known as a bean fritter. This project keeps the tone warm, modern, Nigerian, and shareable while staying practical enough for a real food-ordering MVP.

## Features

- Multi-page App Router site
- Landing page with animated akara hero treatment
- Dedicated menu page for packs, sides, add-ons, and prices
- Dedicated order page with quantity, pack size, sides, delivery or pickup, customer details, and live summary
- WhatsApp order button with pre-filled order details
- Contact page with WhatsApp CTA and social links
- About page explaining the brand concept
- Login and signup mock authentication using browser localStorage
- Responsive layout for mobile, tablet, and desktop
- CSS-only animations, no heavy animation dependency

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page and overview |
| `/menu` | Full menu and add-ons |
| `/order` | Full ordering flow |
| `/about` | Brand story and concept |
| `/contact` | WhatsApp, social links, and contact details |
| `/login` | Frontend-only mock login |
| `/signup` | Frontend-only mock signup |

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- pnpm

## Getting Started

Run commands from the app folder:

```bash
cd /Users/msi/Developer/akara/smoky-akara
```

Install dependencies if needed:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already in use:

```bash
pnpm dev --port 3001
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Project Structure

```text
app/
  about/page.tsx
  contact/page.tsx
  login/page.tsx
  menu/page.tsx
  order/page.tsx
  signup/page.tsx
  page.tsx
  components/
  lib/
public/
  akara-hero.png
```

Key files:

- `app/components/NavBar.tsx` - shared navigation with desktop and mobile links
- `app/components/Footer.tsx` - shared footer with WhatsApp and social links
- `app/components/OrderForm.tsx` - interactive order form and WhatsApp message generation
- `app/components/MenuCards.tsx` - reusable menu cards
- `app/components/AkaraHome.tsx` - homepage/landing experience
- `app/lib/brand.ts` - editable brand, menu, WhatsApp, and social config
- `app/lib/auth.ts` - mock auth storage keys and types

## Updating WhatsApp and Social Links

Edit:

```text
app/lib/brand.ts
```

Update:

- `WHATSAPP_NUMBER`
- `SOCIAL_LINKS`
- `PACKS`
- `SIDES`
- `DELIVERY_FEE`

The WhatsApp order link is generated with:

```ts
createWhatsAppLink(message)
```

The order page builds a full message from the selected pack, quantity, sides, delivery choice, customer name, phone number, address, notes, and estimated total.

## Authentication

Authentication is intentionally simple for the MVP.

- Signup stores mock users in browser `localStorage`
- Login checks the saved users in the same browser
- Session data is stored locally
- No backend, database, or sensitive customer storage is connected yet

This is suitable for UI testing only. Replace it with real authentication before production use.

## Notes for Git

The real project repository is this folder:

```text
/Users/msi/Developer/akara/smoky-akara
```

Run Git commands from this directory, not the parent `/Users/msi/Developer/akara` folder.

## Deployment

The app can be deployed to Vercel or any platform that supports Next.js.

Recommended checks before deployment:

```bash
pnpm lint
pnpm build
```

## Future Improvements

- Real authentication
- Database-backed orders
- Admin dashboard for menu and order management
- Payment integration
- Delivery zones and delivery fee rules
- Order tracking
- Product photos for each menu item
- SEO metadata per page
