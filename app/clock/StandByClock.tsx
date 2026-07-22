'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────

type DigitChar = string
type ThemeName = 'classic' | 'orbit' | 'horizon' | 'focus'

interface Theme {
  accent: string
  secondary: string
  glow: string
  bgGradient: string
}

const THEMES: Record<ThemeName, Theme> = {
  classic: {
    accent: '#ffffff',
    secondary: 'rgba(255,255,255,0.72)',
    glow: 'rgba(255,255,255,0.04)',
    bgGradient:
      'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30,30,38,0.55) 0%, rgba(6,6,10,0.7) 50%, #000000 100%)',
  },
  orbit: {
    accent: 'rgba(135,230,255,1)',
    secondary: 'rgba(184,200,255,1)',
    glow: 'rgba(135,230,255,0.06)',
    bgGradient:
      'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(8,56,70,0.5) 0%, rgba(6,14,44,0.6) 50%, #000000 100%)',
  },
  horizon: {
    accent: 'rgba(255,184,92,1)',
    secondary: 'rgba(255,112,144,1)',
    glow: 'rgba(255,184,92,0.05)',
    bgGradient:
      'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,18,28,0.5) 0%, rgba(28,10,14,0.6) 50%, #000000 100%)',
  },
  focus: {
    accent: 'rgba(168,255,174,1)',
    secondary: 'rgba(178,224,255,1)',
    glow: 'rgba(168,255,174,0.05)',
    bgGradient:
      'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(8,42,34,0.5) 0%, rgba(6,16,26,0.6) 50%, #000000 100%)',
  },
}

const THEME_ORDER: ThemeName[] = ['classic', 'orbit', 'horizon', 'focus']

// ─── Helpers ──────────────────────────────────────────────

function getTimeDigits(date: Date, is24h: boolean): DigitChar[] {
  let hours = date.getHours()
  if (!is24h) {
    hours = hours % 12
    if (hours === 0) hours = 12
  }
  const h = hours.toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  return [h[0], h[1], ':', m[0], m[1]]
}

function formatDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
}

// ─── Wake Lock ────────────────────────────────────────────

async function requestWakeLock(): Promise<WakeLockSentinel | null> {
  try {
    return await navigator.wakeLock?.request('screen')
  } catch {
    return null
  }
}

// ─── Fullscreen ───────────────────────────────────────────

function toggleFullscreen() {
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => void
  }
  const doc = document as Document & {
    webkitFullscreenElement?: Element
    webkitExitFullscreen?: () => void
  }
  if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
    if (el.requestFullscreen) el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  } else {
    if (document.exitFullscreen) document.exitFullscreen()
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen()
  }
}

// ─── Digit Component ──────────────────────────────────────
// Based on JayeshRocks/ClockDock's double-rAF FLIP technique.

function Digit({
  char,
  accent,
  secondary,
}: {
  char: DigitChar
  accent: string
  secondary: string
}) {
  const [displayChar, setDisplayChar] = useState(char)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevChar = useRef(char)

  useEffect(() => {
    if (char !== prevChar.current) {
      // FLIP: set enter state (opacity 0 + translateY up)
      setIsAnimating(true)
      // Double rAF ensures the browser applies the initial state
      // before we remove the class to trigger the transition.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisplayChar(char)
          setIsAnimating(false)
        })
      })
      prevChar.current = char
    }
  }, [char])

  if (char === ':') {
    return (
      <span
        className="colon"
        style={{ color: secondary }}
      >
        :
      </span>
    )
  }

  return (
    <span
      className={`digit ${isAnimating ? 'digit-enter' : ''}`}
      style={{ color: accent }}
    >
      {displayChar}
    </span>
  )
}

// ─── Main Component ───────────────────────────────────────

export default function StandByClock() {
  const [now, setNow] = useState<Date | null>(null)
  const [is24h, setIs24h] = useState(true)
  const [themeIndex, setThemeIndex] = useState(0)
  const [ambient, setAmbient] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const theme = THEMES[THEME_ORDER[themeIndex]]

  // Clock tick — initializes time on first run, then updates every 250ms.
  // Only re-renders when the minute actually changes.
  const lastMinute = useRef(-1)
  useEffect(() => {
    // Set initial time immediately (hydration-safe: server renders null)
    const initialDate = new Date()
    lastMinute.current = initialDate.getHours() * 60 + initialDate.getMinutes()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(initialDate)

    const interval = setInterval(() => {
      const d = new Date()
      const currentMinute = d.getHours() * 60 + d.getMinutes()
      if (currentMinute !== lastMinute.current) {
        lastMinute.current = currentMinute
        setNow(d)
      }
    }, 250)
    return () => clearInterval(interval)
  }, [])

  // Colon blink — independent 1s toggle
  const [colonVisible, setColonVisible] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setColonVisible((v) => !v)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fullscreen state tracking
  useEffect(() => {
    const handler = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Wake Lock — request on user interaction, re-acquire on visibility change
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)
  const handleAmbientEntry = useCallback(async () => {
    setAmbient(true)
    wakeLockRef.current = await requestWakeLock()
    if (!isFullscreen) toggleFullscreen()
  }, [isFullscreen])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && ambient) {
        requestWakeLock().then((wl) => {
          wakeLockRef.current = wl
        })
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [ambient])

  // Cleanup wake lock on unmount
  useEffect(() => {
    return () => {
      wakeLockRef.current?.release()
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 't':
        case 'T':
          setThemeIndex((i) => (i + 1) % THEME_ORDER.length)
          break
        case 'h':
        case 'H':
          setIs24h((v) => !v)
          break
        case 's':
        case 'S':
          setShowSettings((v) => !v)
          break
        case 'Escape':
          if (showSettings) setShowSettings(false)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showSettings])

  // ─── Render ───────────────────────────────────────────

  const digits = now ? getTimeDigits(now, is24h) : (['0', '0', ':', '0', '0'] as DigitChar[])
  const dateStr = now ? formatDate(now) : ''

  if (ambient) {
    return (
      <>
        <div className="standby-root" style={{ background: theme.bgGradient }}>
          {/* Edge vignette — mimics iOS notch concealment */}
          <div className="standby-vignette-h" />
          <div className="standby-vignette-v" />

          {/* Drift wrapper — burn-in protection */}
          <div className="standby-drift">
            <div
              className="standby-time"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", "SF Pro Display", "Helvetica Neue", system-ui, sans-serif',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {digits.map((d, i) => (
                <Digit
                  key={i}
                  char={d}
                  accent={theme.accent}
                  secondary={theme.secondary}
                />
              ))}
            </div>
            <p
              className="standby-date"
              style={{ color: theme.secondary, opacity: 0.6 }}
            >
              {dateStr}
            </p>
          </div>

          {/* Colon visibility override */}
          <style>{`.colon { opacity: ${colonVisible ? 0.85 : 0.15} !important; }`}</style>

          {/* Tap to exit ambient */}
          <button
            className="standby-exit"
            onClick={() => {
              setAmbient(false)
              wakeLockRef.current?.release()
              if (document.fullscreenElement) document.exitFullscreen()
            }}
            aria-label="Exit ambient mode"
          />

          {/* Settings panel */}
          {showSettings && (
            <div className="standby-settings-overlay" onClick={() => setShowSettings(false)}>
              <div
                className="standby-settings-panel"
                onClick={(e) => e.stopPropagation()}
                style={{ backdropFilter: 'blur(20px) saturate(120%)' }}
              >
                <div className="standby-settings-grip" />
                <div className="standby-settings-row">
                  <span>Time Format</span>
                  <button
                    className="standby-toggle"
                    onClick={() => setIs24h((v) => !v)}
                    aria-label="Toggle 12/24 hour"
                  >
                    {is24h ? '24h' : '12h'}
                  </button>
                </div>
                <div className="standby-settings-row">
                  <span>Clock Style</span>
                  <div className="standby-theme-dots">
                    {THEME_ORDER.map((name, i) => (
                      <button
                        key={name}
                        className={`standby-theme-dot ${i === themeIndex ? 'active' : ''}`}
                        style={{
                          background: THEMES[name].accent,
                          boxShadow: i === themeIndex ? `0 0 8px ${THEMES[name].accent}` : 'none',
                        }}
                        onClick={() => setThemeIndex(i)}
                        aria-label={`Theme ${name}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="standby-settings-hint">
                  F Fullscreen · T Style · H 12/24h · S Settings
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ambient styles */}
        <style>{`
          .standby-root {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 9999;
            cursor: none;
          }
          .standby-vignette-h {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(to right,
              rgba(0,0,0,0.98) 0%,
              rgba(0,0,0,0.4) 7%,
              rgba(0,0,0,0.06) 18%,
              transparent 33%,
              transparent 67%,
              rgba(0,0,0,0.06) 82%,
              rgba(0,0,0,0.4) 93%,
              rgba(0,0,0,0.98) 100%);
            z-index: 1;
          }
          .standby-vignette-v {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(to bottom,
              rgba(0,0,0,0.5) 0%,
              transparent 12%,
              transparent 88%,
              rgba(0,0,0,0.5) 100%);
            z-index: 1;
          }
          .standby-drift {
            position: relative;
            z-index: 2;
            text-align: center;
            animation: burnin-drift 240s ease-in-out infinite;
          }
          @keyframes burnin-drift {
            0%, 100% { transform: translate(0, 0); }
            25%      { transform: translate(6px, 3px); }
            50%      { transform: translate(-4px, -4px); }
            75%      { transform: translate(3px, -3px); }
          }
          .standby-time {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: clamp(5rem, 18vw, 16rem);
            font-weight: 700;
            letter-spacing: -0.04em;
            line-height: 1;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            filter: drop-shadow(0 0 60px ${theme.glow});
          }
          .digit {
            display: inline-block;
            min-width: 0.62em;
            text-align: center;
            transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .digit-enter {
            opacity: 0;
            transform: translateY(-0.15em);
          }
          .colon {
            display: inline-block;
            margin: 0 0.04em;
            transition: opacity 0.3s ease;
          }
          .standby-date {
            margin-top: 0.5em;
            font-size: clamp(0.875rem, 1.8vw, 1.25rem);
            font-weight: 500;
            letter-spacing: 0.02em;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
          }
          .standby-exit {
            position: fixed;
            inset: 0;
            border: 0;
            background: transparent;
            cursor: none;
            z-index: 3;
          }
          .standby-settings-overlay {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            z-index: 4;
            background: transparent;
          }
          .standby-settings-panel {
            margin-bottom: 2rem;
            padding: 1.5rem 2rem 1.25rem;
            border-radius: 28px;
            background: rgba(28, 28, 34, 0.72);
            border: 1px solid rgba(255,255,255,0.08);
            color: rgba(255,255,255,0.9);
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
            animation: panel-rise 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            min-width: 280px;
          }
          @keyframes panel-rise {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0); opacity: 1; }
          }
          .standby-settings-grip {
            width: 36px;
            height: 5px;
            border-radius: 3px;
            background: rgba(255,255,255,0.2);
            margin: 0 auto 1rem;
          }
          .standby-settings-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.75rem;
            font-size: 14px;
          }
          .standby-toggle {
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 8px;
            background: rgba(255,255,255,0.06);
            color: white;
            padding: 0.35rem 0.75rem;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          .standby-toggle:hover {
            background: rgba(255,255,255,0.12);
          }
          .standby-theme-dots {
            display: flex;
            gap: 0.5rem;
          }
          .standby-theme-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid transparent;
            cursor: pointer;
            transition: transform 0.2s, border-color 0.2s;
          }
          .standby-theme-dot.active {
            border-color: rgba(255,255,255,0.5);
            transform: scale(1.1);
          }
          .standby-theme-dot:hover {
            transform: scale(1.15);
          }
          .standby-settings-hint {
            margin-top: 0.5rem;
            font-size: 11px;
            color: rgba(255,255,255,0.3);
            text-align: center;
            letter-spacing: 0.03em;
          }
          @media (prefers-reduced-motion: reduce) {
            .standby-drift { animation: none; }
            .digit { transition: none; }
            .digit-enter { opacity: 1; transform: none; }
          }
        `}</style>
      </>
    )
  }

  // ─── Landing / Entry State ────────────────────────────
  return (
    <>
      <div className="clock-landing" style={{ background: theme.bgGradient }}>
        <div className="clock-landing-content">
          <p className="clock-landing-eyebrow">TagAll</p>
          <h1 className="clock-landing-title">StandBy Clock</h1>
          <p className="clock-landing-desc">
            A minimalist full-screen clock.
            Inspired by iOS StandBy.
            Pure black. Live time. Zero distractions.
          </p>

          {/* Preview */}
          <div className="clock-preview">
            <div
              className="clock-preview-time"
              style={{
                color: theme.accent,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", system-ui, sans-serif',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {now
                ? `${digits[0]}${digits[1]}`
                : '00'}
              <span className="clock-preview-colon" style={{ color: theme.secondary }}>:</span>
              {now
                ? `${digits[3]}${digits[4]}`
                : '00'}
            </div>
            <p className="clock-preview-date" style={{ color: theme.secondary, opacity: 0.6 }}>
              {dateStr}
            </p>
          </div>

          {/* Theme picker */}
          <div className="clock-theme-picker">
            {THEME_ORDER.map((name, i) => (
              <button
                key={name}
                className={`clock-theme-btn ${i === themeIndex ? 'active' : ''}`}
                style={{
                  background: THEMES[name].accent,
                  boxShadow: i === themeIndex ? `0 0 12px ${THEMES[name].accent}` : 'none',
                }}
                onClick={() => setThemeIndex(i)}
                aria-label={`Theme ${name}`}
              />
            ))}
          </div>

          {/* Format toggle */}
          <button
            className="clock-format-btn"
            onClick={() => setIs24h((v) => !v)}
          >
            {is24h ? '24-Hour' : '12-Hour'}
          </button>

          <button
            className="clock-enter-btn"
            onClick={handleAmbientEntry}
            style={{ background: theme.accent, color: '#000' }}
          >
            Enter Ambient Mode
          </button>

          <div className="clock-hint">
            Tap anywhere to enter · Tap screen again to exit
          </div>
          <div className="clock-shortcuts">
            F Fullscreen · T Style · H 12/24h · S Settings
          </div>

          <a href="/" className="clock-back">← Back to TagAll</a>
        </div>
      </div>

      <style>{`
        .clock-landing {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          overflow-y: auto;
        }
        .clock-landing-content {
          text-align: center;
          max-width: 480px;
        }
        .clock-landing-eyebrow {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.5rem;
        }
        .clock-landing-title {
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: white;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Rounded", system-ui, sans-serif;
        }
        .clock-landing-desc {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.5);
          margin: 1rem auto 2rem;
          max-width: 340px;
        }
        .clock-preview {
          margin: 2rem 0;
          padding: 2.5rem 1rem;
          border-radius: 24px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .clock-preview-time {
          font-size: clamp(3.5rem, 12vw, 5.5rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .clock-preview-colon {
          display: inline-block;
          animation: colon-blink 2s ease-in-out infinite;
        }
        @keyframes colon-blink {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 0.3; }
        }
        .clock-preview-date {
          font-size: 13px;
          margin-top: 0.5rem;
          font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }
        .clock-theme-picker {
          display: flex;
          gap: 0.625rem;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .clock-theme-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s;
        }
        .clock-theme-btn.active {
          border-color: rgba(255,255,255,0.4);
          transform: scale(1.15);
        }
        .clock-theme-btn:hover {
          transform: scale(1.2);
        }
        .clock-format-btn {
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.7);
          padding: 0.4rem 1rem;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 1.5rem;
          transition: background 0.2s, color 0.2s;
        }
        .clock-format-btn:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }
        .clock-enter-btn {
          display: block;
          margin: 0 auto 1rem;
          padding: 0.875rem 2rem;
          border: 0;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .clock-enter-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 24px rgba(255,255,255,0.15);
        }
        .clock-enter-btn:active {
          transform: scale(0.98);
        }
        .clock-hint {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.25rem;
        }
        .clock-shortcuts {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          margin-bottom: 1.5rem;
        }
        .clock-back {
          display: inline-block;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .clock-back:hover {
          color: rgba(255,255,255,0.7);
        }
      `}</style>
    </>
  )
}
