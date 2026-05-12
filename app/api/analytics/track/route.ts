import { NextRequest, NextResponse } from 'next/server'
import { appendEvent, type AnalyticsEvent, type AnalyticsEventName } from '@/lib/analytics'

export const runtime = 'nodejs'

const allowedEvents = new Set<AnalyticsEventName>([
  'page_view',
  'wa_click',
  'subscribe_click',
  'social_click',
])

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const event = body?.event as AnalyticsEventName

    if (!allowedEvents.has(event)) {
      return NextResponse.json({ ok: false, error: 'invalid_event' }, { status: 400 })
    }

    const payload = (body?.payload ?? {}) as Partial<AnalyticsEvent>
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    await appendEvent({
      ts: new Date().toISOString(),
      event,
      path: payload.path,
      lang: payload.lang,
      label: payload.label,
      type: payload.type,
      referrer: payload.referrer,
      ua: req.headers.get('user-agent') ?? undefined,
      ip,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'failed' }, { status: 500 })
  }
}
