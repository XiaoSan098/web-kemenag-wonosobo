import { useState, useEffect } from 'react'
import {
  MapPin, Clock, Moon, Sun, Menu, X, ChevronRight,
  Phone, Home, FileText, Grid
} from 'lucide-react'

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

export function Header({ onOpenSocial, onGoHome }) {
  const { theme, toggle } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Tutup mobile menu bila pengguna menekan tombol Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleNavClick = (anchorId) => {
    setMobileMenuOpen(false)
    if (anchorId === 'home') {
      if (onGoHome) onGoHome()
      else window.location.hash = '#/'
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // Jika sedang di halaman detail unit, kembali ke beranda dulu baru scroll
    if (window.location.hash.startsWith('#/unit/')) {
      window.location.hash = '#/'
      setTimeout(() => {
        const el = document.getElementById(anchorId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(anchorId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-item">
            <MapPin size={13} strokeWidth={2.2} aria-hidden="true" />
            Jl. Tumenggung Jogonegoro No. 38, Wonosobo, Jawa Tengah
          </span>
          <span className="topbar-item">
            <Clock size={13} strokeWidth={2.2} aria-hidden="true" />
            Senin–Kamis 07.30–16.00 · Jumat 07.30–16.30 WIB
          </span>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#/"
            onClick={(e) => {
              if (onGoHome) {
                e.preventDefault()
                onGoHome()
              }
            }}
          >
            <img
              className="brand-logo"
              src="/logo_kemenag.png"
              alt="Logo Kementerian Agama Republik Indonesia"
            />
            <span className="brand-text">
              <span className="brand-ministry">Kementerian Agama Republik Indonesia</span>
              <span className="brand-office">Kantor Kementerian Agama Kabupaten Wonosobo</span>
            </span>
          </a>

          {/* Desktop Navigation Bar */}
          <nav className="desktop-navbar" aria-label="Navigasi Utama Portal">
            <ul className="nav-links">
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => handleNavClick('home')}
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => handleNavClick('profil-kemenag')}
                >
                  Profil &amp; Maklumat
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => handleNavClick('layanan-utama')}
                >
                  Layanan Utama
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onOpenSocial) onOpenSocial()
                  }}
                >
                  Kontak
                </button>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="icon-btn mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
            <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
              <div className="mobile-drawer-head">
                <div className="mobile-drawer-brand">
                  <img src="/logo_kemenag.png" alt="" className="drawer-logo" />
                  <span>Menu Navigasi</span>
                </div>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Tutup menu"
                >
                  <X size={18} />
                </button>
              </div>

              <ul className="mobile-nav-list">
                <li>
                  <button
                    type="button"
                    className="mobile-nav-item"
                    onClick={() => handleNavClick('home')}
                  >
                    <Home size={18} />
                    <span>Beranda</span>
                    <ChevronRight size={16} className="arrow" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="mobile-nav-item"
                    onClick={() => handleNavClick('profil-kemenag')}
                  >
                    <FileText size={18} />
                    <span>Profil &amp; Maklumat</span>
                    <ChevronRight size={16} className="arrow" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="mobile-nav-item"
                    onClick={() => handleNavClick('layanan-utama')}
                  >
                    <Grid size={18} />
                    <span>Menu Layanan Utama</span>
                    <ChevronRight size={16} className="arrow" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="mobile-nav-item"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      if (onOpenSocial) onOpenSocial()
                    }}
                  >
                    <Phone size={18} />
                    <span>Kontak &amp; Lokasi</span>
                    <ChevronRight size={16} className="arrow" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
