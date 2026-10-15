import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="hero">
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
            <a className="btn btn-primary" href="#unit">
              Telusuri Unit Layanan <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <figure className="hero-figure">
          <img src="/hero_banner.jpg" alt="Kantor Kementerian Agama Kabupaten Wonosobo" />
        </figure>
      </div>
    </section>
  )
}
