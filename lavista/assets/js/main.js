/**
 * LA VISTA DEVELOPMENTS — PREMIER NEW CAIRO & CAPITAL PORTFOLIO
 * Curated & Operated by properties-m.com
 * Interactive Client Script, Direct Zapier Webhook Lead Engine & Google Ads Conversion Tracking
 */

const CONFIG = {
  phone: '01277752731',
  phoneDisplay: '+20 127 775 2731',
  whatsappRaw: '201277752731',
  whatsappBaseUrl: 'https://wa.me/201277752731',
  brandName: 'properties-m.com',
  zapierWebhookUrl: 'https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/',
  storageKey: 'properties_m_lavista_leads',
  googleAdsConversionId: 'AW-18495474156/EvjICOTemJQdEOyTqvNE'
};

// Comprehensive Country Code Data with Flag Emojis
const countryCodes = [
  { name: 'Egypt', code: '+20', flag: '🇪🇬', default: true },
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
  { name: 'Australia', code: '+61', flag: '🇦🇺' }
];

document.addEventListener('DOMContentLoaded', () => {
  initCountrySelector();
  initLeadForm();
  initQuickNav();
  initProjectActionButtons();
  initModalHandlers();
});

/**
 * 1. International Country Code Selector Dropdown with Search
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
    const query = filter.toLowerCase().trim();
    const filtered = countryCodes.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.code.includes(query)
    );

    if (filtered.length === 0) {
      listContainer.innerHTML = '<div style="padding: 12px; font-size: 0.8rem; color: #94A3B8; text-align: center;">No matching country</div>';
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
        <span style="color: #94A3B8; font-weight: 600;">${item.code}</span>
      `;
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        hiddenCodeInput.value = item.code;
        flagDisplay.textContent = item.flag;
        codeDisplay.textContent = item.code;
        menu.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      });
      listContainer.appendChild(option);
    });
  }

  // Initial render
  renderList();

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('active');
    if (isOpen) {
      menu.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      menu.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      if (searchInput) {
        searchInput.value = '';
        renderList();
        setTimeout(() => searchInput.focus(), 60);
      }
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
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      menu.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
}

/**
 * 2. Lead Capture Form with Direct Zapier Webhook Only (Zero Web3Forms)
 */
function initLeadForm() {
  const form = document.getElementById('interestLeadForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const modalBackdrop = document.getElementById('leadSuccessModal');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
  const inlineSuccess = document.getElementById('formSuccessInline');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const countryCodeInput = document.getElementById('selectedCountryCode');

    const fullName = nameInput ? nameInput.value.trim() : '';
    const rawPhone = phoneInput ? phoneInput.value.trim() : '';
    const countryCode = countryCodeInput ? countryCodeInput.value.trim() : '+20';

    if (!fullName || fullName.length < 2) {
      alert('Please enter your full name.');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!rawPhone || rawPhone.replace(/[^0-9]/g, '').length < 6) {
      alert('Please enter a valid telephone number.');
      if (phoneInput) phoneInput.focus();
      return;
    }

    const fullPhoneNumber = `${countryCode} ${rawPhone}`.trim();
    const originalBtnContent = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 6px;" viewBox="0 0 24 24" fill="none">
        <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      TRANSMITTING INQUIRY...
    `;

    const leadPayload = {
      fullName: fullName,
      phoneNumber: fullPhoneNumber,
      countryCode: countryCode,
      rawPhone: rawPhone,
      projectPreference: 'La Vista Developments Portfolio',
      developer: 'La Vista Developments',
      agency: CONFIG.brandName,
      portfolio: 'La Vista Developments (New Cairo & New Capital)',
      landingPageUrl: window.location.href,
      submissionDate: new Date().toISOString(),
      source: `La Vista Portfolio (/La-vista) — ${CONFIG.brandName}`
    };

    // 1. Submit Directly to Zapier Webhook (No Web3Forms)
    try {
      try {
        await fetch(CONFIG.zapierWebhookUrl, {
          method: 'POST',
          body: JSON.stringify(leadPayload)
        });
        console.log('Lead transmitted to Zapier successfully');
      } catch (zapierStandardErr) {
        console.warn('Standard fetch to Zapier failed, trying mode: no-cors:', zapierStandardErr);
        await fetch(CONFIG.zapierWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(leadPayload)
        });
      }
    } catch (zapErr) {
      console.warn('Zapier transmission notice:', zapErr);
    }

    // 2. Archive to LocalStorage
    try {
      const storedLeads = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      storedLeads.push(leadPayload);
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(storedLeads));
    } catch (storageErr) {
      console.warn('LocalStorage notice:', storageErr);
    }

    // 3. Trigger Google Ads Conversion Tracking (Hydepark conversion code)
    try {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': CONFIG.googleAdsConversionId,
          'value': 1.0,
          'currency': 'EGP'
        });
      }
    } catch (trackingErr) {
      console.warn('Google Ads Conversion tracking error:', trackingErr);
    }

    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;

    // Reset form fields
    form.reset();
    if (countryCodeInput) countryCodeInput.value = '+20';
    const flagDisplay = document.getElementById('selectedCountryFlag');
    const codeDisplay = document.getElementById('selectedCountryCodeText');
    if (flagDisplay) flagDisplay.textContent = '🇪🇬';
    if (codeDisplay) codeDisplay.textContent = '+20';

    // Show Inline Success Banner
    if (inlineSuccess) {
      inlineSuccess.style.display = 'block';
      setTimeout(() => {
        inlineSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }

    // Update modal WhatsApp direct action button
    if (modalWhatsAppBtn) {
      const waMsg = encodeURIComponent(`Hello, I just registered my interest for the La Vista Developments portfolio. My name is ${fullName} (${fullPhoneNumber}). Please provide me with the available brochures, master plans, and unit pricing.`);
      modalWhatsAppBtn.href = `${CONFIG.whatsappBaseUrl}?text=${waMsg}`;
      modalWhatsAppBtn.setAttribute('onclick', 'return gtag_report_conversion(this.href);');
    }

    // Reveal Confirmation Modal
    if (modalBackdrop) {
      modalBackdrop.classList.add('show');
    }
  });
}

/**
 * 3. Portfolio Quick Navigation
 */
function initQuickNav() {
  const pills = document.querySelectorAll('.nav-jump-pill');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (targetId === 'all') {
        const firstSection = document.getElementById('el-patio-town-side');
        if (firstSection) {
          firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/**
 * 4. Project Action Buttons (Secondary CTA)
 */
function initProjectActionButtons() {
  const secondaryButtons = document.querySelectorAll('.btn-secondary-inquiry');
  const heroForm = document.getElementById('hero-lead-form');

  secondaryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (heroForm) {
        heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const nameInput = document.getElementById('fullName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    });
  });
}

/**
 * 5. Modal Handlers
 */
function initModalHandlers() {
  const modalBackdrop = document.getElementById('leadSuccessModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('show')) {
        modalBackdrop.classList.remove('show');
      }
    });
  }
}
