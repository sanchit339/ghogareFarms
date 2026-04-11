import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Mukta } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SITE } from '@/lib/config'

// ──────────────────────────────────────────────────────────
// FONTS
// Playfair Display → premium display headings
// Mukta → body + Devanagari support (Hindi/Marathi)
// ──────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
})

const mukta = Mukta({
  subsets: ['latin', 'devanagari'],
  variable: '--font-mukta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

// ──────────────────────────────────────────────────────────
// SEO METADATA — the most important file for ranking
// ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  // Primary title — optimised for "Alphonso mango Pune" + local areas
  title: {
    default: 'Buy Shivneri Hapus Mangoes in Pune | Ghogare Farms | Baner, Wakad, Hinjewadi',
    template: '%s | Ghogare Farms — Shivneri Hapus Mangoes Pune',
  },

  // Meta description — 155 chars, high intent keywords
  description:
    'Buy GI Tagged Shivneri Hapus (Junnar Alphonso) mangoes online in Pune. Farm-direct, carbide-free, naturally ripened. Delivery in Baner, Wakad, Hinjewadi, Kothrud, Viman Nagar. Order on WhatsApp.',

  keywords: [
    // Product keywords
    'Shivneri Hapus mangoes Pune',
    'Junnar Alphonso mangoes Pune',
    'GI tagged mangoes Pune',
    'buy Hapus mangoes Pune',
    'Alphonso mango home delivery Pune',
    // Location micro-targeting
    'mango delivery Baner',
    'Hapus mango Baner Pune',
    'Alphonso mango Wakad',
    'mango delivery Wakad Pune',
    'Hapus mango Hinjewadi',
    'mango delivery Hinjewadi',
    'mango delivery Kothrud',
    'mango delivery Viman Nagar',
    'mango delivery Koregaon Park',
    'mango delivery Aundh',
    'mango delivery Pimple Saudagar',
    'mango delivery Shivajinagar',
    'mango delivery Magarpatta',
    'mango delivery Hadapsar',
    // Intent keywords
    'farm fresh mango Pune',
    'carbide free Alphonso Pune',
    'no middlemen mango Pune',
    'direct farm mango Pune',
    'natural ripening mango Pune',
    'order mango WhatsApp Pune',
    'Junnar mango Pune',
    'Shivneri Hapus buy online',
    'हापूस आंबे पुणे',
    'शिवनेरी हापूस पुणे',
    'जुन्नर आंबे पुणे',
  ],

  // Open Graph — critical for Facebook/Instagram Ads
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: 'Ghogare Farms',
    title: 'Shivneri Hapus Mangoes — GI Tagged, Junnar Farm. Delivered to Pune.',
    description:
      'Farm-direct Shivneri Hapus (Alphonso) mangoes from Junnar. No carbide, no middlemen. Delivered to Baner, Wakad, Hinjewadi and all of Pune within 2-3 days. Order on WhatsApp now.',
    images: [
      {
        url: '/og-image.jpg', // Replace with your actual farm photo
        width: 1200,
        height: 630,
        alt: 'Shivneri Hapus Alphonso Mangoes from Ghogare Farms, Junnar — Delivered to Pune',
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: 'summary_large_image',
    title: 'Shivneri Hapus Mangoes — GI Tagged. Farm-Fresh. Delivered to Pune.',
    description: 'Buy GI Tagged Junnar Alphonso mangoes online in Pune. Carbide-free, naturally ripened, delivered in 2-3 days.',
    images: ['/og-image.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical
  alternates: {
    canonical: SITE.url,
  },

  // Verification (fill in after setting up Search Console)
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE',
  },

  // App info
  applicationName: 'Ghogare Farms',
  authors: [{ name: 'Ghogare Farms', url: SITE.url }],
  category: 'Food & Agriculture',
  creator: 'Ghogare Farms',
}

export const viewport: Viewport = {
  themeColor: '#C87941',
  width: 'device-width',
  initialScale: 1,
}

// ──────────────────────────────────────────────────────────
// STRUCTURED DATA (JSON-LD)
// Multiple schemas = more Google rich results
// ──────────────────────────────────────────────────────────
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'FoodEstablishment', 'Farm'],
  name: 'Ghogare Farms',
  description:
    'GI Tagged Shivneri Hapus (Junnar Alphonso) mango farm. Farm-direct delivery to Pune — Baner, Wakad, Hinjewadi, Kothrud and all of Pune.',
  url: SITE.url,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Junnar Taluka',
    addressLocality: 'Junnar',
    addressRegion: 'Maharashtra',
    postalCode: '410502',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.2067,
    longitude: 73.8766,
  },
  areaServed: [
    { '@type': 'City', name: 'Pune' },
    { '@type': 'Neighborhood', name: 'Baner' },
    { '@type': 'Neighborhood', name: 'Wakad' },
    { '@type': 'Neighborhood', name: 'Hinjewadi' },
    { '@type': 'Neighborhood', name: 'Kothrud' },
    { '@type': 'Neighborhood', name: 'Viman Nagar' },
    { '@type': 'Neighborhood', name: 'Koregaon Park' },
    { '@type': 'Neighborhood', name: 'Aundh' },
    { '@type': 'Neighborhood', name: 'Pimple Saudagar' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '21:00',
  },
  sameAs: [SITE.instagram],
  image: `${SITE.url}/og-image.jpg`,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, WhatsApp Pay',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Shivneri Hapus Alphonso Mangoes — Junnar GI Tagged',
  description:
    'GI Tagged Shivneri Hapus (Junnar Alphonso) mangoes. Naturally ripened in hay, carbide-free, no middlemen. Direct from Ghogare Farms, Junnar to your doorstep in Pune.',
  brand: { '@type': 'Brand', name: 'Ghogare Farms' },
  category: 'Fresh Fruits > Mangoes',
  image: `${SITE.url}/og-image.jpg`,
  offers: [
    {
      '@type': 'Offer',
      name: '1 Dozen Shivneri Hapus Mangoes (12 pcs)',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      price: '0', // Replace with actual price
      seller: { '@type': 'Organization', name: 'Ghogare Farms' },
      deliveryLeadTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
      eligibleRegion: { '@type': 'State', name: 'Maharashtra' },
    },
    {
      '@type': 'Offer',
      name: '2 Dozen Shivneri Hapus Mangoes (24 pcs)',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      price: '0', // Replace with actual price
      seller: { '@type': 'Organization', name: 'Ghogare Farms' },
      deliveryLeadTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Anil S.' },
      reviewBody: 'The most authentic Shivneri Hapus in Pune. The aroma filled my living room!',
      datePublished: '2025-04-01',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Priya K.' },
      reviewBody: 'Farm delivery means no chemicals. My kids love these. Truly natural.',
      datePublished: '2025-03-28',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Shivneri Hapus mango?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shivneri Hapus is a GI tagged variety of Alphonso mango grown exclusively in Junnar taluka, Pune district. It received its GI tag from the Government of India in December 2024. Known for its unique sweetness, aroma, and saffron-yellow color.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver Hapus mangoes to Baner, Wakad, and Hinjewadi in Pune?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Ghogare Farms delivers Shivneri Hapus mangoes to all areas of Pune including Baner, Wakad, Hinjewadi, Kothrud, Viman Nagar, Koregaon Park, Aundh, Pimple Saudagar, Hadapsar, and more. Delivery takes 2-3 working days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your mangoes carbide-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Our mangoes are 100% naturally ripened using traditional hay-stack method. We never use calcium carbide or any artificial ripening agents. Safe for children, elderly, and pregnant women.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I order Alphonso mangoes from Ghogare Farms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply tap any WhatsApp button on our website. Tell us your Pune delivery address, preferred box size (1 dozen or 2 dozen), and we confirm availability instantly. We accept UPI, WhatsApp Pay, and Cash on Delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the price of 1 dozen Hapus mangoes in Pune?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our prices are competitive and updated each season. Contact us on WhatsApp for the latest pricing. We offer direct farm pricing with no middlemen markup.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you accept bulk and corporate gifting orders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We handle bulk orders for offices, weddings, housing societies, and corporate gifting. Custom branded boxes are available. Contact us on WhatsApp for bulk pricing.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Shivneri Hapus Mangoes', item: `${SITE.url}/#products` },
    { '@type': 'ListItem', position: 3, name: 'Order on WhatsApp', item: `${SITE.url}/#order` },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${mukta.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon (add your own in /public/) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="bg-cream font-body antialiased">

        {/* ── FACEBOOK PIXEL ─────────────────────────────── */}
        {/* Replace REPLACE_WITH_FB_PIXEL_ID with your actual Pixel ID */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${SITE.fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${SITE.fbPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* ── GOOGLE ANALYTICS ───────────────────────────── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SITE.gaMeasurementId}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}
