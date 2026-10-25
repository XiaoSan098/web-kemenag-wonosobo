import { useState } from 'react'
import { MapPin, Clock, Moon, Sun, Lock } from 'lucide-react'

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light')
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch { /* penyimpanan privat */ }
    setTheme(next)
  }
  return { theme, toggle }
}

export function Header() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-item"><MapPin size={13} strokeWidth={2.2} aria-hidden="true" /> Jl. Tumenggung Jogonegoro No. 38, Wonosobo, Jawa Tengah</span>
          <span className="topbar-item"><Clock size={13} strokeWidth={2.2} aria-hidden="true" /> Senin–Kamis 07.30–16.00 · Jumat 07.30–16.30 WIB</span>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#/">
            <img className="brand-logo" src="/logo_kemenag.png" alt="Logo Kementerian Agama Republik Indonesia" />
            <span className="brand-text">
              <span className="brand-ministry">Kementerian Agama Republik Indonesia</span>
              <span className="brand-office">Kantor Kementerian Agama Kabupaten Wonosobo</span>
            </span>
          </a>

          <div className="header-actions">
            <a
              href="#/admin"
              className="btn btn-outline btn-sm header-admin-btn"
              title="Panel Admin untuk mengedit tulisan, SOP, foto & personil"
            >
              <Lock size={13} aria-hidden="true" /> Kelola / Edit Data
            </a>
            <button
              type="button"
              className="icon-btn"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
