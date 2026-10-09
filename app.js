/**
 * PORTAL KEMENAG KABUPATEN WONOSOBO - APPLICATION LOGIC (JS)
 * Features: Compact Icon Tiles Grid, 3 Action Modal Tabs (Layanan, Berita & Media, Contact WA), Dark Mode.
 */

document.addEventListener('DOMContentLoaded', () => {
  // SVG Lucide Icons Mapping Helper
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
    'whatsapp': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>'
  };

  // State
  let activeModalData = null;

  // DOM Elements
  const tilesGrid = document.getElementById('iconTilesGrid');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  // Modal Elements
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalIcon = document.getElementById('modalIcon');
  const tabPaneLayanan = document.getElementById('tabPaneLayanan');
  const tabPaneBerita = document.getElementById('tabPaneBerita');
  const tabPaneContact = document.getElementById('tabPaneContact');
  const modalTabs = document.querySelectorAll('.modal-tab-btn');

  // Render Compact Icon Tiles
  function renderIconTiles() {
    if (!tilesGrid) return;

    tilesGrid.innerHTML = SEKSI_DATA.map(seksi => `
      <div class="icon-tile-card" data-id="${seksi.id}">
        <div class="tile-icon-badge">
          ${SVG_ICONS[seksi.icon] || SVG_ICONS['building-2']}
        </div>
        <div class="tile-title">${seksi.title}</div>
        <div class="tile-subtitle-compact">${seksi.badge}</div>
      </div>
    `).join('');

    // Attach click listeners to cards
    document.querySelectorAll('.icon-tile-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openModal(id);
      });
    });
  }

  // Open Detail Modal Popup
  window.openModal = function(seksiId) {
    const data = SEKSI_DATA.find(s => s.id === seksiId);
    if (!data) return;
    activeModalData = data;

    // Set Header Info
    modalTitle.textContent = data.fullTitle || data.title;
    modalSubtitle.textContent = data.subtitle;
    modalIcon.innerHTML = SVG_ICONS[data.icon] || SVG_ICONS['building-2'];

    // Render Tab 1: Menu Layanan & SOP
    tabPaneLayanan.innerHTML = `
      <div class="service-list">
        ${data.services.map(svc => `
          <div class="service-item-card">
            <div class="service-item-header">
              <h4>${svc.title}</h4>
              <span class="badge-gratis">${svc.biaya}</span>
            </div>
            <p class="service-item-desc">${svc.desc}</p>
            <div class="service-detail-grid">
              <div class="detail-col">
                <h5>📋 Persyaratan Dokumen</h5>
                <ul>
                  ${svc.syarat.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
              <div class="detail-col">
                <h5>⚡ Prosedur & Waktu</h5>
                <p><strong>Prosedur:</strong> ${svc.prosedur}</p>
                <p style="margin-top: 4px;"><strong>Estimasi Waktu:</strong> <span style="color: var(--kemenag-green-light); font-weight:700;">${svc.waktu}</span></p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Render Tab 2: Berita & Media (Dengan Foto, Keterangan Detail & Timestamp Waktu)
    tabPaneBerita.innerHTML = `
      <div class="news-list">
        ${data.news.map(n => `
          <div class="news-item-card">
            <img src="${n.image || 'assets/hero_banner.jpg'}" alt="${n.title}" class="news-media-img">
            <div class="news-content-box">
              <div class="news-item-meta">
                <span class="news-badge">📷 ${n.badge}</span>
                <span>📅 ${n.date}</span>
                <span>⏰ ${n.time}</span>
              </div>
              <h4>${n.title}</h4>
              <p>${n.summary}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Render Tab 3: Contact Person WA
    const waText = encodeURIComponent(`Halo Petugas ${data.fullTitle || data.title}, Saya ingin berkonsultasi mengenai pelayanan.`);
    const waUrl = `https://api.whatsapp.com/send?phone=${data.contact.rawPhone}&text=${waText}`;

    tabPaneContact.innerHTML = `
      <div class="contact-person-box">
        <div class="contact-officer-avatar">
          ${SVG_ICONS['whatsapp']}
        </div>
        <h3>${data.contact.officer}</h3>
        <p>${data.contact.role}</p>
        <div class="contact-hours">⏰ Jam Operasional: ${data.contact.hours}</div>
        <br>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-direct">
          ${SVG_ICONS['whatsapp']} Hubungi WhatsApp Petugas (${data.contact.phone})
        </a>
      </div>
    `;

    // Reset tab state to first tab
    switchTab('tabLayanan');

    // Show Modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

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

    tabPaneLayanan.classList.remove('active');
    tabPaneBerita.classList.remove('active');
    tabPaneContact.classList.remove('active');

    if (tabTargetId === 'tabLayanan') tabPaneLayanan.classList.add('active');
    if (tabTargetId === 'tabBerita') tabPaneBerita.classList.add('active');
    if (tabTargetId === 'tabContact') tabPaneContact.classList.add('active');
  }

  // Event Listeners for Modal Tabs
  modalTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  // Modal Close Listeners
  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Dark / Light Theme Toggle
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
  renderIconTiles();
});
