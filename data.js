/**
 * Data Portal Layanan & Informasi Kantor Kementerian Agama Kabupaten Wonosobo
 * Tampilan Ringkas Berbasis Ikon (Icon Tiles System)
 */

const SEKSI_DATA = [
  {
    id: 'ptsp',
    title: 'PTSP Utama',
    fullTitle: 'PTSP Kemenag Wonosobo',
    subtitle: 'Pelayanan Terpadu Satu Pintu',
    badge: 'Front Office Utama',
    icon: 'building-2',
    color: 'emerald',
    description: 'Pusat pelayanan administrasi terpadu pintu utama Kantor Kemenag Kabupaten Wonosobo untuk perizinan, surat masuk, legalisir, dan konsultasi.',
    contact: {
      officer: 'Petugas Front Office PTSP',
      role: 'Customer Service & Informasi Layanan Utama',
      phone: '+62 812-3005-5633',
      rawPhone: '6281230055633',
      hours: 'Senin - Kamis (07.30 - 16.00 WIB) | Jumat (07.30 - 16.30 WIB)'
    },
    services: [
      {
        id: 'ptsp-1',
        title: 'Permohonan Rekomendasi & Surat Keterangan',
        desc: 'Layanan penerbitan surat rekomendasi kegiatan keagamaan, rekomendasi lembaga, dan surat keterangan umum.',
        syarat: [
          'Surat Permohonan Resmi dari Lembaga/Instansi',
          'KTP Pemohon / Penanggung Jawab',
          'Proposal Kegiatan (jika ada)'
        ],
        prosedur: 'Daftar online atau serahkan berkas ke Loket PTSP -> Verifikasi berkas -> Penerbitan Rekomendasi.',
        waktu: '1 - 2 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      },
      {
        id: 'ptsp-2',
        title: 'Legalisir Ijazah & Dokumen Keagamaan',
        desc: 'Legalisir fotokopi ijazah madrasah, piagam penghargaan, dan sertifikat resmi Kemenag.',
        syarat: [
          'Ijazah / Dokumen Asli',
          'Fotokopi dokumen yang akan dilegalisir (maks. 5 lembar)',
          'KTP Asli / Identitas Diri'
        ],
        prosedur: 'Petugas mencocokkan dokumen asli dengan fotokopi -> Pengesahan oleh Pejabat Berwenang.',
        waktu: '15 - 30 Menit (Bisa Ditunggu)',
        biaya: 'Gratis (Rp 0,-)'
      },
      {
        id: 'ptsp-3',
        title: 'Konsultasi & Pengaduan Masyarakat (SP4N LAPOR)',
        desc: 'Layanan penerimaan aspirasi, pertanyaan, dan pengaduan seputar kinerja serta pelayanan Kemenag Wonosobo.',
        syarat: [
          'Identitas Pelapor (KTP/KTM)',
          'Uraian Pengaduan / Pertanyaan yang Jelas',
          'Bukti pendukung jika ada'
        ],
        prosedur: 'Pengisian form pengaduan PTSP / WhatsApp -> Disetujui Tim Humas/Subbag TU -> Tindak Lanjut.',
        waktu: '1 x 24 Jam',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'PTSP Kemenag Wonosobo Tingkatkan Layanan Digital Bebas Pungli',
        date: '04 Oktober 2026',
        time: '09:15 WIB',
        summary: 'Komitmen pelayanan prima Zona Integritas (ZI) WBK/WBBM dengan sistem antrean digital terintegrasi WhatsApp.',
        image: 'assets/hero_banner.jpg',
        badge: 'Foto & Berita'
      },
      {
        title: 'Jadwal Pelayanan Terpadu Satu Pintu Selama Bulan Ini',
        date: '01 Oktober 2026',
        time: '08:00 WIB',
        summary: 'Pelayanan tatap muka di loket gedung kantor tetap buka dari jam 07.30 WIB dengan kepastian selesainya berkas.',
        image: 'assets/hero_banner.jpg',
        badge: 'Pengumuman'
      }
    ]
  },
  {
    id: 'bimas',
    title: 'Bimas Islam',
    fullTitle: 'Seksi Bimas Islam',
    subtitle: 'Bimbingan Masyarakat Islam',
    badge: 'KUA, Nikah & Kemasjidan',
    icon: 'book-heart',
    color: 'teal',
    description: 'Membawahi tata kelola Kantor Urusan Agama (KUA) se-Kabupaten Wonosobo, pendaftaran nikah, kemasjidan, kepenghuluan, dan produk halal.',
    contact: {
      officer: 'Petugas Front Office Bimas Islam',
      role: 'Pelayanan KUA, Kemasjidan & Penyuluhan Agama Islam',
      phone: '+62 821-3783-3747',
      rawPhone: '6282137833747',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    services: [
      {
        id: 'bimas-1',
        title: 'Layanan Rekomendasi Nikah & Konsultasi SIMKAH',
        desc: 'Pengurusan rekomendasi nikah luar daerah, informasi pendaftaran nikah via SIMKAH Online.',
        syarat: [
          'Surat Pengantar dari KUA Asal / Desa',
          'Fotokopi KTP, KK, & Akta Kelahiran Calon Pengantin',
          'Pasfoto background biru ukuran 2x3 dan 3x4'
        ],
        prosedur: 'Pendaftaran via SIMKAH / KUA setempat -> Verifikasi Seksi Bimas Islam -> Penerbitan rekomendasi.',
        waktu: '1 Hari Kerja',
        biaya: 'Gratis di KUA (Di luar KUA biaya resmi PNBP Rp 600.000,-)'
      },
      {
        id: 'bimas-2',
        title: 'Konsultasi Sertifikasi Halal Gratis (SEHATI)',
        desc: 'Pendampingan sertifikasi halal bagi Pelaku Usaha Mikro dan Kecil (UMK) di Wonosobo.',
        syarat: [
          'NIB (Nomor Induk Berusaha)',
          'KTP Pelaku Usaha',
          'Daftar Produk & Bahan Baku yang digunakan'
        ],
        prosedur: 'Pendaftaran via SIHALAL -> Pendampingan PPH Kemenag -> Sidang Fatwa MUI -> Sertifikat Terbit.',
        waktu: '14 Hari Kerja',
        biaya: 'Gratis (Program SEHATI BPJPH)'
      },
      {
        id: 'bimas-3',
        title: 'Pendaftaran ID Masjid & Musala (SIMAS)',
        desc: 'Penerbitan Nomor ID Masjid/Musala resmi Kemenag untuk pengajuan bantuan dan pendataan nasional.',
        syarat: [
          'Surat Permohonan Takmir Masjid/Musala',
          'Surat Keterangan Tanah (Sertifikat Wakaf/Hak Milik)',
          'Foto Bangunan Masjid (Tampak depan & dalam)',
          'Susunan Pengurus Takmir'
        ],
        prosedur: 'Verifikasi berkas oleh Pengawas/KUA -> Input data ke SIMAS Kemenag -> Penerbitan SK ID Masjid.',
        waktu: '2 - 3 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'Kemenag Wonosobo Gencarkan Pendampingan Sertifikasi Halal Bagi UMKM Kuliner Lokal',
        date: '02 Oktober 2026',
        time: '10:30 WIB',
        summary: 'Penyuluh Agama Islam bergerak bersama Pendamping Proses Produk Halal (PPH) mendatangi pelaku usaha di pasar tradisional.',
        image: 'assets/hero_banner.jpg',
        badge: 'Liputan Foto'
      },
      {
        title: 'Revitalisasi KUA di Kabupaten Wonosobo Tingkatkan Mutu Layanan Bimbingan Remaja Usia Nikah',
        date: '28 September 2026',
        time: '14:00 WIB',
        summary: 'Program Bimbingan Remaja Usia Sekolah (BRUS) sukses digelar di 15 Kecamatan untuk cegah pernikahan dini.',
        image: 'assets/hero_banner.jpg',
        badge: 'Dokumentasi Video'
      }
    ]
  },
  {
    id: 'penmad',
    title: 'Penmad',
    fullTitle: 'Seksi Pendidikan Madrasah',
    subtitle: 'Seksi Penmad Kemenag Wonosobo',
    badge: 'RA, MI, MTs & MA',
    icon: 'graduation-cap',
    color: 'emerald',
    description: 'Pembinaan mutu pendidikan, kurikulum, kelembagaan, sarana prasarana, serta pendataan EMIS dan BOS untuk RA, MI, MTs, dan MA.',
    contact: {
      officer: 'Petugas Front Office Seksi Penmad',
      role: 'Pelayanan Madrasah, PIP, BOS & Kelembagaan',
      phone: '+62 813-9249-9281',
      rawPhone: '6281392499281',
      hours: 'Senin - Jumat (07.30 - 16.00 WIB)'
    },
    services: [
      {
        id: 'penmad-1',
        title: 'Izin Operasional Madrasah Baru (IJOP)',
        desc: 'Pengajuan perizinan pendirian RA, MI, MTs, dan MA swasta baru di wilayah Wonosobo.',
        syarat: [
          'Akte Notaris Yayasan Pengelola yang disahkan Kemenkumham',
          'Proposal Pendirian & Studi Kelayakan',
          'Daftar Calon Siswa & Tenaga Pendidik (Guru)',
          'Status Kepemilikan Tanah & Bangunan'
        ],
        prosedur: 'Pengajuan via Verval IJOP Online -> Verifikasi Lapangan oleh Tim Penmad -> Penerbitan SK IJOP.',
        waktu: '14 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      },
      {
        id: 'penmad-2',
        title: 'Pencairan Program Indonesia Pintar (PIP) Madrasah',
        desc: 'Verifikasi dan validasi siswa penerima bantuan Program Indonesia Pintar di tingkat RA/MI/MTs/MA.',
        syarat: [
          'Surat Keterangan Kepala Madrasah',
          'Fotokopi KTP Orang Tua & KKS / PKH / KTP Siswa',
          'Cetak Data Siswa di Aplikasi EMIS 4.0'
        ],
        prosedur: 'Madrasah mengajukan usulan -> Verifikasi data Seksi Penmad -> Pencairan via Bank Penyalur (BRI/BNI/BSI).',
        waktu: 'Sesuai Jadwal Tahapan Kemenag RI',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'Siswa Madrasah Wonosobo Raih Medali Emas di Kompetisi Sains Madrasah (KSM) Provinsi',
        date: '05 Oktober 2026',
        time: '11:20 WIB',
        summary: 'Selamat atas capaian membanggakan kontingen madrasah Wonosobo yang memborong medali emas di bidang Matematika dan IPA.',
        image: 'assets/hero_banner.jpg',
        badge: 'Prestasi Foto'
      }
    ]
  },
  {
    id: 'pais',
    title: 'PAIS',
    fullTitle: 'Seksi Pendidikan Agama Islam',
    subtitle: 'Seksi PAIS Kemenag Wonosobo',
    badge: 'Guru PAI Sekolah Umum',
    icon: 'book-open-check',
    color: 'amber',
    description: 'Pembinaan dan pelayanan administrasi Guru Pendidikan Agama Islam (GPAI) serta pengawas PAI pada Sekolah TK, SD, SMP, SMA, dan SMK.',
    contact: {
      officer: 'Petugas Front Office Seksi PAIS',
      role: 'Pelayanan TPG Guru PAI, SIAGA & PPG PAI',
      phone: '+62 852-2736-3425',
      rawPhone: '6285227363425',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    services: [
      {
        id: 'pais-1',
        title: 'Pencairan Tunjangan Profesi Guru (TPG) PAI',
        desc: 'Verifikasi berkas pencairan TPG bagi Guru PAI PNS dan Non-PNS yang telah bersertifikat pendidik.',
        syarat: [
          'Cetak SKMT dan SKBK dari Aplikasi SIAGA PAI',
          'Jadwal Mengajar & Daftar Hadir Bulan Berjalan',
          'Fotokopi Rekening Aktif & SPTJM'
        ],
        prosedur: 'Upload mandiri di SIAGA PAI -> Verifikasi Penilai / Admin Seksi PAIS -> Penerbitan SPM Pencairan.',
        waktu: 'Sesuai Tahapan Triwulan / Bulanan',
        biaya: 'Gratis (Rp 0,-)'
      },
      {
        id: 'pais-2',
        title: 'Pendaftaran & Pendataan SIAGA PAI',
        desc: 'Update data kepegawaian, sertifikasi, dan riwayat mengajar Guru PAI Sekolah Umum.',
        syarat: [
          'SK Pengangkatan Guru / SK Mengajar Terbaru',
          'KTP, Ijazah S1/S2 Linier PAI',
          'Sertifikat Pendidik (bagi yang sudah lulus PPG)'
        ],
        prosedur: 'Guru mengunggah dokumen di portal SIAGA -> Admin PAIS Kemenag melakukan approval.',
        waktu: '1 - 2 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'Ratusan Guru PAI Sekolah Umum di Wonosobo Ikuti Workshop Digital AI',
        date: '01 Oktober 2026',
        time: '13:45 WIB',
        summary: 'Seksi PAIS menggandeng KKG dan MGMP PAI menyelenggarakan pelatihan pembuatan media pembelajaran berbasis AI.',
        image: 'assets/hero_banner.jpg',
        badge: 'Kegiatan Foto'
      }
    ]
  },
  {
    id: 'pontren',
    title: 'PD Pontren',
    fullTitle: 'Seksi PD Pontren',
    subtitle: 'Pendidikan Pondok Pesantren',
    badge: 'Pesantren, TPQ & Madin',
    icon: 'landmark',
    color: 'purple',
    description: 'Pendataan, perizinan, dan pembinaan Pondok Pesantren, Madrasah Diniyah Takmiliyah (MDT), dan Lembaga Pendidikan Al-Qur\'an (LPQ/TPQ).',
    contact: {
      officer: 'Petugas Front Office Seksi PD Pontren',
      role: 'Pelayanan IJOP Pesantren, TPQ, Madin & Bantuan Incubation',
      phone: '+62 856-4383-5449',
      rawPhone: '6285643835449',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    services: [
      {
        id: 'pontren-1',
        title: 'Tanda Daftar & IJOP Pondok Pesantren (SITREN)',
        desc: 'Pengurusan Izin Operasional dan Nomor Statistik Pesantren (NSP) resmi Kemenag.',
        syarat: [
          'Surat Permohonan Pengasuh Pesantren',
          'Profil Pesantren (Komponen Arkanul Ma\'had: Kyai, Santri min. 15 orang, Asrama, Masjid/Musala, Kitab Kuning)',
          'Fotokopi Akta Notaris & Kemenkumham Yayasan'
        ],
        prosedur: 'Pengajuan via Portal SITREN Online -> Verifikasi Lapangan Petugas -> Rekomendasi Kemenag Wonosobo.',
        waktu: '7 - 14 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      },
      {
        id: 'pontren-2',
        title: 'Izin Operasional LPQ / TPQ & MDT (SIPDAR-PQ)',
        desc: 'Penerbitan Nomor Statistik Lembaga Pendidikan Al-Qur\'an dan Madrasah Diniyah Takmiliyah.',
        syarat: [
          'Surat Pengantar dari KUA / Badko LPQ Kecamatan',
          'Daftar Ustadz/Ustadzah & Santri',
          'Jadwal Pelajaran & Susunan Pengurus'
        ],
        prosedur: 'Pengajuan online via SIPDAR-PQ / berkas fisik -> Tim Verifikasi mengecek kelayakan -> Penerbitan SK IJOP.',
        waktu: '5 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'Persiapan Hari Santri Nasional 2026: Rakor Kemenag Wonosobo Bersama Pengasuh Pesantren',
        date: '03 Oktober 2026',
        time: '15:10 WIB',
        summary: 'Rangkaian peringatan Hari Santri akan diisi dengan Lomba Kitab Kuning, Expo Kemandirian Pesantren, dan Apel Akbar.',
        image: 'assets/hero_banner.jpg',
        badge: 'Dokumentasi Foto'
      }
    ]
  },
  {
    id: 'zawa',
    title: 'Zakat & Wakaf',
    fullTitle: 'Seksi Penyelenggara Zawa',
    subtitle: 'Zakat dan Wakaf',
    badge: 'Wakaf, Nazhir & BAZNAS',
    icon: 'coins',
    color: 'rose',
    description: 'Pengawasan pengelolaan zakat, bantuan sertifikasi tanah wakaf gratis, pembinaan Nazhir, serta akreditasi Lembaga Amil Zakat (LAZ).',
    contact: {
      officer: 'Petugas Front Office Penyelenggara Zakat & Wakaf',
      role: 'Pelayanan Akta Ikrar Wakaf (AIW), Sertifikasi Tanah Wakaf & BAZNAS',
      phone: '+62 852-2785-8924',
      rawPhone: '6285227858924',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    services: [
      {
        id: 'zawa-1',
        title: 'Sertifikasi Tanah Wakaf Gratis (MoU Kemenag - BPN)',
        desc: 'Pendampingan dan penerbitan Sertifikat Hak Wakaf atas tanah ibadah/sosial secara gratis kerja sama dengan BPN Wonosobo.',
        syarat: [
          'Akta Ikrar Wakaf (AIW) / APAIW dari PPAIW (KUA)',
          'Sertifikat Asli Hak Milik / Bukti Kepemilikan Tanah Asal',
          'Fotokopi KTP Wakif dan Nazhir'
        ],
        prosedur: 'Proses AIW di KUA -> Berkas diserahkan ke Zawa -> Pengukuran & Sertifikasi oleh BPN.',
        waktu: '14 - 30 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'Penyerahan 50 Sertifikat Tanah Wakaf Masjid dan Diniyah di Pendopo Kabupaten',
        date: '30 September 2026',
        time: '10:00 WIB',
        summary: 'Penyerahan secara simbolis dilakukan di Pendopo Kabupaten untuk memberikan kepastian hukum aset keagamaan.',
        image: 'assets/hero_banner.jpg',
        badge: 'Foto Penyerahan'
      }
    ]
  },
  {
    id: 'syariah',
    title: 'Syariah & Kiblat',
    fullTitle: 'Penyelenggara Syariah',
    subtitle: 'Bimbingan Syariah, Kiblat & Rukyatul Hilal',
    badge: 'Syariah & Kemaslahatan Umat',
    icon: 'compass',
    color: 'emerald',
    description: 'Pelayanan pengukuran & kalibrasi arah kiblat masjid/musala/pemakaman, hisab rukyat awal bulan Hijriah, pengawasan produk halal, dan bimbingan syariah.',
    contact: {
      officer: 'Petugas Penyelenggara Syariah',
      role: 'Pelayanan Penentuan Arah Kiblat, Hisab Rukyat & Konsultasi Syariah',
      phone: '+62 852-2785-8924',
      rawPhone: '6285227858924',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    services: [
      {
        id: 'syariah-1',
        title: 'Pengukuran & Kalibrasi Arah Kiblat (Masjid, Musala & Pemakaman)',
        desc: 'Layanan pengukuran dan penentuan presisi arah kiblat menggunakan kompas azimuth / theodolite untuk masjid, musala, pemakaman, dan tempat sholat umum.',
        syarat: [
          'Surat Permohonan Resmi dari Takmir Masjid / Panitia Pembangunan',
          'Keterangan Lokasi / Alamat Lengkap Masjid / Musala',
          'Nomor Kontak Penanggung Jawab / Takmir'
        ],
        prosedur: 'Pengajuan permohonan ke Loket PTSP -> Tim Syariah Kemenag melakukan verifikasi & pengukuran lapangan -> Penerbitan Sertifikat / SK Arah Kiblat.',
        waktu: '2 - 3 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      },
      {
        id: 'syariah-2',
        title: 'Hisab & Rukyatul Hilal Awal Bulan Hijriah',
        desc: 'Informasi data hisab astronomis dan pengamatan rukyatul hilal untuk penentuan awal Ramadhan, Syawal, dan Dzulhijjah di Kabupaten Wonosobo.',
        syarat: [
          'Surat Permohonan Koordinasi / Jadwal Pengamatan dari Ormas Keagamaan / Instansi'
        ],
        prosedur: 'Pelaksanaan rukyatul hilal lokasi pengamatan bersama Tim Hisab Rukyat Kemenag & BMKG -> Pelaporan Sidang Isbat Kemenag RI.',
        waktu: 'Sesuai Tahapan Kalender Hijriah',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'Tim Syariah Kemenag Wonosobo Kalibrasi Arah Kiblat Puluhan Masjid Baru',
        date: '01 Oktober 2026',
        time: '14:20 WIB',
        summary: 'Pengukuran presisi menggunakan alat theodolite untuk memberikan kepastian keakuratan kiblat tempat ibadah di wilayah Wonosobo.',
        image: 'assets/hero_banner.jpg',
        badge: 'Foto Pengukuran'
      }
    ]
  },
  {
    id: 'katolik',
    title: 'Bimas Katolik',
    fullTitle: 'Penyelenggara Katolik',
    subtitle: 'Bimbingan Masyarakat Agama Katolik',
    badge: 'Umat & Pendidikan Katolik',
    icon: 'cross',
    color: 'indigo',
    description: 'Pelayanan administrasi keagamaan, rumah ibadah, bimbingan masyarakat, serta pendidikan agama Katolik di Kabupaten Wonosobo.',
    contact: {
      officer: 'Petugas Penyelenggara Bimas Katolik',
      role: 'Pelayanan Umat, Rumah Ibadah & Guru Agama Katolik',
      phone: '+62 852-2714-4866',
      rawPhone: '6285227144866',
      hours: 'Senin - Jumat (08.00 - 15.30 WIB)'
    },
    services: [
      {
        id: 'katolik-1',
        title: 'Rekomendasi Bantuan Rumah Ibadah & Gereja Katolik',
        desc: 'Surat rekomendasi permohonan bantuan sarana prasarana tempat ibadah / Gereja Katolik.',
        syarat: [
          'Surat Permohonan Pengurus Gereja / Stasi',
          'Proposal Kegiatan / Renovasi Bangunan',
          'Susunan Pengurus Gereja yang Sah'
        ],
        prosedur: 'Pengajuan berkas ke Loket -> Verifikasi administrasi oleh Penyelenggara Katolik -> Penerbitan Surat Rekomendasi.',
        waktu: '2 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'Pembinaan Moderasi Beragama Bagi Pemuda Gereja Katolik Wonosobo',
        date: '29 September 2026',
        time: '09:00 WIB',
        summary: 'Kegiatan bertujuan mempererat silaturahmi antarumat beragama dan menjaga toleransi di Kabupaten Wonosobo.',
        image: 'assets/hero_banner.jpg',
        badge: 'Foto Kegiatan'
      }
    ]
  },
  {
    id: 'humas',
    title: 'Subbag TU & Humas',
    fullTitle: 'Subbag TU & Humas',
    subtitle: 'Sub Bagian Tata Usaha & Kehumasan',
    badge: 'Persuratan, Media & Informasi',
    icon: 'newspaper',
    color: 'blue',
    description: 'Pengelolaan surat menyurat resmi, urusan kepegawaian ASN, informasi publik (PPID), peliputan berita, dan media sosial resmi Kemenag Wonosobo.',
    contact: {
      officer: 'Tim Humas & Subbag TU',
      role: 'Pelayanan Informasi Publik, Kerjasama Media & Surat Resmi',
      phone: '+62 823-2680-5111',
      rawPhone: '6282326805111',
      hours: 'Senin - Jumat (07.30 - 16.00 WIB)'
    },
    services: [
      {
        id: 'humas-1',
        title: 'Layanan Permohonan Informasi Publik (PPID)',
        desc: 'Permohonan data resmi, statistik keagamaan, dan dokumen publik Kemenag Kabupaten Wonosobo.',
        syarat: [
          'Mengisi Formulir Permohonan Informasi PPID',
          'Fotokopi KTP / Identitas Pemohon',
          'Alasan Penggunaan Data yang Jelas'
        ],
        prosedur: 'Pengisian form PPID -> Verifikasi Tim PPID -> Penyerahan data/informasi yang diminta.',
        waktu: '1 - 3 Hari Kerja',
        biaya: 'Gratis (Rp 0,-)'
      }
    ],
    news: [
      {
        title: 'Kemenag Wonosobo Raih Penghargaan Pengelolaan Informasi Publik Terbaik',
        date: '06 Oktober 2026',
        time: '16:00 WIB',
        summary: 'Komitmen keterbukaan informasi publik dan kecepatan merespons pertanyaan masyarakat melalui kanal digital.',
        image: 'assets/hero_banner.jpg',
        badge: 'Foto Penghargaan'
      }
    ]
  }
];

const QUICK_STATS = [
  { label: 'Seksi / Unit Layanan', value: '9 Unit', desc: 'Melayani Seluruh Kecamatan' },
  { label: 'Layanan Online & PTSP', value: '25+ Layanan', desc: 'Proses Cepat & Bebas Biaya' },
  { label: 'KUA Binaan', value: '15 KUA', desc: 'Tersebar di Kab. Wonosobo' },
  { label: 'Kepuasan Masyarakat', value: '98.4%', desc: 'Indeks IKMS Sangat Baik' }
];
