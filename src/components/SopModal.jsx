import { useEffect } from 'react'
import { X, Eye } from 'lucide-react'
import { tanggalIndo } from '../date.js'

// Pratinjau Layanan bergaya dokumen dinas (hanya lihat/pratinjau, tanpa cetak & unduh PDF).

export function SopModal({ svc, seksi, onClose }) {
  const serviceCode = (svc.pdfCode || 'Belum ditetapkan').replace(/\bSOP\b/gi, 'LAYANAN')

  useEffect(() => {
    const blockPrintAndSave = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    window.addEventListener('keydown', blockPrintAndSave, true)
    return () => window.removeEventListener('keydown', blockPrintAndSave, true)
  }, [])

  return (
    <div
      className="overlay overlay--pdf"
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau Layanan ${svc.title}`}
      onClick={e => e.target === e.currentTarget && onClose()}
      onContextMenu={e => e.preventDefault()}
    >
      <div className="modal modal--pdf">
        <header className="pdf-toolbar no-print">
          <div className="pdf-toolbar-title">
            <strong>{svc.title}</strong>
            <span>{serviceCode}</span>
          </div>
          <div className="pdf-toolbar-actions">
            <span className="pdf-preview-only-badge" title="Dokumen ini hanya untuk pratinjau di layar">
              <Eye size={14} /> Mode Pratinjau
            </span>
            <button type="button" className="icon-btn icon-btn--dark" onClick={onClose} aria-label="Tutup pratinjau">
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="pdf-body" onCopy={e => e.preventDefault()}>
          <div className="sop-paper print-area">
            <div className="sop-kop">
              <img src="/logo_kemenag.png" alt="Logo Kementerian Agama" className="sop-kop-logo" />
              <h2>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h2>
              <h3>KANTOR KEMENTERIAN AGAMA KABUPATEN WONOSOBO</h3>
              <p>Jalan Tumenggung Jogonegoro No. 38, Jaraksari, Kabupaten Wonosobo, Jawa Tengah 56314</p>
              <p>Telepon: (0286) 321044 · Pos-el: kabwonosobo@kemenag.go.id · Laman: jateng.kemenag.go.id</p>
            </div>

            <div className="sop-title">
              <p><strong>DOKUMEN PRATINJAU LAYANAN</strong></p>
              <h4>INFORMASI STANDAR LAYANAN</h4>
              <p><strong>NOMOR: {serviceCode}</strong></p>
              <p className="sop-title-about">TENTANG: {svc.title.toUpperCase()}</p>
            </div>

            <table className="sop-table">
              <tbody>
                <tr>
                  <th>Unit Kerja Pelaksana</th>
                  <td><strong>{seksi.fullTitle || seksi.title}</strong> (Kantor Kemenag Kab. Wonosobo)</td>
                </tr>
                <tr>
                  <th>Dasar Hukum</th>
                  <td>
                    1. UU No. 25 Tahun 2009 tentang Pelayanan Publik<br />
                    2. PMA No. 19 Tahun 2019 tentang Organisasi &amp; Tata Kerja Instansi Vertikal Kemenag<br />
                    3. Maklumat Pelayanan Kantor Kementerian Agama Kabupaten Wonosobo
                  </td>
                </tr>
                <tr>
                  <th>Persyaratan Dokumen</th>
                  <td>
                    <ol>
                      {(svc.syarat || []).map(s => <li key={s}>{s}</li>)}
                    </ol>
                  </td>
                </tr>
                <tr>
                  <th>Mekanisme / Prosedur</th>
                  <td>{svc.prosedur}</td>
                </tr>
                <tr>
                  <th>Jangka Waktu Penyelesaian</th>
                  <td><strong>{svc.waktu}</strong></td>
                </tr>
                <tr>
                  <th>Biaya / Tarif Layanan</th>
                  <td><strong>{svc.biaya || 'Gratis (Rp 0,-)'}</strong> (bebas pungutan liar &amp; gratifikasi)</td>
                </tr>
                <tr>
                  <th>Nama Layanan</th>
                  <td>{svc.title}</td>
                </tr>
                <tr>
                  <th>Kanal Pengaduan</th>
                  <td>SP4N LAPOR! · WhatsApp PTSP Kemenag Wonosobo (+62 812-3005-5633)</td>
                </tr>
              </tbody>
            </table>

            <div className="sop-sign">
              <p>Ditetapkan di Wonosobo, {tanggalIndo()}</p>
              <p>Pejabat yang berwenang</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
