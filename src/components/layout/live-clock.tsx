'use client'

import { useSyncExternalStore } from 'react'

const formatters = new Map<string, Intl.DateTimeFormat>()

export function formatClock(date: Date, timeZone: string): string {
  let formatter = formatters.get(timeZone)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone })
    formatters.set(timeZone, formatter)
  }
  return formatter.format(date)
}

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 15_000)
  return () => clearInterval(id)
}

// Local time for remote recruiters. Renders a placeholder on the server so the prerendered HTML never shows a stale time.
export function LiveClock({ timeZone, className }: { timeZone: string; className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatClock(new Date(), timeZone),
    () => null,
  )
  return <span className={className}>{time ?? '--:--'}</span>
}
