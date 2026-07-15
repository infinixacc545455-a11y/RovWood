import { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // هتظهر كل مرة (مش هتتخزن في sessionStorage)
    const fadeTimer = setTimeout(() => setFading(true), 1900)
    const removeTimer = setTimeout(() => {
      setVisible(false)
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
          className="splash-logo"
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: 1,
      }}>
        <span style={{
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 900,
          fontSize: '2.2rem',
          background: 'linear-gradient(180deg, var(--gold-bright), var(--gold))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.05em',
        }}>
          Rov
        </span>
        <span style={{
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 400,
          fontSize: '0.9rem',
          letterSpacing: '0.3em',
          color: 'rgba(245,237,224,0.4)',
          marginTop: 2,
        }}>
          Wood
        </span>
      </div>

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
        @media (max-width: 768px) {
          .splash-logo {
            width: 100px !important;
            height: 100px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-heartbeat { animation: none; }
        }
      `}</style>
    </div>
  )
}