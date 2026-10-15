/**
 * UnitEditor — editor form untuk satu objek unit Subbag TU / seksi.
 * Memakai ListEditor dinamis dari AdminApp.jsx sehingga semua struktur,
 * layanan (SOP), foto, dan video bisa ditambah/hapus/mengurutkan.
 */
import { Trash2 } from 'lucide-react'
import { toRawPhone } from '../store.js'
import { Field, ListEditor } from './AdminApp.jsx'

const ICON_OPTIONS = [
  ['building-2', 'Building'], ['book-heart', 'Book Heart'],
  ['graduation-cap', 'Graduation Cap'], ['book-open-check', 'Book Open Check'],
  ['landmark', 'Landmark'], ['coins', 'Coins'], ['compass', 'Compass'],
  ['cross', 'Cross'], ['newspaper', 'Newspaper']
]

const COLOR_OPTIONS = ['emerald', 'teal', 'blue', 'amber', 'purple', 'rose', 'indigo']

// Jenis berkas mengikuti filter server/index.js agar berkasnya tidak ditolak
// setelah terlanjur diunggah.
const IMAGE_ACCEPT = 'image/png,image/jpeg,image/webp'
const PDF_ACCEPT = 'application/pdf'
const VIDEO_ACCEPT = 'video/mp4,video/webm,video/quicktime'

const STRUCTURE_FIELDS = [
  { key: 'name', label: 'Nama' },
  { key: 'role', label: 'Jabatan' },
  { key: 'nip', label: 'NIP (kosongkan jika bukan ASN)' },
  { key: 'badge', label: 'Badge (mis. Kepala Seksi)' },
  { key: 'photo', label: 'Foto pegawai', type: 'file', accept: IMAGE_ACCEPT }
]

const SERVICE_FIELDS = [
  { key: 'title', label: 'Nama Layanan' },
  { key: 'desc', label: 'Deskripsi', multiline: true },
  { key: 'syarat', label: 'Persyaratan (satu per baris)', type: 'list' },
  { key: 'prosedur', label: 'Prosedur / Alur', multiline: true },
  { key: 'waktu', label: 'Jangka waktu penyelesaian' },
  { key: 'biaya', label: 'Biaya / tarif' },
  { key: 'pdfCode', label: 'Nomor SOP (pdfCode)' },
  { key: 'pdfName', label: 'Nama unduhan PDF (pdfName)' },
  // Bila diisi, tombol "Unduh Berkas Resmi" memakai PDF ini alih-alih
  // PDF yang dibuat di peramban (lihat UnitModal.jsx).
  { key: 'fileUrl', label: 'Berkas SOP resmi (PDF)', type: 'file', accept: PDF_ACCEPT }
]

const PHOTO_FIELDS = [
  { key: 'title', label: 'Judul Foto' },
  { key: 'date', label: 'Tanggal' },
  { key: 'image', label: 'Gambar', type: 'file', accept: IMAGE_ACCEPT },
  { key: 'caption', label: 'Caption', multiline: true },
  { key: 'igUrl', label: 'URL Instagram' }
]

const VIDEO_FIELDS = [
  { key: 'title', label: 'Judul Video' },
  { key: 'date', label: 'Tanggal' },
  { key: 'duration', label: 'Durasi (mis. 04:12)' },
  { key: 'thumbnail', label: 'Thumbnail', type: 'file', accept: IMAGE_ACCEPT },
  { key: 'platform', label: 'Platform', type: 'select', options: [['YouTube', 'YouTube'], ['Instagram', 'Instagram'], ['Lokal', 'Lokal (unggahan sendiri)']] },
  { key: 'videoUrl', label: 'Berkas video / URL', type: 'file', accept: VIDEO_ACCEPT },
  { key: 'embedUrl', label: 'URL embed (opsional)' }
]

/* Definisi kolom tiap sub-daftar */
export function UnitEditor({ unit, onChange, onDelete }) {
  if (!unit) return null
  const set = (key, value) => onChange({ ...unit, [key]: value })

  return (
    <div className="admin-editor">
      <header className="admin-editor-head">
        <h3>{unit.fullTitle || unit.title}</h3>
        <button type="button" className="btn btn-outline btn-sm" onClick={onDelete}>
          <Trash2 size={14} /> Hapus Unit
        </button>
      </header>

      <div className="admin-grid">
        <Field label="ID (slug, tanpa spasi)" value={unit.id} onChange={v => set('id', v.trim().toLowerCase().replace(/\s+/g, '-'))} />
        <Field label="Judul Kartu" value={unit.title} onChange={v => set('title', v)} />
        <Field label="Nama panjang" value={unit.fullTitle} onChange={v => set('fullTitle', v)} />
        <Field label="Subtitle" value={unit.subtitle} onChange={v => set('subtitle', v)} />
        <Field label="Badge" value={unit.badge} onChange={v => set('badge', v)} />
        <Field label="Deskripsi" value={unit.description} multiline="tall" onChange={v => set('description', v)} />
      </div>
      <div className="admin-grid admin-grid--3">
        <label className="admin-field">
          <span className="admin-field-label">Ikon</span>
          <select className="admin-input" value={unit.icon ?? 'building-2'} onChange={e => set('icon', e.target.value)}>
            {ICON_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
        <label className="admin-field">
          <span className="admin-field-label">Warna Accent</span>
          <select className="admin-input" value={unit.color ?? 'emerald'} onChange={e => set('color', e.target.value)}>
            {COLOR_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <Field
          label="Nomor WhatsApp"
          value={unit.contact?.phone}
          placeholder="+62 812-3456-7890"
          onChange={v => set('contact', { ...(unit.contact || {}), phone: v, rawPhone: toRawPhone(v) })}
        />
      </div>
      {unit.contact && (
        <div className="admin-grid admin-grid--3">
          <Field label="Nama Petugas" value={unit.contact.officer} onChange={v => set('contact', { ...unit.contact, officer: v })} />
          <Field label="Role" value={unit.contact.role} onChange={v => set('contact', { ...unit.contact, role: v })} />
          <Field label="Jam Layanan" value={unit.contact.hours} onChange={v => set('contact', { ...unit.contact, hours: v })} />
        </div>
      )}

      <ListEditor
        title="Struktur Organisasi"
        items={unit.structure}
        fields={STRUCTURE_FIELDS}
        makeLabel={p => `${p.name || '(tanpa nama)'} — ${p.role || ''}`}
        template={{ name: '', role: '', nip: '', photo: '', badge: '' }}
        onChange={next => set('structure', next)}
      />
      <ListEditor
        title="Layanan & SOP"
        items={unit.services}
        fields={SERVICE_FIELDS}
        makeLabel={s => s.title || '(Layanan baru)'}
        template={{ id: `svc-${Date.now().toString(36)}`, title: '', desc: '', syarat: [], prosedur: '', waktu: '', biaya: 'Gratis (Rp 0,-)', pdfName: '', pdfCode: '' }}
        onChange={next => set('services', next)}
      />
      <ListEditor
        title="Foto Kegiatan"
        items={unit.photos}
        fields={PHOTO_FIELDS}
        makeLabel={p => p.title || '(Foto baru)'}
        template={{ title: '', date: '', image: '', caption: '', igUrl: '' }}
        onChange={next => set('photos', next)}
      />
      <ListEditor
        title="Video Kegiatan"
        items={unit.videos}
        fields={VIDEO_FIELDS}
        makeLabel={v => v.title || '(Video baru)'}
        template={{ title: '', date: '', duration: '', platform: 'YouTube', thumbnail: '', videoUrl: '', embedUrl: '' }}
        onChange={next => set('videos', next)}
      />
    </div>
  )
}
