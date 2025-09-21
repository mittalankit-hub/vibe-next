import { useEffect, useState } from "react"

const ShimmerMessages = ({ waiting }: { waiting: boolean }) => {
  // Stages for the first ~15s, then we switch to long-wait copy
  const shortMessages = [
    "Thinking...",
    "Analyzing your request...",
    "Generating...",
    "Crafting components...",
    "Optimizing layout...",
    "Adding final touches...",
  ]

  const [idx, setIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0) // seconds
  const [isLongWait, setIsLongWait] = useState(false)

  // Rotate message every 2s
  useEffect(() => {
    if (!waiting) return
    const rot = setInterval(() => setIdx(i => (i + 1) % shortMessages.length), 2000)
    return () => clearInterval(rot)
  }, [waiting, shortMessages.length])

  // Track elapsed time, escalate copy after thresholds
  useEffect(() => {
    if (!waiting) return
    const t = setInterval(() => setElapsed(s => s + 1), 1000)
    const longWaitTimer = setTimeout(() => setIsLongWait(true), 15000) // after 15s
    return () => {
      clearInterval(t)
      clearTimeout(longWaitTimer)
    }
  }, [waiting])

  // Format mm:ss
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0")
  const ss = String(elapsed % 60).padStart(2, "0")

  const longWaitMessage =
    elapsed > 45
      ? "Still working… Thanks for your patience."
      : "This is taking longer than usual…"

  return (
    <div className="flex items-center gap-2" aria-live="polite" aria-atomic>
      <span className="text-xs text-muted-foreground tabular-nums">{mm}:{ss}</span>
      <span className="text-base text-muted-foreground animate-pulse">
        {isLongWait ? longWaitMessage : shortMessages[idx]}
      </span>
    </div>
  )
}

export const MessageLoading = ({ waiting = true }: { waiting?: boolean }) => {
  return (
    <div className="flex flex-col px-2 pb-4">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <img src="/logo.svg" alt="Vibe" width={18} height={18} className="shrink-0" />
        <span className="text-sm font-medium">Vibe</span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages waiting={waiting} />
      </div>
    </div>
  )
}
