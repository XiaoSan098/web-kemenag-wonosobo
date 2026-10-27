import { useState } from 'react'
import { Award, Compass, HeartHandshake, ShieldCheck, CheckCircle2, ChevronRight, FileText } from 'lucide-react'

export function StaticProfileSection() {
  const [activeTab, setActiveTab] = useState('visi-misi')

  return (
    <section className="static-profile-section" id="profil-kemenag">
      <div className="container">
        <div className="profile-wrapper">
          <div className="profile-header">
            <span className="profile-pill">
              <ShieldCheck size={14} /> Profil &amp; Legalitas Instansi
            </span>
            <h2>Kantor Kementerian Agama Kabupaten Wonosobo</h2>
            <p>
              Komitmen kami dalam menghadirkan pelayanan publik bidang keagamaan dan pendidikan Islam
              yang profesional, transparan, akuntabel, dan berintegritas tinggi.
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

          <div className="profile-content-card">
            {activeTab === 'visi-misi' && (
              <div className="profile-panel">
                <div className="profile-panel-grid">
                  <div className="profile-box profile-box--highlight">
                    <div className="profile-box-tag">Visi Utama</div>
                    <h3>Kementerian Agama yang Profesional dan Andal</h3>
                    <p>
                      "Terwujudnya Masyarakat Kabupaten Wonosobo yang Taat Beragama, Rukun, Cerdas,
                      dan Mandiri serta Sejahtera Lahir Batin dalam bingkai Negara Kesatuan Republik Indonesia."
                    </p>
                  </div>
                  <div className="profile-box">
                    <div className="profile-box-tag">Misi Strategis</div>
                    <ul className="profile-list">
                      <li>
                        <CheckCircle2 size={16} className="profile-list-icon" />
                        <span>Meningkatkan kualitas pemahaman dan pengamalan ajaran agama dalam kehidupan bermasyarakat.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={16} className="profile-list-icon" />
                        <span>Memperkukuh kerukunan umat beragama dan moderasi beragama di wilayah Kabupaten Wonosobo.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={16} className="profile-list-icon" />
                        <span>Meningkatkan akses dan mutu pendidikan keagamaan serta madrasah yang unggul dan kompetitif.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={16} className="profile-list-icon" />
                        <span>Mewujudkan tata kelola kepemerintahan yang bersih, transparan, dan bebas dari korupsi melalui PTSP.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'maklumat' && (
              <div className="profile-panel">
                <div className="maklumat-card">
                  <div className="maklumat-badge">Janji Layanan Resmi</div>
                  <h3 className="maklumat-title">MAKLUMAT PELAYANAN KEMENAG KABUPATEN WONOSOBO</h3>
                  <p className="maklumat-quote">
                    "Dengan ini kami segenap pimpinan dan aparatur sipil negara Kantor Kementerian Agama Kabupaten Wonosobo menyatakan sanggup menyelenggarakan pelayanan sesuai standar pelayanan yang telah ditetapkan, dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai dengan peraturan perundang-undangan yang berlaku."
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
                        <strong>Kepastian Waktu &amp; SOP</strong>
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
