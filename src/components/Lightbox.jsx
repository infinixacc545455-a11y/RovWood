import { useEffect } from 'react'

export default function Lightbox({ imageUrl, codeNumber, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`معاينة ${codeNumber}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 5, 3, 0.92)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <button
        onClick={onClose}
        aria-label="إغلاق المعاينة"
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          width: 40,
          height: 40,
          fontSize: '1.2rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >
        ✕
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '92vw',
          maxHeight: '88vh',
          textAlign: 'center',
        }}
      >
        <img
          src={imageUrl}
          alt={`معاينة ${codeNumber}`}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            borderRadius: 10,
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            border: '3px solid rgba(212,160,43,0.3)',
            objectFit: 'contain',
          }}
        />
        <p style={{
          color: 'var(--cream)',
          marginTop: 16,
          fontSize: 'clamp(0.9rem, 1vw, 1.1rem)',
          fontWeight: 700,
          letterSpacing: '0.05em',
        }}>
          رقم المنتج: <span style={{ color: 'var(--gold-bright)' }}>{codeNumber}</span>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}