/**
 * ORA DEVELOPERS — PREMIER LUXURY PORTFOLIO
 * Authorized Real Estate Consultancy Landing Page by Properties-M
 * Interactive Behaviors, Country Selector, Visual Gallery & Multi-Recipient Lead Routing
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountrySelector();
  initLeadForm();
  initVisualGalleries();
});

/**
 * Google Ads Outbound Click / WhatsApp & Lead Conversion Handler
 * Dispatches to both campaign Google Ads accounts for comprehensive tracking
 */
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  if (typeof gtag === 'function') {
    // Dedicated ORA Google Ads Conversion
    gtag('event', 'conversion', {
        'send_to': 'AW-17705943670/x9dFCPPh9bobEPaE7fpB',
        'event_callback': callback
    });
    // Properties-M Google Ads Conversion
    gtag('event', 'conversion', {
        'send_to': 'AW-18495474156/EvjICOTemJQdEOyTqvNE'
    });
  } else if (typeof(url) != 'undefined') {
    window.location = url;
  }
  return false;
}

// Comprehensive International Country Codes with Flags
const countryCodes = [
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴' },
  { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
];

/**
 * Country Selector Dropdown Setup
 */
function initCountrySelector() {
  const btn = document.getElementById('countrySelectBtn');
  const menu = document.getElementById('countryDropdownMenu');
  const searchInput = document.getElementById('countrySearchInput');
  const listContainer = document.getElementById('countryListContainer');
  const hiddenCodeInput = document.getElementById('selectedCountryCode');
  const flagDisplay = document.getElementById('selectedCountryFlag');
  const codeDisplay = document.getElementById('selectedCountryCodeText');

  if (!btn || !menu || !listContainer) return;

  function renderList(filter = '') {
    listContainer.innerHTML = '';
    const filtered = countryCodes.filter(c => 
      c.name.toLowerCase().includes(filter.toLowerCase()) || 
      c.code.includes(filter)
    );

    if (filtered.length === 0) {
      listContainer.innerHTML = `<div style="padding: 12px; font-size: 0.8rem; color: #94A3B8; text-align: center;">No country found</div>`;
      return;
    }

    filtered.forEach(item => {
      const option = document.createElement('div');
      option.className = `country-option ${item.code === hiddenCodeInput.value ? 'selected' : ''}`;
      option.innerHTML = `
        <div style="display:flex; align-items:center; gap: 8px;">
          <span>${item.flag}</span>
          <span>${item.name}</span>
        </div>
        <span style="color: #64748B; font-weight: 600;">${item.code}</span>
      `;
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        hiddenCodeInput.value = item.code;
        flagDisplay.textContent = item.flag;
        codeDisplay.textContent = item.code;
        menu.classList.remove('active');
      });
      listContainer.appendChild(option);
    });
  }

  renderList();

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
    if (menu.classList.contains('active') && searchInput) {
      searchInput.value = '';
      renderList();
      setTimeout(() => searchInput.focus(), 50);
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderList(e.target.value);
    });
    searchInput.addEventListener('click', (e) => e.stopPropagation());
  }

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
}

/**
 * Lead Capture Form Submission & Multi-Recipient Routing
 * Targets:
 * 1. Rahma@irtkaz.com
 * 2. Mostafa.a.ashmawy@gmail.com
 * 3. Mostafa.ashmawy@irtkaz.com
 */
function initLeadForm() {
  const form = document.getElementById('interestLeadForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const modalBackdrop = document.getElementById('leadSuccessModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const countryCodeInput = document.getElementById('selectedCountryCode');
    const consentInput = document.getElementById('consent-check');

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const rawPhone = phoneInput ? phoneInput.value.trim() : '';
    const countryCode = countryCodeInput ? countryCodeInput.value.trim() : '+20';

    if (!fullName || fullName.length < 2) {
      alert('Please enter your full name.');
      fullNameInput?.focus();
      return;
    }

    if (!rawPhone || rawPhone.replace(/\D/g, '').length < 6) {
      alert('Please enter a valid phone number.');
      phoneInput?.focus();
      return;
    }

    if (consentInput && !consentInput.checked) {
      alert('Please confirm your consent to receive communications regarding your inquiry.');
      consentInput.focus();
      return;
    }

    const fullPhoneNumber = `${countryCode} ${rawPhone}`;

    // Loading State
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="width:18px;height:18px;margin-right:8px;display:inline-block;animation:spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle style="opacity:0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path style="opacity:0.75;" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      PROCESSING...
    `;

    // Lead Object Payload strictly matching requested Zapier schema
    const data = {
      fullName: fullName,
      phoneNumber: fullPhoneNumber,
      landingPageUrl: window.location.href,       // Captures the full page URL
      submissionDate: new Date().toISOString(),   // Captures the exact date and time
      countryCode: countryCode,
      portfolio: "ORA Developers (Solana East Gardinn, ZED East, ZED West)"
    };

    try {
      // 100% Direct Zapier Webhook Dispatch
      const response = await fetch("https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Zapier returned status ${response.status}`);
      }

      console.log("Zapier webhook dispatched successfully:", data);

      // Save lead to local storage backup archive
      try {
        const existingLeads = JSON.parse(localStorage.getItem('ora_inquiries') || '[]');
        existingLeads.push(data);
        localStorage.setItem('ora_inquiries', JSON.stringify(existingLeads));
      } catch (err) {
        console.error('LocalStorage error:', err);
      }

      // Reset form fields
      form.reset();
      if (consentInput) consentInput.checked = true;
      if (countryCodeInput) countryCodeInput.value = '+20';
      const flagDisplay = document.getElementById('selectedCountryFlag');
      const codeDisplay = document.getElementById('selectedCountryCodeText');
      if (flagDisplay) flagDisplay.textContent = '🇪🇬';
      if (codeDisplay) codeDisplay.textContent = '+20';

      // Run Google Ads conversion tracking code
      if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion();
      } else if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-17705943670/x9dFCPPh9bobEPaE7fpB'
        });
        gtag('event', 'conversion', {
          'send_to': 'AW-18495474156/EvjICOTemJQdEOyTqvNE'
        });
      }

      // Show Confirmation Modal
      if (modalBackdrop) {
        modalBackdrop.classList.add('show');
      }

      // Update modal WhatsApp button with pre-filled message
      if (modalWhatsAppBtn) {
        const encodedMsg = encodeURIComponent(`Hello, I just registered my interest for the ORA Developers portfolio on properties-m.com. My name is ${fullName} (${fullPhoneNumber}). Please provide me with the available brochures and inventory.`);
        modalWhatsAppBtn.href = `https://wa.me/201033373331?text=${encodedMsg}`;
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  // Track all WhatsApp buttons (floating or inline) with gtag_report_conversion
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    if (!link.getAttribute('onclick')) {
      link.addEventListener('click', function() {
        if (typeof gtag_report_conversion === 'function') {
          return gtag_report_conversion(this.href);
        }
      });
    }
  });

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('show');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('show');
      }
    });
  }
}

/**
 * Visual Gallery Lightbox Modal
 */
const projectGalleries = {
  solana_east: {
    title: "Solana East (Gardinn) — Visual Gallery",
    items: [
      {
        src: "assets/images/solana_east.jpg",
        caption: "Boutique G+3 Serviced Apartments & Garden Residences"
      },
      {
        src: "assets/images/zed_east_gallery_1.jpg",
        caption: "Curated Landscaping & Private Terraces"
      },
      {
        src: "assets/images/zed_east_gallery_2.jpg",
        caption: "Contemporary Architectural Details & Open Views"
      }
    ]
  },
  zed_east: {
    title: "ZED East (New Cairo) — Visual Gallery",
    items: [
      {
        src: "assets/images/zed_east.jpg",
        caption: "Central Green Spine & Luxury Residences"
      },
      {
        src: "assets/images/zed_east_gallery_1.jpg",
        caption: "Curated Retail, Dining & Water Promenade"
      },
      {
        src: "assets/images/zed_east_gallery_2.jpg",
        caption: "Contemporary Villa Architecture & Landscaping"
      }
    ]
  },
  zed_west: {
    title: "ZED West (Sheikh Zayed) — Visual Gallery",
    items: [
      {
        src: "assets/images/zed_west.jpg",
        caption: "Luxury Towers Overlooking 65-Acre ZED Park"
      },
      {
        src: "assets/images/zed_west_gallery_1.jpg",
        caption: "Parkside Greenery & Water Features"
      },
      {
        src: "assets/images/zed_west_gallery_2.jpg",
        caption: "Fully Finished Luxury Residences & Modern Terraces"
      }
    ]
  }
};

function initVisualGalleries() {
  const galleryModal = document.getElementById('galleryModal');
  const galleryTitle = document.getElementById('galleryModalTitle');
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryCloseBtn = document.getElementById('galleryCloseBtn');
  const triggers = document.querySelectorAll('[data-gallery-trigger]');

  if (!galleryModal || !galleryGrid) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-gallery-trigger');
      const galleryData = projectGalleries[projectKey];

      if (!galleryData) return;

      galleryTitle.textContent = galleryData.title;
      galleryGrid.innerHTML = '';

      galleryData.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
          <img src="${item.src}" alt="${item.caption}" loading="lazy">
          <div class="gallery-item-caption">${item.caption}</div>
        `;
        galleryGrid.appendChild(div);
      });

      galleryModal.classList.add('show');
    });
  });

  if (galleryCloseBtn) {
    galleryCloseBtn.addEventListener('click', () => {
      galleryModal.classList.remove('show');
    });
  }

  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('show');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      galleryModal.classList.remove('show');
      const leadModal = document.getElementById('leadSuccessModal');
      if (leadModal) leadModal.classList.remove('show');
    }
  });
}
