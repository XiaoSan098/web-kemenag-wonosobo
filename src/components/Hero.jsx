import { useData, DEFAULT_HERO } from '../store.js'

export function Hero() {
  const { hero: rawHero } = useData()
  const hero = { ...DEFAULT_HERO, ...(rawHero || {}) }

  return (
    <section className="hero hero--banner-only" aria-label="Banner Utama Kantor Kementerian Agama Kabupaten Wonosobo">
      <div className="hero-banner-wrap">
        <img
          className="hero-banner-img"
          src={hero.banner || '/hero_banner.jpg'}
          alt="Banner Kantor Kementerian Agama Kabupaten Wonosobo"
          onError={e => { e.currentTarget.src = '/hero_banner.jpg' }}
        />
      </div>
    </section>
  )
}
