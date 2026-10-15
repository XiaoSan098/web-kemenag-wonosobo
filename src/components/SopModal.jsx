import { X, Printer, Download } from 'lucide-react'
import { tanggalIndo } from '../date.js'

// Pratinjau SOP bergaya dokumen dinas; tombol cetak memakai print stylesheet
// yang hanya mencetak area dokumen ini.

export function SopModal({ svc, seksi, onClose }) {
  return (
    <div className="overlay overlay--pdf" role="dialog" aria-modal="true" aria-label={`Pratinjau SOP ${svc.title}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal--pdf">
        <header className="pdf-toolbar no-print">
          <div className="pdf-toolbar-title">
            <strong>{svc.title}</strong>
            <span>{svc.pdfCode || 'Belum ditetapkan'}</span>
          </div>
          <div className="pdf-toolbar-actions">
            <button type="button" className="btn btn-dark" onClick={() => window.print()}>
              <Printer size={15} /> Cetak
            </button>
            <button type="button" className="btn btn-dark" onClick={() => import('../pdf.js').then(({ downloadSopPdf }) => downloadSopPdf(svc, seksi))}>
              <Download size={15} /> Unduh PDF
            </button>
            <button type="button" className="icon-btn icon-btn--dark" onClick={onClose} aria-label="Tutup pratinjau">
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="pdf-body">
          <div className="sop-paper print-area">
            <div className="sop-kop">
              <img src="/logo_kemenag.png" alt="Logo Kementerian Agama" className="sop-kop-logo" />
              <h2>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h2>
              <h3>KANTOR KEMENTERIAN AGAMA KABUPATEN WONOSOBO</h3>
              <p>Jalan Tumenggung Jogonegoro No. 38, Jaraksari, Kabupaten Wonosobo, Jawa Tengah 56314</p>
              <p>Telepon: (0286) 321044 · Pos-el: kabwonosobo@kemenag.go.id · Laman: jateng.kemenag.go.id</p>
            </div>

            <div className="sop-title">
              <p><strong>DRAF - BUKAN DOKUMEN RESMI</strong></p>
              <h4>STANDAR OPERASIONAL PROSEDUR (SOP)</h4>
              <p><strong>NOMOR: {svc.pdfCode || 'Belum ditetapkan'}</strong></p>
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
