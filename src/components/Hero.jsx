import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="hero">
      {/* Background foto gedung Kantor Kemenag Wonosobo samar & elegan */}
      <div className="hero-bg" aria-hidden="true">
        <img src="/hero_banner.jpg" alt="" />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">Portal Layanan Resmi</p>
          <h1 className="hero-title">
            Layanan keagamaan dan pendidikan yang cepat, gratis, dan akuntabel
          </h1>
          <p className="hero-lead">
            Akses standar pelayanan (SOP), struktur pengelola, serta dokumentasi kegiatan
            dari seluruh seksi dan Subbag Tata Usaha Kantor Kementerian Agama Kabupaten
            Wonosobo — seluruh layanan bebas biaya.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#layanan-utama">
              Menu Layanan Utama <ArrowRight size={16} />
            </a>
            <a className="btn btn-outline" href="#profil-kemenag">
              Profil &amp; Maklumat
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
