import { NextResponse } from 'next/server'
import { getAnalyticsReport } from '@/lib/analytics'

export const runtime = 'nodejs'

export async function GET() {
  const report = await getAnalyticsReport(200)
  return NextResponse.json({ ok: true, report })
}
