# scaleB Med & Beauty Store

**Your Health. Your Glow.** This is a frontend-only storefront for an online pharmacy and beauty shop. It is built with Next.js (App Router), TypeScript, Tailwind CSS, React Three Fiber and Framer Motion.

There's no backend. Products come from a local TypeScript file, the cart is saved in `localStorage`, and the forms (newsletter, prescription upload, contact, checkout) only validate input and show a success state.

## Quick start

Requirements: **Node.js 18.18+** (Node 20 or newer recommended) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Pages

| Route | What's there |
| --- | --- |
| `/` | 3D hero (floating bottle and jar that react to the mouse), category cards with a tilt effect, 8 featured products, "Why choose us", brand promise, reviews, newsletter |
| `/shop` | Product grid with search, category, price range and brand filters, and sorting. The search term and category are kept in the URL (`/shop?category=beauty&q=serum`) |
| `/product/[slug]` | Rotatable 3D product preview (with an image toggle), price, description, quantity selector, add to cart, usage notes, related products |
| `/cart` | Change quantities, remove items, free-delivery progress bar, order summary, demo promo code **`GLOW10`** (10% off) |
| `/prescription` | Drag-and-drop file upload (JPG/PNG/WEBP/PDF, up to 3 files of 5 MB each) with previews and validation |
| `/about`, `/contact` | Brand story, values and team; contact details and a validated contact form |

## Folder structure

```
src/
├── app/                      # Routes (App Router)
│   ├── layout.tsx            # Fonts, header, footer, metadata
│   ├── globals.css           # Tailwind v4 theme tokens (colours, shadows, radii)
│   ├── icon.svg              # Favicon (leaf-in-a-drop logo)
│   ├── page.tsx              # Home
│   ├── shop/  product/[slug]/  cart/  prescription/  about/  contact/
│   └── not-found.tsx
├── components/
│   ├── layout/               # Header (sticky, search, cart badge, mobile menu), Footer
│   ├── home/                 # Hero, HeroVisual (lazy 3D + fallback), CategoryCards, ...
│   ├── product/              # ProductCard, ProductGrid, ProductArt (SVG), ProductPreview (3D), ...
│   ├── shop/                 # ShopView (search, sort, URL sync), ShopFilters
│   ├── cart/                 # CartView
│   ├── forms/                # PrescriptionForm, ContactForm
│   ├── three/                # Canvas scenes and procedural 3D models
│   └── ui/                   # Logo, Button, Reveal, TiltCard, Stars, SectionHeading, PageHeader, ...
├── data/
│   ├── products.ts           # 16 dummy products (8 medicine, 8 beauty) and helpers
│   └── site.ts               # Store info, nav links, reviews
└── lib/
    ├── cart-store.ts         # Zustand cart, persisted to localStorage
    ├── hooks.ts              # useHydrated, useCan3D, useInView, useIdle
    └── utils.ts              # cn(), formatPrice() (BDT ৳), discountPercent()
```

## Branding

- **Colours** are defined once in `src/app/globals.css` under `@theme`: soft white `cream`, `mint` (health), `blush` (beauty) and `navy` (text and buttons). Use them as Tailwind classes, for example `bg-mint-100` or `text-navy-900`.
- **Fonts:** Playfair Display for headings (`font-serif`) and Inter for body text (`font-sans`), loaded through `next/font`.
- **Logo:** `LogoMark` and `Logo` in `components/ui/Logo.tsx` (header and footer) and `app/icon.svg` (favicon).
- **Cards:** shared `.card` class (rounded, soft shadow, hairline ring) and `.container-page` for consistent gutters.

## How the 3D is kept light

- There are no model or HDR files to download. The packaging (bottle, jar, dropper, pump, tube and box) is built from Three.js primitives in `components/three/Models.tsx`, and the lighting comes from in-scene `Lightformer`s.
- The 3D scenes are loaded with `next/dynamic` and `ssr: false`, so three.js stays out of the first-load JavaScript (about 165 kB per page).
- The hero canvas mounts only once the browser is idle. It pauses rendering when scrolled off-screen and lowers its pixel ratio if the frame rate drops.
- A static SVG illustration is shown while the canvas loads, and it stays in place of the 3D when `useCan3D()` returns false. That happens with reduced motion, data-saver mode, a 2G connection, less than 4 GB of RAM, fewer than 4 CPU cores, or no WebGL.
- Product "photos" are generated SVGs (`ProductArt`). Pages make no image requests and the art stays sharp at any size.

## Customising

- **Products:** edit `src/data/products.ts`. Each product's `shape`, `color` and `accent` drive both its SVG art and its 3D model.
- **Real photos:** add an `image` field to `Product` and render it with `next/image` inside `ProductCard` and `ProductPreview` in place of `ProductArt`.
- **Currency:** change `formatPrice` in `src/lib/utils.ts`.
- **Delivery threshold, phone, address:** edit `src/data/site.ts`.

## Accessibility

- The page has a skip link, labelled navigation landmarks, visible focus rings and touch targets of at least 44 px.
- Every product image has a descriptive label. Form errors are linked to their fields, and cart and filter changes are announced through live regions.
- All animations respect `prefers-reduced-motion`.

> Demo project: all products, brands, prices and reviews are dummy data (store contact details are real). Always consult a doctor before taking medicines.
