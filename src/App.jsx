import { useCallback, useEffect, useState } from 'react'
import { useData } from './store.js'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { UnitGrid } from './components/UnitGrid.jsx'
import { UnitPage } from './components/UnitPage.jsx'
import { SopModal } from './components/SopModal.jsx'
import { SocialModal } from './components/SocialModal.jsx'
import { Lightbox } from './components/Lightbox.jsx'
import { Footer } from './components/Footer.jsx'

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
  }

  const goHome = () => {
    window.location.hash = '#/'
  }

  return (
    <>
      <Header />

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
            <UnitGrid seksi={seksi} onOpenUnit={openUnit} />
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

