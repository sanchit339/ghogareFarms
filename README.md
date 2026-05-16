# 🥭 Ghogare Farms

GI Tagged Shivneri Hapus Alphonso Mangoes from Junnar delivered straight to Pune.

## 🚀 Quick Start
1. **Setup Config**: Update `lib/config.ts` with your phone number, WhatsApp group, and Instagram handle.
2. **Deploy**:
   - **UAT (Vercel)**: Connect your repo to Vercel for automatic previews.
   - **Production (DigitalOcean)**: 
     ```bash
     cd /var/www/ghogare-farms
     ./scripts/deploy-production.sh main
     ```

## ⚙️ Admin Dashboards
Both dashboards are protected by PIN: **2458** (default).

- **/settings**: Update selling prices and "fake MRP" in real-time.
- **/analytics**: Track visitors, WhatsApp leads, and marketing performance.

## 📁 Project Structure
- `app/page.tsx`: Main storefront (Server Component).
- `app/client-page.tsx`: Interactive UI & tracking logic.
- `app/settings/`: Price management interface.
- `app/analytics/`: Real-time tracking dashboard.
- `lib/prices.ts`: Persistent storage for pricing data.
- `lib/analytics.ts`: Event logging and report generation.

## 💾 Storage & Persistence
- **Production (Droplet)**: Uses the server's local SSD (`.data/` and `.analytics/` folders).
- **UAT (Vercel)**: Automatically switches to Vercel Blob for persistence.

## 🛠️ Development
```bash
npm install
npm run dev
```

---
Built for Ghogare Farms | Junnar, Pune 🥭
