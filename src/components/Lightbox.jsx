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
        padding: 24,
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <button
        onClick={onClose}
        aria-label="إغلاق المعاينة"
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          width: 50,
          height: 50,
          fontSize: '1.4rem',
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
            maxHeight: '75vh',
            borderRadius: 12,
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            border: '3px solid rgba(212,160,43,0.3)',
            objectFit: 'contain',
          }}
        />
        <p style={{
          color: 'var(--cream)',
          marginTop: 20,
          fontSize: '1.1rem',
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