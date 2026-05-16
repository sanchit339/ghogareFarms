import { promises as fs } from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), '.data')
const pricesFile = path.join(dataDir, 'prices.json')

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
  try {
    const raw = await fs.readFile(pricesFile, 'utf8')
    return JSON.parse(raw) as PriceConfig
  } catch {
    return defaultPrices
  }
}

export async function savePrices(prices: PriceConfig) {
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(pricesFile, JSON.stringify(prices, null, 2), 'utf8')
}
