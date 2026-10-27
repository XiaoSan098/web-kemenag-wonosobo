import {
  Building2, BookHeart, GraduationCap,
  Coins, BookOpenCheck, Landmark, Scale,
  Cross, Church, Sparkles, ChevronRight
} from 'lucide-react'

export function ServiceButtons({ onOpenUnit }) {
  const services = [
    {
      id: 'subbag-tu',
      title: 'PTSP & Subbag TU',
      desc: 'Pelayanan Terpadu Satu Pintu, legalisir, kepegawaian, perencanaan, keuangan & humas',
      icon: Building2,
      badge: 'Induk Layanan',
      badgeColor: 'badge--gold'
    },
    {
      id: 'bimas',
      title: 'Bimas Islam & KUA',
      desc: 'Layanan nikah, pembinaan 15 KUA kecamatan, kemasjidan, dan penyuluhan agama',
      icon: BookHeart,
      badge: 'Bimas Islam',
      badgeColor: 'badge--emerald'
    },
    {
      id: 'penmad',
      title: 'Pendidikan Madrasah',
      desc: 'Pengelolaan kelembagaan, kurikulum, pendidik & siswa RA, MI, MTs, hingga MA',
      icon: GraduationCap,
      badge: 'Penmad',
      badgeColor: 'badge--blue'
    },
    {
      id: 'pais',
      title: 'Pendidikan Agama Islam',
      desc: 'Pembinaan & sertifikasi Guru PAI pada sekolah umum (PAUD, SD, SMP, SMA, SMK)',
      icon: BookOpenCheck,
      badge: 'PAIS',
      badgeColor: 'badge--purple'
    },
    {
      id: 'pontren',
      title: 'Pondok Pesantren & Diniyah',
      desc: 'Pendidikan diniyah formal/non-formal, Lembaga Pendidikan Al-Qur\'an (LPQ), & MDT',
      icon: Landmark,
      badge: 'PD Pontren',
      badgeColor: 'badge--amber'
    },
    {
      id: 'zawa',
      title: 'Zakat & Wakaf',
      desc: 'Sertifikasi tanah wakaf, perwakafan produktif, serta pembinaan BAZNAS & LAZ',
      icon: Coins,
      badge: 'ZAWA',
      badgeColor: 'badge--teal'
    },
    {
      id: 'syariah',
      title: 'Bimbingan Syariah',
      desc: 'Penetapan hisab rukyat, pengukuran arah kiblat, dan pembinaan syariah',
      icon: Scale,
      badge: 'Syariah',
      badgeColor: 'badge--indigo'
    },
    {
      id: 'kristen',
      title: 'Penyelenggara Kristen',
      desc: 'Bimbingan masyarakat, urusan keagamaan, dan pendidikan agama Kristen',
      icon: Cross,
      badge: 'Kristen',
      badgeColor: 'badge--rose'
    },
    {
      id: 'katolik',
      title: 'Penyelenggara Katolik',
      desc: 'Pelayanan bimbingan masyarakat dan pendidikan agama Katolik',
      icon: Church,
      badge: 'Katolik',
      badgeColor: 'badge--blue'
    },
    {
      id: 'buddha',
      title: 'Penyelenggara Buddha',
      desc: 'Pelayanan keagamaan dan pembinaan umat Buddha di Kabupaten Wonosobo',
      icon: Sparkles,
      badge: 'Buddha',
      badgeColor: 'badge--gold'
    }
  ]

  return (
    <section className="service-buttons-section" id="layanan-utama">
      <div className="container">
        <div className="service-buttons-head">
          <div className="service-buttons-pill">
            <Sparkles size={14} className="sparkle-icon" /> Layanan Resmi Kemenag
          </div>
          <h2>Menu Layanan Utama Masyarakat</h2>
          <p>
            Pilih seksi atau unit layanan di bawah ini untuk melihat struktur pengelola,
            standar operasional prosedur (SOP), syarat berkas, dan dokumentasi kegiatan.
          </p>
        </div>

        <div className="service-buttons-grid">
          {services.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className="service-btn-card"
                onClick={() => onOpenUnit(item.id)}
              >
                <div className="service-btn-icon-wrap">
                  <Icon size={24} strokeWidth={1.9} />
                </div>
                <div className="service-btn-content">
                  <div className="service-btn-top">
                    <span className={`service-btn-badge ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="service-btn-title">{item.title}</h3>
                  <p className="service-btn-desc">{item.desc}</p>
                </div>
                <div className="service-btn-arrow">
                  <ChevronRight size={18} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
