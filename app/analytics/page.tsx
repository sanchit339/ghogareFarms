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
    return Object.entries(report.byCity).sort((a, b) => b[1] - a[1]).slice(0, 10)
  }, [report])

  const sortedByDevice = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byDeviceType).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByUtmSource = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byUtmSource).sort((a, b) => b[1] - a[1])
  }, [report])

  const sortedByUtmCampaign = useMemo(() => {
    if (!report) return []
    return Object.entries(report.byUtmCampaign).sort((a, b) => b[1] - a[1])
  }, [report])

  const conversionRate = useMemo(() => {
    if (!report || report.totals.pageViews === 0) return 0
    return ((report.totals.waClicks / report.totals.pageViews) * 100).toFixed(1)
  }, [report])

  const maxDayViews = useMemo(() => {
    if (sortedByDay.length === 0) return 1
    return Math.max(...sortedByDay.map(d => d[1]))
  }, [sortedByDay])

  const unlockAndLoad = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
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
    <main className="min-h-screen bg-gray-50/50 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Farm Analytics</h1>
          <p className="text-gray-500 mt-1">Real-time insights and business performance metrics.</p>
        </header>

        {!unlocked && (
          <section className="bg-white max-w-sm rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Secure Dashboard</h2>
            <form onSubmit={unlockAndLoad}>
              <label htmlFor="analytics-password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter 4-digit PIN
              </label>
              <input
                id="analytics-password"
                type="password"
                inputMode="numeric"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                autoFocus
              />
              <button
                type="submit"
                className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex justify-center items-center"
              >
                {loading ? 'Verifying...' : 'Access Dashboard'}
              </button>
              {error && <p className="text-red-500 text-sm mt-3 font-medium bg-red-50 py-2 px-3 rounded-md">{error}</p>}
            </form>
          </section>
        )}

        {unlocked && (
          <section className="space-y-8 animate-in fade-in duration-500">
            {loading && <p className="text-gray-500 font-medium">Refreshing analytics data...</p>}
            {error && <p className="text-red-500 font-medium">{error}</p>}

            {report && (
              <>
                {/* Key Business Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard title="Page Views" value={report.totals.pageViews} icon="👀" trend="Total traffic" />
                  <StatCard title="Leads (WhatsApp)" value={report.totals.waClicks} icon="💬" trend="Interested buyers" highlight />
                  <StatCard title="Conversion Rate" value={`${conversionRate}%`} icon="📈" trend="Views to Leads" />
                  <StatCard title="Total Interactions" value={report.totals.events} icon="⚡" trend="All site actions" />
                </div>

                {/* Daily Trend Chart (CSS-based) */}
                <Card title="Traffic Trend (Last 30 Days)">
                  {sortedByDay.length > 0 ? (
                    <div className="h-48 flex items-end gap-2 pt-4 px-2">
                      {sortedByDay.map(([day, count]) => {
                        const heightPct = Math.max((count / maxDayViews) * 100, 4)
                        return (
                          <div key={day} className="flex-1 flex flex-col items-center group relative">
                            <div 
                              className="w-full bg-green-100 group-hover:bg-green-600 rounded-t-sm transition-all duration-300 relative"
                              style={{ height: `${heightPct}%` }}
                            >
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                {count} views
                              </div>
                            </div>
                            <span className="text-[10px] text-gray-400 mt-2 truncate w-full text-center hidden md:block">
                              {day.slice(5)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm py-8 text-center bg-gray-50 rounded-lg">Not enough traffic data yet.</p>
                  )}
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Traffic Sources */}
                  <Card title="Marketing Channels (UTM)">
                    {sortedByUtmSource.length > 0 ? (
                      <div className="space-y-4">
                        {sortedByUtmSource.map(([source, count]) => (
                          <ProgressBar key={source} label={source} count={count} total={report.totals.pageViews} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No structured campaign data tracked yet.</p>
                    )}
                  </Card>

                  {/* Customer Geography */}
                  <Card title="Top Cities">
                    {sortedByCity.length > 0 ? (
                      <div className="space-y-4">
                        {sortedByCity.map(([city, count]) => (
                          <ProgressBar key={city} label={city} count={count} total={report.totals.pageViews} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No location data captured yet.</p>
                    )}
                  </Card>

                  {/* Device breakdown */}
                  <Card title="Device Types">
                    {sortedByDevice.length > 0 ? (
                      <div className="space-y-4">
                        {sortedByDevice.map(([device, count]) => (
                          <ProgressBar key={device} label={device} count={count} total={report.totals.pageViews || 1} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No device data captured yet.</p>
                    )}
                  </Card>

                  {/* Button interactions */}
                  <Card title="Button Interactions">
                    {sortedByLabel.length > 0 ? (
                      <div className="space-y-4">
                        {sortedByLabel.map(([label, count]) => (
                          <ProgressBar key={label} label={label} count={count} total={report.totals.events} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No button click data captured yet.</p>
                    )}
                  </Card>
                </div>

                <div className="mt-8 text-center text-sm text-gray-400 pb-8">
                  Data reflects the current internal database state.
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>
      {children}
    </div>
  )
}

function StatCard({ title, value, icon, trend, highlight }: { title: string; value: string | number; icon: string; trend?: string; highlight?: boolean }) {
  return (
    <div className={`border rounded-2xl p-5 ${highlight ? 'bg-green-50 border-green-200 text-green-900' : 'bg-white border-gray-200 text-gray-900'} shadow-sm flex flex-col`}>
      <div className="flex justify-between items-start mb-4">
        <p className={`text-sm font-medium ${highlight ? 'text-green-800' : 'text-gray-500'}`}>{title}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
      {trend && <p className={`mt-2 text-xs font-medium ${highlight ? 'text-green-700' : 'text-gray-400'}`}>{trend}</p>}
    </div>
  )
}

function ProgressBar({ label, count, total }: { label: string; count: number; total: number }) {
  const percentage = Math.round((count / total) * 100) || 0
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-gray-700 capitalize">{label.replace(/_/g, ' ')}</span>
        <span className="text-gray-500">{count} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
