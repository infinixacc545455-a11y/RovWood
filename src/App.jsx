import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './lib/supabaseClient'
import Header from './components/Header'
import Footer from './components/Footer'
import logo from './assets/logo.jpg'

export default function App() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSections()
  }, [])

  async function fetchSections() {
    setLoading(true)
    const { data, error } = await supabase
      .from('sections')
      .select('*, design_codes(count)')
      .order('sort_order', { ascending: true })
    if (!error) setSections(data || [])
    setLoading(false)
  }

  return (
    <div className="grain-overlay">
      <Header />
      <Hero />
      <About />
      <SectionsGrid sections={sections} loading={loading} />
      <WhyUs />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

/* ========== WHATSAPP FLOAT ========== */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/201091889949"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 150,
        width: 54,
        height: 54,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(37,211,102,0.4)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

/* ========== HERO ========== */
function Hero() {
  return (
    <section className="wood-texture-dark grain-overlay hero-section" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative',
      padding: '40px 0',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(212,160,43,0.08), transparent 70%)', zIndex: 1 }} />
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '40px 16px' }}>
        <div className="animate-fade-up" style={{ maxWidth: 720 }}>
          <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Rov Wood — منذ 2019</span>
          <h1 className="hero-title" style={{
            color: 'var(--cream)',
            fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            صناعة الكونتر
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, var(--gold-bright), var(--gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>بجودة الخشب الطبيعي</span>
          </h1>
          <p className="hero-description" style={{
            color: 'rgba(245,237,224,0.85)',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.25rem)',
            maxWidth: 560,
            marginBottom: 28,
            lineHeight: 1.9,
          }}>
            نصنع مسطحات الكونتر بأنواعها — سادة، فورمايكا، ميلامين، هاي جلوس —
            بتقنية التورفيجا وأعلى معايير الجودة.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#sections" className="btn btn-primary" style={{ flex: '1 1 auto', minWidth: '140px' }}>استكشف الأقسام</a>
            <a href="#about" className="btn btn-outline" style={{ flex: '1 1 auto', minWidth: '140px' }}>تعرف علينا</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========== ABOUT ========== */
function About() {
  const features = [
    { title: 'كونتر سادة' },
    { title: 'كونتر فورمايكا' },
    { title: 'كونتر ميلامين' },
    { title: 'كونتر هاي جلوس' },
  ]

  return (
    <section id="about" className="wood-texture-light" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
          <span className="eyebrow">من نحن</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', marginBottom: 12 }}>
            خبرة في صناعة الكونتر
          </h2>
          <p style={{ color: '#5A4636', fontSize: 'clamp(0.9rem, 1vw, 1.05rem)' }}>
            نصنع مسطحات الكونتر بأنواعها المختلفة، ونعتمد على تقنية التورفيجا
            في تجميع الألواح لضمان تماسك ودقة عالية.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 20,
        }}>
          {features.map((f) => (
            <div key={f.title} className="wood-card" style={{ padding: '24px 16px', textAlign: 'center' }}>
              <img
                src={logo}
                alt="Rov Wood"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 12px',
                  border: '2px solid rgba(184,134,11,0.2)',
                }}
              />
              <h3 style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)', marginBottom: 4 }}>{f.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========== WHY US ========== */
function WhyUs() {
  const points = [
    { title: 'جودة مضمونة' },
    { title: 'تقنية التورفيجا' },
    { title: 'أسعار تنافسية' },
    { title: 'التزام بالوقت' },
  ]

  return (
    <section className="wood-texture-dark" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
          <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>لماذا تختارنا</span>
          <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}>
            نصنع الثقة كما نصنع الخشب
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 16,
        }}>
          {points.map((p) => (
            <div key={p.title} className="wood-card" style={{
              background: 'rgba(245,237,224,0.06)',
              border: '1px solid rgba(245,237,224,0.1)',
              padding: '24px 16px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
            }}>
              <img
                src={logo}
                alt="Rov Wood"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 10px',
                  border: '2px solid rgba(212,160,43,0.2)',
                  opacity: 0.8,
                }}
              />
              <h3 style={{ color: 'var(--cream)', fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)', marginBottom: 4 }}>{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========== SECTIONS GRID ========== */
function SectionsGrid({ sections, loading }) {
  return (
    <section id="sections" className="wood-texture-light" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
          <span className="eyebrow">الأقسام</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}>تصفح الأقسام</h2>
          <p style={{ color: '#6B5744', marginTop: 8, fontSize: 'clamp(0.85rem, 1vw, 1rem)' }}>اختر القسم لعرض جميع التصاميم المتاحة</p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', color: '#8B5A2B', padding: 30 }}>
            <p>جاري تحميل الأقسام...</p>
          </div>
        )}

        {!loading && sections.length === 0 && (
          <div className="wood-card" style={{ maxWidth: 400, margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
            <img
              src={logo}
              alt="Rov Wood"
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 12px',
                opacity: 0.5,
              }}
            />
            <h3 style={{ marginBottom: 8, fontSize: '1.1rem' }}>لا توجد أقسام بعد</h3>
            <p style={{ color: '#6B5744', fontSize: '0.9rem' }}>سيتم عرض الأقسام هنا فور إضافتها من لوحة التحكم.</p>
          </div>
        )}

        {!loading && sections.length > 0 && (
          <div className="sections-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
          }}>
            {sections.map((s, index) => (
              <Link 
                key={s.id} 
                to={`/section/${s.id}`} 
                className="wood-card"
                style={{ 
                  display: 'block', 
                  overflow: 'hidden',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div style={{
                  height: 140,
                  background: `linear-gradient(135deg, ${['#6B3A2A', '#8B5E3C', '#A67B5B', '#5C3322'][index % 4]}, var(--wood-darker))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)',
                  }} />
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <h3 style={{ fontSize: 'clamp(1rem, 1.1vw, 1.25rem)', marginBottom: 4 }}>{s.name}</h3>
                  {s.description && (
                    <p style={{ color: '#6B5744', fontSize: '0.85rem', marginBottom: 8 }}>{s.description}</p>
                  )}
                  <span style={{ 
                    color: 'var(--gold)', 
                    fontSize: '0.8rem', 
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    {s.design_codes?.[0]?.count ?? 0} تصميم
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}