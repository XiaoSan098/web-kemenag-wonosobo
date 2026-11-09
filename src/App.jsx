import { useCallback, useEffect, useState } from 'react'
import { useData } from './store.js'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { ServiceButtons } from './components/ServiceButtons.jsx'
import { StaticProfileSection } from './components/StaticProfileSection.jsx'
import { UnitPage } from './components/UnitPage.jsx'
import { SopModal } from './components/SopModal.jsx'
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

function parseUnitFromHash() {
  const hash = window.location.hash || ''
  if (!hash.startsWith('#/unit/')) return { unitId: null, subId: null }
  const raw = hash.slice('#/unit/'.length)
  const [idPart, queryPart] = raw.split('?')
  const params = new URLSearchParams(queryPart || '')
  return {
    unitId: idPart || null,
    subId: params.get('sub') || null
  }
}

export default function App() {
  const { units, seksi, social } = useData()
  const [unitRoute, setUnitRoute] = useState(() => parseUnitFromHash())
  const [socialOpen, setSocialOpen] = useState(false)
  const [sop, setSop] = useState(null)         // { svc, seksi }
  const [lightbox, setLightbox] = useState(null) // { src, caption }

  useScrollReveal(`${unitRoute.unitId || 'home'}-${unitRoute.subId || ''}`)

  useEffect(() => {
    const onHashChange = () => {
      setUnitRoute(parseUnitFromHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const anyModalOpen = !!(socialOpen || sop || lightbox)

  // Kunci scroll body saat ada modal pop-up (SOP, Sosial, Lightbox) terbuka
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
      else if (sop) setSop(null)
      else if (socialOpen) setSocialOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [anyModalOpen, lightbox, sop, socialOpen])

  const openSop = useCallback((svc, seksi) => setSop({ svc, seksi }), [])

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
        {unitRoute.unitId ? (
          <UnitPage
            unitId={unitRoute.unitId}
            subId={unitRoute.subId}
            units={units}
            seksi={seksi}
            onOpenSop={openSop}
            onOpenLightbox={setLightbox}
            onBack={goHome}
          />
        ) : (
          <>
            <Hero />
            <ServiceButtons onOpenUnit={openUnit} />
            <StaticProfileSection onOpenLightbox={setLightbox} />
          </>
        )}
      </main>

      <Footer
        seksi={seksi}
        social={social}
        onOpenUnit={openUnit}
        onOpenSocial={() => setSocialOpen(true)}
      />

      {sop && (
        <SopModal
          svc={sop.svc}
          seksi={sop.seksi}
          onClose={() => setSop(null)}
        />
      )}

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
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
