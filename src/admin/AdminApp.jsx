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
  Eye, EyeOff
} from 'lucide-react'
import { getData, resetData, saveData, useData } from '../store.js'
import {
  login, logout, markLocalSession, probeServer, resetServer, restoreSession,
  saveSnapshot, uploadFile
} from '../api.js'
import { UnitEditor } from './UnitEditor.jsx'
import { readBackup } from '../backup.js'

// Gerbang masuk memakai kata sandi server (ADMIN_PASSWORD di .env).
// PIN di bawah hanya jaring pengaman saat backend tidak aktif — mis. situs
// diterbitkan sebagai hosting statis — supaya operator tetap bisa menyunting
// data lokal di browsernya.
const ADMIN_PIN = 'kemenag2026'

const TABS = [
  { id: 'units', label: 'Unit Subbag TU', Icon: Building2 },
  { id: 'seksi', label: 'Seksi & Penyelenggara', Icon: Landmark },
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

function Gate({ onUnlock, serverUp, theme, onToggleTheme }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const value = pin.trim()
    if (!value || busy) return
    setBusy(true)
    setError('')
    try {
      await login(value) // kata sandi server → token admin disimpan
      onUnlock('server')
    } catch (err) {
      if (err.status === 401) {
        setError('Kata sandi salah, coba lagi.')
        setPin('')
      } else if (value === ADMIN_PIN) {
        // Backend tak terjangkau: lanjut menyunting salinan lokal browser.
        markLocalSession()
        onUnlock('local')
      } else {
        setError('Server tidak terjangkau. Masuk memakai PIN luring, atau jalankan server (npm run server).')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin admin--gate">
      <form className="admin-gate-card" onSubmit={submit}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <span className="admin-gate-icon"><Lock size={22} /></span>
        <h1>Panel Admin Kemenag Wonosobo</h1>
        <p>Masuk memakai kata sandi operator untuk mengelola data situs.</p>
        <div className="admin-password-wrap">
          <input
            className={`admin-input ${error ? 'admin-input--error' : ''}`}
            type={showPassword ? 'text' : 'password'}
            autoFocus
            autoComplete="current-password"
            placeholder="Kata sandi"
            value={pin}
            onChange={e => { setPin(e.target.value); setError('') }}
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
        {error && <p className="admin-error">{error}</p>}
        {serverUp === false && (
          <p className="admin-offline-note">
            <WifiOff size={14} /> Backend tidak aktif — menunggu PIN luring.
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? <Loader2 size={16} className="admin-spin" /> : <KeyRound size={16} />}
          {busy ? 'Memeriksa…' : 'Buka Panel'}
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
          value={value ?? ''}
          placeholder="https://… atau /uploads/…"
          onChange={e => onChange(e.target.value)}
        />
        <label className={`btn btn-ghost btn-sm admin-upload-btn ${busy ? 'is-busy' : ''}`}>
          {busy ? <Loader2 size={14} className="admin-spin" /> : <Upload size={14} />}
          {busy ? 'Mengunggah…' : 'Unggah'}
          <input type="file" hidden accept={accept} disabled={busy} onChange={pick} />
        </label>
      </div>
      {accept.startsWith('image/') && value && (
        <img
          key={value}
          className="admin-upload-preview"
          src={value}
          alt=""
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
      const d = getData()
      if (d.seksi?.some(s => s.id === id)) return 'seksi'
      if (d.units?.some(u => u.id === id)) return 'units'
    }
    return 'units'
  })
  const [activeUnitId, setActiveUnitId] = useState(() => {
    const { id } = parseHashParams()
    if (id) {
      const d = getData()
      if (d.units?.some(u => u.id === id)) return id
    }
    return null
  })
  const [activeSeksiId, setActiveSeksiId] = useState(() => {
    const { id } = parseHashParams()
    if (id) {
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
        if (draft.seksi?.some(s => s.id === id)) {
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

  // Cek sekali apakah backend hidup, supaya gerbang masuk tahu mode mana
  // yang harus dipakai dan panel bisa memperingatkan sebelum operator menulis.
  useEffect(() => {
    let alive = true
    probeServer().then(ok => { if (alive) setServerUp(ok) })
    return () => { alive = false }
  }, [])

  const units = draft.units || []
  const seksi = draft.seksi || []
  const sttUnit = seksi.find(s => s.id === 'subbag-tu')
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
      if (session === 'server') await saveSnapshot(draft)
      // Perbarui cache luring + broadcast ke komponen lain. Di mode server ini
      // cerminan data yang baru tersimpan, bukan tujuan penyimpanan.
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
      if (session === 'server') await resetServer()
      resetData()
      setDraft(getData())
    } catch (err) {
      setSaveError(err.message || 'Gagal mengatur ulang data.')
    } finally {
      setBusy(false)
    }
  }, [session])

  const doImport = (parsed) => setDraft(parsed)

  const doLogout = async () => {
    await logout()
    setSession(null)
    window.location.hash = '#/'
  }

  if (!session) return <Gate onUnlock={setSession} serverUp={serverUp} theme={theme} onToggleTheme={toggleTheme} />

  return (
    <div className="admin">
      <header className="admin-topbar">
        <a className="admin-home" href="#/"><ArrowLeft size={15} /> Situs Publik</a>
        <div className="admin-topbar-title">
          <Globe size={18} />
          <strong>Panel Admin · Kemenag Kab. Wonosobo</strong>
        </div>
        <div className="admin-topbar-actions">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          {session === 'local' && (
            <span className="admin-offline-chip" title="Backend tidak aktif">
              <WifiOff size={13} /> Mode luring
            </span>
          )}
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
                <p>Klik salah satu tombol unit di atas untuk mengedit nama, deskripsi, layanan SOP, personil, atau fotonya.</p>
              </div>
            )}
          </div>
        )}

        {tab === 'seksi' && (
          <div className="admin-col">
            <div className="admin-pick">
              <label className="admin-field-label">Pilih Seksi / Penyelenggara yang ingin diedit:</label>
              <div className="admin-pick-row">
                {[sttUnit, ...seksiList].filter(Boolean).map(s => (
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
                <p>Klik salah satu tombol seksi di atas (misal <strong>Seksi Bimas Islam</strong>) untuk mengedit teks judul, deskripsi, personil, SOP, dan dokumentasi.</p>
              </div>
            )}
          </div>
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
          {session === 'server' ? (
            <>
              Perubahan disimpan ke server (<code>server/data/db.json</code>) sehingga
              langsung tampil untuk semua pengunjung. Berkas yang diunggah masuk ke
              folder <code>uploads/</code>. Sebagai jaring pengaman, salinannya juga
              disimpan di browser ini untuk akses luring.
            </>
          ) : (
            <>
              <strong>Mode luring:</strong> backend tidak aktif, jadi perubahan hanya
              tersimpan di browser operator ini. Jalankan <code>npm run server</code> lalu
              masuk lagi memakai kata sandi server agar tersimpan bersama. Sementara itu,
              unduh JSON lewat menu <strong>Cadangan Data</strong> untuk cadangan manual.
            </>
          )}
        </footer>
      </main>
    </div>
  )
}
