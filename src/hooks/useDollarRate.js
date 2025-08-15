import { useEffect, useState } from 'react'

// Fetch official USD rate for ARS from Bluelytics
// Docs: https://api.bluelytics.com.ar/v2/latest
// Cache in localStorage for 30 minutes. No default fallback; returns null if unavailable.
export function useDollarRate() {
  const [rate, setRate] = useState(() => {
    try {
      const cached = localStorage.getItem('usd_ars_rate_cache')
      if (cached) {
        const { value, ts } = JSON.parse(cached)
        const ageMin = (Date.now() - ts) / 60000
        if (ageMin < 30 && typeof value === 'number' && value > 0) return value
      }
    } catch {}
    return null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchRate() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://api.bluelytics.com.ar/v2/latest', { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        const oficial = json?.oficial
        const sell = Number(oficial?.value_sell)
        const avg = Number(oficial?.value_avg)
        const next = Number.isFinite(sell) && sell > 0 ? sell : (Number.isFinite(avg) && avg > 0 ? avg : null)
        if (!mounted) return
        setRate(next)
        if (next) {
          try {
            localStorage.setItem('usd_ars_rate_cache', JSON.stringify({ value: next, ts: Date.now() }))
          } catch {}
        }
      } catch (e) {
        if (!mounted) return
        setError(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchRate()
    return () => { mounted = false }
  }, [])

  return { rate, loading, error }
}
