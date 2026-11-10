/**
 * Halaman Admin — mengelola data situs publik.
 *
 * Fitur:
 * 1. Gerbang PIN sederhana (klien; keamanan sungguhan butuh backend).
 * 2. CRUD lengkap: unit Subbag TU, seksi/penyelenggara (struktur, layanan,
 *    SOP, foto, video), serta kanal media sosial.
 * 3. Ekspor/Impor JSON untuk cadangan, dan reset ke data bawaan paket.
 *
 * URL: buka https://<situs>/#/admin
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown, ArrowLeft, ArrowUp, Database, Download, FileJson, KeyRound, LayoutDashboard,
  LogOut, Loader2, Plus, RotateCcw, Save, Share2, Trash2, Upload, Users,
  Building2, Landmark, Globe, Lock, ChevronDown, WifiOff, Moon, Sun, Pencil,
  Eye, EyeOff, HelpCircle
} from 'lucide-react'
import { getData, resetData, saveData, useData, DEFAULT_KEPALA } from '../store.js'
import {
  isSupabaseConfigured, login, logout, markLocalSession, probeServer,
  resetServer, restoreSession, saveSnapshot, uploadFile, verifyAdminSession
} from '../api.js'
import { UnitEditor } from './UnitEditor.jsx'
import { readBackup } from '../backup.js'

// Kredensial masuk panel admin (mode luring)
const ADMIN_USER = 'admin'
const ADMIN_PIN = 'webkemenagwonosobo123'

const TABS = [
  { id: 'kepala', label: 'Kepala Kantor', Icon: Users },
  { id: 'units', label: 'Unit Subbag TU', Icon: Building2 },
  { id: 'seksi', label: 'Seksi & Penyelenggara', Icon: Landmark },
  { id: 'faqs', label: 'Tanya Jawab (Q&A)', Icon: HelpCircle },
  { id: 'social', label: 'Media Sosial', Icon: Share2 },
  { id: 'tools', label: 'Cadangan Data', Icon: Database }
]

function parseHashParams() {
  const hash = window.location.hash || ''
  const qIndex = hash.indexOf('?')
  if (qIndex === -1) return {}
  const params = new URLSearchParams(hash.slice(qIndex + 1))
  return {
    id: params.get('id'),
    tab: params.get('tab')
  }
}

function ThemeToggle({ theme, onToggle }) {
  const Icon = theme === 'dark' ? Sun : Moon
  const label = theme === 'dark' ? 'Mode terang' : 'Mode gelap'
  return (
    <button type="button" className="btn btn-outline btn-sm admin-theme-toggle" onClick={onToggle}>
      <Icon size={16} aria-hidden="true" /> {label}
    </button>
  )
}

function Gate({ onUnlock, theme, onToggleTheme }) {
  const sbActive = isSupabaseConfigured()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const uVal = username.trim()
    const pVal = password.trim()
    if (!uVal || !pVal || busy) return
    setBusy(true)
    setError('')
    try {
      const res = await login(uVal, pVal) // Supabase Auth atau Backend Express
      onUnlock(res?.mode || (sbActive ? 'supabase' : 'server'))
    } catch (err) {
      if (uVal === ADMIN_USER && pVal === ADMIN_PIN) {
        markLocalSession()
        onUnlock('local')
      } else {
        setError(err?.message || 'Email/nama pengguna atau kata sandi salah, silakan periksa kembali.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin admin--gate">
      <form className="admin-gate-card" onSubmit={submit}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <div className="admin-gate-logo-wrap">
          <img
            src="/logo_kemenag.png"
            alt="Logo Kementerian Agama Republik Indonesia"
            className="admin-gate-logo"
          />
        </div>
        <h1>Panel Admin Kemenag Wonosobo</h1>
        <p>
          {sbActive
            ? 'Masuk menggunakan akun resmi Supabase Auth operator Kemenag Wonosobo.'
            : 'Masuk menggunakan kombinasi nama pengguna dan kata sandi operator.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '6px' }}>
          <div>
            <label className="admin-field-label" style={{ textAlign: 'left', display: 'block', marginBottom: '5px', fontSize: '0.8rem' }}>
              {sbActive ? 'Email atau Username Admin' : 'Nama Pengguna (Username)'}
            </label>
            <input
              className={`admin-input ${error ? 'admin-input--error' : ''}`}
              type="text"
              autoComplete="username"
              placeholder={sbActive ? 'admin@kemenagwonosobo.id atau admin' : 'Contoh: admin'}
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              required
            />
          </div>

          <div>
            <label className="admin-field-label" style={{ textAlign: 'left', display: 'block', marginBottom: '5px', fontSize: '0.8rem' }}>
              Kata Sandi (Password)
            </label>
            <div className="admin-password-wrap">
              <input
                className={`admin-input ${error ? 'admin-input--error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                autoFocus
                autoComplete="current-password"
                placeholder="Kata sandi"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
                title={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {error && <p className="admin-error" style={{ marginTop: '10px' }}>{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }} disabled={busy}>
          {busy ? <Loader2 size={16} className="admin-spin" /> : <KeyRound size={16} />}
          {busy ? 'Memeriksa…' : 'Masuk ke Panel'}
        </button>
        <a className="admin-back-home" href="#/">← Kembali ke situs publik</a>
      </form>
    </div>
  )
}

/** Field input generik; multiline = textarea. */
export function Field({ label, value, onChange, multiline = false, placeholder = '', type = 'text' }) {
  const common = {
    className: 'admin-input',
    value: value ?? '',
    placeholder,
    onChange: e => onChange(e.target.value)
  }
  return (
    <label className="admin-field">
      <span className="admin-field-label">{label}</span>
      {multiline
        ? <textarea rows={multiline === 'tall' ? 5 : 3} {...common} />
        : <input type={type} {...common} />}
    </label>
  )
}

/**
 * Field berkas: menyimpan URL di datanya, dengan tombol unggah ke server
 * (POST /api/upload). URL masih bisa ditempel manual bila berkasnya sudah
 * dihosting di tempat lain.
 */
export function UploadField({ label, value, onChange, accept = 'image/*' }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const isDataUrl = typeof value === 'string' && value.startsWith('data:')

  const pick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // agar memilih berkas yang sama dua kali tetap memicu onChange
    if (!file) return
    setBusy(true)
    setError('')
    try {
      onChange(await uploadFile(file))
    } catch (err) {
      setError(err.message || 'Unggah berkas gagal.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-field admin-field--upload">
      <span className="admin-field-label">{label}</span>
      <div className="admin-upload-row">
        <input
          className="admin-input"
          value={isDataUrl ? '' : (value ?? '')}
          placeholder={isDataUrl ? '✓ Foto berhasil dimuat dari perangkat (atau tempel URL baru di sini)' : 'https://… atau unggah foto dari perangkat'}
          onChange={e => onChange(e.target.value)}
        />
        <label className={`btn btn-ghost btn-sm admin-upload-btn ${busy ? 'is-busy' : ''}`}>
          {busy ? <Loader2 size={14} className="admin-spin" /> : <Upload size={14} />}
          {busy ? 'Mengunggah…' : 'Unggah'}
          <input type="file" hidden accept={accept} disabled={busy} onChange={pick} />
        </label>
        {value && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            title="Hapus foto/berkas"
            onClick={() => { onChange(''); setError('') }}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
      {accept.startsWith('image/') && value && (
        <img
          key={value.slice(0, 128)}
          className="admin-upload-preview"
          src={value}
          alt="Pratinjau foto"
          onError={e => { e.currentTarget.style.visibility = 'hidden' }}
        />
      )}
      {error && <span className="admin-error">{error}</span>}
    </div>
  )
}

/** Editor daftar item (struktur, layanan, foto, video, sosial). */
function ListEditor({ items, title, template, fields, makeLabel, onChange }) {
  const [openId, setOpenId] = useState(null)
  const list = items || []

  const mutate = (index, key, value) => {
    const next = list.map((item, i) => i === index ? { ...item, [key]: value } : item)
    onChange(next)
  }
  const remove = (index) => onChange(list.filter((_, i) => i !== index))
  const move = (index, dir) => {
    const target = index + dir
    if (target < 0 || target >= list.length) return
    const next = [...list]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    onChange(next)
  }
  const add = () => {
    // id unik sederhana; sisipkan di akhir daftar.
    const next = [...list, { ...template }]
    onChange(next)
    setOpenId(next.length - 1)
  }

  return (
    <section className="admin-list">
      <header className="admin-list-head">
        <h4>{title} <span className="admin-count">({list.length})</span></h4>
        <div className="admin-list-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={add}><Plus size={14} /> Tambah</button>
        </div>
      </header>

      {list.map((item, index) => {
        const open = openId === index
        return (
          <details key={index} open={open} className="admin-item">
            <summary onClick={e => { e.preventDefault(); setOpenId(open ? null : index) }}>
              <ChevronDown size={15} className={`admin-item-caret ${open ? 'open' : ''}`} aria-hidden="true" />
              <span className="admin-item-title">{makeLabel(item) || `Item ${index + 1}`}</span>
              <span className="admin-item-tools" onClick={e => e.stopPropagation()}>
                <button type="button" aria-label="Pindahkan ke atas" disabled={index === 0}
                  title="Pindahkan ke atas" onClick={() => move(index, -1)}><ArrowUp size={15} /></button>
                <button type="button" aria-label="Pindahkan ke bawah" disabled={index === list.length - 1}
                  title="Pindahkan ke bawah" onClick={() => move(index, 1)}><ArrowDown size={15} /></button>
                <button type="button" className="admin-item-del" aria-label="Hapus"
                  title="Hapus item" onClick={() => setOpenId(null) || remove(index)}><Trash2 size={14} /></button>
              </span>
            </summary>

            <div className="admin-item-body">
              {fields.map(f =>
                f.type === 'file'
                  ? (
                    <UploadField
                      key={f.key}
                      label={f.label}
                      accept={f.accept}
                      value={item[f.key]}
                      onChange={v => mutate(index, f.key, v)}
                    />
                  )
                  : f.type === 'list'
                  ? (
                    <Field
                      key={f.key}
                      label={f.label}
                      multiline="tall"
                      value={(item[f.key] || []).join('\n')}
                      onChange={v => mutate(index, f.key, v.split('\n').map(s => s.trim()).filter(Boolean))}
                    />
                  )
                  : f.type === 'select'
                    ? (
                      <label className="admin-field" key={f.key}>
                        <span className="admin-field-label">{f.label}</span>
                        <select
                          className="admin-input"
                          value={item[f.key] ?? ''}
                          onChange={e => mutate(index, f.key, e.target.value)}
                        >
                          {f.options.map(([v, label]) => (
                            <option key={v} value={v}>{label}</option>
                          ))}
                        </select>
                      </label>
                    )
                    : (
                      <Field
                        key={f.key}
                        label={f.label}
                        placeholder={f.placeholder}
                        multiline={f.multiline}
                        value={item[f.key]}
                        onChange={v => mutate(index, f.key, v)}
                      />
                    )
              )}
            </div>
          </details>
        )
      })}
    </section>
  )
}

export { ListEditor }

/** Editor untuk daftar Tanya Jawab / Q&A (FAQ). */
function FaqEditor({ faqs, onChange }) {
  const fields = [
    { key: 'category', label: 'Kategori Topik (mis. Jam & Lokasi Layanan, Biaya Pelayanan)' },
    { key: 'question', label: 'Pertanyaan' },
    { key: 'answer', label: 'Jawaban Lengkap', multiline: 'tall' }
  ]
  return (
    <div className="admin-editor">
      <div className="admin-editor-head">
        <div>
          <h3>Kelola Tanya Jawab / Q&amp;A (FAQ) Masyarakat</h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-3)', marginTop: '3px' }}>
            Daftar pertanyaan dan jawaban ini ditampilkan pada bagian Tanya Jawab (Q&amp;A) di halaman beranda utama untuk membantu masyarakat memahami layanan Kemenag Wonosobo.
          </p>
        </div>
      </div>
      <ListEditor
        title="Daftar Pertanyaan & Jawaban"
        items={faqs}
        onChange={onChange}
        makeLabel={f => f.question || '(Pertanyaan baru)'}
        template={{ id: `faq-${Date.now()}`, category: 'Informasi Layanan', question: '', answer: '' }}
        fields={fields}
      />
    </div>
  )
}

/** Editor untuk kanal media sosial (SOCIAL_MEDIA_CONTACTS). */
function SocialEditor({ contacts, onChange }) {
  const fields = [
    { key: 'name', label: 'Nama Tampilan' },
    { key: 'handle', label: 'Handle / Nomor' },
    { key: 'url', label: 'URL' },
    { key: 'desc', label: 'Deskripsi', multiline: true },
    { key: 'badge', label: 'Badge' },
    { key: 'btnText', label: 'Teks Tombol' },
    { key: 'iconKey', label: 'Ikon', type: 'select', options: [
      ['youtube', 'YouTube'], ['instagram', 'Instagram'], ['twitter', 'Twitter / X'],
      ['tiktok', 'TikTok'], ['facebook', 'Facebook'], ['whatsapp', 'WhatsApp']
    ] }
  ]
  return (
    <ListEditor
      title="Kanal Media Sosial & Kontak"
      items={contacts}
      onChange={onChange}
      makeLabel={c => `${c.name} (${c.handle || c.id})`}
      template={{ id: `soc-${Date.now()}`, name: '', handle: '', desc: '', url: '', badge: '', btnText: 'Buka', iconKey: 'instagram', icon: '' }}
      fields={fields}
    />
  )
}

function KepalaKantorEditor({ kepala, onChange }) {
  const current = kepala || {}

  const update = (key, val) => {
    onChange({ ...current, [key]: val })
  }

  return (
    <div className="admin-editor">
      <div className="admin-editor-head">
        <div>
          <h3>Pengaturan Profil &amp; Sambutan Kepala Kantor</h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-3)', marginTop: '3px' }}>
            Data pimpinan ini ditampilkan di sebelah kanan bagian Profil &amp; Legalitas Instansi pada beranda utama sebagai informasi pimpinan resmi kantor.
          </p>
        </div>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'var(--surface-2)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <input
            type="checkbox"
            checked={current.aktif !== false}
            onChange={e => update('aktif', e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--green-600)', cursor: 'pointer' }}
          />
          <span style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--text-1)' }}>
            {current.aktif !== false ? 'Aktif (Tampil di Beranda)' : 'Disembunyikan'}
          </span>
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '14px' }}>
        <Field
          label="Nama Lengkap Beserta Gelar"
          value={current.nama}
          placeholder="Contoh: H. Edi Sungkowo, S.Ag., M.Pd.I."
          onChange={v => update('nama', v)}
        />
        <Field
          label="Jabatan Resmi"
          value={current.jabatan}
          placeholder="Contoh: Kepala Kantor Kementerian Agama Kab. Wonosobo"
          onChange={v => update('jabatan', v)}
        />
        <Field
          label="Label / Badge Kartu"
          value={current.badge}
          placeholder="Contoh: Kepala Kantor"
          onChange={v => update('badge', v)}
        />
      </div>

      <div style={{ marginTop: '14px' }}>
        <UploadField
          label="Foto Resmi Kepala Kantor (URL atau Unggah File Foto)"
          value={current.foto}
          onChange={v => update('foto', v)}
          accept="image/*"
        />
      </div>

      <div style={{ marginTop: '14px' }}>
        <Field
          label="Kutipan Sambutan / Komitmen Pelayanan"
          value={current.sambutan}
          multiline="tall"
          placeholder="Tuliskan komitmen pelayanan publik, visi, atau arahan Kepala Kantor..."
          onChange={v => update('sambutan', v)}
        />
      </div>
    </div>
  )
}

function BackupTab({ draft, onImport, onReset }) {
  const fileRef = useRef(null)
  const jsonString = useMemo(() => JSON.stringify(draft, null, 2), [draft])

  const download = () => {
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `kemenag-wonosobo-data-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const pick = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    try {
      const parsed = JSON.parse(await readBackup(file))
      if (!parsed.units || !parsed.seksi || !parsed.social) {
        throw new Error('Struktur tidak sesuai (harus ada units, seksi, social)')
      }
      onImport(parsed)
    } catch (err) {
      alert(`Impor gagal: ${err.message}`)
    }
  }

  return (
    <div className="admin-backup">
      <div className="admin-backup-card">
        <FileJson size={20} />
        <div>
          <h4>Ekspor Data</h4>
          <p>Unduh snapshot sebagai berkas JSON yang mudah dibuka dan dibaca.</p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={download}><Download size={14} /> Unduh JSON</button>
      </div>

      <div className="admin-backup-card">
        <Upload size={20} />
        <div>
          <h4>Impor Data</h4>
          <p>Mengganti draft dari berkas JSON atau cadangan .kewbak lama. Wajib Simpan untuk menerapkan.</p>
        </div>
        <label className="btn btn-ghost btn-sm">
          Pilih Berkas<input ref={fileRef} type="file" hidden accept=".kewbak,.gz,.json,application/json,application/gzip" onChange={pick} />
        </label>
      </div>

      <div className="admin-backup-card admin-backup-card--danger">
        <RotateCcw size={20} />
        <div>
          <h4>Reset ke Data Bawaan</h4>
          <p>Menghapus seluruh perubahan admin; situs kembali memakai data paket.</p>
        </div>
        <button type="button" className="btn btn-sm admin-btn-danger" onClick={onReset}><RotateCcw size={14} /> Reset</button>
      </div>
    </div>
  )
}

export default function AdminApp() {
  const live = useData() // data aktif: hasil server (di-cache) atau bawaan paket
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light')
  const [session, setSession] = useState(() => restoreSession()) // 'server' | 'local' | null
  const [serverUp, setServerUp] = useState(null) // null = sedang diperiksa
  const [tab, setTab] = useState(() => {
    const { id, tab: t } = parseHashParams()
    if (t) return t
    if (id) {
      if (id === 'kepala') return 'kepala'
      if (id === 'subbag-tu') return 'units'
      const d = getData()
      if (d.seksi?.some(s => s.id === id && s.id !== 'subbag-tu')) return 'seksi'
      if (d.units?.some(u => u.id === id)) return 'units'
    }
    return 'kepala'
  })
  const [activeUnitId, setActiveUnitId] = useState(() => {
    const { id } = parseHashParams()
    if (id) {
      if (id === 'subbag-tu') return 'ptsp'
      const d = getData()
      if (d.units?.some(u => u.id === id)) return id
    }
    return null
  })
  const [activeSeksiId, setActiveSeksiId] = useState(() => {
    const { id } = parseHashParams()
    if (id && id !== 'subbag-tu') {
      const d = getData()
      if (d.seksi?.some(s => s.id === id)) return id
    }
    return null
  })
  const [draft, setDraft] = useState(() => getData())
  const [savedFlash, setSavedFlash] = useState(false)
  const [busy, setBusy] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Sinkronkan pilihan unit jika URL hash berubah (mis. tombol Edit di klik dari halaman lain)
  useEffect(() => {
    const handleHash = () => {
      const { id, tab: t } = parseHashParams()
      if (t) setTab(t)
      if (id) {
        if (id === 'kepala') {
          setTab('kepala')
        } else if (id === 'subbag-tu') {
          setTab('units')
          setActiveUnitId('ptsp')
        } else if (draft.seksi?.some(s => s.id === id)) {
          setTab('seksi')
          setActiveSeksiId(id)
        } else if (draft.units?.some(u => u.id === id)) {
          setTab('units')
          setActiveUnitId(id)
        }
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [draft])

  // Cek sekali apakah backend / Supabase hidup, serta verifikasi token Protected Route (#/admin)
  useEffect(() => {
    let alive = true
    probeServer().then(ok => { if (alive) setServerUp(ok) })
    verifyAdminSession().then(validMode => {
      if (alive && session && !validMode) {
        setSession(null)
      }
    })
    return () => { alive = false }
  }, [session])

  const units = draft.units || []
  const seksi = draft.seksi || []
  const seksiList = seksi.filter(s => s.id !== 'subbag-tu')

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(live), [draft, live])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch { /* penyimpanan privat */ }
    setTheme(next)
  }

  const setSection = (key, value) => setDraft(d => ({ ...d, [key]: value }))

  const save = async () => {
    if (busy) return
    setBusy(true)
    setSaveError('')
    try {
      if (session === 'supabase' || session === 'server') {
        try {
          await saveSnapshot(draft)
        } catch (serverErr) {
          if (session === 'supabase' && serverErr?.status === 401) {
            setSession(null)
            throw new Error('Sesi Supabase Auth berakhir. Silakan login kembali.')
          }
          // Jika server Express tidak aktif / 404 (mode hosting statis / Vite dev tanpa server),
          // otomatis beralih ke penyimpanan lokal agar perubahan tetap tersimpan.
          if (session === 'server' && (serverErr?.status === 0 || serverErr?.status === 404 || serverErr?.status === 405 || serverErr?.status >= 500)) {
            markLocalSession()
            setSession('local')
          } else {
            throw serverErr
          }
        }
      }
      // Perbarui cache luring + broadcast ke komponen lain.
      saveData(structuredClone(draft))
      setSavedFlash(true)
      setTimeout(() => setSavedFlash(false), 1600)
    } catch (err) {
      setSaveError(err.message || 'Gagal menyimpan data.')
    } finally {
      setBusy(false)
    }
  }

  const reload = () => setDraft(getData())

  const doReset = useCallback(async () => {
    if (!confirm('Hapus SEMUA perubahan admin & kembali ke data bawaan?')) return
    setBusy(true)
    setSaveError('')
    try {
      resetData()
      const freshDefault = getData()
      if (session === 'supabase' || session === 'server') {
        await resetServer(freshDefault)
      }
      setDraft(freshDefault)
    } catch (err) {
      setSaveError(err.message || 'Gagal mengatur ulang data.')
    } finally {
      setBusy(false)
    }
  }, [session])

  const doImport = (parsed) => setDraft(d => ({
    ...d,
    ...parsed,
    kepalaKantor: parsed.kepalaKantor || d.kepalaKantor || DEFAULT_KEPALA
  }))

  const doLogout = async () => {
    const yakin = window.confirm('Apakah Anda yakin ingin keluar dari Panel Admin Kemenag Wonosobo?')
    if (!yakin) return
    await logout()
    setSession(null)
    window.location.hash = '#/'
  }

  if (!session) return <Gate onUnlock={setSession} theme={theme} onToggleTheme={toggleTheme} />

  return (
    <div className="admin">
      <header className="admin-topbar">
        <a className="admin-home" href="#/"><ArrowLeft size={15} /> Situs Publik</a>
        <div className="admin-topbar-title">
          <img src="/logo_kemenag.png" alt="" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
          <strong>Panel Admin · Kemenag Kab. Wonosobo</strong>
        </div>
        <div className="admin-topbar-actions">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <span className="admin-offline-chip">
            {session === 'supabase' ? 'Supabase Cloud Aktif' : session === 'server' ? 'Server Aktif' : 'Editor Aktif'}
          </span>
          {dirty && <span className="admin-dirty-chip">Perubahan belum disimpan</span>}
          <button type="button" className="btn btn-outline btn-sm" onClick={reload} disabled={!dirty || busy}>
            <RotateCcw size={14} /> Buang Perubahan
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={save} disabled={!dirty || busy}>
            {busy ? <Loader2 size={14} className="admin-spin" /> : <Save size={14} />}
            {busy ? 'Menyimpan…' : savedFlash ? 'Tersimpan!' : 'Simpan'}
          </button>
          <button type="button" className="icon-btn" title="Keluar admin" onClick={doLogout}>
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Ucapan Selamat Datang Admin */}
      <div className="admin-welcome-bar">
        <div className="container admin-welcome-inner">
          <div className="admin-welcome-text">
            <h3>Selamat Datang, Admin! 👋</h3>
            <p>Kelola data pejabat, layanan, dokumentasi foto/video, dan kanal resmi Kemenag Wonosobo dengan mudah.</p>
          </div>
          <span className="admin-welcome-badge">
            Admin Kemenag Terautentikasi
          </span>
        </div>
      </div>

      {saveError && (
        <p className="admin-save-error" role="alert">{saveError}</p>
      )}

      <nav className="admin-tabs" role="tablist">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            className={`admin-tab ${tab === id ? 'active' : ''}`}
            onClick={() => setTab(id)}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>

      <main className="admin-main container">
        {tab === 'kepala' && (
          <KepalaKantorEditor
            kepala={draft.kepalaKantor}
            onChange={next => setSection('kepalaKantor', next)}
          />
        )}

        {tab === 'units' && (
          <div className="admin-col">
            <div className="admin-pick">
              <label className="admin-field-label">Pilih Unit Subbag TU yang ingin diedit:</label>
              <div className="admin-pick-row">
                {units.map(u => (
                  <button
                    key={u.id}
                    type="button"
                    className={`admin-pick-btn ${activeUnitId === u.id ? 'active' : ''}`}
                    onClick={() => setActiveUnitId(u.id)}
                  >
                    <Pencil size={13} /> {u.title}
                  </button>
                ))}
              </div>
            </div>
            {activeUnitId ? (
              <UnitEditor
                unit={units.find(u => u.id === activeUnitId)}
                onChange={next => setSection('units', units.map(u => u.id === next.id ? next : u))}
                onDelete={() => {
                  if (!confirm(`Hapus unit "${activeUnitId}"?`)) return
                  setSection('units', units.filter(u => u.id !== activeUnitId))
                  setActiveUnitId(null)
                }}
              />
            ) : (
              <div className="admin-empty-state">
                <Pencil size={24} className="admin-empty-icon" />
                <h4>Pilih Unit di Atas untuk Mengedit</h4>
                <p>Klik salah satu tombol unit di atas untuk mengedit nama, deskripsi, layanan, personil, atau fotonya.</p>
              </div>
            )}
          </div>
        )}

        {tab === 'seksi' && (
          <div className="admin-col">
            <div className="admin-pick">
              <label className="admin-field-label">Pilih Seksi / Penyelenggara yang ingin diedit:</label>
              <div className="admin-pick-row">
                {seksiList.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    className={`admin-pick-btn ${activeSeksiId === s.id ? 'active' : ''}`}
                    onClick={() => setActiveSeksiId(s.id)}
                  >
                    <Pencil size={13} /> {s.title}
                  </button>
                ))}
              </div>
            </div>
            {activeSeksiId ? (
              <UnitEditor
                unit={seksi.find(s => s.id === activeSeksiId)}
                onChange={next => setSection('seksi', seksi.map(s => s.id === next.id ? next : s))}
                onDelete={() => {
                  if (!confirm(`Hapus seksi "${activeSeksiId}"?`)) return
                  setSection('seksi', seksi.filter(s => s.id !== activeSeksiId))
                  setActiveSeksiId(null)
                }}
              />
            ) : (
              <div className="admin-empty-state">
                <Pencil size={24} className="admin-empty-icon" />
                <h4>Pilih Seksi di Atas untuk Mengedit</h4>
                <p>Klik salah satu tombol seksi di atas (misal <strong>Seksi Bimas Islam</strong>) untuk mengedit teks judul, deskripsi, personil, layanan, dan dokumentasi.</p>
              </div>
            )}
          </div>
        )}

        {tab === 'faqs' && (
          <FaqEditor
            faqs={draft.faqs || []}
            onChange={next => setSection('faqs', next)}
          />
        )}

        {tab === 'social' && (
          <SocialEditor
            contacts={draft.social || []}
            onChange={next => setSection('social', next)}
          />
        )}

        {tab === 'tools' && (
          <BackupTab draft={draft} onImport={doImport} onReset={doReset} />
        )}

        <footer className="admin-note">
          Panel Editor Portal Kemenag Kabupaten Wonosobo. Gunakan menu <strong>Cadangan Data</strong> untuk mengunduh snapshot berkas JSON pembaruan data.
        </footer>
      </main>
    </div>
  )
}
