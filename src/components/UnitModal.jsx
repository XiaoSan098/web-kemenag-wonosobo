import { useState } from 'react'
import {
  X, Users, FileText, Images, PlayCircle, Calendar, CheckCircle2,
  Timer, Download, Eye, Building2, BookHeart, GraduationCap,
  BookOpenCheck, Landmark, Coins, Compass, Cross, Newspaper
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
  { id: 'video', label: 'Video', Icon: PlayCircle }
]

function waUrlFor(unit) {
  const msg = encodeURIComponent(
    `Halo Petugas ${unit.fullTitle || unit.title}, saya ingin berkonsultasi mengenai pelayanan di Kantor Kemenag Wonosobo.`
  )
  const phone = unit.contact.rawPhone || toRawPhone(unit.contact.phone)
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
            {person.nip && <p className="person-nip">NIP {person.nip}</p>}
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
              // Berkas resmi yang diunggah admin lewat panel kelola
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

// Video hasil unggahan admin (URL /uploads/...) diputar langsung di kartu;
// tautan eksternal (YouTube/Instagram) tetap dibuka di tab baru.
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
              ) : (
                <img src={v.thumbnail} alt={v.title} loading="lazy" />
              )}
              {!local && <span className="video-platform">{v.platform}</span>}
              {v.duration && !local && <span className="video-duration">{v.duration}</span>}
            </div>
            <div className="video-meta">
              <p className="video-title">{v.title}</p>
              <p className="video-date"><Calendar size={13} aria-hidden="true" /> {v.date}</p>
              {!local && (
                <a className="btn btn-ghost btn-sm" href={v.videoUrl} target="_blank" rel="noopener noreferrer">
                  <PlayCircle size={15} /> Tonton di {v.platform === 'YouTube' ? 'YouTube' : 'Instagram'}
                </a>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export function UnitModal({ unitId, units = [], seksi = [], onClose, onOpenSop, onOpenLightbox }) {
  const [tab, setTab] = useState('struktur')
  const [subUnitId, setSubUnitId] = useState('ptsp')

  const isTu = unitId === 'subbag-tu' || units.some(u => u.id === unitId)
  const unit = isTu
    ? (unitId !== 'subbag-tu' ? findUnit(units, unitId) : findUnit(units, subUnitId))
    : findUnit(seksi, unitId)

  if (!unit) return null

  const headerIcon = unit.icon
  const HeaderIcon = ICONS[headerIcon] || Landmark
  const heading = isTu
    ? `Subbag Tata Usaha — ${unit.fullTitle || unit.title}`
    : (unit.fullTitle || unit.title)

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={heading} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <header className="modal-head">
          <span className="modal-head-icon"><HeaderIcon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
          <div className="modal-head-text">
            <span className="modal-badge">{isTu ? 'Subbag Tata Usaha' : unit.badge}</span>
            <h3>{heading}</h3>
            {unit.subtitle && <p>{unit.subtitle}</p>}
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Tutup dialog">
            <X size={18} />
          </button>
        </header>

        {isTu && (
          <nav className="subunit-nav" aria-label="Bidang layanan Subbag TU">
            {units.map(sub => (
              <button
                key={sub.id}
                type="button"
                className={sub.id === unit.id ? 'active' : ''}
                onClick={() => setSubUnitId(sub.id)}
              >
                {sub.title}
              </button>
            ))}
          </nav>
        )}

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
              <Icon size={15} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>

        <div className="modal-body">
          {tab === 'struktur' && <StrukturTab unit={unit} />}
          {tab === 'layanan' && <LayananTab unit={unit} onOpenSop={onOpenSop} />}
          {tab === 'foto' && <FotoTab unit={unit} onOpenLightbox={onOpenLightbox} />}
          {tab === 'video' && <VideoTab unit={unit} />}
        </div>

        {unit.contact && (
          <footer className="modal-foot">
            <span className="modal-foot-hours"><Timer size={14} aria-hidden="true" /> {unit.contact.hours || 'Senin–Jumat'}</span>
            <a className="btn btn-wa" href={waUrlFor(unit)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={15} /> {unit.contact.officer}
            </a>
          </footer>
        )}
      </div>
    </div>
  )
}
