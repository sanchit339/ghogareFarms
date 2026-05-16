'use client'

import { useState, useEffect } from 'react'
import type { PriceConfig } from '@/lib/prices'

const FRONTEND_PASSWORD = '2458'

export default function SettingsPage() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [prices, setPrices] = useState<PriceConfig | null>(null)

  const unlockAndLoad = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (password !== FRONTEND_PASSWORD) {
      setError('Invalid PIN')
      return
    }

    setError('')
    setUnlocked(true)
    setLoading(true)

    try {
      const res = await fetch('/api/settings/prices', { cache: 'no-store' })
      const data = await res.json()

      if (!res.ok || !data?.ok) {
        setError('Failed to load prices')
        return
      }

      setPrices(data.prices)
    } catch {
      setError('Failed to load prices')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prices) return

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/settings/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prices, pin: password })
      })
      const data = await res.json()

      if (!res.ok || !data?.ok) {
        setError(data.error || 'Failed to update prices')
        return
      }

      setMessage('Prices updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setError('Failed to update prices')
    } finally {
      setSaving(false)
    }
  }

  const updatePrice = (path: 'dozen1.large' | 'dozen1.medium' | 'dozen2.large' | 'dozen2.medium', field: 'price' | 'oldPrice', value: string) => {
    if (!prices) return
    const newPrices = { ...prices }
    const [box, size] = path.split('.') as ['dozen1' | 'dozen2', 'large' | 'medium']
    newPrices[box][size][field] = value
    setPrices(newPrices)
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Farm Settings</h1>
          <p className="text-gray-500 mt-1">Manage live prices for the digital storefront.</p>
        </header>

        {!unlocked && (
          <section className="bg-white max-w-sm rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Secure Dashboard</h2>
            <form onSubmit={unlockAndLoad}>
              <label htmlFor="settings-password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter 4-digit PIN
              </label>
              <input
                id="settings-password"
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
                {loading ? 'Verifying...' : 'Access Settings'}
              </button>
              {error && <p className="text-red-500 text-sm mt-3 font-medium bg-red-50 py-2 px-3 rounded-md">{error}</p>}
            </form>
          </section>
        )}

        {unlocked && (
          <section className="animate-in fade-in duration-500">
            {loading ? (
               <p className="text-gray-500 font-medium">Loading pricing data...</p>
            ) : prices ? (
              <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Manage Pricing</h2>
                  <div className="flex items-center gap-4">
                    {message && <span className="text-green-600 text-sm font-medium animate-pulse">{message}</span>}
                    {error && <span className="text-red-600 text-sm font-medium">{error}</span>}
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 1 Dozen Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 bg-gray-50 p-3 rounded-lg border">1 Dozen Box Pricing</h3>
                    <div className="grid md:grid-cols-2 gap-6 pl-2">
                       <PriceEditorBox 
                          title="Large Size (3.3kg - 3.6kg)" 
                          config={prices.dozen1.large}
                          onChange={(field, val) => updatePrice('dozen1.large', field, val)}
                       />
                       <PriceEditorBox 
                          title="Medium Size (2.7kg - 3.0kg)" 
                          config={prices.dozen1.medium}
                          onChange={(field, val) => updatePrice('dozen1.medium', field, val)}
                       />
                    </div>
                  </div>

                  {/* 2 Dozen Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 bg-gray-50 p-3 rounded-lg border">2 Dozen Box Pricing</h3>
                    <div className="grid md:grid-cols-2 gap-6 pl-2">
                       <PriceEditorBox 
                          title="Large Size (6.6kg - 7.2kg)" 
                          config={prices.dozen2.large}
                          onChange={(field, val) => updatePrice('dozen2.large', field, val)}
                       />
                       <PriceEditorBox 
                          title="Medium Size (5.4kg - 6.0kg)" 
                          config={prices.dozen2.medium}
                          onChange={(field, val) => updatePrice('dozen2.medium', field, val)}
                       />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
               <p className="text-red-500 font-medium">Failed to load price configuration. Check server.</p>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

function PriceEditorBox({ title, config, onChange }: { title: string, config: { price: string, oldPrice: string }, onChange: (field: 'price' | 'oldPrice', val: string) => void }) {
  return (
    <div className="border border-gray-100 rounded-xl p-5 shadow-sm">
      <h4 className="font-semibold text-gray-700 mb-4">{title}</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-bold tracking-wider text-gray-500 mb-1.5 flex justify-between">
            <span>Selling Price (₹)</span>
            <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded">Current</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
            <input 
              type="text" 
              value={config.price} 
              onChange={e => onChange('price', e.target.value)}
              className="pl-7 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase font-bold tracking-wider text-gray-500 mb-1.5 flex justify-between">
            <span>Strikethrough Price (₹)</span>
            <span className="text-[10px] text-red-500 bg-red-50 px-2 py-0.5 rounded">Fake MRP</span>
          </label>
          <div className="relative opacity-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 line-through">₹</span>
            <input 
              type="text" 
              value={config.oldPrice} 
              onChange={e => onChange('oldPrice', e.target.value)}
              className="pl-7 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-500 text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
