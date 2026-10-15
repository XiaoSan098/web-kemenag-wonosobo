import { jsPDF } from 'jspdf'
import { tanggalIndo } from './date.js'

export { tanggalIndo } from './date.js'

// Generator dokumen SOP resmi (A4) — dipakai tombol "Unduh PDF".
// jsPDF di-bundle lewat npm sehingga tidak bergantung pada CDN.

let logoDataUrlCache = null

async function getLogoDataUrl() {
  if (logoDataUrlCache) return logoDataUrlCache
  const resp = await fetch('/logo_kemenag.png')
  const blob = await resp.blob()
  const url = URL.createObjectURL(blob)
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = reject
      el.src = url
    })
    // Skala cukup untuk kop 18 mm agar berkas PDF tidak membengkak
    const max = 160
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(img.naturalWidth * scale)
    canvas.height = Math.round(img.naturalHeight * scale)
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
    logoDataUrlCache = canvas.toDataURL('image/png')
    return logoDataUrlCache
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function buildSopPdf(svc, seksi, logoPng) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const ML = 20
  const W = 210 - ML * 2
  const LABEL_W = 47
  const Y_TOP = 16
  const Y_MAX = 280
  let y = Y_TOP

  const center = (text, size, style, dy) => {
    doc.setFont('helvetica', style)
    doc.setFontSize(size)
    doc.text(text, 105, y + dy, { align: 'center' })
  }

  const pageBreak = (need) => {
    if (y + need > Y_MAX) {
      doc.addPage()
      y = Y_TOP
    }
  }

  // Baris tabel SOP dengan tinggi menyesuaikan isi dan otomatis pindah halaman
  const row = (label, lines) => {
    const lh = 4.6
    const h = Math.max(9, lines.length * lh + 5)
    pageBreak(h)
    doc.setDrawColor(70)
    doc.setLineWidth(0.25)
    doc.rect(ML, y, W, h)
    doc.line(ML + LABEL_W, y, ML + LABEL_W, y + h)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.text(label, ML + 2.5, y + 5.5)
    doc.setFont('helvetica', 'normal')
    lines.forEach((l, i) => doc.text(l, ML + LABEL_W + 2.5, y + 5.5 + i * lh))
    y += h
  }

  const wrap = (text) => doc.splitTextToSize(String(text ?? '-'), W - LABEL_W - 5)

  // --- Kop surat ---
  if (logoPng) doc.addImage(logoPng, 'PNG', ML + 2, y, 18, 18)
  center('KEMENTERIAN AGAMA REPUBLIK INDONESIA', 13, 'bold', 6)
  center('KANTOR KEMENTERIAN AGAMA KABUPATEN WONOSOBO', 11, 'bold', 11.5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('Jalan Tumenggung Jogonegoro No. 38, Jaraksari, Kabupaten Wonosobo, Jawa Tengah 56314', 105, y + 16, { align: 'center' })
  doc.text('Telepon: (0286) 321044 | Pos-el: kabwonosobo@kemenag.go.id | Laman: jateng.kemenag.go.id', 105, y + 19.5, { align: 'center' })
  y += 22
  doc.setLineWidth(0.7)
  doc.line(ML, y, 210 - ML, y)
  doc.setLineWidth(0.2)
  doc.line(ML, y + 1.2, 210 - ML, y + 1.2)
  y += 10

  // --- Judul SOP ---
  center('DRAF - BUKAN DOKUMEN RESMI', 9, 'bold', 2)
  y += 7
  center('STANDAR OPERASIONAL PROSEDUR (SOP)', 12, 'bold', 2)
  center(`NOMOR : ${svc.pdfCode || 'Belum ditetapkan'}`, 10, 'normal', 8)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  const tentang = doc.splitTextToSize(`TENTANG: ${String(svc.title).toUpperCase()}`, W)
  tentang.forEach((t, i) => doc.text(t, 105, y + 14 + i * 5, { align: 'center' }))
  y += 14 + tentang.length * 5 + 5

  // --- Isi SOP ---
  row('Unit Kerja Pelaksana', wrap(`${seksi.fullTitle || seksi.title} (Kantor Kemenag Kab. Wonosobo)`))
  row('Dasar Hukum', [
    '1. UU No. 25 Tahun 2009 tentang Pelayanan Publik;',
    '2. PMA No. 19 Tahun 2019 tentang Organisasi & Tata Kerja Instansi Vertikal Kemenag;',
    '3. Maklumat Pelayanan Kantor Kementerian Agama Kabupaten Wonosobo.'
  ])
  row('Persyaratan Dokumen',
    (svc.syarat || []).flatMap((s, i) => {
      const lines = doc.splitTextToSize(String(s), W - LABEL_W - 8)
      return lines.map((l, j) => (j === 0 ? `${i + 1}. ` : '   ') + l)
    }))
  row('Mekanisme / Prosedur', wrap(svc.prosedur))
  row('Jangka Waktu Penyelesaian', [String(svc.waktu ?? '-')])
  row('Biaya / Tarif Layanan', [`${svc.biaya || 'Gratis (Rp 0,-)'} — bebas pungutan liar & gratifikasi`])
  row('Nama Layanan', wrap(svc.title))
  row('Kanal Pengaduan', ['SP4N LAPOR! / WhatsApp PTSP Kemenag Wonosobo (+62 812-3005-5633).'])

  // --- Blok tanda tangan ---
  pageBreak(45)
  const right = 210 - ML
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text(`Wonosobo, ${tanggalIndo()}`, right, y + 5, { align: 'right' })
  doc.text('Pejabat yang berwenang', right, y + 10, { align: 'right' })

  // --- Nomor halaman ---
  const total = doc.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(`Halaman ${i} dari ${total}`, 105, 292, { align: 'center' })
  }

  return doc
}

export async function downloadSopPdf(svc, seksi) {
  let logoPng = null
  try { logoPng = await getLogoDataUrl() } catch { /* kop tanpa logo jika gambar gagal */ }
  buildSopPdf(svc, seksi, logoPng).save(svc.pdfName || 'SOP-Kemenag-Wonosobo.pdf')
}
