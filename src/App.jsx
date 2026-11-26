import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useData } from './store.js'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { ServiceButtons } from './components/ServiceButtons.jsx'
import { StaticProfileSection } from './components/StaticProfileSection.jsx'
import { FaqSection } from './components/FaqSection.jsx'
import { UnitPage } from './components/UnitPage.jsx'
import { SocialModal } from './components/SocialModal.jsx'
import { Lightbox } from './components/Lightbox.jsx'
import { Footer } from './components/Footer.jsx'

const REVEAL_SELECTOR = [
  '.hero-eyebrow',
  '.hero-title',
  '.hero-lead',
  '.hero-actions',
  '.service-buttons-head',
  '.service-btn-card',
  '.profile-header',
  '.profile-box',
  '.maklumat-card',
  '.nilai-card',
  '.faq-head',
  '.faq-card',
  '.faq-cta-card',
  '.unit-page-header',
  '.unit-page-subunits',
  '.unit-page-tabs-wrap',
  '.person-card',
  '.service-card',
  '.photo-card',
  '.video-card',
  '.footer-grid > *'
].join(', ')

function useScrollReveal(routeKey) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observed = new WeakSet()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
          } else {
            entry.target.classList.remove('is-revealed')
          }
        })
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -16px 0px'
      }
    )

    const registerElements = () => {
      const elements = document.querySelectorAll(REVEAL_SELECTOR)
      elements.forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el)
          const parent = el.parentElement
          if (parent) {
            const siblings = Array.from(parent.children)
            const idx = siblings.indexOf(el)
            if (idx >= 0) {
              el.style.setProperty('--reveal-delay', `${(idx % 8) * 65}ms`)
            }
          }
          el.classList.add('reveal-3d')
          io.observe(el)

          // Jika elemen sudah ada di layar saat pertama kali dibuka, langsung picu animasi timbul
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight - 10 && rect.bottom > 0) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                el.classList.add('is-revealed')
              })
            })
          }
        }
      })
    }

    registerElements()

    const mo = new MutationObserver(() => {
      registerElements()
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [routeKey])
}

function parseRouteFromHash() {
  const hash = window.location.hash || ''
  if (hash.startsWith('#/unit/')) {
    const raw = hash.slice('#/unit/'.length)
    const [idPart, queryPart] = raw.split('?')
    const params = new URLSearchParams(queryPart || '')
    return {
      page: 'unit',
      unitId: idPart || null,
      subId: params.get('sub') || null
    }
  }
  if (hash === '#/profil') {
    return { page: 'profil', unitId: null, subId: null }
  }
  if (hash === '#/tanya-jawab') {
    return { page: 'faq', unitId: null, subId: null }
  }
  return { page: 'home', unitId: null, subId: null }
}

function PageNavBar({ title, onBack }) {
  return (
    <div className="unit-page-nav-bar">
      <div className="container unit-page-nav-inner">
        <nav className="unit-breadcrumb" aria-label="Breadcrumb">
          <a href="#/" onClick={(e) => { e.preventDefault(); onBack() }}>Beranda</a>
          <span className="unit-breadcrumb-sep">/</span>
          <span className="unit-breadcrumb-current">{title}</span>
        </nav>

        <div className="unit-page-actions">
          <a href="#/" className="btn btn-primary btn-sm" onClick={(e) => { e.preventDefault(); onBack() }}>
            <ArrowLeft size={14} /> Beranda
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const { units, seksi, social } = useData()
  const [route, setRoute] = useState(() => parseRouteFromHash())
  const [socialOpen, setSocialOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null) // { src, caption }

  useScrollReveal(`${route.page}-${route.unitId || ''}-${route.subId || ''}`)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRouteFromHash())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const anyModalOpen = !!(socialOpen || lightbox)

  // Kunci scroll body saat ada modal pop-up (Sosial, Lightbox) terbuka
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [anyModalOpen])

  // Escape menutup modal pop-up teratas
  useEffect(() => {
    if (!anyModalOpen) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (lightbox) setLightbox(null)
      else if (socialOpen) setSocialOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [anyModalOpen, lightbox, socialOpen])

  const openUnit = (id) => {
    window.location.hash = `#/unit/${id}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    window.location.hash = '#/'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header
        onOpenSocial={() => setSocialOpen(true)}
        onGoHome={goHome}
      />

      <main>
        {route.page === 'unit' && route.unitId ? (
          <UnitPage
            unitId={route.unitId}
            subId={route.subId}
            units={units}
            seksi={seksi}
            onOpenLightbox={setLightbox}
            onBack={goHome}
          />
        ) : route.page === 'profil' ? (
          <>
            <PageNavBar title="Profil & Maklumat" onBack={goHome} />
            <StaticProfileSection onOpenLightbox={setLightbox} />
          </>
        ) : route.page === 'faq' ? (
          <>
            <PageNavBar title="Tanya Jawab (Q&A)" onBack={goHome} />
            <FaqSection onOpenSocial={() => setSocialOpen(true)} />
          </>
        ) : (
          <>
            <Hero />
            <ServiceButtons onOpenUnit={openUnit} />
          </>
        )}
      </main>

      <Footer
        social={social}
        onOpenSocial={() => setSocialOpen(true)}
      />

      {socialOpen && (
        <SocialModal
          contacts={social}
          onClose={() => setSocialOpen(false)}
        />
      )}

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          caption={lightbox.caption}
          subcaption={lightbox.subcaption}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
