import { useEffect, useState } from 'react'
import {
  ArrowLeft, Users, FileText, Images, PlayCircle, Calendar,
  CheckCircle2, Timer, Download, Eye, Share2, Check,
  Building2, BookHeart, GraduationCap, BookOpenCheck, Landmark,
  Coins, Compass, Cross, Newspaper
} from 'lucide-react'
import { findUnit, toRawPhone } from '../store.js'
import { WhatsAppIcon } from '../icons.jsx'

const ICONS = {
  'building-2': Building2,
  'book-heart': BookHeart,
  'graduation-cap': GraduationCap,
  'book-open-check': BookOpenCheck,
  'landmark': Landmark,
  'coins': Coins,
  'compass': Compass,
  'cross': Cross,
  'newspaper': Newspaper
}

const TABS = [
  { id: 'struktur', label: 'Struktur Organisasi', Icon: Users },
  { id: 'layanan', label: 'Layanan & SOP', Icon: FileText },
  { id: 'foto', label: 'Foto Kegiatan', Icon: Images },
  { id: 'video', label: 'Video Kegiatan', Icon: PlayCircle }
]

function waUrlFor(unit) {
  const msg = encodeURIComponent(
    `Halo Petugas ${unit.fullTitle || unit.title}, saya ingin berkonsultasi mengenai pelayanan di Kantor Kemenag Wonosobo.`
  )
  const phone = unit.contact?.rawPhone || toRawPhone(unit.contact?.phone)
  return `https://api.whatsapp.com/send?phone=${phone}&text=${msg}`
}

function StrukturTab({ unit }) {
  const list = unit.structure || []
  if (!list.length) {
    return <p className="empty-note">Data personil sedang diperbarui oleh bagian kepegawaian.</p>
  }
  return (
    <div className="person-grid">
      {list.map(person => (
        <div className="person-card" key={person.name}>
          <img
            className="person-avatar"
            src={person.photo}
            alt={`Foto ${person.name}`}
            loading="lazy"
            onError={e => { e.currentTarget.src = '/logo_kemenag.png' }}
          />
          <div className="person-info">
            <p className="person-name">{person.name}</p>
            <p className="person-role">{person.role}</p>
            {person.pangkat && <p className="person-pangkat">{person.pangkat}</p>}
            {person.badge && <span className="person-badge">{person.badge}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

function LayananTab({ unit, onOpenSop }) {
  const services = unit.services || []
  if (!services.length) {
    return <p className="empty-note">Belum ada daftar layanan yang dipublikasikan.</p>
  }
  return (
    <div className="service-list">
      {services.map(svc => (
        <article className="service-card" key={svc.id}>
          <header className="service-card-head">
            <h4>{svc.title}</h4>
            <span className="chip chip-free">{svc.biaya || 'Gratis'}</span>
          </header>
          <p className="service-desc">{svc.desc}</p>

          <div className="service-details">
            <div>
              <h5>Persyaratan</h5>
              <ul>
                {(svc.syarat || []).map(s => (
                  <li key={s}><CheckCircle2 size={14} aria-hidden="true" /> {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Prosedur &amp; Waktu</h5>
              <p className="service-flow">{svc.prosedur}</p>
              <p className="service-time"><Timer size={14} aria-hidden="true" /> Estimasi selesai: <strong>{svc.waktu}</strong></p>
            </div>
          </div>

          <footer className="service-actions">
            <button type="button" className="btn btn-ghost" onClick={() => onOpenSop(svc, unit)}>
              <Eye size={15} /> Pratinjau SOP
            </button>
            {svc.fileUrl ? (
              <a className="btn btn-ghost" href={svc.fileUrl} download>
                <Download size={15} /> Unduh Berkas Resmi
              </a>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={() => import('../pdf.js').then(({ downloadSopPdf }) => downloadSopPdf(svc, unit))}>
                <Download size={15} /> Unduh PDF
              </button>
            )}
          </footer>
        </article>
      ))}
    </div>
  )
}

function FotoTab({ unit, onOpenLightbox }) {
  const photos = unit.photos || []
  if (!photos.length) {
    return <p className="empty-note">Belum ada dokumentasi foto kegiatan terbaru.</p>
  }
  return (
    <div className="photo-grid">
      {photos.map(p => (
        <figure className="photo-card" key={p.title}>
          <button
            type="button"
            className="photo-thumb"
            onClick={() => onOpenLightbox({ src: p.image, caption: p.title })}
            aria-label={`Perbesar foto: ${p.title}`}
          >
            <img src={p.image} alt={p.title} loading="lazy" />
          </button>
          <figcaption className="photo-meta">
            <p className="photo-title">{p.title}</p>
            <p className="photo-caption">{p.caption}</p>
            <div className="photo-links">
              <span className="photo-date"><Calendar size={13} aria-hidden="true" /> {p.date}</span>
              <a href={p.igUrl || 'https://www.instagram.com/kemenagwonosobo/'} target="_blank" rel="noopener noreferrer">
                Lihat di Instagram
              </a>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

const isLocalVideo = (v) =>
  v.platform === 'Lokal' || String(v.videoUrl || '').startsWith('/uploads/')

function VideoTab({ unit }) {
  const videos = unit.videos || []
  if (!videos.length) {
    return <p className="empty-note">Belum ada dokumentasi video kegiatan.</p>
  }
  return (
    <div className="video-grid">
      {videos.map(v => {
        const local = isLocalVideo(v)
        return (
          <article className="video-card" key={v.title}>
            <div className="video-thumb">
              {local ? (
                <video controls preload="metadata" poster={v.thumbnail} src={v.videoUrl} />
              ) : v.videoUrl ? (
                <a href={v.videoUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
                  <img src={v.thumbnail || '/placeholder-video.jpg'} alt={v.title} loading="lazy" />
                </a>
              ) : (
                <img src={v.thumbnail || '/placeholder-video.jpg'} alt={v.title} loading="lazy" />
              )}
              {!local && v.platform && <span className="video-platform">{v.platform}</span>}
              {v.duration && !local && <span className="video-duration">{v.duration}</span>}
            </div>
            <div className="video-meta">
              <p className="video-title">{v.title}</p>
              <p className="video-date"><Calendar size={13} aria-hidden="true" /> {v.date}</p>
              {!local && v.videoUrl && (
                <a className="btn btn-ghost btn-sm" href={v.videoUrl} target="_blank" rel="noopener noreferrer">
                  <PlayCircle size={15} /> Tonton di {v.platform || 'Media Sosial'}
                </a>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export function UnitPage({ unitId, subId, units = [], seksi = [], onOpenSop, onOpenLightbox, onBack }) {
  const [tab, setTab] = useState('struktur')
  const [subUnitId, setSubUnitId] = useState(subId || 'ptsp')
  const [copied, setCopied] = useState(false)

  // Jika subId berubah dari URL
  useEffect(() => {
    if (subId) setSubUnitId(subId)
  }, [subId])

  // Scroll ke atas saat halaman unit dibuka
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [unitId, subUnitId])

  const isTu = unitId === 'subbag-tu' || units.some(u => u.id === unitId)
  const unit = isTu
    ? (unitId !== 'subbag-tu' ? findUnit(units, unitId) : findUnit(units, subUnitId))
    : findUnit(seksi, unitId)

  if (!unit) {
    return (
      <div className="container unit-page-container">
        <div className="empty-note" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h3>Unit atau Seksi Tidak Ditemukan</h3>
          <p>Halaman yang Anda tuju mungkin sudah dipindahkan atau diganti.</p>
          <a href="#/" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex' }}>
            <ArrowLeft size={16} /> Kembali ke Beranda
          </a>
        </div>
      </div>
    )
  }

  const headerIcon = unit.icon
  const HeaderIcon = ICONS[headerIcon] || Landmark
  const pageTitle = isTu ? `Subbag Tata Usaha — ${unit.fullTitle || unit.title}` : (unit.fullTitle || unit.title)

  const copyLink = () => {
    const url = window.location.href
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleSubUnitChange = (id) => {
    setSubUnitId(id)
    window.location.hash = `#/unit/subbag-tu?sub=${id}`
  }

  return (
    <div className="unit-page">
      {/* Bar Navigasi Atas & Breadcrumb */}
      <div className="unit-page-nav-bar">
        <div className="container unit-page-nav-inner">
          <nav className="unit-breadcrumb" aria-label="Breadcrumb">
            <a href="#/">Beranda</a>
            <span className="unit-breadcrumb-sep">/</span>
            <span className="unit-breadcrumb-current">{unit.title}</span>
          </nav>

          <div className="unit-page-actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={copyLink} title="Salin link halaman ini">
              {copied ? <Check size={14} className="text-emerald" /> : <Share2 size={14} />}
              {copied ? 'Tautan Disalin!' : 'Bagikan'}
            </button>
            <a href="#/" className="btn btn-primary btn-sm" onClick={(e) => { e.preventDefault(); onBack ? onBack() : (window.location.hash = '#/') }}>
              <ArrowLeft size={14} /> Beranda
            </a>
          </div>
        </div>
      </div>

      <div className="container unit-page-container">
        {/* Banner Kartu Header Unit */}
        <header className="unit-page-header">
          <div className="unit-page-header-main">
            <span className="unit-page-icon">
              <HeaderIcon size={32} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div className="unit-page-intro">
              <span className="modal-badge">{isTu ? 'Subbag Tata Usaha' : (unit.badge || 'Unit Resmi')}</span>
              <h1 className="unit-page-title">{pageTitle}</h1>
              {unit.subtitle && <p className="unit-page-subtitle">{unit.subtitle}</p>}
              {unit.description && <p className="unit-page-desc">{unit.description}</p>}
            </div>
          </div>

          {unit.contact?.hours && (
            <div className="unit-page-contact-card">
              <div className="unit-page-contact-hours">
                <Timer size={15} aria-hidden="true" />
                <span>Jam Pelayanan: <strong>{unit.contact.hours}</strong></span>
              </div>
            </div>
          )}
        </header>

        {/* Tab Sub-Unit khusus Subbag TU */}
        {isTu && (
          <div className="unit-page-subunits">
            <label className="unit-page-subunits-label">Pilih Bagian Layanan Subbag TU:</label>
            <nav className="subunit-nav" aria-label="Bidang layanan Subbag TU">
              {units.map(sub => (
                <button
                  key={sub.id}
                  type="button"
                  className={sub.id === unit.id ? 'active' : ''}
                  onClick={() => handleSubUnitChange(sub.id)}
                >
                  {sub.title}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Navigasi Tab Utama */}
        <div className="unit-page-tabs-wrap">
          <div className="modal-tabs" role="tablist">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={tab === id ? 'active' : ''}
                onClick={() => setTab(id)}
              >
                <Icon size={16} aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Konten Tab */}
        <main className="unit-page-body">
          {tab === 'struktur' && <StrukturTab unit={unit} />}
          {tab === 'layanan' && <LayananTab unit={unit} onOpenSop={onOpenSop} />}
          {tab === 'foto' && <FotoTab unit={unit} onOpenLightbox={onOpenLightbox} />}
          {tab === 'video' && <VideoTab unit={unit} />}
        </main>
      </div>
    </div>
  )
}
