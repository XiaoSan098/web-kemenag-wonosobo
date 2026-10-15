import {
  Building2, BookHeart, GraduationCap, BookOpenCheck, Landmark,
  Coins, Compass, Cross, Newspaper, ChevronRight
} from 'lucide-react'

const ICONS = {
  'building-2': Building2,
  'book-heart': BookHeart,
  'graduation-cap': GraduationCap,
  'book-open-check': BookOpenCheck,
  'landmark': Landmark,
  'coins': Coins,
  'compass': Compass,
  'cross': Cross,
  'newspaper': Newspaper
}

function UnitCard({ seksi, onOpen }) {
  const Icon = ICONS[seksi.icon] || Building2
  const isTu = seksi.id === 'subbag-tu'

  return (
    <button
      type="button"
      className={`unit-card ${isTu ? 'unit-card--featured' : ''}`}
      onClick={() => onOpen(seksi.id)}
    >
      <span className="unit-card-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
      <span className="unit-card-body">
        <span className="unit-card-title">{seksi.title}</span>
        <span className="unit-card-sub">{isTu ? 'PTSP · Perencanaan · Pelayanan · Keuangan' : seksi.subtitle}</span>
      </span>
      <ChevronRight size={16} className="unit-card-arrow" aria-hidden="true" />
    </button>
  )
}

export function UnitGrid({ seksi = [], onOpenUnit }) {
  return (
    <section className="unit-section" id="unit">
      <div className="container">
        <div className="section-head">
          <h2>Unit &amp; Seksi Layanan</h2>
          <p>Pilih unit untuk melihat struktur pengelola, standar pelayanan, dan dokumentasi kegiatannya.</p>
        </div>

        <div className="unit-grid">
          {seksi.map(item => (
            <UnitCard key={item.id} seksi={item} onOpen={onOpenUnit} />
          ))}
        </div>
      </div>
    </section>
  )
}
