import { put, list } from '@vercel/blob'
import { promises as fs } from 'fs'
import path from 'path'

// Clever trick: We use Vercel Blob for production persistence 
// but fall back to local filesystem for development/local runs.
const isVercel = !!process.env.VERCEL
const PRICES_BLOB_PATH = 'data/prices.json'

export type PriceConfig = {
  dozen1: {
    large: { price: string; oldPrice: string };
    medium: { price: string; oldPrice: string };
  };
  dozen2: {
    large: { price: string; oldPrice: string };
    medium: { price: string; oldPrice: string };
  };
}

const defaultPrices: PriceConfig = {
  dozen1: {
    large: { price: '1,700', oldPrice: '2,200' },
    medium: { price: '1,500', oldPrice: '2,000' },
  },
  dozen2: {
    large: { price: '3,400', oldPrice: '4,400' },
    medium: { price: '3,000', oldPrice: '4,000' },
  }
}

export async function getPrices(): Promise<PriceConfig> {
  if (isVercel) {
    try {
      const { blobs } = await list({ prefix: PRICES_BLOB_PATH })
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url)
        return await res.json()
      }
    } catch (e) {
      console.error('Blob read error:', e)
    }
  } else {
    try {
      const dataDir = path.join(process.cwd(), '.data')
      const pricesFile = path.join(dataDir, 'prices.json')
      const raw = await fs.readFile(pricesFile, 'utf8')
      return JSON.parse(raw) as PriceConfig
    } catch {}
  }
  return defaultPrices
}

export async function savePrices(prices: PriceConfig) {
  if (isVercel) {
    await put(PRICES_BLOB_PATH, JSON.stringify(prices, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    })
  } else {
    const dataDir = path.join(process.cwd(), '.data')
    const pricesFile = path.join(dataDir, 'prices.json')
    await fs.mkdir(dataDir, { recursive: true })
    await fs.writeFile(pricesFile, JSON.stringify(prices, null, 2), 'utf8')
  }
}

