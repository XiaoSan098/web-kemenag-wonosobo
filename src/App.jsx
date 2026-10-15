import { useCallback, useEffect, useState } from 'react'
import { findUnit, toRawPhone, useData } from './store.js'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { UnitGrid } from './components/UnitGrid.jsx'
import { UnitModal } from './components/UnitModal.jsx'
import { SopModal } from './components/SopModal.jsx'
import { SocialModal } from './components/SocialModal.jsx'
import { Lightbox } from './components/Lightbox.jsx'
import { Footer } from './components/Footer.jsx'

// findUnit kini dibawa src/store.js (data yang bisa dikelola admin)

export default function App() {
  const { units, seksi, social } = useData()
  const [unitId, setUnitId] = useState(null)
  const [socialOpen, setSocialOpen] = useState(false)
  const [sop, setSop] = useState(null)         // { svc, seksi }
  const [lightbox, setLightbox] = useState(null) // { src, caption }

  const anyOpen = !!(unitId || socialOpen || sop || lightbox)

  // Kunci scroll body saat ada modal terbuka
  useEffect(() => {
    document.body.style.overflow = anyOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [anyOpen])

  // Escape menutup modal teratas saja
  useEffect(() => {
    if (!anyOpen) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (lightbox) setLightbox(null)
      else if (sop) setSop(null)
      else if (unitId) setUnitId(null)
      else if (socialOpen) setSocialOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [anyOpen, lightbox, sop, unitId, socialOpen])

  const openSop = useCallback((svc, seksi) => setSop({ svc, seksi }), [])

  return (
    <>
      <Header />

      <main>
        <Hero />
        <UnitGrid seksi={seksi} onOpenUnit={setUnitId} />
      </main>

      <Footer seksi={seksi} social={social} onOpenUnit={setUnitId} onOpenSocial={() => setSocialOpen(true)} />

      {unitId && (
        <UnitModal
          unitId={unitId}
          units={units}
          seksi={seksi}
          onClose={() => setUnitId(null)}
          onOpenSop={openSop}
          onOpenLightbox={setLightbox}
        />
      )}

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
