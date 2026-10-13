/**
 * PORTAL KEMENAG KABUPATEN WONOSOBO - APPLICATION LOGIC (JS)
 * 
 * Fitur:
 * 1. Subbag TU membawahi 4 Layanan: PTSP, Perencanaan, Pelayanan, Keuangan.
 * 2. Setiap seksi / layanan memiliki 4 Tombol: Struktur Organisasi, Layanan (PDF), Foto (IG), Video (YT/IG).
 * 3. Seksi yang tersedia: Subbag TU, Bimas Islam, Penmad, PAIS, PD Pontren, Zawa, Penyelenggara Syariah, Penyelenggara Kristen, Penyelenggara Katolik, Penyelenggara Buddha, Humas.
 * 4. Popup Media Sosial & Kontak WA: YouTube, Instagram, Twitter/X, TikTok, Facebook, dan Kontak WA 1.
 */

document.addEventListener('DOMContentLoaded', () => {
  // SVG Icons Mapping Helper
  const SVG_ICONS = {
    'building-2': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>',
    'book-heart': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M12.5 8.5a2.12 2.12 0 0 0-3 0 2.12 2.12 0 0 0 0 3l3 3 3-3a2.12 2.12 0 0 0 0-3 2.12 2.12 0 0 0-3 0Z"/></svg>',
    'graduation-cap': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    'book-open-check': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H2v15h6a4 4 0 0 1 4 4 4 4 0 0 1 4-4h6V3h-6a4 4 0 0 0-4 4 4 4 0 0 0-4-4Z"/><path d="m16 12 2 2 4-4"/></svg>',
    'landmark': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7 12 2"/></svg>',
    'coins': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18 0a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2"/><path d="M16 14a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2"/><path d="M6 14a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2"/></svg>',
    'compass': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    'cross': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7z"/></svg>',
    'newspaper': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/></svg>',
    
    // Social Media Icons
    'youtube': '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>',
    'instagram': '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    'twitter': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'tiktok': '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.19 1.18 2.17 2.37 2.44.75.18 1.54.12 2.25-.17.91-.35 1.59-1.12 1.84-2.06.18-.63.2-1.3.19-1.96V.02h-.23z"/></svg>',
    'facebook': '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.297-.552.268-.787.77-.787 1.67v2.012h3.555l-.469 3.667h-3.086v7.98h-4.643z"/></svg>',
    'whatsapp': '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>'
  };

  // State
  let currentModalSectionId = null;
  let activeSubbagUnitId = 'ptsp';

  // DOM Elements
  const mainTilesGrid = document.getElementById('mainTilesGrid');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const navSocialBtn = document.getElementById('navSocialBtn');

  // Detail Modal Elements
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalIcon = document.getElementById('modalIcon');
  const modalBadge = document.getElementById('modalBadge');
  const tuServiceSelector = document.getElementById('tuServiceSelector');
  const tuSelectorButtons = document.getElementById('tuSelectorButtons');
  const modalFooter = document.getElementById('modalFooter');

  // 4 Tabs Panes
  const tabPaneStruktur = document.getElementById('tabPaneStruktur');
  const tabPaneLayanan = document.getElementById('tabPaneLayanan');
  const tabPaneFoto = document.getElementById('tabPaneFoto');
  const tabPaneVideo = document.getElementById('tabPaneVideo');
  const modalTabs = document.querySelectorAll('.modal-tab-btn');

  // Social Modal Elements
  const socialModalOverlay = document.getElementById('socialModalOverlay');
  const socialModalBody = document.getElementById('socialModalBody');

  // PDF Modal Elements
  const pdfModalOverlay = document.getElementById('pdfModalOverlay');
  const btnPdfClose = document.getElementById('btnPdfClose');
  const pdfViewerTitle = document.getElementById('pdfViewerTitle');
  const pdfViewerCode = document.getElementById('pdfViewerCode');
  const pdfViewerBody = document.getElementById('pdfViewerBody');
  const btnPrintPdf = document.getElementById('btnPrintPdf');
  const btnDownloadPdf = document.getElementById('btnDownloadPdf');

  // Video & Lightbox Modals
  const videoModalOverlay = document.getElementById('videoModalOverlay');
  const btnVideoClose = document.getElementById('btnVideoClose');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoModalBody = document.getElementById('videoModalBody');

  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const btnLightboxClose = document.getElementById('btnLightboxClose');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  // Helper to find data by id
  function findDataById(id) {
    const tuUnit = SUBBAG_TU_UNITS.find(u => u.id === id);
    if (tuUnit) return tuUnit;
    return SEKSI_DATA.find(s => s.id === id);
  }

  // 1. Render Main Unified Grid on Homepage
  function renderMainGrid() {
    if (!mainTilesGrid) return;

    mainTilesGrid.innerHTML = SEKSI_DATA.map(seksi => {
      const isSubbag = seksi.id === 'subbag-tu';
      return `
        <div class="icon-tile-card ${isSubbag ? 'tu-parent-featured' : ''}" data-id="${seksi.id}">
          <div class="tile-icon-badge">
            ${SVG_ICONS[seksi.icon] || SVG_ICONS['building-2']}
          </div>
          <div class="tile-title">${seksi.title}</div>
          <div class="tile-parent-badge">${seksi.badge}</div>
          <div class="tile-subtitle-compact">${isSubbag ? '4 Layanan: PTSP, Ren, Ply, Keu' : seksi.subtitle}</div>
          <div class="tile-buttons-indicator" title="4 Tombol: Struktur Organisasi, Layanan (PDF), Foto, Video">
            <span class="tile-btn-dot">👥</span>
            <span class="tile-btn-dot">📄</span>
            <span class="tile-btn-dot">📸</span>
            <span class="tile-btn-dot">🎬</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to all tiles
    mainTilesGrid.querySelectorAll('.icon-tile-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openModal(id);
      });
    });
  }

  // 2. Open Modal Dialog
  window.openModal = function(id) {
    currentModalSectionId = id;

    const isSubbagTU = id === 'subbag-tu' || SUBBAG_TU_UNITS.some(u => u.id === id);

    if (isSubbagTU) {
      if (id !== 'subbag-tu' && SUBBAG_TU_UNITS.some(u => u.id === id)) {
        activeSubbagUnitId = id;
      }

      tuServiceSelector.style.display = 'block';

      modalIcon.innerHTML = SVG_ICONS['building-2'];
      modalBadge.textContent = 'Subbag Tata Usaha';

      setupSubbagButtons();
      renderSubbagUnitContent(activeSubbagUnitId);

    } else {
      tuServiceSelector.style.display = 'none';

      const seksi = findDataById(id);
      if (!seksi) return;

      modalTitle.textContent = seksi.fullTitle || seksi.title;
      modalSubtitle.textContent = seksi.subtitle || '';
      modalIcon.innerHTML = SVG_ICONS[seksi.icon] || SVG_ICONS['landmark'];
      modalBadge.textContent = seksi.badge;

      renderTabStruktur(seksi);
      renderTabLayanan(seksi);
      renderTabFoto(seksi);
      renderTabVideo(seksi);
      renderModalFooter(seksi);
    }

    switchTab('tabStruktur');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Setup click listeners for the 4 Tombol Layanan inside Subbag TU
  function setupSubbagButtons() {
    const buttons = tuSelectorButtons.querySelectorAll('.tu-svc-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const subId = btn.getAttribute('data-sub');
        activeSubbagUnitId = subId;
        renderSubbagUnitContent(subId);
      });
    });
  }

  // Render content for chosen Subbag TU Unit (PTSP, Perencanaan, Pelayanan, Keuangan)
  function renderSubbagUnitContent(subId) {
    const buttons = tuSelectorButtons.querySelectorAll('.tu-svc-btn');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-sub') === subId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const data = findDataById(subId);
    if (!data) return;

    modalTitle.textContent = `Subbag TU: ${data.fullTitle || data.title}`;
    modalSubtitle.textContent = data.subtitle;

    renderTabStruktur(data);
    renderTabLayanan(data);
    renderTabFoto(data);
    renderTabVideo(data);
    renderModalFooter(data);
  }

  // =========================================================================
  // TAB 1: STRUKTUR ORGANISASI (Foto, Nama, dan Jabatan)
  // =========================================================================
  function renderTabStruktur(data) {
    const list = data.structure || [];
    if (list.length === 0) {
      tabPaneStruktur.innerHTML = `
        <div class="tab-content-header">
          <h3>👥 Struktur Organisasi & Personil</h3>
          <p>Daftar pejabat dan pengelola pada ${data.fullTitle || data.title}</p>
        </div>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Data personil sedang dalam tahap pembaharuan kepegawaian.</p>
      `;
      return;
    }

    tabPaneStruktur.innerHTML = `
      <div class="tab-content-header">
        <h3>👥 Struktur Organisasi (Foto, Nama, & Jabatan)</h3>
        <p>Bagan pejabat struktural dan staf pengelola pada ${data.fullTitle || data.title}</p>
      </div>

      <div class="structure-grid">
        ${list.map(person => `
          <div class="person-card">
            <div class="person-avatar-wrap">
              <img src="${person.photo}" alt="${person.name}" loading="lazy" onerror="this.src='assets/logo_kemenag.png';">
            </div>
            <div class="person-info">
              <div class="person-name">${person.name}</div>
              <div class="person-role">${person.role}</div>
              ${person.nip ? `<div class="person-nip">NIP: ${person.nip}</div>` : ''}
              ${person.badge ? `<span class="person-badge">${person.badge}</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // TAB 2: LAYANAN (Daftar Layanan + Format PDF)
  // =========================================================================
  function renderTabLayanan(data) {
    const services = data.services || [];
    if (services.length === 0) {
      tabPaneLayanan.innerHTML = `<p style="color: var(--text-muted);">Tidak ada layanan tersedia saat ini.</p>`;
      return;
    }

    tabPaneLayanan.innerHTML = `
      <div class="tab-content-header">
        <h3>📄 Menu Layanan & Dokumen SOP (PDF)</h3>
        <p>Daftar layanan resmi, persyaratan berkas, alur prosedur, dan unduh dokumen SOP resmi</p>
      </div>

      <div class="service-list">
        ${services.map(svc => `
          <div class="service-item-card">
            <div class="service-item-header">
              <h4>${svc.title}</h4>
              <span class="badge-gratis">${svc.biaya || 'Gratis (Rp 0,-)'}</span>
            </div>
            <p class="service-item-desc">${svc.desc}</p>
            <div class="service-detail-grid">
              <div class="detail-col">
                <h5>📋 Persyaratan Dokumen:</h5>
                <ul>
                  ${(svc.syarat || []).map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
              <div class="detail-col">
                <h5>⚡ Prosedur & Waktu:</h5>
                <p><strong>Alur:</strong> ${svc.prosedur}</p>
                <p style="margin-top: 6px;"><strong>Estimasi Selesai:</strong> <span style="color: var(--kemenag-green-light); font-weight:700;">${svc.waktu}</span></p>
              </div>
            </div>

            <!-- Action Buttons for PDF Format -->
            <div class="service-pdf-actions">
              <button type="button" class="btn-pdf-view" onclick="openPdfModal('${svc.id}', '${data.id}')">
                👁️ Preview Dokumen SOP (PDF)
              </button>
              <button type="button" class="btn-pdf-download-action" onclick="downloadSopPdf('${svc.id}', '${data.id}')">
                ⬇️ Unduh File PDF (${svc.pdfCode || 'SOP'})
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // TAB 3: FOTO KEGIATAN (Link Instagram)
  // =========================================================================
  function renderTabFoto(data) {
    const photos = data.photos || [];
    if (photos.length === 0) {
      tabPaneFoto.innerHTML = `
        <div class="tab-content-header">
          <h3>📸 Dokumentasi Foto Kegiatan</h3>
          <p>Galeri aktivitas dan kegiatan resmi Kemenag Kabupaten Wonosobo</p>
        </div>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Belum ada dokumentasi foto kegiatan terbaru yang diunggah.</p>
      `;
      return;
    }

    tabPaneFoto.innerHTML = `
      <div class="tab-content-header">
        <h3>📸 Foto Kegiatan (Terkoneksi Instagram)</h3>
        <p>Liputan foto dokumentasi kegiatan yang terhubung langsung dengan Instagram @kemenagwonosobo</p>
      </div>

      <div class="photo-gallery-grid">
        ${photos.map(p => `
          <div class="photo-card">
            <div class="photo-img-wrap" onclick="openLightbox('${p.image}', '${encodeURIComponent(p.title)}')">
              <img src="${p.image}" alt="${p.title}" loading="lazy">
              <div class="photo-ig-badge">
                ${SVG_ICONS['instagram']} Instagram
              </div>
              <div class="photo-date-badge">📅 ${p.date}</div>
            </div>
            <div class="photo-info-box">
              <h4>${p.title}</h4>
              <p>${p.caption}</p>
              <a href="${p.igUrl || 'https://www.instagram.com/kemenagwonosobo/'}" target="_blank" rel="noopener noreferrer" class="btn-ig-direct">
                ${SVG_ICONS['instagram']} Buka Postingan di Instagram
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // TAB 4: VIDEO KEGIATAN (Link YouTube & Instagram)
  // =========================================================================
  function renderTabVideo(data) {
    const videos = data.videos || [];
    if (videos.length === 0) {
      tabPaneVideo.innerHTML = `
        <div class="tab-content-header">
          <h3>🎬 Dokumentasi Video Kegiatan</h3>
          <p>Tayangan video seputar pelayanan publik, inovasi, dan kegiatan</p>
        </div>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Belum ada dokumentasi video yang diunggah.</p>
      `;
      return;
    }

    tabPaneVideo.innerHTML = `
      <div class="tab-content-header">
        <h3>🎬 Video Kegiatan (YouTube & Instagram)</h3>
        <p>Saksikan tayangan video kegiatan resmi melalui YouTube Channel dan Instagram Reels Kemenag Wonosobo</p>
      </div>

      <div class="video-gallery-grid">
        ${videos.map(v => `
          <div class="video-card">
            <div class="video-thumb-wrap" onclick="openVideoPlayer('${v.embedUrl || v.videoUrl}', '${encodeURIComponent(v.title)}', '${v.platform}')">
              <img src="${v.thumbnail}" alt="${v.title}" loading="lazy">
              <div class="video-play-btn">▶</div>
              <div class="video-platform-badge ${v.platform === 'YouTube' ? 'yt' : 'ig'}">
                ${v.platform === 'YouTube' ? SVG_ICONS['youtube'] : SVG_ICONS['instagram']} ${v.platform}
              </div>
              ${v.duration ? `<div class="video-duration">⏱️ ${v.duration}</div>` : ''}
            </div>
            <div class="video-info-box">
              <h4>${v.title}</h4>
              <div class="video-meta">📅 Publikasi: ${v.date}</div>
              <div class="video-action-row">
                <button type="button" class="btn-video-play" onclick="openVideoPlayer('${v.embedUrl || v.videoUrl}', '${encodeURIComponent(v.title)}', '${v.platform}')">
                  ▶️ Putar Video
                </button>
                <a href="${v.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-video-external" title="Buka tautan asli">
                  ${v.platform === 'YouTube' ? 'Buka YouTube' : 'Buka IG Reels'} ↗
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Modal Footer: WhatsApp Contact Button
  function renderModalFooter(data) {
    if (!modalFooter) return;
    const contact = data.contact;
    if (!contact) {
      modalFooter.innerHTML = '';
      return;
    }

    const waMsg = encodeURIComponent(`Halo Petugas ${data.fullTitle || data.title}, Saya ingin berkonsultasi mengenai pelayanan di Kantor Kemenag Wonosobo.`);
    const waUrl = `https://api.whatsapp.com/send?phone=${contact.rawPhone}&text=${waMsg}`;

    modalFooter.innerHTML = `
      <div class="modal-footer-info">
        <span>⏰ Jam Pelayanan: <strong>${contact.hours || 'Senin - Jumat'}</strong></span>
      </div>
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-footer-wa">
        ${SVG_ICONS['whatsapp']} Konsultasi WhatsApp (${contact.officer})
      </a>
    `;
  }

  // Close Main Modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Switch Modal Tabs
  function switchTab(tabTargetId) {
    modalTabs.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabTargetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPaneStruktur.classList.remove('active');
    tabPaneLayanan.classList.remove('active');
    tabPaneFoto.classList.remove('active');
    tabPaneVideo.classList.remove('active');

    if (tabTargetId === 'tabStruktur') tabPaneStruktur.classList.add('active');
    if (tabTargetId === 'tabLayanan') tabPaneLayanan.classList.add('active');
    if (tabTargetId === 'tabFoto') tabPaneFoto.classList.add('active');
    if (tabTargetId === 'tabVideo') tabPaneVideo.classList.add('active');
  }

  // Event Listeners for Modal Tabs
  modalTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // =========================================================================
  // SOCIAL MEDIA & WHATSAPP POPUP MODAL
  // =========================================================================
  window.openSocialModal = function() {
    if (!socialModalBody) return;

    socialModalBody.innerHTML = SOCIAL_MEDIA_CONTACTS.map(item => `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="social-card-item ${item.id === 'whatsapp' ? 'highlight-wa' : ''}">
        <div class="social-card-left">
          <div class="social-icon-wrapper icon-${item.id}">
            ${SVG_ICONS[item.iconKey] || SVG_ICONS['newspaper']}
          </div>
          <div class="social-card-text">
            <h4>
              ${item.name}
              <span class="social-card-badge">${item.badge}</span>
            </h4>
            <p>${item.desc}</p>
            <span class="social-card-handle">${item.handle}</span>
          </div>
        </div>
        <div class="social-card-btn">
          ${item.btnText} ↗
        </div>
      </a>
    `).join('');

    socialModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeSocialModal = function() {
    socialModalOverlay.classList.remove('active');
    if (!modalOverlay.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  };

  if (navSocialBtn) {
    navSocialBtn.addEventListener('click', openSocialModal);
  }

  socialModalOverlay.addEventListener('click', (e) => {
    if (e.target === socialModalOverlay) closeSocialModal();
  });

  // =========================================================================
  // OFFICIAL GOVERNMENT SOP PDF PREVIEW MODAL
  // =========================================================================
  window.openPdfModal = function(serviceId, seksiId) {
    const seksi = findDataById(seksiId);
    if (!seksi) return;
    const svc = (seksi.services || []).find(s => s.id === serviceId);
    if (!svc) return;

    pdfViewerTitle.textContent = svc.title;
    pdfViewerCode.textContent = svc.pdfCode || 'SOP/KEMENAG-WSB/2026';

    pdfViewerBody.innerHTML = `
      <div class="sop-paper">
        <div class="sop-kop">
          <img src="assets/logo_kemenag.png" alt="Logo Kemenag" class="sop-kop-logo">
          <h2>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h2>
          <h3>KANTOR KEMENTERIAN AGAMA KABUPATEN WONOSOBO</h3>
          <p>Jalan Tumenggung Jogonegoro No. 38, Jaraksari, Kabupaten Wonosobo, Jawa Tengah 56314</p>
          <p>Telepon: (0286) 321044 | Pos-el: kabwonosobo@kemenag.go.id | Laman: jateng.kemenag.go.id</p>
        </div>

        <div class="sop-title-box">
          <h4>STANDAR OPERASIONAL PROSEDUR (SOP)</h4>
          <p><strong>NOMOR: ${svc.pdfCode || 'SOP/TU-KEMENAG/01/2026'}</strong></p>
          <p style="font-weight: 700; margin-top: 4px;">TENTANG: ${svc.title.toUpperCase()}</p>
        </div>

        <table class="sop-table">
          <tr>
            <th style="width: 28%;">Unit Kerja Pelaksana</th>
            <td><strong>${seksi.fullTitle || seksi.title}</strong> (Kantor Kemenag Kab. Wonosobo)</td>
          </tr>
          <tr>
            <th>Dasar Hukum</th>
            <td>
              1. UU No. 25 Tahun 2009 tentang Pelayanan Publik<br>
              2. PMA No. 19 Tahun 2019 tentang Organisasi & Tata Kerja Instansi Vertikal Kemenag<br>
              3. Maklumat Pelayanan Kantor Kementerian Agama Kabupaten Wonosobo
            </td>
          </tr>
          <tr>
            <th>Persyaratan Dokumen</th>
            <td>
              <ol style="margin-left: 18px; padding-left: 0;">
                ${(svc.syarat || []).map(s => `<li>${s}</li>`).join('')}
              </ol>
            </td>
          </tr>
          <tr>
            <th>Mekanisme / Prosedur</th>
            <td>${svc.prosedur}</td>
          </tr>
          <tr>
            <th>Jangka Waktu Penyelesaian</th>
            <td><strong style="color: #044B29;">${svc.waktu}</strong></td>
          </tr>
          <tr>
            <th>Biaya / Tarif Layanan</th>
            <td><strong style="color: #10B981;">${svc.biaya || 'Gratis (Rp 0,-)'}</strong> (Bebas Pungutan Liar & Gratifikasi)</td>
          </tr>
          <tr>
            <th>Produk Layanan</th>
            <td>Surat Rekomendasi Resmi / Legalisir / Pengesahan Naskah Dinas Terdaftar</td>
          </tr>
          <tr>
            <th>Kanal Pengaduan</th>
            <td>SP4N LAPOR! / WhatsApp PTSP Kemenag Wonosobo (+62 812-3005-5633)</td>
          </tr>
        </table>

        <div class="sop-signature-block">
          <div class="sop-signature-box">
            <p>Ditetapkan di: Wonosobo<br>Pada tanggal: 02 Januari 2026<br><br><strong>Kepala Kantor Kemenag Kab. Wonosobo</strong></p>
            <div class="signer-name">Drs. H. Panut, M.M.</div>
            <div style="font-size: 0.78rem;">NIP. 19680514 199403 1 003</div>
          </div>
        </div>
      </div>
    `;

    pdfModalOverlay.classList.add('active');
  };

  function closePdfModal() {
    pdfModalOverlay.classList.remove('active');
  }

  btnPdfClose.addEventListener('click', closePdfModal);
  pdfModalOverlay.addEventListener('click', (e) => {
    if (e.target === pdfModalOverlay) closePdfModal();
  });

  btnPrintPdf.addEventListener('click', () => {
    window.print();
  });

  // Simulated PDF Download
  window.downloadSopPdf = function(serviceId, seksiId) {
    const seksi = findDataById(seksiId);
    const svc = seksi ? (seksi.services || []).find(s => s.id === serviceId) : null;
    const fileName = svc && svc.pdfName ? svc.pdfName : 'SOP-Layanan-Kemenag-Wonosobo.pdf';

    const docText = `========================================================================\n` +
      `KEMENTERIAN AGAMA REPUBLIK INDONESIA\n` +
      `KANTOR KEMENTERIAN AGAMA KABUPATEN WONOSOBO\n` +
      `STANDAR OPERASIONAL PROSEDUR (SOP) RESMI\n` +
      `========================================================================\n\n` +
      `Nomor SOP : ${svc ? svc.pdfCode : 'SOP/WSB/2026'}\n` +
      `Nama Layanan : ${svc ? svc.title : 'Layanan Kemenag'}\n` +
      `Unit Pengampu : ${seksi ? seksi.fullTitle : 'Kemenag Wonosobo'}\n` +
      `Biaya : ${svc ? svc.biaya : 'Gratis (Rp 0,-)'}\n` +
      `Estimasi Waktu : ${svc ? svc.waktu : '1-2 Hari Kerja'}\n\n` +
      `PERSYARATAN BERKAS:\n` +
      (svc ? svc.syarat.map((s, i) => `${i + 1}. ${s}`).join('\n') : '') +
      `\n\nPROSEDUR LAYANAN:\n${svc ? svc.prosedur : ''}\n\n` +
      `Diterbitkan secara sah oleh Portal Resmi Kementerian Agama Kab. Wonosobo.\n`;

    const blob = new Blob([docText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  btnDownloadPdf.addEventListener('click', () => {
    const activeData = findDataById(activeSubbagUnitId) || findDataById(currentModalSectionId);
    if (activeData && activeData.services && activeData.services[0]) {
      window.downloadSopPdf(activeData.services[0].id, activeData.id);
    }
  });

  // =========================================================================
  // VIDEO PLAYER & LIGHTBOX MODAL
  // =========================================================================
  window.openVideoPlayer = function(url, encodedTitle, platform) {
    const title = decodeURIComponent(encodedTitle);
    videoModalTitle.textContent = title;

    if (platform === 'YouTube' && url.includes('embed')) {
      videoModalBody.innerHTML = `
        <iframe src="${url}?autoplay=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `;
      videoModalOverlay.classList.add('active');
    } else {
      window.open(url, '_blank');
    }
  };

  function closeVideoModal() {
    videoModalOverlay.classList.remove('active');
    videoModalBody.innerHTML = '';
  }

  btnVideoClose.addEventListener('click', closeVideoModal);
  videoModalOverlay.addEventListener('click', (e) => {
    if (e.target === videoModalOverlay) closeVideoModal();
  });

  // Image Lightbox
  window.openLightbox = function(imgSrc, encodedCaption) {
    const caption = decodeURIComponent(encodedCaption);
    lightboxImage.src = imgSrc;
    lightboxCaption.textContent = caption;
    lightboxOverlay.classList.add('active');
  };

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    lightboxImage.src = '';
  }

  btnLightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  // Global ESC Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (socialModalOverlay.classList.contains('active')) closeSocialModal();
      else if (pdfModalOverlay.classList.contains('active')) closePdfModal();
      else if (videoModalOverlay.classList.contains('active')) closeVideoModal();
      else if (lightboxOverlay.classList.contains('active')) closeLightbox();
      else if (modalOverlay.classList.contains('active')) closeModal();
    }
  });

  // =========================================================================
  // DARK / LIGHT THEME TOGGLE
  // =========================================================================
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = '☀️';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.innerHTML = '🌙';
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Initial Execution
  renderMainGrid();
});
