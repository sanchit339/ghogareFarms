'use client'

import { useMemo, useState } from 'react'
import type { AnalyticsReport } from '@/lib/analytics'

const FRONTEND_PASSWORD = '2458'

export default function AnalyticsPage() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [report, setReport] = useState<AnalyticsReport | null>(null)

  const sortedByDay = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byDay).sort((a, b) => a[0].localeCompare(b[0]))
  }, [report])

  const sortedByLabel = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byLabel).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByEvent = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byEvent).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByCity = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byCity).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByRegion = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byRegion).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByCountry = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byCountry).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByDevice = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byDeviceType).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByTimezone = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byTimezone).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByUtmSource = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byUtmSource).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByUtmCampaign = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byUtmCampaign).sort((a, b) => b[1] - a[1])
  }, [report])

  const unlockAndLoad = async () => {
    if (password !== FRONTEND_PASSWORD) {
      setError('Invalid password')
      return
    }

    setError('')
    setUnlocked(true)
    setLoading(true)

    try {
      const res = await fetch('/api/analytics', { cache: 'no-store' })
      const data = await res.json()

      if (!res.ok || !data?.ok) {
        setError('Failed to load analytics')
        return
      }

      setReport(data.report)
    } catch {
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 960, margin: '28px auto', padding: 20, fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 30, marginBottom: 8 }}>Analytics</h1>
      <p style={{ color: '#555', marginBottom: 18 }}>Simple frontend-protected analytics dashboard.</p>

      {!unlocked && (
        <section style={{ border: '1px solid #ddd', borderRadius: 10, padding: 16, maxWidth: 420 }}>
          <label htmlFor="analytics-password" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
            Enter 4-digit password
          </label>
          <input
            id="analytics-password"
            type="password"
            inputMode="numeric"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="****"
            style={{ width: '100%', padding: 10, border: '1px solid #bbb', borderRadius: 8 }}
          />
          <button
            type="button"
            onClick={unlockAndLoad}
            style={{ marginTop: 12, padding: '10px 14px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >
            Unlock
          </button>
          {error && <p style={{ color: '#b91c1c', marginTop: 10 }}>{error}</p>}
        </section>
      )}

      {unlocked && (
        <section style={{ display: 'grid', gap: 16 }}>
          {loading && <p>Loading analytics...</p>}
          {error && <p style={{ color: '#b91c1c' }}>{error}</p>}

          {report && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
                <Stat title="Total Events" value={report.totals.events} />
                <Stat title="Page Views" value={report.totals.pageViews} />
                <Stat title="WhatsApp Clicks" value={report.totals.waClicks} />
                <Stat title="Subscribe Clicks" value={report.totals.subscribeClicks} />
                <Stat title="Social Clicks" value={report.totals.socialClicks} />
              </div>

              <Card title="By Event">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByEvent), null, 2)}</pre>
              </Card>

              <Card title="By Day">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByDay), null, 2)}</pre>
              </Card>

              <Card title="By Label">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByLabel), null, 2)}</pre>
              </Card>

              <Card title="By City">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByCity), null, 2)}</pre>
              </Card>

              <Card title="By Region">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByRegion), null, 2)}</pre>
              </Card>

              <Card title="By Country">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByCountry), null, 2)}</pre>
              </Card>

              <Card title="By Device Type">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByDevice), null, 2)}</pre>
              </Card>

              <Card title="By Timezone">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByTimezone), null, 2)}</pre>
              </Card>

              <Card title="By UTM Source">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByUtmSource), null, 2)}</pre>
              </Card>

              <Card title="By UTM Campaign">
                <pre style={{ margin: 0 }}>{JSON.stringify(Object.fromEntries(sortedByUtmCampaign), null, 2)}</pre>
              </Card>

              <Card title="Recent Events (latest first)">
                <pre style={{ margin: 0, maxHeight: 420, overflow: 'auto' }}>{JSON.stringify(report.recent, null, 2)}</pre>
              </Card>
            </>
          )}
        </section>
      )}
    </main>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 10, padding: 14 }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </div>
  )
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 10, padding: 12, background: '#fafafa' }}>
      <p style={{ margin: 0, fontSize: 12, color: '#666' }}>{title}</p>
      <p style={{ margin: '8px 0 0', fontSize: 24, fontWeight: 700 }}>{value}</p>
    </div>
  )
}
