# RentReserve — Complete Implementation Specification

## 1. Executive Summary

RentReserve is a single-page editorial landing page for a programmable rent-obligation platform built on Stellar/Soroban. The site targets Nigeria's annual rent payment problem with the core message: "Prepare for rent before rent day."

The landing page is a premium editorial experience with:
- Monochrome color system (pure black/white/grays)
- Inter variable font (sans-serif) + Georgia serif for editorial moments
- Framer Motion animations throughout (blur-reveal, word-reveal, stagger, progress bars, path drawing)
- All product visualizations are code-built HTML/CSS — no images, no canvas, no SVG illustrations
- Single route: `/` (single-page application)
- Static generation via Next.js

---

## 2. Complete Site Map

```
/
├── / (single page — all sections stacked vertically)
```

There are no internal pages. The entire experience is a single scrollable page with anchor-linked navigation.

### Navigation Anchor Targets

| Anchor | Section |
|--------|---------|
| `#product` | Hero |
| `#how-it-works` | Problem visualization |
| `#tenants` | Fund Gradually |
| `#landlords` | Landlord section |
| `#developers` | Stellar/Architecture section |
| `#security` | Security section |
| `#start` | Final CTA |
| `#login` | (placeholder) |

---

## 3. Design System

### 3.1 Colors

**CONFIRMED from globals.css:**

| Token | Value | Usage |
|-------|-------|-------|
| `--color-canvas` | `255 255 255` | Page background |
| `--color-canvas-subtle` | `252 252 252` | Card backgrounds |
| `--color-canvas-muted` | `248 248 248` | Alternating section backgrounds |
| `--color-canvas-footer` | `247 247 247` | Footer background, Final CTA |
| `--color-text-primary` | `rgba(0,0,0,0.875)` | Headings, primary text |
| `--color-text-secondary` | `rgba(0,0,0,0.608)` | Body text |
| `--color-text-muted` | `rgba(0,0,0,0.45)` | Captions, metadata |
| `--color-hairline` | `rgba(0,0,0,0.06)` | Borders, dividers |
| `--color-hairline-strong` | `rgba(0,0,0,0.10)` | Stronger borders |
| `--color-positive` | `rgba(0,143,74,0.81)` | Success states, checkmarks |
| `--color-negative` | `rgba(223,38,0,0.82)` | Error states (unused in current build) |

**Shadow tokens (CONFIRMED):**
| Token | Value |
|-------|-------|
| `--shadow-hairline` | `rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px` |
| `--shadow-hairline-strong` | `rgba(0,0,0,0.08) 0px 0px 0px 0.5px inset` |

**Additional colors used inline (CONFIRMED):**

| Color | Usage |
|-------|-------|
| `rgba(0,143,74,0.7)` | Green accent — checkmarks, positive indicators |
| `rgba(0,143,74,0.08)` | Green background tint — status badges |
| `rgba(180,100,0,0.85)` | Orange — warning/funding states |
| `rgba(0,100,180,0.85)` | Blue — tracking/progress states |
| `rgba(0,0,0,0.04)` — `rgba(0,0,0,0.10)` | Various background tints |

### 3.2 Typography

**CONFIRMED from layout.tsx and tailwind.config.ts:**

| Role | Font | Source |
|------|------|--------|
| Sans-serif | Inter (variable, 100–900) | Google Fonts |
| Serif | Georgia, Times New Roman | System fonts |

**Type Scale (CONFIRMED from component code):**

| Role | Size | Weight | Letter-spacing | Line-height |
|------|------|--------|---------------|-------------|
| Hero headline | `clamp(42px, 5.5vw, 64px)` | 600 (semibold) | `-0.03em` | 1.0 |
| Section headline | `clamp(26px, 3vw, 38px)` | 600 | `-0.025em` | 1.1 |
| Large headline (problem intro) | `clamp(28px, 3.5vw, 42px)` | 600 | `-0.025em` | tight |
| Final CTA headline | `clamp(32px, 4vw, 52px)` | 600 | `-0.03em` | 1.0 |
| Editorial quote | `clamp(28px, 3.8vw, 44px)` | 400 (serif) | `-0.01em` | tight |
| Value loop heading | `clamp(22px, 2.5vw, 32px)` | 600 | `-0.02em` | — |
| Body | 16–17px | 400 | — | `relaxed` (~1.625) |
| Body small | 14–15px | 400 | — | `relaxed` |
| Caption | 13px | 400–500 | — | — |
| Label | 12–13px | 400 | — | — |
| Eyebrow | 11px | 600 | `0.05em` (tracking-widest) | — |
| Micro label | 10–11px | 500–600 | `0.05em` | — |

### 3.3 Spacing

**CONFIRMED from component code:**

| Element | Value |
|---------|-------|
| Page horizontal padding | `px-6` (24px) → `md:px-10` (40px) → `lg:px-16` (64px) |
| Section vertical padding | `py-20` (80px) → `md:py-28` (112px) |
| Editorial/Final CTA padding | `py-24` (96px) → `md:py-36` (144px) |
| Container max-width | `max-w-[1280px]` |
| Grid gap | `gap-12` (48px) → `lg:gap-16` (64px) |
| Card padding | `p-5` (20px) to `p-6` (24px) to `p-8` (32px) |
| Heading to body | `mb-5` (20px) |
| Body to CTA | `mb-8` (32px) to `mb-10` (40px) |
| Eyebrow to heading | `mb-4` (16px) to `mb-6` (24px) |
| Item gap (feature lists) | `gap-4` (16px) to `gap-5` (20px) |
| Card border radius | `rounded-2xl` (16px) |
| Button border radius | `rounded-xl` (12px) to `rounded-full` |
| Badge border radius | `rounded-full` |

### 3.4 Layout

**CONFIRMED:**

| Property | Value |
|----------|-------|
| Max content width | 1280px |
| Grid system | CSS Grid — 12-column on desktop |
| Standard two-column layout | `grid-cols-1 lg:grid-cols-12` |
| Copy column | `lg:col-span-5` |
| Visualization column | `lg:col-span-7` |
| Alternative split | `lg:col-span-6` / `lg:col-span-6` |
| Hero layout | Copy: `lg:col-span-6 xl:col-span-5`, Product: `lg:col-span-6 xl:col-span-7` |
| Full-width sections | `max-w-[1280px] mx-auto` |
| Mobile | Single column, stacked |
| Alternating backgrounds | White (`rgb(255,255,255)`) and Muted (`rgb(248,248,248)`) |

---

## 4. Responsive System

### 4.1 Breakpoints

**CONFIRMED from Tailwind classes:**

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | 0–639px | Mobile |
| `sm` | 640px | Small tablet |
| `md` | 768px | Tablet / desktop nav |
| `lg` | 1024px | Desktop layout |
| `xl` | 1280px | Wide desktop hero adjustment |

### 4.2 Navigation

**CONFIRMED from Navbar.tsx:**

- Desktop (`md+`): Horizontal link bar with 5 nav links + Log in + "Start preparing" CTA button
- Mobile (`<md`): Hamburger menu → full-screen white overlay with vertically stacked links + CTAs
- Mobile menu animation: `AnimatePresence` with fade + vertical slide
- Hamburger animation: Three lines → X (rotate ±45deg via framer-motion)
- Body scroll lock when mobile menu is open
- Sticky header with `position: fixed`, `z-50`
- Scroll behavior: background transitions to `bg-white/95 backdrop-blur-sm` with bottom border after 12px scroll

### 4.3 Grid Changes

| Section | Desktop | Mobile |
|---------|---------|--------|
| Hero | 2-col (5/7 split) | Single column |
| Problem | 2-col (5/7 split) | Single column, visualization below copy |
| RentReserve | 2-col (6/6, reordered) | Single column, product card first |
| Fund Gradually | 2-col (5/7 split) | Single column |
| Reminders | 2-col (5/7 split, phone left) | Single column, phone first |
| Early Settlement | 2-col (5/7 split) | Single column |
| Batch Payment | 2-col (5/7 split) | Single column |
| Landlord | 2-col (5/7 split) | Single column |
| Authorization | 2-col (5/7 split) | Single column, vertical flow diagram |
| Stellar | 3-col pillars + 5-col diagram | Stacked |
| Lifecycle | 3-col card grid | 1-col → 2-col (sm) → 3-col (lg) |
| Feature rows | Full-width rows | Stacked rows |
| Security | 3-col cards | Single column |
| Value loop | 6-col (lg) → 3-col (sm) → 2-col | Stacked |
| FAQ | 4-col label + 8-col questions | Stacked |
| Final CTA | Left-aligned (max 580px) | Same |

### 4.4 Typography Changes

- Hero headline: `clamp(42px, 5.5vw, 64px)` — fluid scaling
- Section headlines: `clamp(26px, 3vw, 38px)` — fluid scaling
- All typography uses `clamp()` for smooth scaling between breakpoints

### 4.5 Mobile-Specific

- Horizontal padding decreases from 64px (lg) → 40px (md) → 24px (mobile)
- Section padding decreases from 112px (md) → 80px (mobile)
- Card padding decreases from 32px → 20px on mobile
- Grid gaps decrease from 64px → 48px
- Auth flow diagram switches from horizontal to vertical on mobile (`hidden sm:flex` / `flex sm:hidden`)
- Value loop: 6-col → 3-col → 2-col
- Lifecycle cards: 3-col → 2-col → 1-col
- FAQ: Side-by-side → stacked

---

## 5. Component Architecture

### 5.1 Layout Components

```
src/
├── app/
│   ├── layout.tsx          — Root layout, fonts, metadata
│   ├── page.tsx            — Main page, imports all sections
│   └── globals.css         — CSS variables, Tailwind utilities
├── components/
│   ├── navigation/
│   │   └── Navbar.tsx      — Fixed header + mobile menu
│   ├── hero/
│   │   ├── Hero.tsx        — Hero section wrapper (2-col grid)
│   │   ├── HeroCopy.tsx    — Headline, description, CTAs, trust line
│   │   └── HeroProduct.tsx — Product visualization card + notification
│   ├── sections/
│   │   ├── ProblemSection.tsx
│   │   ├── RentReserveSection.tsx
│   │   ├── FundGraduallySection.tsx
│   │   ├── RemindersSection.tsx
│   │   ├── EarlySettlementSection.tsx
│   │   ├── BatchPaymentSection.tsx
│   │   ├── LandlordSection.tsx
│   │   ├── AuthorizationSection.tsx
│   │   ├── StellarSection.tsx
│   │   ├── EditorialQuote.tsx
│   │   ├── LifecycleSection.tsx
│   │   ├── FeatureRowsSection.tsx
│   │   ├── SecuritySection.tsx
│   │   ├── FAQSection.tsx
│   │   └── FinalCTA.tsx
│   ├── motion/
│   │   ├── BlurReveal.tsx
│   │   ├── WordReveal.tsx
│   │   ├── StaggerReveal.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── CountUp.tsx
│   │   ├── DrawPath.tsx
│   │   └── FadePresence.tsx
│   └── footer/
│       └── Footer.tsx
```

### 5.2 Motion Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `BlurReveal` | Fade + blur + translateY on scroll | `children`, `delay`, `duration`, `y`, `className`, `once`, `amount` |
| `WordReveal` | Word-by-word staggered reveal | `text`, `className`, `stagger`, `delay`, `duration`, `once` |
| `StaggerReveal` | Container that staggers children | `children[]`, `stagger`, `delay`, `duration`, `y`, `as` |
| `ProgressBar` | Animated horizontal fill bar | `percent`, `delay`, `duration`, `height`, `className` |
| `CountUp` | Animated number counter | `from`, `to`, `duration`, `delay`, `prefix`, `suffix`, `format` |
| `DrawPath` | SVG path drawing animation | `d`, `stroke`, `strokeWidth`, `delay`, `duration`, `viewBox` |
| `FadePresence` | AnimatePresence wrapper with blur | `children`, `id`, `className` |

### 5.3 All Components Are Client-Side

Every component that uses framer-motion or React state has `"use client"` directive.

---

## 6. Page Section Specification (Top to Bottom)

### 6.1 Navigation (Navbar)

**CONFIRMED:**
- Fixed position, full-width, `z-50`
- Height: `h-14` (56px)
- Logo: SVG "R" mark (22x22, dark rounded rect with white R letterform) + "RentReserve" text
- Nav links: Product, How it works, For tenants, For landlords, Developers
- Desktop CTAs: "Log in" (text link) + "Start preparing" (filled button, rounded-full)
- Mobile: Hamburger → full-screen overlay
- Scroll state: `bg-white/95 backdrop-blur-sm border-b` after 12px
- Logo mark: `<svg width="22" height="22">` — dark rounded rect with white "R" shape

### 6.2 Hero

**CONFIRMED:**
- Section ID: `#product`
- Min height: `760px`
- Padding: `pt-32 pb-24 md:pb-32`
- Background: Subtle radial gradient (`rgba(0,0,0,0.02)` at top)
- Two-column grid (5/7 on xl, 6/6 on lg)

**Left column (HeroCopy):**
- Eyebrow: Green dot + "A calmer way to prepare for rent" (13px, medium)
- Headline: "Prepare for your / rent before / rent day." — three lines, word-by-word reveal
- Description: 17px body text
- CTAs: "Start a Rent Reserve" (dark pill button with arrow) + "See how it works" (text link)
- Trust line: Three items with green checkmarks: "Fund gradually", "Pay ahead", "Wallet-authorized settlement"

**Right column (HeroProduct):**
- Product card: White card with window chrome (3 dots + "Active" badge)
- Content: "RENT RESERVE" label, date range, "Due in 68 days"
- Main amount: ₦1,200,000
- Progress bar: 78% funded, ₦264,000 remaining
- Stats: Funded ₦936,000 | Recommended pace ≈ ₦88,000/month
- Contribution list: 4 recent contributions with green dots
- CTA: "Fund rent →" button
- Floating notification card: "30 days to rent day · 86% funded · ₦168,000 remaining"
- All data animates in with staggered delays (0.8s–1.5s)

### 6.3 ProblemSection (2 sub-sections)

**Sub-section 1 — Introduction:**
- Background: `rgb(248,248,248)`
- Eyebrow: "Built for one simple problem"
- Headline: "Income arrives gradually." (dark) + "Rent often doesn't." (muted 0.35)
- Uses `clamp(28px, 3.5vw, 42px)` size

**Sub-section 2 — The Problem:**
- Section ID: `#how-it-works`
- Border-top separator
- Two-column (5/7)
- Left: "The problem" eyebrow, headline, body text, three numbered points (01, 02, 03)
- Right: Visualization card containing:
  - Monthly income bar chart (12 bars, Jan–Dec, animated scaleY)
  - "vs" divider with lines
  - Annual rent obligation bar (₦1,200,000 — scaleX animation)
  - "RentReserve bridges the gap" pill badge (dark, rounded-full)

### 6.4 RentReserveSection

- Two-column (6/6, reordered — product first on mobile)
- Left: Product card showing full obligation detail:
  - Header with "RENT RESERVE" + "Active" badge
  - Amount: ₦1,200,000
  - Progress: 78% funded
  - Stats row: Funded, Due, Recommended
  - Funding history table (6 rows with mini progress bars)
  - Action buttons: "Add funds" + "Settle early"
- Right: "The Rent Resverve" eyebrow, headline, body, three feature points with icons (target, clock, check)

### 6.5 FundGraduallySection

- Background: `rgb(248,248,248)`, section ID: `#tenants`
- Two-column (5/7)
- Left: "Fund it your way" eyebrow, headline, body, three bullet points with green check circles
- Right: Contribution flow visualization:
  - 5 contribution pills (₦100k, ₦75k, ₦200k, ₦150k, ₦275k) — staggered pop-in
  - "Total funded" divider
  - Running total: ₦800,000 with 67% badge
  - Progress bar with segment markers
  - Footer: "5 contributions · same obligation" + "₦400,000 remaining" badge

### 6.6 RemindersSection

- Two-column (5/7, phone left)
- Left: Phone frame (280×440px) with:
  - Status bar (time "9:41", signal bars, notch)
  - App header: "RENT RESERVE" + ₦1,200,000
  - Progress strip
  - State indicator tabs (5 dots)
  - Auto-cycling notification cards (5 states: 90d → 60d → 30d → 7d → Settled)
  - Each notification: icon, title, body, sub-text, mini progress bar, action button
- Right: "Smart reminders" eyebrow, headline, body, 2×2 grid of reminder state cards

### 6.7 EarlySettlementSection

- Background: `rgb(248,248,248)`
- Two-column (5/7)
- Left: "Pay ahead" eyebrow, headline, body, three feature cards with green check icons
- Right: Settlement timeline card:
  - Green success banner: "Rent fully funded · ₦1,200,000 · 11 days before deadline"
  - Vertical timeline with 6 events (Jan → Aug → Settled)
  - Each event: node circle, amount, month, percentage, mini progress bar
  - Final event: green checkmark, "Obligation complete · Receipt available"
  - Buttons: "Settlement confirmed ✓" + "Receipt"

### 6.8 BatchPaymentSection

- Two-column (5/7)
- Left: "Batch settlement" eyebrow, headline, body, price breakdown (Rent, Service Charge, Total)
- Right: Interactive batch payment card:
  - Header: "Upcoming obligations" + count badge
  - 3 obligation rows with custom checkboxes (Apartment Rent, Service Charge, Maintenance Fund)
  - Total row with animated count
  - CTA: "Review & settle ₦X" button → "All obligations settled ✓" state
  - Reset demo button
  - Interactive: user can toggle checkboxes, settle, and reset

### 6.9 LandlordSection

- Background: `rgb(248,248,248)`, section ID: `#landlords`
- Two-column (5/7)
- Left: "For landlords" eyebrow, headline, body, three feature points with left-bar accents
- Status flow pills at bottom (Preparing → Partially funded → 78% funded → Fully funded → Settled ✓)
- Right: Landlord card with auto-cycling states:
  - Tenant info (avatar "PF", name, property, status dot)
  - Rent obligation + due date grid
  - Progress bar (animated through states)
  - Verified payment activity (3 rows with green checks)
  - Settlement state (pending → settled with animation)
  - Cycles through 5 states every 2.4s

### 6.10 AuthorizationSection

- Two-column (5/7)
- Left: "Authorization" eyebrow, headline (with muted second half), body, three info cards
- Right: Architecture diagram card:
  - Title: "How a contribution works"
  - Flow diagram (horizontal on desktop, vertical on mobile):
    - 5 nodes: Tenant → Authorize → Soroban → Stellar → Settlement
    - Each node: icon (person, key, document, globe, check) + label + sub-label
    - Connectors: animated lines with arrow
  - Disclaimer text at bottom

### 6.11 StellarSection

- Background: `rgb(248,248,248)`, section ID: `#developers`
- Centered headline + description (max 640px)
- Two-column layout below:
  - Left (7-col): Three pillar cards (Programmable, Authorized, Verifiable)
    - Each: icon, eyebrow label, title, body
  - Right (5-col): Architecture diagram card:
    - SVG diagram with 4 nodes (RentReserve App, Wallet, Soroban Contract, Stellar Network)
    - Dashed connecting lines
    - On-chain vs Off-chain breakdown table

### 6.12 EditorialQuote

- Border top + bottom
- Max width: 760px
- Opening quote mark SVG (decorative)
- Serif font quote: "The goal isn't to change how rent works. It's to give people more time to prepare for it."
- Quote split into 4 chunks for staggered reveal
- Hairline divider
- Attribution: "RentReserve product principle"

### 6.13 LifecycleSection

- Background: `rgb(248,248,248)`
- Centered headline (max 560px)
- Flow arrow strip: 6 pills connected by arrows (Create → Accept → Fund → Track → Settle → Verify)
- 3-column card grid (6 cards):
  - Each card: number (01–06), label, title, body, status badge
  - Cards with progress: animated progress bar (0%, 55%, 78%, 100%)
  - Final card: green checkmark + "Verifiable transaction"

### 6.14 FeatureRowsSection

- Full-width rows with border-bottom separators
- 6 features:
  - Each row: number (01–06), label, body, tag (Core/Coming soon/Planned)
  - Tags: Core = gray, Coming soon = orange, Planned = blue

### 6.15 SecuritySection (2 sub-sections)

**Sub-section 1 — Value Loop:**
- Background: `rgb(248,248,248)`
- Headline: "The complete rent preparation loop."
- 6-column grid of loop steps: Know → Plan → Prepare → Remember → Settle → Verify
- Each: icon, label, sub-label

**Sub-section 2 — Security Principles:**
- "Security" eyebrow, headline, body
- 3-column cards: User-controlled, Minimal on-chain data, Transparent settlement
- Each: icon (shield/lock/check), number, title, body
- Disclaimer paragraph at bottom

### 6.16 FAQSection

- Two-column (4/8)
- Left: "FAQ" eyebrow, headline, description
- Right: 9 accordion items with:
  - Question text (15px, medium)
  - Plus/minus icon (rotates 45° on open)
  - AnimatePresence height animation
  - Answer text (14px, relaxed line-height)

### 6.17 FinalCTA

- Background: `rgb(247,247,247)`
- Section ID: `#start`
- Max width: 580px
- "Get started" eyebrow
- Headline: "Your next rent is already coming. / Start preparing now." (second line muted)
- Body text
- CTAs: "Start a Rent Reserve" (dark pill with arrow) + "Explore the product" (text link)

### 6.18 Footer

- Background: `rgb(247,247,247)`, border-top
- 4-column grid: Brand (4-col) + Links (8-col, 4 sub-columns)
- Brand: Logo + tagline + "Built on Stellar · Testnet prototype"
- Link columns: Product, Developers, Company, Legal
- Bottom bar: © 2026 + disclaimer text

---

## 7. Motion System

### 7.1 Global Easing

**CONFIRMED:** `[0.22, 1, 0.36, 1]` — used in every component as the primary ease curve.

### 7.2 Page Load Sequence (CONFIRMED from HeroCopy.tsx)

| Delay | Element |
|-------|---------|
| 0.05s | Eyebrow fades in (blur + translateY) |
| 0.10s | "Prepare for your" word reveal begins |
| 0.28s | "rent before" word reveal begins |
| 0.44s | "rent day." word reveal begins |
| 0.52s | Description paragraph fades in |
| 0.64s | CTA group fades in |
| 0.78s | Trust line fades in |
| 0.55s | Product card enters (blur + scale + translateY) |
| 0.80s | First contribution row slides in |
| 0.95s | Second contribution row |
| 1.10s | Third contribution row |
| 1.25s | Fourth contribution row |
| 1.40s | "Fund rent →" button fades in |
| 1.50s | Floating notification card enters |

### 7.3 Scroll-Triggered Animations

**CONFIRMED:** All section content uses `useInView` with `once: true`.

| Component | Trigger | Animation |
|-----------|---------|-----------|
| `BlurReveal` | 15% in view | opacity 0→1, blur 8px→0, translateY 20px→0 |
| `WordReveal` | 20% in view | Per-word: opacity 0→1, blur 8px→0, translateY 16px→0 |
| `ProgressBar` | 50% in view | scaleX 0 → percent/100 |
| Income chart bars | 30% in view | scaleY 0→1 (staggered, 0.05s each) |
| Annual rent bar | 30% in view | scaleX 0→1 (from left) |
| Contribution pills | 30% in view | opacity 0→1, scale 0.88→1, y 8→0 (staggered) |
| Timeline spine | 25% in view | scaleY 0→1 over 2.2s (linear) |
| Timeline events | 25% in view | opacity 0→1, x -12→0 (staggered) |
| Lifecycle cards | 10% in view | opacity 0→1, y 24→0, blur 8px→0 (staggered) |
| FAQ items | 15% in view | opacity 0→1, blur 6px→0, y 18→0 (staggered) |
| Value loop cards | 30% in view | opacity 0→1, y 16→0 (staggered) |
| Architecture nodes | 30% in view | opacity 0→1, scale 0.7→1 (staggered) |
| Architecture edges | 30% in view | pathLength 0→1 (staggered) |
| Auth flow connectors | 30% in view | scaleX 0→1 (staggered) |
| Security principle cards | 30% in view | opacity 0→1, y 20→0 (staggered) |
| Editoral quote chunks | 30% in view | opacity 0→1, blur 6px→0, y 10→0 (staggered) |

### 7.4 Auto-Cycling Animations

| Section | States | Interval | Behavior |
|---------|--------|----------|----------|
| RemindersSection phone | 5 notification states | 2800ms | AnimatePresence mode="wait" with blur+fade transition |
| LandlordSection card | 5 status states | 2400ms | AnimatePresence for badge + progress bar + settlement state |

### 7.5 Interactive Animations

| Element | Trigger | Animation |
|---------|---------|-----------|
| Primary buttons | hover | backgroundColor darkens + translateY(-1px) |
| Primary buttons | tap | scale(0.98) |
| Product card button | hover | scale(1.005) |
| Product card button | tap | scale(0.98) |
| Nav links | hover | color transition (0.608 → 0.875) |
| Footer links | hover | color transition (0.45 → 0.875) |
| FAQ plus icon | open | rotate 0° → 45° |
| Batch checkboxes | click | Background fill + checkmark SVG |
| Mobile hamburger | toggle | Lines rotate to X |
| Mobile menu | open | Full-screen overlay fade + slide |
| Batch settle total | change | AnimatePresence counter flip |
| Landlord status badge | state change | AnimatePresence text swap |

### 7.6 Reduced Motion

**CONFIRMED from globals.css:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Product Visualizations

All product visualizations are **HTML/CSS** — no images, canvas, or external SVG files.

### 8.1 Hero Product Card

- White card with box-shadow (inset 0.5px + outer 0.5px + 24px blur shadow)
- Window chrome: 3 dots (bg-black/10) + "Active" badge (green tint)
- Content: text labels, progress bar, contribution list
- Floating notification: absolute-positioned card overlapping bottom-left

### 8.2 Problem Visualization

- Bar chart: 12 `<motion.div>` bars with scaleY animation
- Annual rent bar: scaleX from left
- "vs" divider: horizontal lines + centered badge
- "Bridge" pill: dark rounded-full badge

### 8.3 Reminders Phone Frame

- Fixed dimensions: 280×440px
- Outer shell: `rounded-[2.5rem]` with box-shadow
- Inner screen: `rounded-[2rem]` with overflow hidden
- Status bar with time "9:41", signal bars, notch
- Auto-cycling notification cards inside

### 8.4 Settlement Timeline

- Vertical spine line with scaleY animation
- Node circles (3 types: contribution, full, settled)
- Content: amount, month, percentage, mini progress bars

### 8.5 Auth Flow Diagram

- Desktop: horizontal flow with 5 nodes + connectors
- Mobile: vertical flow with nodes + vertical line connectors
- Each node: icon (SVG inline) + label + sub-label
- Connectors: animated scaleX lines + arrow SVG

### 8.6 Architecture Diagram (StellarSection)

- Pure SVG with 4 circular nodes + 5 dashed connecting lines
- Nodes: RentReserve App, Wallet, Soroban Contract, Stellar Network
- Lines: `strokeDasharray="4 3"`, animated pathLength

### 8.7 Batch Payment Card

- Interactive checkboxes (custom SVG checkmarks)
- Animated total counter
- State transitions: pending → settled with AnimatePresence

### 8.8 Landlord Card

- Auto-cycling through 5 status states
- Tenant avatar (initials "PF")
- Progress bar animates through percentages
- Settlement state transitions

---

## 9. Asset Inventory

### 9.1 SVG Icons (All Inline)

| Icon | Used In | Size |
|------|---------|------|
| Arrow right (→) | Hero CTAs, contribution pills, timeline | 12–14px |
| Checkmark (✓) | Trust line, feature icons, settled states | 8–16px |
| Logo "R" mark | Navbar, Footer | 20–22px |
| Target (circle) | RentReserve features | 14px |
| Clock | RentReserve features | 14px |
| Person | Auth flow | 16px |
| Key | Auth flow, Stellar pillars | 16px |
| Document | Auth flow, Stellar pillars | 16px |
| Globe | Auth flow | 16px |
| Shield | Security principles | 18px |
| Lock | Security principles | 18px |
| Eye | Value loop | 14px |
| Calendar | Value loop | 14px |
| Plus | Value loop | 14px |
| Bell | Value loop | 14px |
| Quote mark (decorative) | Editorial quote | 32×24px |
| Down chevron | FAQ toggle | 9px |
| Signal bars | Phone status bar | 0.5px wide |

### 9.2 Fonts

| Font | Source | Weights |
|------|--------|---------|
| Inter (variable) | Google Fonts CSS2 | 100–900 (variable) |
| Georgia | System font | 400, 700 |
| Times New Roman | System fallback | — |

### 9.3 No Images

The entire landing page uses zero images. All visuals are HTML/CSS, inline SVGs, and CSS gradients.

---

## 10. Technical Architecture

**CONFIRMED:**
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.3.4 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (via @tailwindcss/postcss) |
| Animation | Framer Motion 13.2.0 |
| React | 19.2.8 |
| Build | Turbopack (default in Next.js 16) |
| Package manager | npm workspaces |
| CSS architecture | CSS custom properties + Tailwind utilities |

**INFERRED:**
- Static generation (all pages prerendered)
- No API routes in the landing page
- No database in the frontend
- No authentication in the frontend

---

## 11. SEO / Metadata

**CONFIRMED from layout.tsx:**

```typescript
title: "RentReserve — Prepare for Rent Before Rent Day"
description: "Plan, fund and settle your upcoming rent before the deadline with RentReserve. Turn your next rent payment into a plan."
openGraph.title: "RentReserve — Prepare for Rent Before Rent Day"
openGraph.description: "Turn your next rent payment into a plan. Fund gradually, stay on track, and settle when you're ready."
openGraph.type: "website"
```

**Missing (not implemented):**
- Twitter/X card meta tags
- Canonical URL
- robots.txt
- sitemap.xml
- JSON-LD structured data
- Favicon / apple-touch-icon

---

## 12. Accessibility

**CONFIRMED:**
- `lang="en"` on `<html>`
- Semantic `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>` elements
- `aria-label` on sections
- `aria-labelledby` on sections with headlines
- `aria-hidden="true"` on decorative SVGs
- `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `role="list"` on `<ul>` elements
- `aria-expanded` on FAQ buttons and mobile menu button
- `aria-pressed` on batch payment toggle buttons
- `aria-label` on interactive elements
- `:focus-visible` outline (2px solid rgba(0,0,0,0.35), offset 3px)
- `prefers-reduced-motion` support
- Button labels on icon-only buttons

**Missing:**
- Skip-to-content link
- Proper heading hierarchy (some sections use `<p>` for headlines)
- Alt text (no images to alt)
- Screen reader testing

---

## 13. Performance

**CONFIRMED:**
- Static generation (no server-side rendering per request)
- No images to optimize
- CSS-only animations where possible
- Framer Motion uses `useInView` (IntersectionObserver) for scroll triggers
- `once: true` on all scroll animations (no re-triggering)
- `will-change` not explicitly used but Framer Motion applies GPU transforms
- Font loading: `display=swap` via Google Fonts
- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`

**INFERRED:**
- Turbopack for fast builds
- Code splitting via Next.js dynamic imports (though all sections are statically imported in page.tsx)

---

## 14. Known Unknowns

1. The exact cubic-bezier `[0.22, 1, 0.36, 1]` is confirmed in code but its origin (custom vs library default) is unknown
2. Whether the Inter font loads as variable or static weights depends on Google Fonts CSS2 response
3. The exact lighthouse score is unknown
4. Whether Framer Motion's `layout` animations are used anywhere — they are not in the current code
5. The `CountUp` and `DrawPath` motion components exist but are not currently used by any section

---

## 15. Build Order

For recreating this page from scratch:

1. **Foundation**
   - Create Next.js app with App Router
   - Configure Tailwind CSS v4
   - Set up CSS variables in `globals.css`
   - Configure Inter font in layout.tsx

2. **Motion Primitives**
   - Build `BlurReveal` component
   - Build `WordReveal` component
   - Build `StaggerReveal` component
   - Build `ProgressBar` component
   - Build `CountUp` component
   - Build `DrawPath` component
   - Build `FadePresence` component

3. **Layout Components**
   - Build `Navbar` (fixed header + mobile menu)
   - Build `Footer`

4. **Hero**
   - Build `HeroCopy` (headline, description, CTAs)
   - Build `HeroProduct` (product card + notification)
   - Compose `Hero` section

5. **Content Sections** (in order)
   - ProblemSection (2 sub-sections)
   - RentReserveSection
   - FundGraduallySection
   - RemindersSection (phone frame)
   - EarlySettlementSection (timeline)
   - BatchPaymentSection (interactive)
   - LandlordSection (auto-cycling card)
   - AuthorizationSection (flow diagram)
   - StellarSection (SVG diagram)
   - EditorialQuote
   - LifecycleSection (card grid)
   - FeatureRowsSection
   - SecuritySection (2 sub-sections)
   - FAQSection (accordion)
   - FinalCTA

6. **Polish**
   - Responsive testing
   - Animation timing refinement
   - Accessibility audit
   - Performance optimization

---

## 16. QA Checklist

### Visual
- [ ] Typography matches spec (Inter variable, Georgia for quotes)
- [ ] Color system consistent (monochrome with green accent)
- [ ] Spacing consistent across sections
- [ ] Border-top separators between sections
- [ ] Alternating white/muted backgrounds
- [ ] Card shadows consistent (inset 0.5px + outer 0.5px)
- [ ] Border radius consistent (2xl for cards, xl for buttons)
- [ ] Logo SVG renders correctly

### Responsive
- [ ] Mobile: single column layout
- [ ] Mobile: hamburger menu works
- [ ] Mobile: padding adjusts
- [ ] Tablet: 2-column layouts adjust
- [ ] Desktop: full 12-column grid
- [ ] Typography scales with clamp()
- [ ] No horizontal overflow

### Animation
- [ ] Hero entrance sequence plays
- [ ] Scroll animations trigger on enter
- [ ] Scroll animations play once only
- [ ] Auto-cycling sections (Reminders, Landlord) work
- [ ] FAQ accordion opens/closes
- [ ] Batch payment interactive demo works
- [ ] Reduced motion preference respected
- [ ] Button hover/tap states work

### Accessibility
- [ ] All sections have aria-labels
- [ ] Interactive elements have aria attributes
- [ ] Focus-visible outline visible
- [ ] Progress bars have ARIA roles
- [ ] Mobile menu has aria-expanded

### Performance
- [ ] No layout shift
- [ ] Fonts load with display=swap
- [ ] No unused JavaScript bundles
- [ ] Static generation works
