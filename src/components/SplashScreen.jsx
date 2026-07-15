import { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('rovwood-splash-seen')) {
      setVisible(false)
      return
    }
    const fadeTimer = setTimeout(() => setFading(true), 1900)
    const removeTimer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('rovwood-splash-seen', '1')
    }, 2500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'linear-gradient(180deg, #2C1810, #1A0E08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 20,
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'auto',
    }}>
      <div className="splash-heartbeat">
        <img
          src={logo}
          alt="Rov Wood"
          style={{
            width: 140,
            height: 140,
            borderRadius: 28,
            objectFit: 'cover',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            border: '3px solid rgba(212,160,43,0.2)',
          }}
        />
      </div>
      <span style={{
        fontFamily: "'Cairo', sans-serif",
        fontWeight: 800,
        fontSize: '1rem',
        letterSpacing: '0.2em',
        background: 'linear-gradient(180deg, var(--gold-bright), var(--gold))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        ROV WOOD
      </span>
      <span style={{
        fontFamily: "'Cairo', sans-serif",
        fontSize: '0.7rem',
        letterSpacing: '0.3em',
        color: 'rgba(245,237,224,0.3)',
        marginTop: -8,
      }}>
        صناعة الكونتر بجودة الخشب
      </span>

      <style>{`
        .splash-heartbeat {
          animation: splash-heartbeat 1.2s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes splash-heartbeat {
          0%   { transform: scale(1); }
          14%  { transform: scale(1.08); }
          28%  { transform: scale(0.97); }
          42%  { transform: scale(1.08); }
          70%  { transform: scale(1); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-heartbeat { animation: none; }
        }
      `}</style>
    </div>
  )
}