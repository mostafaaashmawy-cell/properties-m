/**
 * LA VISTA DEVELOPMENTS — PREMIER NEW CAIRO & CAPITAL PORTFOLIO
 * Operated & Curated by properties-m.com
 * Interactive Client Script, Multi-Channel Lead Dispatch & Tracking
 */

const CONFIG = {
  phone: '01277752731',
  phoneDisplay: '+20 127 775 2731',
  whatsappRaw: '201277752731',
  whatsappBaseUrl: 'https://wa.me/201277752731',
  domain: 'properties-m.com',
  web3FormsKey: '9f6d054c-a955-4ed1-b85d-91c7f8b0a16a',
  zapierWebhookUrl: 'https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/',
  storageKey: 'properties_m_lavista_leads',
  googleAdsConversionId: 'AW-18495474156/EvjICOTemJQdEOyTqvNE'
};

// Comprehensive Country Code Data
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
 * Country Code Selector with Search Dropdown
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
    const cleanFilter = filter.toLowerCase().trim();
    const filtered = countryCodes.filter(c => 
      c.name.toLowerCase().includes(cleanFilter) || 
      c.code.includes(cleanFilter)
    );

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.style.padding = '0.75rem';
      empty.style.fontSize = '0.8rem';
      empty.style.color = '#94A3B8';
      empty.style.textAlign = 'center';
      empty.textContent = 'No matching country';
      listContainer.appendChild(empty);
      return;
    }

    filtered.forEach(item => {
      const row = document.createElement('div');
      row.className = 'country-item-option';
      row.innerHTML = `
        <span>${item.flag} ${item.name}</span>
        <strong style="color: #64748B;">${item.code}</strong>
      `;
      row.addEventListener('click', (e) => {
        e.stopPropagation();
        if (hiddenCodeInput) hiddenCodeInput.value = item.code;
        if (flagDisplay) flagDisplay.textContent = item.flag;
        if (codeDisplay) codeDisplay.textContent = item.code;
        menu.classList.remove('active');
        if (searchInput) searchInput.value = '';
      });
      listContainer.appendChild(row);
    });
  }

  renderList();

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = menu.classList.contains('active');
    menu.classList.toggle('active');
    if (!isActive && searchInput) {
      setTimeout(() => searchInput.focus(), 50);
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderList(e.target.value);
    });
    searchInput.addEventListener('click', (e) => e.stopPropagation());
  }

  document.addEventListener('click', () => {
    menu.classList.remove('active');
  });
}

/**
 * Lead Form Submission (Web3Forms API + Zapier Webhook + Google Ads Conversion)
 */
function initLeadForm() {
  const form = document.getElementById('interestLeadForm');
  if (!form) return;

  const phoneInput = document.getElementById('phoneNumber');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Allow only numbers and spaces
      e.target.value = e.target.value.replace(/[^0-9\s-]/g, '');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('fullName');
    const countryCodeInput = document.getElementById('selectedCountryCode');
    const projectSelect = document.getElementById('projectPreference');
    const unitSelect = document.getElementById('unitTypePreference');
    const submitBtn = document.getElementById('formSubmitBtn');

    const fullName = nameInput ? nameInput.value.trim() : '';
    const rawPhone = phoneInput ? phoneInput.value.trim() : '';
    const countryCode = countryCodeInput ? countryCodeInput.value.trim() : '+20';
    const projectPref = projectSelect ? projectSelect.value : 'General Portfolio Consultation';
    const unitPref = unitSelect ? unitSelect.value : 'Any Typology';

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
      projectPreference: projectPref,
      unitTypePreference: unitPref,
      developer: 'La Vista Developments',
      domain: CONFIG.domain,
      landingPageUrl: window.location.href,
      submissionTime: new Date().toISOString(),
      source: 'La Vista Portfolio (/lavista) — properties-m.com'
    };

    // 1. Submit to Web3Forms API
    try {
      const formData = new FormData();
      formData.append('access_key', CONFIG.web3FormsKey);
      formData.append('name', fullName);
      formData.append('phone', fullPhoneNumber);
      formData.append('country_code', countryCode);
      formData.append('project_interest', projectPref);
      formData.append('unit_type', unitPref);
      formData.append('page_url', window.location.href);
      formData.append('subject', `Exclusive Lead: La Vista Portfolio (${projectPref}) — ${fullName} [${fullPhoneNumber}]`);
      formData.append('from_name', 'Properties-M Luxury Advisory');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      }).catch(err => console.warn('Web3Forms dispatch notice:', err));
    } catch (err) {
      console.warn('Web3Forms handler error:', err);
    }

    // 2. Submit to Zapier Webhook
    try {
      fetch(CONFIG.zapierWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      }).catch(err => console.warn('Zapier dispatch notice:', err));
    } catch (err) {
      console.warn('Zapier handler error:', err);
    }

    // 3. Trigger Google Ads Conversion Tracking
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
    } catch (err) {
      console.warn('Conversion tracking notice:', err);
    }

    // 4. LocalStorage Backup
    try {
      const stored = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      stored.push(leadPayload);
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(stored));
    } catch (e) {
      console.warn('LocalStorage notice:', e);
    }

    // Show Confirmation Modal
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      form.reset();

      // Update Modal WhatsApp Link with customized text
      const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
      if (modalWhatsAppBtn) {
        const msg = encodeURIComponent(`Hello, I just registered my interest in La Vista Developments (${projectPref}) for ${fullName} (${fullPhoneNumber}). Please send me full brochures and availability.`);
        modalWhatsAppBtn.href = `${CONFIG.whatsappBaseUrl}?text=${msg}`;
      }

      openModal();
    }, 600);
  });
}

/**
 * Quick Navigation Pills & Smooth Scrolling
 */
function initQuickNav() {
  const pills = document.querySelectorAll('.nav-jump-pill');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute('data-target');
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (targetId === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const navHeight = document.querySelector('.quick-nav-wrapper')?.offsetHeight || 60;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/**
 * Project Card Action Buttons:
 * Secondary "Request Brochure" button pre-selects project in form and scrolls to it
 */
function initProjectActionButtons() {
  const reqButtons = document.querySelectorAll('.btn-secondary-inquiry');
  const projectSelect = document.getElementById('projectPreference');
  const formCard = document.getElementById('hero-lead-form');

  reqButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectName = btn.getAttribute('data-project');
      if (projectSelect && projectName) {
        // Look for matching option
        for (let opt of projectSelect.options) {
          if (opt.value.toLowerCase().includes(projectName.toLowerCase())) {
            opt.selected = true;
            break;
          }
        }
      }

      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const nameInput = document.getElementById('fullName');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  });
}

/**
 * Modal Open/Close Controls
 */
function initModalHandlers() {
  const modal = document.getElementById('leadSuccessModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openModal() {
  const modal = document.getElementById('leadSuccessModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('leadSuccessModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
