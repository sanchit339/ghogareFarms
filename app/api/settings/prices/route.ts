import { NextResponse } from 'next/server'
import { getPrices, savePrices } from '@/lib/prices'

const FRONTEND_PASSWORD = '2458' // We reuse the pin from analytics 

export async function GET() {
  const prices = await getPrices()
  return NextResponse.json({ ok: true, prices })
}

export async function POST(req: Request) {
  try {
    const { prices, pin } = await req.json()
    if (pin !== FRONTEND_PASSWORD) {
       return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }
    
    await savePrices(prices)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Failed to update prices' }, { status: 500 })
  }
}
