import { useState } from 'react'
import { Award, Compass, HeartHandshake, ShieldCheck, CheckCircle2, ChevronRight, FileText, ZoomIn } from 'lucide-react'
import { useData, DEFAULT_VISI_MISI } from '../store.js'

export function StaticProfileSection({ onOpenLightbox }) {
  const [activeTab, setActiveTab] = useState('visi-misi')
  const { kepalaKantor, visiMisi: rawVisiMisi } = useData()
  const vm = {
    ...DEFAULT_VISI_MISI,
    ...(rawVisiMisi || {}),
    misiList: Array.isArray(rawVisiMisi?.misiList) && rawVisiMisi.misiList.length
      ? rawVisiMisi.misiList
      : DEFAULT_VISI_MISI.misiList
  }

  return (
    <section className="static-profile-section" id="profil-kemenag">
      <div className="container">
        <div className="profile-wrapper">
          <div className="profile-header">
            <div className="profile-header-top">
              <div className="profile-header-info">
                <span className="profile-pill">
                  <ShieldCheck size={14} /> {vm.pill || DEFAULT_VISI_MISI.pill}
                </span>
                <h2>{vm.officeTitle || DEFAULT_VISI_MISI.officeTitle}</h2>
                <p>
                  {vm.officeDesc || DEFAULT_VISI_MISI.officeDesc}
                </p>

                <div className="profile-tabs" role="tablist">
                  <button
                    type="button"
                    className={`profile-tab-btn ${activeTab === 'visi-misi' ? 'active' : ''}`}
                    onClick={() => setActiveTab('visi-misi')}
                    role="tab"
                    aria-selected={activeTab === 'visi-misi'}
                  >
                    <Compass size={16} /> Visi &amp; Misi
                  </button>
                  <button
                    type="button"
                    className={`profile-tab-btn ${activeTab === 'maklumat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('maklumat')}
                    role="tab"
                    aria-selected={activeTab === 'maklumat'}
                  >
                    <HeartHandshake size={16} /> Maklumat Pelayanan
                  </button>
                  <button
                    type="button"
                    className={`profile-tab-btn ${activeTab === 'nilai-kerja' ? 'active' : ''}`}
                    onClick={() => setActiveTab('nilai-kerja')}
                    role="tab"
                    aria-selected={activeTab === 'nilai-kerja'}
                  >
                    <Award size={16} /> 5 Nilai Budaya Kerja
                  </button>
                </div>
              </div>

              {kepalaKantor && kepalaKantor.aktif !== false && (
                <div className="profile-kepala-card" aria-label={`Profil Kepala Kantor: ${kepalaKantor.nama}`}>
                  <button
                    type="button"
                    className="profile-kepala-avatar-wrap profile-kepala-avatar-btn"
                    onClick={() => onOpenLightbox && onOpenLightbox({
                      src: kepalaKantor.foto || '/logo_kemenag.png',
                      caption: `${kepalaKantor.nama} — ${kepalaKantor.jabatan}`
                    })}
                    title={`Klik untuk memperbesar foto ${kepalaKantor.nama}`}
                    aria-label={`Perbesar foto ${kepalaKantor.nama}`}
                  >
                    <img
                      src={kepalaKantor.foto || '/logo_kemenag.png'}
                      alt={kepalaKantor.nama}
                      className="profile-kepala-avatar"
                      loading="lazy"
                      onError={e => { e.currentTarget.src = '/logo_kemenag.png' }}
                    />
                    <span className="profile-kepala-zoom" aria-hidden="true">
                      <ZoomIn size={22} />
                    </span>
                  </button>
                  <div className="profile-kepala-meta">
                    <h3 className="profile-kepala-name">{kepalaKantor.nama}</h3>
                    <p className="profile-kepala-role">{kepalaKantor.jabatan}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="profile-content-card">
            {activeTab === 'visi-misi' && (
              <div className="profile-panel">
                <div className="profile-panel-grid">
                  <div className="profile-box profile-box--highlight">
                    <div className="profile-box-tag">{vm.visiTag || DEFAULT_VISI_MISI.visiTag}</div>
                    <h3>{vm.visiTitle || DEFAULT_VISI_MISI.visiTitle}</h3>
                    <p>
                      {vm.visiText || DEFAULT_VISI_MISI.visiText}
                    </p>
                  </div>
                  <div className="profile-box">
                    <div className="profile-box-tag">{vm.misiTag || DEFAULT_VISI_MISI.misiTag}</div>
                    <ul className="profile-list">
                      {vm.misiList.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} className="profile-list-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'maklumat' && (
              <div className="profile-panel">
                <div className="maklumat-card">
                  <div className="maklumat-badge">{vm.maklumatBadge || DEFAULT_VISI_MISI.maklumatBadge}</div>
                  <h3 className="maklumat-title">{vm.maklumatTitle || DEFAULT_VISI_MISI.maklumatTitle}</h3>
                  <p className="maklumat-quote">
                    {vm.maklumatQuote || DEFAULT_VISI_MISI.maklumatQuote}
                  </p>
                  <div className="maklumat-features">
                    <div className="maklumat-feat-item">
                      <span className="feat-check">✓</span>
                      <div>
                        <strong>Seluruh Layanan Bebas Biaya</strong>
                        <p>Tanpa pungli, gratifikasi, atau imbalan dalam bentuk apa pun.</p>
                      </div>
                    </div>
                    <div className="maklumat-feat-item">
                      <span className="feat-check">✓</span>
                      <div>
                        <strong>Kepastian Waktu &amp; Layanan</strong>
                        <p>Standar waktu penyelesaian dokumen jelas dan terukur.</p>
                      </div>
                    </div>
                    <div className="maklumat-feat-item">
                      <span className="feat-check">✓</span>
                      <div>
                        <strong>Keterbukaan Informasi</strong>
                        <p>Transparan, akuntabel, dan bebas pungli.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nilai-kerja' && (
              <div className="profile-panel">
                <div className="nilai-grid">
                  <div className="nilai-card">
                    <span className="nilai-num">1</span>
                    <h4>Integritas</h4>
                    <p>Keselarasan antara hati, pikiran, perkataan, dan perbuatan yang baik dan benar sesuai norma hukum dan agama.</p>
                  </div>
                  <div className="nilai-card">
                    <span className="nilai-num">2</span>
                    <h4>Profesionalitas</h4>
                    <p>Bekerja secara disiplin, kompeten, dan tepat waktu dengan hasil terbaik serta tanggung jawab penuh.</p>
                  </div>
                  <div className="nilai-card">
                    <span className="nilai-num">3</span>
                    <h4>Inovasi</h4>
                    <p>Menyempurnakan yang sudah ada dan mengkreasi hal baru yang lebih baik melalui pemanfaatan teknologi digital.</p>
                  </div>
                  <div className="nilai-card">
                    <span className="nilai-num">4</span>
                    <h4>Tanggung Jawab</h4>
                    <p>Bekerja secara tuntas dan konsekuen terhadap seluruh tugas kedinasan dan pelayanan masyarakat.</p>
                  </div>
                  <div className="nilai-card nilai-card--wide">
                    <span className="nilai-num">5</span>
                    <h4>Keteladanan</h4>
                    <p>Menjadi contoh yang baik bagi orang lain dalam bersikap, melayani, dan menegakkan kejujuran.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
