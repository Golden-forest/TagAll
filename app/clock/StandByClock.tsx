'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Apple StandBy 风格时钟 — v4
 *
 * 改进：
 * 1. 精确到秒 HH:MM:SS，同一行显示
 * 2. 去掉 next/font，改用系统字体栈（解决 iPad 文字不可见）
 * 3. 保留冒号呼吸动效
 * 4. 24小时制固定
 */

type ThemeName = 'crimson' | 'amber' | 'pearl' | 'azure'

interface Theme {
  fg: string
  glow: string
  halo: string
  bgCenter: string
  bgEdge: string
  dateColor: string
  colonColor: string
}

const THEMES: Record<ThemeName, Theme> = {
  crimson: {
    fg: 'rgba(255, 138, 128, 1)',
    glow: 'rgba(255, 95, 87, 0.5)',
    halo: 'rgba(255, 60, 50, 0.06)',
    bgCenter: 'rgba(28, 6, 8, 1)',
    bgEdge: 'rgba(0, 0, 0, 1)',
    dateColor: 'rgba(255, 138, 128, 0.35)',
    colonColor: 'rgba(255, 138, 128, 0.5)',
  },
  amber: {
    fg: 'rgba(255, 205, 130, 1)',
    glow: 'rgba(255, 175, 60, 0.45)',
    halo: 'rgba(255, 155, 30, 0.05)',
    bgCenter: 'rgba(26, 19, 6, 1)',
    bgEdge: 'rgba(0, 0, 0, 1)',
    dateColor: 'rgba(255, 205, 130, 0.35)',
    colonColor: 'rgba(255, 205, 130, 0.48)',
  },
  pearl: {
    fg: 'rgba(240, 240, 245, 1)',
    glow: 'rgba(255, 255, 255, 0.15)',
    halo: 'rgba(255, 255, 255, 0.03)',
    bgCenter: 'rgba(14, 14, 18, 1)',
    bgEdge: 'rgba(0, 0, 0, 1)',
    dateColor: 'rgba(240, 240, 245, 0.32)',
    colonColor: 'rgba(240, 240, 245, 0.45)',
  },
  azure: {
    fg: 'rgba(145, 210, 255, 1)',
    glow: 'rgba(80, 165, 255, 0.4)',
    halo: 'rgba(50, 130, 255, 0.04)',
    bgCenter: 'rgba(6, 14, 28, 1)',
    bgEdge: 'rgba(0, 0, 0, 1)',
    dateColor: 'rgba(145, 210, 255, 0.35)',
    colonColor: 'rgba(145, 210, 255, 0.48)',
  },
}

const THEME_ORDER: ThemeName[] = ['crimson', 'amber', 'pearl', 'azure']

// HH:MM:SS → 8 个字符
function getTimeStr(date: Date): {
  h1: string; h2: string
  m1: string; m2: string
  s1: string; s2: string
} {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  return {
    h1: h[0], h2: h[1],
    m1: m[0], m2: m[1],
    s1: s[0], s2: s[1],
  }
}

function formatDate(date: Date): { weekday: string; dateStr: string } {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return {
    weekday: days[date.getDay()],
    dateStr: `${months[date.getMonth()]} ${date.getDate()}`,
  }
}

// ─── 数字交叉淡入动画 ─────────────────────────
//
// 设计思路：
// - 用两层重叠的 span 实现交叉淡入淡出（crossfade）
// - 旧数字向上滑 + 淡出，新数字从下滑入 + 淡入
// - 不使用 blur，避免每秒闪一下的刺眼感
// - 纯 CSS transition 控制，无 JS 定时器

function Digit({ char, color, glow, lowPerf }: { char: string; color: string; glow: string; lowPerf: boolean }) {
  const [current, setCurrent] = useState(char)
  const [prev, setPrev] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (char !== current) {
      setPrev(current)
      setCurrent(char)
      setIsAnimating(true)
      const t = setTimeout(() => {
        setPrev(null)
        setIsAnimating(false)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [char, current])

  // 光影策略：
  // - 高性能设备：text-shadow 三层光晕
  // - 低端设备（A8/A9 芯片等）：完全禁用，纯色显示
  //   原因：A8 GPU 处理多层 text-shadow blur 时会渲染失败，文字直接消失
  const shadow = lowPerf
    ? 'none'
    : `0 0 8px ${glow}, 0 0 24px ${glow.replace(/[\d.]+\)$/, '0.18)')}, 0 0 60px ${glow.replace(/[\d.]+\)$/, '0.08)')}`

  return (
    <span className="digit-slot">
      {/* 旧数字 — 向上滑出 + 淡出 */}
      {prev !== null && (
        <span
          className="digit-layer digit-out"
          style={{ color, WebkitTextFillColor: color, textShadow: shadow }}
        >
          {prev}
        </span>
      )}
      {/* 新数字 — 从下滑入 + 淡入 */}
      <span
        className={`digit-layer digit-current ${isAnimating ? 'digit-in' : ''}`}
        style={{ color, WebkitTextFillColor: color, textShadow: shadow }}
      >
        {current}
      </span>
    </span>
  )
}

// ─── 主组件 ─────────────────────────────────────

export default function StandByClock() {
  const [now, setNow] = useState<Date | null>(null)
  const [themeIndex, setThemeIndex] = useState(0)
  const [colonVisible, setColonVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [lowPerf, setLowPerf] = useState(false)
  const theme = THEMES[THEME_ORDER[themeIndex]]

  const containerRef = useRef<HTMLDivElement>(null)
  const lastSecond = useRef(-1)

  useEffect(() => {
    setMounted(true)

    // 检测低端设备 — iPad mini 4 (A8) 等旧设备
    // 这些设备的 GPU 无法处理多层 text-shadow blur，会导致文字渲染失败
    //
    // 检测策略（任一命中即视为低端）：
    // 1. hardwareConcurrency <= 2 → A8/A9 芯片为双核
    // 2. deviceMemory <= 2 → 旧设备通常只有 2GB RAM
    // 3. 安全降级：如果 structuredClone 不存在（iOS < 15.4），也降级
    const cores = navigator.hardwareConcurrency || 4
    // @ts-expect-error - deviceMemory 不在标准类型中
    const mem = navigator.deviceMemory || 4
    const hasModernAPI = typeof structuredClone !== 'undefined'
    const isLowPerf = cores <= 2 || mem <= 2 || !hasModernAPI
    setLowPerf(isLowPerf)

    // 强制覆盖 globals.css 全局样式
    const setImportant = (el: HTMLElement, prop: string, val: string) => {
      el.style.setProperty(prop, val, 'important')
    }
    setImportant(document.body, 'background', '#000')
    setImportant(document.body, 'color', '#fff')
    setImportant(document.body, 'overflow', 'hidden')
    setImportant(document.documentElement, 'background', '#000')
    setImportant(document.documentElement, 'overflow', 'hidden')

    const init = new Date()
    lastSecond.current = init.getHours() * 3600 + init.getMinutes() * 60 + init.getSeconds()
    setNow(init)

    const interval = setInterval(() => {
      const d = new Date()
      const s = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()
      if (s !== lastSecond.current) {
        lastSecond.current = s
        setNow(d)
      }
    }, 250) // 更频繁检查，确保秒级更新
    return () => clearInterval(interval)
  }, [])

  // 冒号呼吸 — 每秒闪烁
  useEffect(() => {
    const interval = setInterval(() => {
      setColonVisible((v) => !v)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Wake Lock
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)
  useEffect(() => {
    const acquire = () =>
      navigator.wakeLock?.request('screen').then((wl) => {
        wakeLockRef.current = wl
      }).catch(() => {})

    acquire()

    const onVisibility = () => {
      if (document.visibilityState === 'visible') acquire()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      wakeLockRef.current?.release()
    }
  }, [])

  // 双击切换主题
  const lastTap = useRef(0)
  const handleScreenTap = () => {
    const now_ts = Date.now()
    if (now_ts - lastTap.current < 300) {
      setThemeIndex((i) => (i + 1) % THEME_ORDER.length)
      lastTap.current = 0
    } else {
      lastTap.current = now_ts
    }
  }

  // 键盘
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') {
        setThemeIndex((i) => (i + 1) % THEME_ORDER.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const time = now ? getTimeStr(now) : { h1: '0', h2: '0', m1: '0', m2: '0', s1: '0', s2: '0' }
  const dateInfo = now ? formatDate(now) : { weekday: '', dateStr: '' }

  const colonStyle: React.CSSProperties = {
    color: theme.colonColor,
    WebkitTextFillColor: theme.colonColor,
    textShadow: lowPerf ? 'none' : `0 0 6px ${theme.glow.replace(/[\d.]+\)$/, '0.3)')}, 0 0 20px ${theme.glow.replace(/[\d.]+\)$/, '0.1)')}`,
    opacity: colonVisible ? 0.75 : 0.2,
  }

  return (
    <>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Clock" />
      </head>

      <div className="clock-screen" onClick={handleScreenTap}>
        {/* 背景层 — 从上方微弱照射的环境光 */}
        <div className="clock-bg-layer" style={{
          background: `radial-gradient(ellipse 100% 70% at 50% 0%, ${theme.bgCenter} 0%, ${theme.bgEdge} 60%)`,
        }} />
        <div className="clock-vignette" />
        {/* 极微弱的环境光晕 — 不在正中央，偏上方 */}
        <div className="clock-halo" style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 35%, ${theme.halo} 0%, transparent 70%)`,
        }} />

        {/* 防烧屏漂移 */}
        <div className="clock-drift">
          <div className={`clock-content ${mounted ? 'visible' : ''}`}>
            {/* 星期 */}
            <p className="clock-weekday" style={{ color: theme.dateColor, WebkitTextFillColor: theme.dateColor }}>
              {dateInfo.weekday}
            </p>

            {/* 时间 HH:MM:SS — 同一行，flexbox 对齐 */}
            <div className="clock-time" ref={containerRef}>
              <Digit char={time.h1} color={theme.fg} glow={theme.glow} lowPerf={lowPerf} />
              <Digit char={time.h2} color={theme.fg} glow={theme.glow} lowPerf={lowPerf} />
              <span className="colon" style={colonStyle}>:</span>
              <Digit char={time.m1} color={theme.fg} glow={theme.glow} lowPerf={lowPerf} />
              <Digit char={time.m2} color={theme.fg} glow={theme.glow} lowPerf={lowPerf} />
              <span className="colon" style={colonStyle}>:</span>
              <Digit char={time.s1} color={theme.fg} glow={theme.glow} lowPerf={lowPerf} />
              <Digit char={time.s2} color={theme.fg} glow={theme.glow} lowPerf={lowPerf} />
            </div>

            {/* 日期 */}
            <p className="clock-date" style={{ color: theme.dateColor, WebkitTextFillColor: theme.dateColor }}>
              {dateInfo.dateStr}
            </p>
          </div>
        </div>

        {/* 主题指示器 */}
        <div className="theme-dots">
          {THEME_ORDER.map((_, i) => (
            <span
              key={i}
              className="theme-dot"
              style={{
                backgroundColor: i === themeIndex ? theme.fg : 'rgba(255,255,255,0.15)',
                boxShadow: i === themeIndex ? `0 0 8px ${theme.glow}` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        /*
         * 字体策略：
         * 不再依赖 next/font/google 的 Inter（在 iPad Safari 上可能加载失败）
         * 改用 iOS/macOS 原生字体栈 — iPad 上自带超粗字重
         * SF Pro Display 在 Apple 设备上有 900 字重，效果等同 Inter Black
         */
        html:has(.clock-screen),
        html:has(.clock-screen) body {
          margin: 0 !important;
          padding: 0 !important;
          background: #000 !important;
          color: #fff !important;
          overflow: hidden !important;
          overscroll-behavior: none !important;
          -webkit-user-select: none !important;
          user-select: none !important;
          -webkit-tap-highlight-color: transparent !important;
          touch-action: manipulation !important;
          min-height: 100dvh !important;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .clock-screen {
          position: fixed;
          inset: 0;
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000 !important;
          cursor: default;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        .clock-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          transition: background 1.2s ease;
        }

        .clock-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 130% 110% at 50% 50%,
              transparent 55%,
              rgba(0,0,0,0.15) 80%,
              rgba(0,0,0,0.5) 100%);
          z-index: 1;
        }

        .clock-halo {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          transition: background 1.2s ease;
        }

        .clock-drift {
          position: relative;
          z-index: 2;
          animation: drift 300s ease-in-out infinite;
          width: 92vw;
          max-width: 1600px;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(8px, 4px); }
          50%      { transform: translate(-5px, -6px); }
          75%      { transform: translate(4px, -4px); }
        }

        .clock-content {
          text-align: center;
          opacity: 0;
          transform: scale(0.96);
          transition: opacity 1.5s ease, transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .clock-content.visible {
          opacity: 1;
          transform: scale(1);
        }

        .clock-weekday {
          font-size: clamp(0.7rem, 1.8vmin, 1rem);
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin-bottom: 0.1em;
          padding-left: 0.35em;
        }

        /*
         * HH:MM:SS 时间排版
         * 8 个字符（6数字 + 2冒号）铺满一行
         * 系统字体栈：Apple 设备优先 SF Pro，其他设备回退
         */
        .clock-time {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.85;
          font-variant-numeric: tabular-nums;
          font-size: clamp(3.5rem, 18vw, 16rem);
          font-family:
            -apple-system, BlinkMacSystemFont,
            'SF Pro Display', 'SF Pro Text',
            'Helvetica Neue', 'Arial',
            'Segoe UI', Roboto, sans-serif;
        }

        /* 横屏：根据高度限制 */
        @media (orientation: landscape) and (max-height: 500px) {
          .clock-time {
            font-size: clamp(3rem, 15vh, 12rem);
          }
          .clock-weekday {
            font-size: clamp(0.6rem, 1.4vmin, 0.85rem);
            margin-bottom: 0.08em;
          }
          .clock-date {
            font-size: clamp(0.6rem, 1.4vmin, 0.85rem) !important;
            margin-top: 0.15em !important;
          }
        }

        /* iPad — 保证有足够大的字号 */
        @media (min-width: 768px) and (min-height: 768px) {
          .clock-time {
            font-size: clamp(6rem, 14vw, 14rem);
          }
        }

        /* 移动端竖屏 */
        @media (orientation: portrait) and (max-width: 500px) {
          .clock-time {
            font-size: clamp(3.5rem, 21vw, 10rem);
          }
        }

        /*
         * 交叉淡入（crossfade）数字动画
         * - 两层 span 绝对定位重叠
         * - 旧数字：translateY 向上 + opacity → 0
         * - 新数字：从 translateY 下方 → 0 + opacity 0 → 1
         * - 缓动曲线 ease-out，柔和自然
         * - 无 blur，无 scale 弹跳
         */
        .digit-slot {
          position: relative;
          display: inline-block;
          min-width: 0.5em;
          text-align: center;
          vertical-align: top;
        }
        .digit-layer {
          display: inline-block;
          will-change: transform, opacity;
        }
        /* 旧数字 — 挂载时就开始向上滑出 + 淡出 */
        .digit-out {
          position: absolute;
          inset: 0;
          animation: digitOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        /* 新数字 — 从下方滑入 + 淡入 */
        .digit-current {
          position: relative;
        }
        .digit-current.digit-in {
          animation: digitSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes digitOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-0.12em);
          }
        }
        @keyframes digitSlideIn {
          0% {
            opacity: 0;
            transform: translateY(0.12em);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .colon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 -0.02em;
          padding: 0 0.02em;
          font-weight: 800;
          line-height: 0.85;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .clock-date {
          margin-top: 0.25em;
          font-size: clamp(0.75rem, 2vmin, 1.05rem);
          font-weight: 500;
          letter-spacing: 0.12em;
          padding-left: 0.12em;
        }

        .theme-dots {
          position: absolute;
          bottom: max(2vh, 16px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .clock-screen:active .theme-dots,
        .theme-dots:hover {
          opacity: 1;
        }
        .theme-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          transition: all 0.4s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .clock-drift { animation: none; }
          .digit-out { animation: none; opacity: 0; }
          .digit-in { animation: none; opacity: 1; transform: none; }
          .clock-content { transition: none; opacity: 1; transform: none; }
        }
      `}</style>
    </>
  )
}
