import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const links = [
    { href: '#about', label: 'من نحن' },
    { href: '#sections', label: 'الأقسام' },
    { href: '#contact', label: 'اتصل بنا' },
  ]

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(26, 14, 8, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,237,224,0.06)' : 'none',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={logo}
              alt="Rov Wood"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                objectFit: 'cover',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                border: '2px solid rgba(212,160,43,0.2)',
              }}
            />
            <div className="wood-logo-stacked">
              <span className="wood-logo-rov">Rov</span>
              <span className="wood-logo-wood">Wood</span>
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="desktop-nav">
              {links.map((l) => (
                <a key={l.href} href={l.href} style={{ color: 'var(--sand)', fontWeight: 500, fontSize: '0.85rem' }}>
                  {l.label}
                </a>
              ))}
            </nav>

            <a
              href="tel:+201091889949"
              className="desktop-nav"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--gold-bright)',
                fontWeight: 700,
                fontSize: '0.7rem',
                border: '1.5px solid var(--gold-bright)',
                borderRadius: 8,
                padding: '5px 12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,160,43,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +20 109 188 9949
            </a>

            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="فتح القائمة"
              style={{
                background: 'rgba(245,237,224,0.08)',
                border: '1px solid rgba(245,237,224,0.15)',
                borderRadius: 8,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,237,224,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(245,237,224,0.08)'}
            >
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ width: 18, height: 2, background: 'var(--sand)', borderRadius: 2, transition: 'all 0.3s ease' }} />
                <span style={{ width: 18, height: 2, background: 'var(--sand)', borderRadius: 2, transition: 'all 0.3s ease' }} />
                <span style={{ width: 18, height: 2, background: 'var(--sand)', borderRadius: 2, transition: 'all 0.3s ease' }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        onClick={() => setSidebarOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 199,
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
          backdropFilter: 'blur(8px)',
        }}
      />
      <aside style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: 'min(300px, 80vw)',
        background: 'linear-gradient(180deg, #2C1810, #1A0E08)',
        zIndex: 200,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid rgba(245,237,224,0.06)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 20px',
          borderBottom: '1px solid rgba(245,237,224,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logo} alt="Rov Wood" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
            <div className="wood-logo-stacked" style={{ fontSize: '1rem' }}>
              <span className="wood-logo-rov">Rov</span>
              <span className="wood-logo-wood">Wood</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="إغلاق القائمة"
            style={{
              background: 'rgba(245,237,224,0.08)',
              border: 'none',
              borderRadius: 8,
              width: 36,
              height: 36,
              color: 'var(--sand)',
              fontSize: '1.3rem',
              lineHeight: 1,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,237,224,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(245,237,224,0.08)'}
          >
            ✕
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setSidebarOpen(false)}
              style={{
                color: 'var(--sand)',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(245,237,224,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,237,224,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid rgba(245,237,224,0.08)' }}>
          <a
            href="tel:+201091889949"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              color: 'var(--wood-darker)',
              fontWeight: 700,
              fontSize: '0.85rem',
              background: 'linear-gradient(180deg, var(--gold-bright), var(--gold))',
              borderRadius: 8,
              padding: '12px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            +20 109 188 9949
          </a>
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
        }
        
        .wood-logo-stacked {
          display: flex;
          flex-direction: column;
          line-height: 1;
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.03em;
        }
        
        .wood-logo-rov {
          font-size: 2.2rem;
          background: linear-gradient(180deg, #E8C84A 0%, #D4A02B 40%, #B8860B 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 20px rgba(184,134,11,0.2);
          line-height: 1;
        }
        
        .wood-logo-wood {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: rgba(212,160,43,0.5);
          -webkit-text-fill-color: rgba(212,160,43,0.5);
          line-height: 1;
          margin-top: 1px;
        }
        
        .wood-logo-stacked .wood-logo-rov {
          font-size: 1.8rem;
        }
        
        .wood-logo-stacked .wood-logo-wood {
          font-size: 0.65rem;
        }
        
        @media (max-width: 480px) {
          .wood-logo-rov {
            font-size: 1.8rem !important;
          }
          .wood-logo-wood {
            font-size: 0.65rem !important;
          }
          .wood-logo-stacked .wood-logo-rov {
            font-size: 1.5rem !important;
          }
          .wood-logo-stacked .wood-logo-wood {
            font-size: 0.55rem !important;
          }
        }
      `}</style>
    </>
  )
}