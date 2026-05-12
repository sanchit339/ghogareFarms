# 🥭 Ghogare Farms — Next.js Landing Page

> GI Tagged Shivneri Hapus Alphonso Mangoes | Junnar → Pune
> SEO-optimised, WhatsApp-first, Facebook/Google Ads-ready

---

## 🚀 Quick Setup (5 Steps Before Going Live)

### Step 1 — Update `lib/config.ts`
Replace all placeholder values:

```typescript
export const SITE = {
  phone: '+91XXXXXXXXXX',           // Your actual WhatsApp number
  whatsapp: '91XXXXXXXXXX',         // Same number without +
  waGroupLink: 'https://chat.whatsapp.com/XXXXX',  // Your WA group invite link
  instagram: 'https://www.instagram.com/YOUR_HANDLE',
  instagramHandle: '@YOUR_HANDLE',
  fbPixelId: '1234567890',          // From Meta Ads Manager
  gaMeasurementId: 'G-XXXXXXXXXX', // From Google Analytics
}
```

### Step 2 — Update Prices in `app/page.tsx`
Search for `₹XXX` and replace with real prices:
- `box1_price`: Price for 1 dozen
- `box2_price`: Price for 2 dozen

### Step 3 — Add Your Images
- `/public/og-image.jpeg` → 1200×630px farm photo (used by Facebook/WhatsApp preview)
- `/public/favicon.ico` → Your favicon
- `/public/apple-touch-icon.png` → 180×180px icon
- `/public/icon-192.png` & `/public/icon-512.png` → PWA icons

### Step 4 — Google Search Console
1. Go to https://search.google.com/search-console
2. Add property → your domain
3. Get verification code
4. Paste in `app/layout.tsx` → `verification.google`

### Step 5 — Deploy to Vercel (Free)
```bash
npm i -g vercel
cd ghogare-farms
vercel --prod
```
Or connect GitHub repo to https://vercel.com for auto-deploy on every push.

---

## 🤖 Release Flow (Vercel auto + manual production deploy)

This repo includes:
- `.github/workflows/release-vercel.yml`
- `scripts/deploy-production.sh`

### What this pipeline does now
1. On push to `main`, deploys to **Vercel production**.
2. Production server deployment is **manual** (you run the script when needed).

### GitHub Secrets to add (Repository → Settings → Secrets and variables → Actions)
Required secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Production server prerequisites (one-time)
1. Clone this repository at `/var/www/ghogare-farms` (or update paths accordingly).
2. Ensure Node.js + npm are installed.
3. Ensure process runner is configured:
   - PM2 (recommended), or
   - systemd service (set `PROD_SYSTEMD_SERVICE`), or
   - direct `PROD_RESTART_COMMAND`.
4. Confirm server can run:
   ```bash
   cd /var/www/ghogare-farms
   chmod +x scripts/deploy-production.sh
   ./scripts/deploy-production.sh main
   ```

### Manual production release command
Run this on your server whenever you want to pull the latest GitHub release to production:
```bash
cd /var/www/ghogare-farms
./scripts/deploy-production.sh main
```

---

## 📁 Project Structure

```
ghogare-farms/
├── app/
│   ├── layout.tsx          ← SEO metadata, JSON-LD schemas, FB Pixel, GA
│   ├── page.tsx            ← Full landing page (hero, products, reviews, FAQ)
│   ├── globals.css         ← Design system, animations
│   ├── sitemap.ts          ← Auto-generated sitemap.xml
│   └── robots.ts           ← robots.txt
├── lib/
│   └── config.ts           ← ⭐ Update this first! All site settings + translations
├── public/
│   ├── og-image.jpeg       ← Add your farm photo here (1200×630)
│   ├── favicon.ico         ← Add your favicon
│   └── site.webmanifest    ← PWA manifest
├── tailwind.config.ts      ← Design tokens
└── next.config.js          ← Security headers, image domains
```

---

## 🎯 SEO Strategy

### Keywords Targeting
| Keyword | Intent | Competition |
|---------|--------|-------------|
| Shivneri Hapus Pune | Buy | LOW 🟢 |
| Junnar Alphonso mango Pune | Buy | LOW 🟢 |
| GI tagged mango Pune | Buy | LOW 🟢 |
| mango delivery Baner | Buy | LOW 🟢 |
| mango delivery Wakad | Buy | LOW 🟢 |
| mango delivery Hinjewadi | Buy | LOW 🟢 |
| Hapus mango home delivery Pune | Buy | MEDIUM 🟡 |
| buy Alphonso mango Pune | Buy | MEDIUM 🟡 |

### Structured Data Implemented
- ✅ `LocalBusiness` schema with areaServed (all Pune localities)
- ✅ `Product` schema with offers, delivery time, reviews
- ✅ `FAQPage` schema (shows in Google rich results)
- ✅ `BreadcrumbList` schema
- ✅ `AggregateRating` (shows stars in Google)

### On-Page SEO
- ✅ Title: 60 chars, primary + local keywords
- ✅ Meta description: 155 chars, high-intent CTA
- ✅ H1 with target keyword
- ✅ Delivery areas section with all Pune localities (natural keyword density)
- ✅ OpenGraph for Facebook/WhatsApp share previews
- ✅ Sitemap.xml auto-generated
- ✅ robots.txt
- ✅ Canonical URL
- ✅ Security headers (Core Web Vitals boost)

---

## 📱 Facebook & Google Ads Setup

### Facebook Pixel Events Tracked
| Event | Trigger |
|-------|---------|
| `PageView` | Page load |
| `Contact` | Any WhatsApp button click |
| `Lead` | Any WhatsApp button click |
| `Subscribe` | WhatsApp Group join click |
| `ViewContent` | Instagram follow click |

### Google Ads UTM Setup
Add these UTM parameters to your ad destination URLs:
```
https://ghogarefarms.in?utm_source=google&utm_medium=cpc&utm_campaign=hapus-pune&utm_term=shivneri+hapus+pune
https://ghogarefarms.in?utm_source=facebook&utm_medium=paid&utm_campaign=mango-baner
```

### Recommended Ad Audiences
**Facebook/Instagram:**
- Location: Pune (10km radius from Baner, Wakad, Hinjewadi)
- Interests: Organic food, Farming, Maharashtra, Konkan, Mangoes
- Behaviours: Online shoppers, Food & Grocery buyers
- Custom audience: WhatsApp group members

**Google Ads:**
- Keywords: "Hapus mango Pune", "Alphonso mango delivery Pune", "buy mango Baner"
- Location: Pune city + 25km radius
- Ad extensions: Call button (your WhatsApp number), Sitelink to products

---

## 🌐 Domain & Hosting

### Recommended Stack
- **Hosting:** Vercel (free tier is sufficient for landing page)
- **Domain:** Purchase `ghogarefarms.in` on GoDaddy/Namecheap (~₹800/year)
- **DNS:** Point to Vercel nameservers

### Environment Variables (Vercel Dashboard)
Add these in Vercel → Settings → Environment Variables:
```
NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id
NEXT_PUBLIC_GA_ID=G-your_ga_id
NEXT_PUBLIC_WA_NUMBER=91XXXXXXXXXX
NEXT_PUBLIC_WA_GROUP=https://chat.whatsapp.com/your_group
ANALYTICS_PIN=your_secret_pin_code
```

---

## 📸 Instagram Integration Tips
- Post reels showing the farm, tree-to-box journey
- Use hashtags: #ShivneriHapus #JunnarMango #HapusPune #GITaggedMango #AlphonsoMango
- Tag location: Junnar, Maharashtra
- Link in bio → ghogarefarms.in

---

## 📊 Analytics Setup

### Built-in Privacy-friendly Dashboard
This project includes a built-in analytics dashboard at `/analytics`.
- **Protection:** Set the `ANALYTICS_PIN` environment variable to protect this route.
- **Features:** Tracks page views, WhatsApp clicks, locations, and UTM parameters without cookies.


### Google Analytics 4 Goals to Create:
1. WhatsApp click (Event: `click` → outbound link to wa.me)
2. Instagram follow click
3. WA Group join click

### Search Console After Launch:
1. Submit sitemap: `https://ghogarefarms.in/sitemap.xml`
2. Request indexing for homepage
3. Monitor "Impressions" for target keywords weekly

---

## 🛠️ Development

```bash
# Install
npm install

# Run locally
npm run dev
# → Open http://localhost:3000

# Build for production
npm run build
npm run start
```

---

## ✅ Pre-Launch Checklist

- [ ] Updated WhatsApp number in `lib/config.ts`
- [ ] Updated WhatsApp group link
- [ ] Updated Instagram handle
- [ ] Set real prices (₹XXX → actual prices)
- [ ] Added og-image.jpeg (farm photo, 1200×630px)
- [ ] Added favicon.ico
- [ ] Added Facebook Pixel ID
- [ ] Added Google Analytics ID
- [ ] Added Google Search Console verification code
- [ ] Deployed to Vercel
- [ ] Custom domain connected (ghogarefarms.in)
- [ ] Submitted sitemap to Google Search Console
- [ ] Tested on mobile (WhatsApp links open correctly)
- [ ] Tested on WhatsApp (OG image shows correctly when sharing link)

---

Built with ❤️ for Ghogare Farms | Shivneri Hapus | Junnar, Pune
