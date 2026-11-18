import { useData, DEFAULT_HERO } from '../store.js'

export function Hero() {
  const { hero: rawHero } = useData()
  const hero = { ...DEFAULT_HERO, ...(rawHero || {}) }

  return (
    <section className="hero">
      {/* Background foto gedung Kantor Kemenag Wonosobo samar & elegan */}
      <div className="hero-bg" aria-hidden="true">
        <img
          src={hero.banner || '/hero_banner.jpg'}
          alt=""
          onError={e => { e.currentTarget.src = '/hero_banner.jpg' }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">{hero.eyebrow || DEFAULT_HERO.eyebrow}</p>
          <h1 className="hero-title">
            {hero.title || DEFAULT_HERO.title}
          </h1>
          <p className="hero-lead">
            {hero.lead || DEFAULT_HERO.lead}
          </p>
          <div className="hero-actions">
            <a className="btn btn-outline" href="#/profil">
              {hero.btnText || DEFAULT_HERO.btnText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
