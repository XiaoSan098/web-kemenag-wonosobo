/**
 * Data Portal Layanan & Informasi Kantor Kementerian Agama Kabupaten Wonosobo
 * Struktur Organisasi, Layanan (PDF), Foto Kegiatan (Instagram), dan Video (YouTube & IG)
 */

// 4 BAGIAN LAYANAN DI DALAM SUBBAG TU
const SUBBAG_TU_UNITS = [
  {
    id: 'ptsp',
    parentId: 'subbag-tu',
    title: 'PTSP',
    fullTitle: 'PTSP (Pelayanan Terpadu Satu Pintu)',
    subtitle: 'Bagian Subbag Tata Usaha Kemenag Wonosobo',
    badge: 'Front Office Utama',
    icon: 'building-2',
    color: 'emerald',
    description: 'Pusat pelayanan administrasi terpadu satu pintu di bawah naungan Subbag Tata Usaha untuk melayani surat rekomendasi, legalisir, perizinan, dan konsultasi masyarakat secara cepat dan gratis.',
    contact: {
      officer: 'Petugas Front Office PTSP',
      role: 'Customer Service & Informasi Pelayanan Terpadu',
      phone: '+62 812-3005-5633',
      rawPhone: '6281230055633',
      hours: 'Senin - Kamis (07.30 - 16.00 WIB) | Jumat (07.30 - 16.30 WIB)'
    },
    // 1. STRUKTUR ORGANISASI (Foto, Nama, dan Jabatan)
    structure: [
      {
        name: 'Drs. H. Imron Rosyadi, M.Pd.I',
        role: 'Kepala Subbagian Tata Usaha (Kasubbag TU)',
        nip: '19750412 200212 1 002',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        badge: 'Pembina / Penanggung Jawab'
      },
      {
        name: 'Ahmad Fauzi, S.Kom',
        role: 'Koordinator Pelayanan Front Office PTSP',
        nip: '19880815 201101 1 004',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Koordinator Unit'
      },
      {
        name: 'Siti Munawaroh, S.Sos',
        role: 'Petugas Loket Rekomendasi & Legalisir',
        nip: '19920310 201802 2 001',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        badge: 'Customer Service'
      },
      {
        name: 'Budi Santoso, A.Md',
        role: 'Petugas Helpdesk & Pengaduan SP4N-LAPOR',
        nip: '19950720 202012 1 003',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        badge: 'Helpdesk Layanan'
      }
    ],
    // 2. LAYANAN (Daftar Layanan + Format PDF)
    services: [
      {
        id: 'ptsp-svc-1',
        title: 'Permohonan Surat Rekomendasi & Izin Keagamaan',
        desc: 'Layanan penerbitan surat rekomendasi resmi untuk izin pendirian rumah ibadah, kegiatan ormas keagamaan, serta studi banding keagamaan.',
        syarat: [
          'Surat Permohonan Resmi dari Panitia/Lembaga bermaterai',
          'Fotokopi KTP Pemohon / Penanggung Jawab',
          'Proposal teknis kegiatan atau rekomendasi FKUB / KUA setempat'
        ],
        prosedur: 'Pemohon mengisi form PTSP -> Petugas memverifikasi berkas -> Validasi Kasubbag TU -> Penerbitan SK Rekomendasi.',
        waktu: '1 - 2 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Layanan-Rekomendasi-PTSP-Kemenag-Wonosobo.pdf',
        pdfCode: 'SOP/TU-PTSP/01/2026'
      },
      {
        id: 'ptsp-svc-2',
        title: 'Legalisir Ijazah & Dokumen Keagamaan',
        desc: 'Pengesahan dan legalisir salinan ijazah madrasah, piagam penghargaan MTQ, sertifikat hafalan Qur\'an, serta dokumen resmi binaan Kemenag.',
        syarat: [
          'Ijazah / Dokumen Asli yang masih jelas terbaca',
          'Fotokopi dokumen yang akan dilegalisir (maksimal 5 lembar)',
          'KTP Asli Pemohon / Surat Kuasa jika diwakilkan'
        ],
        prosedur: 'Pemeriksaan kesesuaian dokumen asli dengan fotokopi -> Pembubuhan cap basah & tanda tangan pejabat berwenang.',
        waktu: '15 - 30 Menit (Bisa Ditunggu)',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Legalisir-Ijazah-PTSP.pdf',
        pdfCode: 'SOP/TU-PTSP/02/2026'
      },
      {
        id: 'ptsp-svc-3',
        title: 'Layanan Aspirasi & Pengaduan Masyarakat (SP4N LAPOR)',
        desc: 'Penerimaan konsultasi, pengaduan dugaan maladministrasi, atau permohonan informasi publik secara transparan bebas pungli.',
        syarat: [
          'Kartu Identitas Pelapor (KTP/SIM/KTM)',
          'Kronologi atau data aduan yang jelas dan dapat dipertanggungjawabkan',
          'Bukti pendukung dokumen/foto (jika ada)'
        ],
        prosedur: 'Pengisian form pengaduan online / loket -> Disposisi Kasubbag TU & Tim Whistleblowing -> Klarifikasi & Tindak Lanjut.',
        waktu: '1 x 24 Jam',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Pengaduan-Masyarakat-SP4N-LAPOR.pdf',
        pdfCode: 'SOP/TU-PTSP/03/2026'
      }
    ],
    // 3. FOTO KEGIATAN (Link Instagram)
    photos: [
      {
        title: 'Pelayanan Prima Loket PTSP Kemenag Wonosobo Ramah Lansia dan Disabilitas',
        date: '08 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=700&q=80',
        caption: 'Komitmen pelayanan inklusif di loket terpadu front office demi kemudahan seluruh lapisan masyarakat Wonosobo.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      },
      {
        title: 'Sosialisasi Sistem Antrean Online dan Integrasi WhatsApp PTSP Mandiri',
        date: '02 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=700&q=80',
        caption: 'Penerapan digitalisasi nomor antrean untuk mempercepat durasi layanan rekomendasi dan legalisir dokumen keagamaan.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    // 4. VIDEO (Link YouTube & Instagram)
    videos: [
      {
        title: 'Profil Layanan Terpadu Satu Pintu (PTSP) Kemenag Wonosobo 2026',
        date: '05 Oktober 2026',
        duration: '04:12',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'Reels: Alur Pengurusan Surat Rekomendasi 15 Menit Jadi di Loket PTSP',
        date: '29 September 2026',
        duration: '00:58',
        thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=700&q=80',
        platform: 'Instagram',
        videoUrl: 'https://www.instagram.com/kemenagwonosobo/',
        embedUrl: ''
      }
    ]
  },

  {
    id: 'perencanaan',
    parentId: 'subbag-tu',
    title: 'Perencanaan',
    fullTitle: 'Urusan Perencanaan & Data',
    subtitle: 'Bagian Subbag Tata Usaha Kemenag Wonosobo',
    badge: 'RKA-K/L & SAKIP',
    icon: 'compass',
    color: 'teal',
    description: 'Unit kerja di bawah Subbag Tata Usaha yang mengampu penyusunan rencana kerja anggaran kementerian (RKA-K/L), evaluasi akuntabilitas kinerja instansi pemerintah (SAKIP), dan pengelolaan data sektoral keagamaan.',
    contact: {
      officer: 'Tim Urusan Perencanaan Subbag TU',
      role: 'Perencana Ahli & Pengelola Sistem Akuntabilitas Kinerja',
      phone: '+62 823-2680-5111',
      rawPhone: '6282326805111',
      hours: 'Senin - Jumat (07.30 - 16.00 WIB)'
    },
    structure: [
      {
        name: 'Drs. H. Imron Rosyadi, M.Pd.I',
        role: 'Kepala Subbagian Tata Usaha (Kasubbag TU)',
        nip: '19750412 200212 1 002',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        badge: 'Pembina'
      },
      {
        name: 'Rahmat Hidayat, S.E., M.Si',
        role: 'Perencana Ahli Muda / Koordinator Perencanaan',
        nip: '19840217 200901 1 008',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        badge: 'Koordinator Urusan'
      },
      {
        name: 'Tri Wahyuni, S.E',
        role: 'Penyusun Rencana Kerja & Anggaran (RKA-K/L)',
        nip: '19910514 201503 2 003',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        badge: 'Analis Perencanaan'
      }
    ],
    services: [
      {
        id: 'ren-svc-1',
        title: 'Penyusunan & Fasilitasi Revisi Pagu Anggaran (DIPA/POK)',
        desc: 'Layanan koordinasi penyusunan usulan revisi anggaran belanja pegawai, operasional kantor, dan program seksi ke Kanwil Kemenag Jawa Tengah & DJA.',
        syarat: [
          'Matriks Perubahan Anggaran (RAB & TOR Revisi)',
          'Surat Pengantar Usulan dari Kepala Seksi / Pejabat Pembuat Komitmen',
          'Data Realisasi Anggaran Berjalan melalui Aplikasi SAKTI'
        ],
        prosedur: 'Penelaahan urgensi revisi -> Rekonsiliasi pagu belanja -> Unggah berkas ke aplikasi SatuDJA.',
        waktu: '3 - 5 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Penyusunan-Revisi-Anggaran-Kemenag.pdf',
        pdfCode: 'SOP/TU-REN/01/2026'
      },
      {
        id: 'ren-svc-2',
        title: 'Penyusunan Laporan Kinerja Instansi Pemerintah (LKjIP & SAKIP)',
        desc: 'Penyusunan buku laporan kinerja tahunan, pengukuran capaian IKU (Indikator Kinerja Utama), dan evaluasi efisiensi program kerja.',
        syarat: [
          'Laporan Capaian Output masing-masing Seksi/Penyelenggara',
          'Dokumen Perjanjian Kinerja (PK) awal tahun',
          'Bukti dukung capaian kinerja triwulanan'
        ],
        prosedur: 'Kompilasi data capaian output -> Pengolahan data statistik -> Penyusunan naskah LKjIP resmi Kemenag Wonosobo.',
        waktu: 'Tahunan / Sesuai Jadwal MenPAN-RB',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Penyusunan-LKjIP-Kemenag-Wonosobo.pdf',
        pdfCode: 'SOP/TU-REN/02/2026'
      }
    ],
    photos: [
      {
        title: 'Rapat Koordinasi Penyusunan Rencana Kerja Anggaran (RKA-K/L) Tahun Anggaran 2027',
        date: '04 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80',
        caption: 'Penyelarasan pagu indikatif bersama seluruh Kepala Seksi dan pengelola DIPA kantor Kemenag Wonosobo.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Paparan Capaian Kinerja dan Program Strategis Kemenag Kabupaten Wonosobo',
        date: '01 Oktober 2026',
        duration: '06:45',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  {
    id: 'pelayanan',
    parentId: 'subbag-tu',
    title: 'Pelayanan',
    fullTitle: 'Urusan Pelayanan Umum & Rumah Tangga',
    subtitle: 'Bagian Subbag Tata Usaha Kemenag Wonosobo',
    badge: 'Umum, Persuratan & BMN',
    icon: 'newspaper',
    color: 'blue',
    description: 'Unit kerja di bawah Subbag Tata Usaha yang mengelola ketatausahaan kantor, tata persuratan dinas (SRIKANDI), kearsipan, kepegawaian ASN, urusan rumah tangga, dan pemeliharaan Barang Milik Negara (BMN).',
    contact: {
      officer: 'Tim Urusan Pelayanan Umum & Rumah Tangga',
      role: 'Pelayanan Tata Persuratan, Kepegawaian & Sarana Kantor',
      phone: '+62 823-2680-5111',
      rawPhone: '6282326805111',
      hours: 'Senin - Jumat (07.30 - 16.00 WIB)'
    },
    structure: [
      {
        name: 'Drs. H. Imron Rosyadi, M.Pd.I',
        role: 'Kepala Subbagian Tata Usaha (Kasubbag TU)',
        nip: '19750412 200212 1 002',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        badge: 'Pembina'
      },
      {
        name: 'Nur Kholis, S.Ag',
        role: 'Penata Urusan Rumah Tangga & Sarana Kantor',
        nip: '19810419 200801 1 012',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        badge: 'Koordinator Umum'
      },
      {
        name: 'Endang Sri Rejeki, S.AP',
        role: 'Analis Tata Persuratan Dinas & Kearsipan Digital',
        nip: '19890623 201403 2 002',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        badge: 'Pengelola Arsip'
      }
    ],
    services: [
      {
        id: 'ply-svc-1',
        title: 'Layanan Tata Persuratan Dinas Resmi & Ekspedisi (Aplikasi SRIKANDI)',
        desc: 'Penerimaan surat masuk eksternal, penomoran naskah dinas keluar resmi Kemenag Wonosobo, dan pengiriman surat kilat dinas.',
        syarat: [
          'Surat resmi bertanda tangan pimpinan instansi dan stempel basah / TTE elektronik',
          'Lampiran berkas lengkap (jika ada)',
          'Nomor kontak pengirim surat untuk konfirmasi tanda terima'
        ],
        prosedur: 'Registrasi di aplikasi SRIKANDI -> Pemindaian digital -> Disposisi Kepala Kantor / Kasubbag TU -> Ekspedisi ke seksi terkait.',
        waktu: '1 - 2 Jam (Selesai pada hari yang sama)',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Tata-Persuratan-Dinas-Srikandi.pdf',
        pdfCode: 'SOP/TU-PLY/01/2026'
      },
      {
        id: 'ply-svc-2',
        title: 'Peminjaman Aula & Sarana Prasarana Gedung Kantor',
        desc: 'Fasilitasi penggunaan Gedung Aula Kemenag Wonosobo untuk kegiatan ormas keagamaan, madrasah, PGRI, KKG, dan keagamaan umum.',
        syarat: [
          'Surat Permohonan peminjaman aula ditujukan kepada Kepala Kemenag Wonosobo',
          'Rundown acara & estimasi jumlah peserta',
          'Surat pernyataan sanggup menjaga kebersihan dan ketertiban fasilitas'
        ],
        prosedur: 'Pengajuan surat minimal 5 hari sebelum acara -> Pengecekan jadwal oleh Pengelola Rumah Tangga -> Penerbitan Izin Penggunaan.',
        waktu: '1 Hari Kerja',
        biaya: 'Gratis (Sesuai Ketentuan Pemakaian Kedinasan)',
        pdfName: 'SOP-Peminjaman-Aula-dan-Sarpras.pdf',
        pdfCode: 'SOP/TU-PLY/02/2026'
      }
    ],
    photos: [
      {
        title: 'Modernisasi Ruang Pelayanan dan Penataan Arsip Dinamis Subbag TU Kemenag Wonosobo',
        date: '06 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80',
        caption: 'Penerapan sistem kearsipan berbasis elektronik untuk menjaga keamanan dan kecepatan temu balik arsip persuratan.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Tour Fasilitas Gedung Kantor Kemenag Kabupaten Wonosobo yang Inklusif',
        date: '03 Oktober 2026',
        duration: '03:50',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  {
    id: 'keuangan',
    parentId: 'subbag-tu',
    title: 'Keuangan',
    fullTitle: 'Urusan Keuangan & Perbendaharaan',
    subtitle: 'Bagian Subbag Tata Usaha Kemenag Wonosobo',
    badge: 'Perbendaharaan & SAKTI',
    icon: 'coins',
    color: 'amber',
    description: 'Unit kerja di bawah Subbag Tata Usaha yang mengelola administrasi perbendaharaan, pencairan anggaran APBN melalui SP2D KPPN, verifikasi pertanggungjawaban keuangan, penggajian ASN, dan rekonsiliasi PNBP.',
    contact: {
      officer: 'Tim Urusan Keuangan Subbag TU',
      role: 'Bendahara Pengeluaran & Analis Keuangan APBN',
      phone: '+62 813-9249-9281',
      rawPhone: '6281392499281',
      hours: 'Senin - Jumat (07.30 - 16.00 WIB)'
    },
    structure: [
      {
        name: 'Drs. H. Imron Rosyadi, M.Pd.I',
        role: 'Kepala Subbagian Tata Usaha (Kasubbag TU)',
        nip: '19750412 200212 1 002',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        badge: 'Pembina'
      },
      {
        name: 'Hendro Wibowo, S.E',
        role: 'Bendahara Pengeluaran Kantor Kemenag Wonosobo',
        nip: '19820715 200701 1 015',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        badge: 'Bendahara Pengeluaran'
      },
      {
        name: 'Sri Lestari, S.E., Ak',
        role: 'Analis Pengelolaan Keuangan APBN & Akuntansi SAKTI',
        nip: '19870312 201101 2 009',
        photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
        badge: 'Analis Akuntansi'
      }
    ],
    services: [
      {
        id: 'keu-svc-1',
        title: 'Verifikasi & Penerbitan Surat Perintah Membayar (SPM/SP2D)',
        desc: 'Layanan penelitian kelengkapan kuitansi, bukti potong pajak, dan berkas pencairan anggaran DIPA kantor sebelum dikirim ke KPPN Banjarnegara.',
        syarat: [
          'Kuitansi pengeluaran bermaterai dan nota pembelanjaan resmi',
          'Surat Keputusan (SK) atau Surat Tugas kegiatan',
          'Daftar Hadir dan bukti dokumentasi kegiatan fisik'
        ],
        prosedur: 'Verifikasi bukti transaksi -> Penginputan modul pembayaran SAKTI -> Penerbitan SPM -> Validasi KPPN menjadi SP2D.',
        waktu: '1 - 2 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Penerbitan-SPM-dan-SP2D.pdf',
        pdfCode: 'SOP/TU-KEU/01/2026'
      },
      {
        id: 'keu-svc-2',
        title: 'Rekonsiliasi & Penyusunan Laporan Keuangan WTP (SAKTI)',
        desc: 'Penyusunan Laporan Keuangan Semesteran dan Tahunan (Neraca, LRA, LO, LPE, CaLK) terakreditasi Wajar Tanpa Pengecualian.',
        syarat: [
          'Laporan BMN dari modul Aset Tetap dan Persediaan',
          'Berita Acara Rekonsiliasi Internal antar Pengelola',
          'Data Realisasi Rekening Koran Kas Negara'
        ],
        prosedur: 'Rekonsiliasi data transaksi -> Tutup periode akuntansi -> Cetak Laporan Keuangan resmi Kemenag Wonosobo.',
        waktu: 'Periodik Semester / Tahunan',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Rekonsiliasi-Laporan-Keuangan.pdf',
        pdfCode: 'SOP/TU-KEU/02/2026'
      }
    ],
    photos: [
      {
        title: 'Rekonsiliasi Laporan Keuangan Semester I Bersama KPPN dan Kanwil Kemenag Jateng',
        date: '02 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80',
        caption: 'Pencapaian Indikator Kinerja Pelaksanaan Anggaran (IKPA) Kemenag Wonosobo dengan predikat Sangat Baik (Nilai 98,8).',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Pertahankan Predikat WTP: Transparansi Pengelolaan Anggaran Kemenag Wonosobo',
        date: '30 September 2026',
        duration: '05:15',
        thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  }
];

// DAFTAR UNIT & SEKSI DI HALAMAN UTAMA
const SEKSI_DATA = [
  // 1. SUBBAG TATA USAHA (Memiliki 4 Tombol Layanan di dalamnya)
  {
    id: 'subbag-tu',
    title: 'Subbag TU',
    fullTitle: 'Subbagian Tata Usaha',
    subtitle: 'Membawahi 4 Layanan: PTSP, Perencanaan, Pelayanan, & Keuangan',
    badge: '4 Layanan Utama',
    icon: 'building-2',
    color: 'emerald',
    isParentSubbag: true
  },

  // 2. SEKSI BIMAS ISLAM
  {
    id: 'bimas',
    title: 'Bimas Islam',
    fullTitle: 'Seksi Bimas Islam',
    subtitle: 'Bimbingan Masyarakat Islam, KUA & Kemasjidan',
    badge: '15 KUA & Kemasjidan',
    icon: 'book-heart',
    color: 'teal',
    contact: {
      officer: 'Petugas Front Office Bimas Islam',
      role: 'Pelayanan KUA, Kemasjidan, Halal & Penyuluhan Agama',
      phone: '+62 821-3783-3747',
      rawPhone: '6282137833747',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    structure: [
      {
        name: 'H. Fakih Khusni, S.Ag., M.S.I',
        role: 'Kepala Seksi Bimas Islam',
        nip: '19720510 199803 1 003',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        badge: 'Kepala Seksi'
      },
      {
        name: 'Drs. H. Miftahudin, M.H',
        role: 'Penghulu Ahli Madya / Koordinator Kepenghuluan',
        nip: '19700814 199603 1 002',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Koordinator Kepenghuluan'
      },
      {
        name: 'Hj. Umi Kulsum, S.Ag',
        role: 'Penyuluh Agama Islam Ahli Madya',
        nip: '19760920 200312 2 001',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyuluh Ahli'
      }
    ],
    services: [
      {
        id: 'bimas-1',
        title: 'Layanan Rekomendasi Nikah & Bimbingan SIMKAH Online',
        desc: 'Pengurusan rekomendasi pindah nikah antar kecamatan/luar kota serta verifikasi status pernikahan resmi Kemenag.',
        syarat: [
          'Surat Pengantar dari Kepala Desa / Kelurahan (Model N1 - N4)',
          'Fotokopi KTP, KK, Akta Kelahiran, dan Ijazah Calon Pengantin',
          'Surat Rekomendasi Nikah dari KUA Asal Kecamatan'
        ],
        prosedur: 'Daftar online di simkah4.kemenag.go.id -> Pemeriksaan berkas di KUA setempat -> Penerbitan rekomendasi.',
        waktu: '1 Hari Kerja',
        biaya: 'Gratis di KUA (Di luar KUA PNBP Rp 600.000,-)',
        pdfName: 'SOP-Rekomendasi-Nikah-SIMKAH.pdf',
        pdfCode: 'SOP/BIMAS/01/2026'
      },
      {
        id: 'bimas-2',
        title: 'Pendampingan Sertifikasi Halal Gratis (SEHATI UMK)',
        desc: 'Fasilitasi penerbitan Sertifikat Halal resmi BPJPH Kemenag bagi pelaku usaha kuliner dan produk mikro di Wonosobo.',
        syarat: [
          'Memiliki Nomor Induk Berusaha (NIB) berbasis risiko',
          'KTP Pelaku Usaha dan foto produk',
          'Daftar bahan baku yang sudah bersertifikat halal'
        ],
        prosedur: 'Pendaftaran di ptsp.halal.go.id -> Pendampingan PPH Kemenag -> Sidang Komite Fatwa -> Sertifikat Halal terbit.',
        waktu: '14 Hari Kerja',
        biaya: 'Gratis (Program SEHATI Bebas Biaya)',
        pdfName: 'SOP-Sertifikasi-Halal-SEHATI.pdf',
        pdfCode: 'SOP/BIMAS/02/2026'
      }
    ],
    photos: [
      {
        title: 'Bimbingan Remaja Usia Sekolah (BRUS) Cegah Pernikahan Dini di SMA Negeri Wonosobo',
        date: '04 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80',
        caption: 'Penyuluh Agama Islam Seksi Bimas Islam memberikan edukasi kesiapan mental, reproduksi, dan spiritual bagi pelajar.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Revitalisasi KUA Kemenag Wonosobo: Pusat Layanan Keagamaan Terpadu',
        date: '02 Oktober 2026',
        duration: '07:20',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 3. SEKSI PENDIDIKAN MADRASAH (PENMAD)
  {
    id: 'penmad',
    title: 'Penmad',
    fullTitle: 'Seksi Pendidikan Madrasah',
    subtitle: 'Pembinaan RA, MI, MTs & MA Kabupaten Wonosobo',
    badge: 'Madrasah Maju Bermutu',
    icon: 'graduation-cap',
    color: 'emerald',
    contact: {
      officer: 'Petugas Front Office Seksi Penmad',
      role: 'Pelayanan Kelembagaan Madrasah, Kurikulum & Bantuan Siswa',
      phone: '+62 813-9249-9281',
      rawPhone: '6281392499281',
      hours: 'Senin - Jumat (07.30 - 16.00 WIB)'
    },
    structure: [
      {
        name: 'Drs. H. Totok Jumantoro, M.S.I',
        role: 'Kepala Seksi Pendidikan Madrasah',
        nip: '19680315 199403 1 004',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Kepala Seksi'
      },
      {
        name: 'Bayu Wicaksono, S.Pd',
        role: 'Pengelola Data EMIS 4.0 & Simpatika Madrasah',
        nip: '19890412 201503 1 002',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        badge: 'Admin EMIS'
      }
    ],
    services: [
      {
        id: 'penmad-1',
        title: 'Izin Operasional Madrasah Baru (IJOP RA/MI/MTs/MA)',
        desc: 'Verifikasi perizinan pendirian satuan pendidikan madrasah swasta baru di seluruh kecamatan Kabupaten Wonosobo.',
        syarat: [
          'Akta Notaris Yayasan dan SK Pengesahan Kemenkumham',
          'Proposal Studi Kelayakan dan Kurikulum Madrasah',
          'Bukti kepemilikan tanah dan bangunan yayasan yang sah'
        ],
        prosedur: 'Pengajuan berkas online di vervalijop.kemenag.go.id -> Visitasi lapangan oleh Tim Penmad -> Penerbitan SK IJOP.',
        waktu: '14 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Izin-Operasional-Madrasah-IJOP.pdf',
        pdfCode: 'SOP/PENMAD/01/2026'
      }
    ],
    photos: [
      {
        title: 'Kontingen Madrasah Wonosobo Borong Prestasi pada Kompetisi Sains Madrasah (KSM) Provinsi',
        date: '05 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80',
        caption: 'Pemberian apresiasi oleh Kepala Kemenag Wonosobo kepada para juara bidang Sains dan Riset Madrasah.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Madrasah Mandiri Berprestasi: Profil Inovasi Pembelajaran Digital di Wonosobo',
        date: '01 Oktober 2026',
        duration: '06:10',
        thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 4. SEKSI PENDIDIKAN AGAMA ISLAM (PAIS)
  {
    id: 'pais',
    title: 'PAIS',
    fullTitle: 'Seksi Pendidikan Agama Islam',
    subtitle: 'Pembinaan Guru PAI Sekolah TK, SD, SMP, SMA & SMK',
    badge: 'Guru PAI Sekolah Umum',
    icon: 'book-open-check',
    color: 'amber',
    contact: {
      officer: 'Petugas Front Office Seksi PAIS',
      role: 'Pelayanan TPG Guru PAI, Aplikasi SIAGA & PPG',
      phone: '+62 852-2736-3425',
      rawPhone: '6285227363425',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    structure: [
      {
        name: 'H. Asrori, S.Ag., M.Pd.I',
        role: 'Kepala Seksi Pendidikan Agama Islam',
        nip: '19730612 199903 1 003',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        badge: 'Kepala Seksi'
      },
      {
        name: 'Lutfi Hakim, S.Pd.I',
        role: 'Admin Aplikasi SIAGA PAI & Verval Sertifikasi',
        nip: '19870914 201201 1 004',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Admin SIAGA'
      }
    ],
    services: [
      {
        id: 'pais-1',
        title: 'Pencairan Tunjangan Profesi Guru (TPG) PAI PNS & Non-PNS',
        desc: 'Verifikasi berkas persyaratan pencairan tunjangan sertifikasi pendidik bagi Guru PAI yang bertugas di sekolah umum se-Kabupaten Wonosobo.',
        syarat: [
          'Cetak Surat Keterangan Menjalankan Tugas (SKMT) & SKBK dari SIAGA PAI',
          'Jadwal Mengajar resmi yang disahkan Kepala Sekolah dan Pengawas',
          'Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) bermaterai'
        ],
        prosedur: 'Guru mengunggah berkas di SIAGA -> Verifikasi oleh admin PAIS -> Penerbitan Surat Perintah Membayar (SPM).',
        waktu: 'Sesuai Jadwal Triwulan',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Pencairan-TPG-Guru-PAI.pdf',
        pdfCode: 'SOP/PAIS/01/2026'
      }
    ],
    photos: [
      {
        title: 'Ratusan Guru PAI Sekolah Umum Wonosobo Ikuti Pelatihan Media Pembelajaran AI',
        date: '02 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80',
        caption: 'Kerjasama KKG dan MGMP PAI untuk menghadirkan materi pendidikan agama yang menarik bagi Generasi Z.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Inovasi Guru PAI Wonosobo: Moderasi Beragama di Ruang Kelas Sekolah Negeri',
        date: '28 September 2026',
        duration: '04:45',
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 5. SEKSI PENDIDIKAN DINIYAH & PONTREN (PD PONTREN)
  {
    id: 'pontren',
    title: 'PD Pontren',
    fullTitle: 'Seksi PD Pontren',
    subtitle: 'Pondok Pesantren, TPQ & Madrasah Diniyah',
    badge: 'Kemandirian Pesantren',
    icon: 'landmark',
    color: 'purple',
    contact: {
      officer: 'Petugas Front Office PD Pontren',
      role: 'Pelayanan IJOP Pesantren, TPQ, Madin & Bantuan Santri',
      phone: '+62 856-4383-5449',
      rawPhone: '6285643835449',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    structure: [
      {
        name: 'H. Subhan, S.Ag., M.S.I',
        role: 'Kepala Seksi PD Pontren',
        nip: '19741120 200112 1 002',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        badge: 'Kepala Seksi'
      },
      {
        name: 'Gus Ahmad Munir, S.Pd.I',
        role: 'Penyusun Pembinaan Kelembagaan Pondok Pesantren',
        nip: '19850518 201001 1 011',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Pembina Pesantren'
      }
    ],
    services: [
      {
        id: 'pontren-1',
        title: 'Izin Operasional Pondok Pesantren (NSP - SITREN)',
        desc: 'Penerbitan Nomor Statistik Pesantren resmi yang memenuhi rukun pesantren (Kyai, Santri Mukim, Asrama, Masjid/Musala, Kitab Kuning).',
        syarat: [
          'Surat Permohonan Pengasuh Pesantren kepada Kepala Kemenag',
          'Dokumen profil pesantren dan daftar santri mukim minimal 15 orang',
          'Akta Notaris Yayasan dan fotokopi sertifikat tanah pesantren'
        ],
        prosedur: 'Daftar mandiri via sitren.kemenag.go.id -> Verifikasi lapangan petugas PD Pontren -> Rekomendasi penerbitan SK NSP.',
        waktu: '7 - 14 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Izin-Operasional-Pesantren-NSP.pdf',
        pdfCode: 'SOP/PONTREN/01/2026'
      }
    ],
    photos: [
      {
        title: 'Rakor Persiapan Hari Santri Nasional 2026 Bersama Ratusan Pengasuh Pesantren Se-Wonosobo',
        date: '03 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=80',
        caption: 'Penyusunan rangkaian agenda Kemandirian Pesantren, Musabaqah Qira\'atil Kutub, dan Apel Akbar Santri.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Semarak Expo Kemandirian Pesantren Kemenag Kabupaten Wonosobo',
        date: '29 September 2026',
        duration: '05:10',
        thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 6. PENYELENGGARA ZAKAT & WAKAF (ZAWA)
  {
    id: 'zawa',
    title: 'Penyelenggara Zawa',
    fullTitle: 'Penyelenggara Zakat & Wakaf (Zawa)',
    subtitle: 'Sertifikasi Tanah Wakaf & Pembinaan Nazhir',
    badge: 'Sertifikat Wakaf Gratis',
    icon: 'coins',
    color: 'rose',
    contact: {
      officer: 'Petugas Front Office Penyelenggara Zawa',
      role: 'Pelayanan Akta Ikrar Wakaf (AIW), Sertifikasi Tanah & BAZNAS',
      phone: '+62 852-2785-8924',
      rawPhone: '6285227858924',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    structure: [
      {
        name: 'H. Moh. Muhlisin, S.Ag',
        role: 'Penyelenggara Zakat dan Wakaf (Penzawa)',
        nip: '19750314 200312 1 003',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyelenggara'
      },
      {
        name: 'Fajar Nugraha, S.Sy',
        role: 'Analis Pengelolaan Wakaf & Sertifikasi BPN',
        nip: '19890212 201402 1 005',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Analis Wakaf'
      }
    ],
    services: [
      {
        id: 'zawa-1',
        title: 'Sertifikasi Tanah Wakaf Gratis (MoU Kemenag - ATR/BPN)',
        desc: 'Pendampingan penerbitan sertifikat hak milik wakaf untuk tanah masjid, musala, makam, dan madrasah bebas biaya pendaftaran.',
        syarat: [
          'Akta Ikrar Wakaf (AIW) atau APAIW dari Kepala KUA / PPAIW setempat',
          'Sertifikat Asli Hak Milik / Letter C / Petuk Pajak tanah asal',
          'Fotokopi KTP Wakif dan susunan Nazhir resmi yang disahkan Kemenag'
        ],
        prosedur: 'Proses AIW di KUA -> Verifikasi berkas di Penyelenggara Zawa -> Pengukuran & Penerbitan Sertifikat oleh Kantor BPN Wonosobo.',
        waktu: '14 - 30 Hari Kerja',
        biaya: 'Gratis (Program Percepatan Sertifikasi Wakaf)',
        pdfName: 'SOP-Sertifikasi-Tanah-Wakaf-Gratis.pdf',
        pdfCode: 'SOP/ZAWA/01/2026'
      }
    ],
    photos: [
      {
        title: 'Penyerahan 65 Sertifikat Tanah Wakaf Rumah Ibadah di Pendopo Bupati Wonosobo',
        date: '30 September 2026',
        image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=700&q=80',
        caption: 'Pemberian kepastian hukum aset keagamaan bagi takmir masjid dan pondok pesantren di pelosok Wonosobo.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Gerakan Amankan Aset Umat: Program Sertifikasi Tanah Wakaf Kemenag Wonosobo',
        date: '27 September 2026',
        duration: '04:50',
        thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 7. PENYELENGGARA SYARIAH
  {
    id: 'syariah',
    title: 'Penyelenggara Syariah',
    fullTitle: 'Penyelenggara Syariah',
    subtitle: 'Kalibrasi Arah Kiblat, Hisab Rukyat & Konsultasi Syariah',
    badge: 'Akurasi Arah Kiblat',
    icon: 'compass',
    color: 'teal',
    contact: {
      officer: 'Petugas Penyelenggara Syariah',
      role: 'Pelayanan Penentuan Arah Kiblat & Hisab Rukyatul Hilal',
      phone: '+62 852-2785-8924',
      rawPhone: '6285227858924',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    structure: [
      {
        name: 'H. Ahmad Syarifudin, M.S.I',
        role: 'Penyelenggara Syariah Kemenag Wonosobo',
        nip: '19760810 200501 1 004',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyelenggara'
      },
      {
        name: 'Rifqi Abdullah, S.T',
        role: 'Tim Falakiyah & Ahli Ukur Theodolite Azimuth',
        nip: '19930315 201903 1 003',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        badge: 'Tim Falakiyah'
      }
    ],
    services: [
      {
        id: 'syr-1',
        title: 'Pengukuran & Sertifikasi Kalibrasi Arah Kiblat (Theodolite Digital)',
        desc: 'Penentuan sudut presisi arah kiblat masjid, musala, dan tempat pemakaman muslim menggunakan kompas theodolite berstandar nasional.',
        syarat: [
          'Surat Permohonan Takmir Masjid / Panitia Pembangunan',
          'Alamat lengkap dan share location titik bangunan masjid',
          'Nomor kontak penanggung jawab di lokasi'
        ],
        prosedur: 'Surat permohonan masuk -> Tim Ahli Falakiyah datang ke lokasi -> Pengukuran lapangan -> Penerbitan Berita Acara & Sertifikat Arah Kiblat.',
        waktu: '2 - 3 Hari Kerja',
        biaya: 'Gratis (Rp 0,- Bebas Biaya)',
        pdfName: 'SOP-Pengukuran-Arah-Kiblat.pdf',
        pdfCode: 'SOP/SYARIAH/01/2026'
      },
      {
        id: 'syr-2',
        title: 'Konsultasi Penentuan Jadwal Sholat Sepanjang Tahun',
        desc: 'Penerbitan jadwal sholat presisi koordinat lokal Kabupaten Wonosobo untuk acuan jadwal imsakiyah dan waktu sholat 15 kecamatan.',
        syarat: ['Surat Permohonan / Permintaan Jadwal Imsakiyah'],
        prosedur: 'Perhitungan koordinat geografis -> Penerbitan tabel resmi hisab syariah.',
        waktu: '1 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Jadwal-Sholat-Syariah.pdf',
        pdfCode: 'SOP/SYARIAH/02/2026'
      }
    ],
    photos: [
      {
        title: 'Tim Falakiyah Kemenag Wonosobo Lakukan Kalibrasi Arah Kiblat Masjid Agung Baru',
        date: '01 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=700&q=80',
        caption: 'Pemanfaatan theodolite digital presisi tinggi untuk memastikan keakuratan arah kiblat jamaah.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Tutorial & Edukasi: Cara Tim Syariah Kemenag Mengukur Arah Kiblat Presisi',
        date: '26 September 2026',
        duration: '05:35',
        thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 8. PENYELENGGARA KRISTEN
  {
    id: 'kristen',
    title: 'Penyelenggara Kristen',
    fullTitle: 'Penyelenggara Kristen',
    subtitle: 'Bimbingan Masyarakat & Pendidikan Agama Kristen',
    badge: 'Gereja & Umat Kristen',
    icon: 'cross',
    color: 'blue',
    contact: {
      officer: 'Petugas Penyelenggara Kristen',
      role: 'Pelayanan Umat, Gereja Kristen & Guru Agama Kristen',
      phone: '+62 813-2891-2311',
      rawPhone: '6281328912311',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    structure: [
      {
        name: 'Samuel Hendra Pratama, S.Th., M.Pd.K',
        role: 'Penyelenggara Kristen Kemenag Wonosobo',
        nip: '19780612 200501 1 003',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyelenggara'
      },
      {
        name: 'Deborah Natalia, S.Pd.K',
        role: 'Penyuluh Agama Kristen Ahli Pertama',
        nip: '19891225 201503 2 004',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyuluh Agama'
      }
    ],
    services: [
      {
        id: 'kristen-1',
        title: 'Rekomendasi Bantuan Rumah Ibadah & Gereja Kristen',
        desc: 'Penerbitan surat rekomendasi permohonan bantuan sarana prasarana peribadatan Gereja Kristen ke pemerintah daerah atau Kanwil.',
        syarat: [
          'Surat Permohonan resmi dari Pengurus Gereja / Majelis Jemaat',
          'Proposal teknis perbaikan bangunan atau pengadaan sarpras',
          'Surat Keterangan Tanda Daftar Gereja yang masih berlaku'
        ],
        prosedur: 'Pengajuan berkas -> Verifikasi administrasi Penyelenggara Kristen -> Penerbitan Surat Rekomendasi Resmi.',
        waktu: '2 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Rekomendasi-Gereja-Kristen.pdf',
        pdfCode: 'SOP/KRISTEN/01/2026'
      },
      {
        id: 'kristen-2',
        title: 'Pendaftaran Tanda Daftar Lembaga Keagamaan & Gereja Kristen',
        desc: 'Layanan penerbitan Surat Keterangan Terdaftar (SKT) resmi bagi gereja, sinode, dan yayasan keagamaan Kristen di Wonosobo.',
        syarat: [
          'Akta Notaris Yayasan / Sinode Pengesahan Kemenkumham',
          'Daftar Pengurus Majelis Jemaat dan surat keterangan domisili',
          'Foto bangunan tempat ibadah gereja'
        ],
        prosedur: 'Verifikasi berkas -> Visitasi lapangan -> Penerbitan SK Tanda Daftar.',
        waktu: '3 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Tanda-Daftar-Gereja-Kristen.pdf',
        pdfCode: 'SOP/KRISTEN/02/2026'
      }
    ],
    photos: [
      {
        title: 'Pembinaan Moderasi Beragama dan Dialog Kerukunan Umat Kristen Se-Kabupaten Wonosobo',
        date: '28 September 2026',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=80',
        caption: 'Mempererat tali kasih persaudaraan dan partisipasi aktif umat Kristen dalam pembangunan daerah Wonosobo.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Harmoni Kerukunan: Potret Kebersamaan Umat Kristiani di Kabupaten Wonosobo',
        date: '25 September 2026',
        duration: '04:30',
        thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 9. PENYELENGGARA KATOLIK
  {
    id: 'katolik',
    title: 'Penyelenggara Katolik',
    fullTitle: 'Penyelenggara Katolik',
    subtitle: 'Bimbingan Masyarakat & Pendidikan Agama Katolik',
    badge: 'Gereja & Umat Katolik',
    icon: 'cross',
    color: 'indigo',
    contact: {
      officer: 'Petugas Penyelenggara Katolik',
      role: 'Pelayanan Umat, Gereja Katolik & Guru Agama',
      phone: '+62 852-2714-4866',
      rawPhone: '6285227144866',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    structure: [
      {
        name: 'Yohanes Baptista Sudarman, S.Ag',
        role: 'Penyelenggara Katolik Kemenag Wonosobo',
        nip: '19730514 200212 1 003',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyelenggara'
      },
      {
        name: 'Maria Magdalena Sri Hartati, S.Pd',
        role: 'Penyuluh Agama Katolik / Urusan Pendidikan',
        nip: '19860822 201101 2 008',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyuluh Agama'
      }
    ],
    services: [
      {
        id: 'katolik-1',
        title: 'Rekomendasi Bantuan Rumah Ibadah & Gereja Katolik',
        desc: 'Penerbitan surat rekomendasi permohonan bantuan sarana prasarana peribadatan Gereja Katolik ke pemerintah daerah atau Kanwil.',
        syarat: [
          'Surat Permohonan resmi dari Pengurus Gereja / Stasi / Paroki',
          'Proposal teknis perbaikan bangunan atau pengadaan sarpras',
          'Surat Keterangan Tanda Daftar Gereja yang masih berlaku'
        ],
        prosedur: 'Pengajuan berkas -> Verifikasi administrasi Penyelenggara Katolik -> Penerbitan Surat Rekomendasi Resmi.',
        waktu: '2 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Rekomendasi-Gereja-Katolik.pdf',
        pdfCode: 'SOP/KATOLIK/01/2026'
      }
    ],
    photos: [
      {
        title: 'Dialog Pemuda Lintas Agama dan Penguatan Moderasi Beragama di Paroki Wonosobo',
        date: '29 September 2026',
        image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=700&q=80',
        caption: 'Menjaga kerukunan antarumat beragama dan harmoni toleransi di bumi asri Wonosobo.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Potret Toleransi & Moderasi Beragama di Kabupaten Wonosobo',
        date: '25 September 2026',
        duration: '04:15',
        thumbnail: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 10. PENYELENGGARA BUDDHA
  {
    id: 'buddha',
    title: 'Penyelenggara Buddha',
    fullTitle: 'Penyelenggara Buddha',
    subtitle: 'Bimbingan Masyarakat & Pembinaan Vihara Buddha',
    badge: 'Vihara & Umat Buddha',
    icon: 'book-open-check',
    color: 'amber',
    contact: {
      officer: 'Petugas Penyelenggara Buddha',
      role: 'Pelayanan Umat Buddha, Vihara & Bimbingan Dharma',
      phone: '+62 813-2810-7744',
      rawPhone: '6281328107744',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    structure: [
      {
        name: 'Pandita Budi Santoso, S.Ag., M.Pd.B',
        role: 'Penyelenggara Buddha Kemenag Wonosobo',
        nip: '19790415 200604 1 002',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyelenggara'
      },
      {
        name: 'Ratna Sari Dewi, S.Pd.B',
        role: 'Penyuluh Agama Buddha Ahli Muda',
        nip: '19880520 201201 2 006',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        badge: 'Penyuluh Agama'
      }
    ],
    services: [
      {
        id: 'buddha-1',
        title: 'Rekomendasi Bantuan Rumah Ibadah Vihara & Cetiya',
        desc: 'Penerbitan surat rekomendasi permohonan bantuan rehabilitasi dan sarana ibadah Vihara bagi umat Buddha di Wonosobo.',
        syarat: [
          'Surat Permohonan Pengurus Vihara / Magabudhi / Walubi',
          'Proposal teknis perbaikan bangunan vihara',
          'Tanda Daftar Vihara resmi Kemenag RI'
        ],
        prosedur: 'Pengajuan proposal -> Verifikasi berkas & lokasi vihara -> Penerbitan Surat Rekomendasi Resmi.',
        waktu: '2 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Rekomendasi-Vihara-Buddha.pdf',
        pdfCode: 'SOP/BUDDHA/01/2026'
      },
      {
        id: 'buddha-2',
        title: 'Pendaftaran Tanda Daftar Vihara Resmi Kemenag',
        desc: 'Layanan penerbitan nomor registrasi tanda daftar resmi bagi tempat ibadah Vihara dan Cetiya di Kabupaten Wonosobo.',
        syarat: [
          'Surat Permohonan Takmir / Dayaka Sabha Vihara',
          'Susunan Pengurus Vihara yang disahkan',
          'Bukti kepemilikan / status tanah vihara'
        ],
        prosedur: 'Pemeriksaan berkas administrasi -> Validasi lapangan -> Penerbitan Piagam Tanda Daftar Vihara.',
        waktu: '3 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Tanda-Daftar-Vihara.pdf',
        pdfCode: 'SOP/BUDDHA/02/2026'
      }
    ],
    photos: [
      {
        title: 'Perayaan Hari Raya Trisuci Waisak dan Pembinaan Kerukunan Umat Buddha di Wonosobo',
        date: '20 September 2026',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
        caption: 'Menjaga kedamaian batin, welas asih, dan harmoni keberagaman di bumi pegunungan Dieng Wonosobo.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Harmoni & Welas Asih: Dokumentasi Pembinaan Umat Buddha di Kabupaten Wonosobo',
        date: '18 September 2026',
        duration: '04:10',
        thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  },

  // 11. HUMAS (Hubungan Masyarakat)
  {
    id: 'humas',
    title: 'Humas',
    fullTitle: 'Humas & Informasi Publik',
    subtitle: 'Publikasi Berita, Media Sosial, PPID & Kerjasama Pers',
    badge: 'Media & PPID',
    icon: 'newspaper',
    color: 'blue',
    contact: {
      officer: 'Tim Humas Kemenag Wonosobo',
      role: 'Pelayanan Informasi Publik, Kerjasama Media & Berita Resmi',
      phone: '+62 823-2680-5111',
      rawPhone: '6282326805111',
      hours: 'Senin - Jumat (07.30 - 16.00 WIB)'
    },
    structure: [
      {
        name: 'Muhammad Ilham, S.I.Kom',
        role: 'Koordinator Pranata Humas Ahli / Pengelola Media Resmi',
        nip: '19870412 201101 1 005',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'Koordinator Humas'
      },
      {
        name: 'Annisa Rahmawati, S.Sos',
        role: 'Pranata Humas / Pengelola Konten Media Sosial & Berita',
        nip: '19930718 201902 2 004',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        badge: 'Content Creator'
      },
      {
        name: 'Dimas Aditya, S.Kom',
        role: 'Desainer Grafis & Kameramen Dokumentasi Multimedia',
        nip: '19960310 202203 1 003',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        badge: 'Multimedia Editor'
      }
    ],
    services: [
      {
        id: 'humas-1',
        title: 'Layanan Permohonan Informasi Publik Resmi (PPID Terpadu)',
        desc: 'Permohonan data statistik keagamaan, laporan publik, dan dokumen keterbukaan informasi publik (UU No. 14 Tahun 2008).',
        syarat: [
          'Formulir Permohonan Informasi PPID yang telah diisi',
          'Fotokopi KTP Pemohon / KTM Mahasiswa untuk keperluan riset',
          'Tujuan penggunaan data yang jelas dan sah'
        ],
        prosedur: 'Pengisian form PPID -> Verifikasi Tim PPID -> Penyerahan dokumen informasi dalam 1-3 hari kerja.',
        waktu: '1 - 3 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Layanan-Informasi-Publik-PPID.pdf',
        pdfCode: 'SOP/HUMAS/01/2026'
      },
      {
        id: 'humas-2',
        title: 'Fasilitasi Kerjasama Liputan Media Massa & Konferensi Pers',
        desc: 'Pelayanan wawancara, peliputan kegiatan resmi pejabat kantor, dan penerbitan rilis pers resmi Kemenag Wonosobo.',
        syarat: [
          'Surat Tugas Wartawan / Kartu Pers Resmi Media',
          'Daftar pertanyaan atau topik peliputan yang jelas'
        ],
        prosedur: 'Konfirmasi ke Meja Humas -> Penjadwalan wawancara pimpinan / rilis pers resmi.',
        waktu: '1 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)',
        pdfName: 'SOP-Kerjasama-Liputan-Media-Massa.pdf',
        pdfCode: 'SOP/HUMAS/02/2026'
      }
    ],
    photos: [
      {
        title: 'Kemenag Wonosobo Raih Penghargaan Pengelolaan Keterbukaan Informasi Publik Terbaik',
        date: '06 Oktober 2026',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80',
        caption: 'Apresiasi komitmen transparansi dan kecepatan tanggap dalam melayani pertanyaan publik lewat media digital.',
        igUrl: 'https://www.instagram.com/kemenagwonosobo/'
      }
    ],
    videos: [
      {
        title: 'Behind The Scenes: Tim Humas Kemenag Wonosobo Menyapa Umat Lewat Konten Edukatif',
        date: '01 Oktober 2026',
        duration: '03:40',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
        platform: 'YouTube',
        videoUrl: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
        embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      }
    ]
  }
];

// DATA KANAL MEDIA SOSIAL & KONTAK RESMI UNTUK POPUP
const SOCIAL_MEDIA_CONTACTS = [
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@kemenagwonosobo',
    desc: 'Tonton siaran langsung, video profil, dan dokumentasi kegiatan resmi.',
    url: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA',
    badge: 'Video & Liputan',
    btnText: 'Tonton di YouTube',
    iconKey: 'youtube'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@kemenagwonosobo',
    desc: 'Ikuti galeri foto kegiatan harian, informasi grafis, dan pengumuman terbaru.',
    url: 'https://www.instagram.com/kemenagwonosobo/',
    badge: 'Foto & Reels',
    btnText: 'Buka di Instagram',
    iconKey: 'instagram'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    handle: '@KemenagWonosobo',
    desc: 'Pembaruan kilat informasi kebijakan dan siaran pers resmi.',
    url: 'https://x.com/KemenagWonosobo',
    badge: 'Pembaruan Kilat',
    btnText: 'Ikuti di Twitter / X',
    iconKey: 'twitter'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@kemenagwonosobo',
    desc: 'Video pendek edukasi keagamaan santun dan konten kreatif anak muda.',
    url: 'https://www.tiktok.com/@kemenagwonosobo',
    badge: 'Video Pendek',
    btnText: 'Buka di TikTok',
    iconKey: 'tiktok'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Kemenag Wonosobo',
    desc: 'Laman komunitas resmi publikasi artikel berita dan foto kegiatan.',
    url: 'https://www.facebook.com/kemenag.teras/',
    badge: 'Komunitas & Berita',
    btnText: 'Kunjungi Facebook',
    iconKey: 'facebook'
  },
  {
    id: 'whatsapp',
    name: 'Kontak WA 1 (Helpdesk & PTSP)',
    handle: '+62 812-3005-5633',
    desc: 'Layanan konsultasi resmi, informasi rekomendasi, dan pengaduan terpadu.',
    url: 'https://api.whatsapp.com/send?phone=6281230055633&text=Halo%20Admin%20Kemenag%20Wonosobo,%20saya%20ingin%20berkonsultasi.',
    badge: 'WhatsApp Langsung',
    btnText: 'Chat WhatsApp Sekarang',
    iconKey: 'whatsapp'
  }
];
