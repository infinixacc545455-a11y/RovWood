import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import logo from '../assets/logo.jpg'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [sections, setSections] = useState([])
  const [selectedSectionId, setSelectedSectionId] = useState(null)
  const [codes, setCodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (sessionStorage.getItem('rovwood_admin_auth') !== 'true') {
      navigate('/admin')
      return
    }
    fetchSections()
  }, [])

  useEffect(() => {
    if (selectedSectionId) fetchCodes(selectedSectionId)
  }, [selectedSectionId])

  async function fetchSections() {
    setLoading(true)
    const { data, error } = await supabase.from('sections').select('*').order('sort_order', { ascending: true })
    if (!error) {
      setSections(data || [])
      if (data && data.length > 0 && !selectedSectionId) setSelectedSectionId(data[0].id)
    }
    setLoading(false)
  }

  async function fetchCodes(sectionId) {
    const { data, error } = await supabase
      .from('design_codes')
      .select('*')
      .eq('section_id', sectionId)
      .order('sort_order', { ascending: true })
    if (!error) setCodes(data || [])
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function logout() {
    sessionStorage.removeItem('rovwood_admin_auth')
    navigate('/admin')
  }

  return (
    <div className="wood-texture-light" style={{ minHeight: '100vh' }}>
      <header className="wood-texture-dark" style={{ padding: '16px 0', borderBottom: '1px solid rgba(245,237,224,0.06)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src={logo}
              alt="Rov Wood"
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                objectFit: 'cover',
                border: '2px solid rgba(212,160,43,0.2)',
              }}
            />
            <h1 style={{ color: 'var(--cream)', fontSize: '1.2rem' }}>لوحة تحكم Rov Wood</h1>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>عرض الموقع</a>
          </div>
        </div>
      </header>

      <div className="container" style={{
        padding: '40px 24px',
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        gap: 32,
        alignItems: 'start',
      }}>
        <SectionsPanel
          sections={sections}
          loading={loading}
          selectedSectionId={selectedSectionId}
          onSelect={setSelectedSectionId}
          onRefresh={fetchSections}
          onToast={showToast}
        />

        <CodesPanel
          sectionId={selectedSectionId}
          sectionName={sections.find((s) => s.id === selectedSectionId)?.name}
          codes={codes}
          onRefresh={() => selectedSectionId && fetchCodes(selectedSectionId)}
          onToast={showToast}
        />
      </div>

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: toast.type === 'success' ? 'var(--wood-darker)' : '#C0392B',
          color: 'var(--cream)',
          padding: '14px 28px',
          borderRadius: 8,
          boxShadow: 'var(--shadow-deep)',
          zIndex: 200,
          fontWeight: 600,
          border: '1px solid rgba(245,237,224,0.1)',
        }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .container[style] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ========== SECTIONS PANEL ========== */
function SectionsPanel({ sections, loading, selectedSectionId, onSelect, onRefresh, onToast }) {
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [saving, setSaving] = useState(false)

  async function addSection(e) {
    e.preventDefault()
    if (!newName.trim()) return
    setSaving(true)
    const { error } = await supabase.from('sections').insert({
      name: newName.trim(),
      description: newDesc.trim() || null,
      sort_order: sections.length,
    })
    setSaving(false)
    if (error) {
      onToast('حدث خطأ أثناء إضافة القسم', 'error')
    } else {
      setNewName('')
      setNewDesc('')
      onToast('تم إضافة القسم بنجاح')
      onRefresh()
    }
  }

  async function deleteSection(id) {
    if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) return
    const { error } = await supabase.from('sections').delete().eq('id', id)
    if (error) onToast('حدث خطأ أثناء الحذف', 'error')
    else {
      onToast('تم حذف القسم')
      onRefresh()
    }
  }

  return (
    <div className="wood-card" style={{ background: 'var(--cream)', padding: 24 }}>
      <h2 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--wood-darker)' }}>الأقسام</h2>

      <form onSubmit={addSection} style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="اسم القسم (مثال: فورمايكا)"
          style={inputStyle}
        />
        <input
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder="وصف مختصر (اختياري)"
          style={inputStyle}
        />
        <button type="submit" disabled={saving} className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '10px', width: '100%' }}>
          {saving ? 'جاري الإضافة...' : '+ إضافة قسم جديد'}
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {loading && <p style={{ color: '#8B5A2B', fontSize: '0.9rem' }}>جاري التحميل...</p>}
        {!loading && sections.length === 0 && (
          <p style={{ color: '#8B5A2B', fontSize: '0.9rem' }}>لا توجد أقسام بعد.</p>
        )}
        {sections.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              background: selectedSectionId === s.id ? 'linear-gradient(135deg, var(--gold-bright), var(--gold))' : 'transparent',
              color: selectedSectionId === s.id ? 'var(--wood-darker)' : 'var(--ink)',
              border: '1px solid rgba(139,94,60,0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              fontWeight: selectedSectionId === s.id ? 700 : 600,
            }}
          >
            <span>{s.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteSection(s.id)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: selectedSectionId === s.id ? 'var(--wood-darker)' : '#C0392B',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: 4,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(192,57,43,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ========== CODES PANEL ========== */
function CodesPanel({ sectionId, sectionName, codes, onRefresh, onToast }) {
  const [codeNumber, setCodeNumber] = useState('')
  const [thumbFile, setThumbFile] = useState(null)
  const [fullFile, setFullFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  async function uploadImage(file, prefix) {
    const ext = file.name.split('.').pop()
    const path = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    
    console.log('بدء رفع الصورة:', path)
    
    const { error: uploadError } = await supabase.storage
      .from('design-images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (uploadError) {
      console.error('خطأ في رفع الصورة:', uploadError)
      throw new Error(uploadError.message)
    }
    
    const { data: urlData } = supabase.storage
      .from('design-images')
      .getPublicUrl(path)
    
    console.log('تم رفع الصورة بنجاح:', urlData.publicUrl)
    return urlData.publicUrl
  }

  async function addCode(e) {
    e.preventDefault()
    
    if (!sectionId) {
      onToast('اختر قسمًا أولًا', 'error')
      return
    }
    
    if (!codeNumber.trim()) {
      onToast('أدخل رقم المنتج', 'error')
      return
    }
    
    if (!thumbFile) {
      onToast('اختر الصورة المصغرة', 'error')
      return
    }
    
    if (!fullFile) {
      onToast('اختر الصورة الكاملة', 'error')
      return
    }
    
    setUploading(true)
    
    try {
      const thumbUrl = await uploadImage(thumbFile, `thumb-${codeNumber.trim()}`)
      const fullUrl = await uploadImage(fullFile, `full-${codeNumber.trim()}`)
      
      const { error: insertError } = await supabase
        .from('design_codes')
        .insert({
          section_id: sectionId,
          code_number: codeNumber.trim(),
          thumbnail_url: thumbUrl,
          full_image_url: fullUrl,
          sort_order: codes.length,
        })
      
      if (insertError) {
        console.error('خطأ في حفظ البيانات:', insertError)
        throw new Error(insertError.message)
      }
      
      setCodeNumber('')
      setThumbFile(null)
      setFullFile(null)
      
      const thumbInput = document.getElementById('thumb-input')
      const fullInput = document.getElementById('full-input')
      if (thumbInput) thumbInput.value = ''
      if (fullInput) fullInput.value = ''
      
      onToast('تم إضافة المنتج بنجاح')
      onRefresh()
      
    } catch (err) {
      console.error('خطأ كامل:', err)
      onToast(`حدث خطأ: ${err.message || 'فشل الرفع'}`, 'error')
    } finally {
      setUploading(false)
    }
  }

  async function deleteCode(id) {
    if (!confirm('هل تريد حذف هذا المنتج؟')) return
    const { error } = await supabase.from('design_codes').delete().eq('id', id)
    if (error) onToast('حدث خطأ أثناء الحذف', 'error')
    else {
      onToast('تم حذف المنتج')
      onRefresh()
    }
  }

  if (!sectionId) {
    return (
      <div className="wood-card" style={{ background: 'var(--cream)', padding: 40, textAlign: 'center' }}>
        <p style={{ color: '#6B5744' }}>أضف قسمًا أولًا من القائمة على اليمين.</p>
      </div>
    )
  }

  return (
    <div className="wood-card" style={{ background: 'var(--cream)', padding: 24 }}>
      <h2 style={{ fontSize: '1.1rem', marginBottom: 4, color: 'var(--wood-darker)' }}>إضافة منتج جديد</h2>
      <p style={{ color: '#8B5A2B', fontSize: '0.85rem', marginBottom: 18 }}>
        القسم الحالي: <strong>{sectionName}</strong>
      </p>

      <form onSubmit={addCode} className="wood-card" style={{ 
        padding: 20, 
        marginBottom: 26, 
        background: 'var(--sand)', 
        boxShadow: 'none', 
        border: '1px solid rgba(139,94,60,0.1)' 
      }}>
        <div style={{ display: 'grid', gap: 14 }}>
          <div>
            <label style={labelStyle}>رقم المنتج</label>
            <input
              value={codeNumber}
              onChange={(e) => setCodeNumber(e.target.value)}
              placeholder=""
              style={inputStyle}
              dir="ltr"
            />
          </div>
          
          <div>
            <label style={labelStyle}>الصورة المصغرة</label>
            <div style={{
              border: '2px dashed rgba(139,94,60,0.2)',
              borderRadius: 8,
              padding: '16px',
              background: 'white',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(139,94,60,0.2)'}
            onClick={() => document.getElementById('thumb-input').click()}
            >
              <input 
                id="thumb-input" 
                type="file" 
                accept="image/*" 
                onChange={(e) => setThumbFile(e.target.files[0])} 
                style={{ display: 'none' }}
              />
              {thumbFile ? (
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 600 }}>{thumbFile.name}</p>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#6B5744' }}>اضغط لاختيار الصورة</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label style={labelStyle}>الصورة الكاملة</label>
            <div style={{
              border: '2px dashed rgba(139,94,60,0.2)',
              borderRadius: 8,
              padding: '16px',
              background: 'white',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(139,94,60,0.2)'}
            onClick={() => document.getElementById('full-input').click()}
            >
              <input 
                id="full-input" 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFullFile(e.target.files[0])} 
                style={{ display: 'none' }}
              />
              {fullFile ? (
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 600 }}>{fullFile.name}</p>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#6B5744' }}>اضغط لاختيار الصورة</p>
                </div>
              )}
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={uploading} 
            className="btn btn-primary" 
            style={{ fontSize: '0.9rem', width: '100%', padding: '14px' }}
          >
            {uploading ? 'جاري الرفع...' : '+ إضافة منتج جديد'}
          </button>
        </div>
      </form>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 18,
      }}>
        {codes.length === 0 && (
          <p style={{ color: '#8B5A2B', fontSize: '0.9rem' }}>لا توجد منتجات في هذا القسم</p>
        )}
        {codes.map((c) => (
          <div key={c.id} className="wood-card" style={{ padding: 12, textAlign: 'center', background: '#fff' }}>
            <img
              src={c.thumbnail_url}
              alt={c.code_number}
              style={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: 6,
                marginBottom: 10,
                border: '2px solid rgba(139,94,60,0.1)',
              }}
            />
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, color: 'var(--wood-darker)' }}>
              {c.code_number}
            </p>
            <button
              onClick={() => deleteCode(c.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#C0392B',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: 4,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(192,57,43,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 8,
  border: '2px solid rgba(139,94,60,0.15)',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-body)',
  transition: 'all 0.3s ease',
  background: 'white',
}

const labelStyle = {
  display: 'block',
  fontWeight: 700,
  marginBottom: 6,
  fontSize: '0.82rem',
  color: 'var(--wood-darker)',
}