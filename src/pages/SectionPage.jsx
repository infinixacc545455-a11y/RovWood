import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Lightbox from '../components/Lightbox'
import logo from '../assets/logo.jpg'

export default function SectionPage() {
  const { id } = useParams()
  const [section, setSection] = useState(null)
  const [codes, setCodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    fetchData()
  }, [id])

  async function fetchData() {
    setLoading(true)
    const { data: sectionData } = await supabase.from('sections').select('*').eq('id', id).single()
    const { data: codesData } = await supabase
      .from('design_codes')
      .select('*')
      .eq('section_id', id)
      .order('sort_order', { ascending: true })
    setSection(sectionData)
    setCodes(codesData || [])
    setLoading(false)
  }

  return (
    <div className="grain-overlay">
      <Header />
      <section className="wood-texture-dark" style={{ padding: '40px 0' }}>
        <div className="container">
          <Link to="/" style={{
            color: 'var(--gold-bright)',
            fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.3s ease',
          }}>
            <span>←</span> العودة للرئيسية
          </Link>
          <h1 style={{
            color: 'var(--cream)',
            fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
            marginTop: 12,
          }}>
            {loading ? 'جاري التحميل...' : section?.name || 'قسم غير موجود'}
          </h1>
          {section?.description && (
            <p style={{ color: 'rgba(245,237,224,0.7)', marginTop: 8, maxWidth: 600, fontSize: 'clamp(0.9rem, 1vw, 1.05rem)' }}>
              {section.description}
            </p>
          )}
        </div>
      </section>

      <section className="wood-texture-light" style={{ padding: '40px 0', minHeight: '30vh' }}>
        <div className="container">
          {!loading && codes.length === 0 && (
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
              <h3 style={{ marginBottom: 8, fontSize: '1.1rem' }}>لا توجد تصاميم بعد</h3>
              <p style={{ color: '#6B5744', fontSize: '0.9rem' }}>سيتم إضافة التصاميم قريباً</p>
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 16,
          }}>
            {codes.map((c, index) => (
              <div
                key={c.id}
                className="wood-card"
                style={{
                  padding: 12,
                  textAlign: 'center',
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div style={{
                  borderRadius: 6,
                  overflow: 'hidden',
                  aspectRatio: '1/1',
                  marginBottom: 10,
                  background: '#eee',
                  border: '2px solid rgba(139,94,60,0.08)',
                }}>
                  <img
                    src={c.thumbnail_url}
                    alt={c.code_number}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--wood-darker)', fontSize: 'clamp(0.85rem, 0.9vw, 1rem)' }}>
                  {c.code_number}
                </p>
                <button
                  onClick={() => setActiveImage(c)}
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)', width: '100%' }}
                >
                  معاينة المنتج
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeImage && (
        <Lightbox
          imageUrl={activeImage.full_image_url}
          codeNumber={activeImage.code_number}
          onClose={() => setActiveImage(null)}
        />
      )}

      <Footer />
    </div>
  )
}