import { promises as fs } from 'fs'
import path from 'path'

export type AnalyticsEventName =
  | 'page_view'
  | 'wa_click'
  | 'subscribe_click'
  | 'social_click'

export type AnalyticsEvent = {
  ts: string
  event: AnalyticsEventName
  path?: string
  lang?: string
  label?: string
  type?: string
  referrer?: string
  ua?: string
  ip?: string
  country?: string
  region?: string
  city?: string
  timezone?: string
  deviceType?: string
  browserLang?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

export type AnalyticsReport = {
  totals: {
    events: number
    pageViews: number
    waClicks: number
    subscribeClicks: number
    socialClicks: number
  }
  byDay: Record<string, number>
  byEvent: Record<string, number>
  byPath: Record<string, number>
  byLang: Record<string, number>
  byLabel: Record<string, number>
  byCountry: Record<string, number>
  byRegion: Record<string, number>
  byCity: Record<string, number>
  byTimezone: Record<string, number>
  byDeviceType: Record<string, number>
  byUtmSource: Record<string, number>
  byUtmCampaign: Record<string, number>
  recent: AnalyticsEvent[]
}

const analyticsDir = path.join(process.cwd(), '.analytics')
const eventsFile = path.join(analyticsDir, 'events.jsonl')

async function ensureStore() {
  await fs.mkdir(analyticsDir, { recursive: true })
}

export async function appendEvent(event: AnalyticsEvent) {
  await ensureStore()
  await fs.appendFile(eventsFile, `${JSON.stringify(event)}\n`, 'utf8')
}

async function readEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await fs.readFile(eventsFile, 'utf8')
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as AnalyticsEvent
        } catch {
          return null
        }
      })
      .filter((item): item is AnalyticsEvent => item !== null)
  } catch {
    return []
  }
}

export async function getAnalyticsReport(limitRecent = 50): Promise<AnalyticsReport> {
  const events = await readEvents()

  const report: AnalyticsReport = {
    totals: {
      events: events.length,
      pageViews: 0,
      waClicks: 0,
      subscribeClicks: 0,
      socialClicks: 0,
    },
    byDay: {},
    byEvent: {},
    byPath: {},
    byLang: {},
    byLabel: {},
    byCountry: {},
    byRegion: {},
    byCity: {},
    byTimezone: {},
    byDeviceType: {},
    byUtmSource: {},
    byUtmCampaign: {},
    recent: events.slice(-limitRecent).reverse(),
  }

  for (const evt of events) {
    const day = evt.ts.slice(0, 10)

    report.byDay[day] = (report.byDay[day] ?? 0) + 1
    report.byEvent[evt.event] = (report.byEvent[evt.event] ?? 0) + 1

    if (evt.path) report.byPath[evt.path] = (report.byPath[evt.path] ?? 0) + 1
    if (evt.lang) report.byLang[evt.lang] = (report.byLang[evt.lang] ?? 0) + 1
    if (evt.label) report.byLabel[evt.label] = (report.byLabel[evt.label] ?? 0) + 1
    if (evt.country) report.byCountry[evt.country] = (report.byCountry[evt.country] ?? 0) + 1
    if (evt.region) report.byRegion[evt.region] = (report.byRegion[evt.region] ?? 0) + 1
    if (evt.city) report.byCity[evt.city] = (report.byCity[evt.city] ?? 0) + 1
    if (evt.timezone) report.byTimezone[evt.timezone] = (report.byTimezone[evt.timezone] ?? 0) + 1
    if (evt.deviceType) report.byDeviceType[evt.deviceType] = (report.byDeviceType[evt.deviceType] ?? 0) + 1
    if (evt.utmSource) report.byUtmSource[evt.utmSource] = (report.byUtmSource[evt.utmSource] ?? 0) + 1
    if (evt.utmCampaign) report.byUtmCampaign[evt.utmCampaign] = (report.byUtmCampaign[evt.utmCampaign] ?? 0) + 1

    if (evt.event === 'page_view') report.totals.pageViews += 1
    if (evt.event === 'wa_click') report.totals.waClicks += 1
    if (evt.event === 'subscribe_click') report.totals.subscribeClicks += 1
    if (evt.event === 'social_click') report.totals.socialClicks += 1
  }

  return report
}

export function getAnalyticsPin() {
  return process.env.ANALYTICS_PIN ?? ''
}
