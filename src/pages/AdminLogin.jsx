import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.jpg'

const ADMIN_PASSWORD = 'RovWood2019#'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('rovwood_admin_auth', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('كلمة السر غير صحيحة')
    }
  }

  return (
    <div className="wood-texture-dark" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(212,160,43,0.05), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <form
        onSubmit={handleSubmit}
        className="wood-card"
        style={{
          background: 'var(--cream)',
          padding: '48px 40px',
          width: '100%',
          maxWidth: 420,
          position: 'relative',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img
            src={logo}
            alt="Rov Wood"
            style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              objectFit: 'cover',
              margin: '0 auto 16px',
              border: '3px solid rgba(184,134,11,0.2)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            }}
          />
          <h1 style={{ fontSize: '1.5rem', marginBottom: 6 }}>لوحة تحكم Rov Wood</h1>
          <p style={{ color: '#6B5744', fontSize: '0.9rem' }}>أدخل كلمة السر للمتابعة</p>
        </div>

        <label htmlFor="pw" style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: '0.85rem', color: 'var(--wood-darker)' }}>
          كلمة السر
        </label>
        <input
          id="pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 8,
            border: '2px solid rgba(139,94,60,0.2)',
            fontSize: '1rem',
            marginBottom: error ? 8 : 20,
            fontFamily: 'var(--font-body)',
            transition: 'all 0.3s ease',
            background: 'white',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(139,94,60,0.2)'}
        />
        {error && <p style={{ color: '#C0392B', fontSize: '0.85rem', marginBottom: 16 }}>{error}</p>}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
          دخول
        </button>
      </form>
    </div>
  )
}