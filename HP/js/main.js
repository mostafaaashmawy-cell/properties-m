/**
 * PROPERTIES-M.COM — HYDE PARK PORTFOLIO (/HP)
 * Role: Independent Real Estate Consultancy & Strategic Marketing Partner
 * Phone & WhatsApp: +20 100 356 5002 (+201003565002)
 * Tracking: Google Tag AW-18495474156 & Conversion AW-18495474156/EvjICOTemJQdEOyTqvNE
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountryCodes();
  initLeadForm();
  initSmoothScroll();
  initModalListeners();
  initAnalytics();
  initScrollSpy();
  initLegalLinksRouting();
});

// International country dialing codes with properly encoded UTF-8 flags
const countryCodes = [
  { code: '+20', name: 'Egypt', flag: '🇪🇬', default: true },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+1', name: 'USA / Canada', flag: '🇺🇸' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' }
];

const CONFIG = {
  whatsappNumber: '201003565002',
  displayPhone: '+20 100 356 5002',
  domain: 'properties-m.com',
  web3FormsKey: '9f6d054c-a955-4ed1-b85d-91c7f8b0a16a',
  zapierWebhookUrl: 'https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/',
  storageKey: 'properties_m_hp_leads'
};

/**
 * Initialize country codes dropdown
 */
function initCountryCodes() {
  const select = document.getElementById('countryCodeSelect');
  if (!select) return;

  select.innerHTML = '';
  countryCodes.forEach(item => {
    const option = document.createElement('option');
    option.value = item.code;
    option.textContent = `${item.flag} ${item.code} (${item.name})`;
    if (item.default) {
      option.selected = true;
    }
    select.appendChild(option);
  });
}

/**
 * Lead capture form handling (Web3Forms & Zapier Webhook & Google Ads Conversion)
 */
function initLeadForm() {
  const form = document.getElementById('leadCaptureForm');
  if (!form) return;

  const phoneInput = document.getElementById('phoneNumber');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9\s-]/g, '');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('fullName');
    const countrySelect = document.getElementById('countryCodeSelect');
    const submitBtn = form.querySelector('button[type="submit"]');

    const fullName = nameInput ? nameInput.value.trim() : '';
    const phoneNumber = phoneInput ? phoneInput.value.trim() : '';
    const countryCode = countrySelect ? countrySelect.value : '+20';

    // Form Validation
    if (!fullName || fullName.length < 2) {
      showNotice('Please enter your full name.', 'error');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!phoneNumber || phoneNumber.replace(/[^0-9]/g, '').length < 6) {
      showNotice('Please enter a valid contact phone number.', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }

    const fullPhoneNumber = countryCode ? `${countryCode} ${phoneNumber}`.trim() : phoneNumber;

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      TRANSMITTING...
    `;

    const data = {
      fullName: fullName,
      phoneNumber: fullPhoneNumber,
      portfolio: 'Hyde Park Developments (One Hyde Park, Sea Shore, Hyde Park Central)',
      developer: 'Hyde Park Developments',
      domain: CONFIG.domain,
      landingPageUrl: window.location.href,
      submissionDate: new Date().toISOString(),
      source: 'Hyde Park Landing Page (/HP) — properties-m.com'
    };

    // 1. Submit to Web3Forms API
    try {
      const formData = new FormData();
      formData.append('access_key', CONFIG.web3FormsKey);
      formData.append('name', fullName);
      formData.append('phone', fullPhoneNumber);
      formData.append('country_code', countryCode);
      formData.append('page_url', window.location.href);
      formData.append('subject', `New Private Lead: Hyde Park Portfolio (/HP) — ${fullName} (${fullPhoneNumber})`);
      formData.append('from_name', 'Properties-M Real Estate Advisory');
      formData.append('project', 'Hyde Park Portfolio (One Hyde Park, Sea Shore, Central)');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      }).catch(err => console.warn('Web3Forms dispatch error:', err));
    } catch (w3Err) {
      console.warn('Web3Forms handler error:', w3Err);
    }

    // 2. Submit to Zapier Webhook
    try {
      fetch(CONFIG.zapierWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(err => console.warn('Zapier dispatch error:', err));
    } catch (zapErr) {
      console.warn('Zapier handler error:', zapErr);
    }

    // 3. Trigger Google Ads Conversion Tracking (AW-18495474156/EvjICOTemJQdEOyTqvNE)
    try {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18495474156/EvjICOTemJQdEOyTqvNE',
          'value': 1.0,
          'currency': 'EGP'
        });
      }
    } catch (gtagErr) {
      console.warn('Google Ads Conversion tracking error:', gtagErr);
    }

    // 4. Local storage backup
    try {
      const stored = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      stored.push(data);
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(stored));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    // 5. Open Luxury Confirmation Modal
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      initCountryCodes();
      openModal(fullName);
    }, 450);
  });
}

/**
 * Open Luxury Dark Confirmation Modal
 */
function openModal(clientName) {
  const modal = document.getElementById('successModal');
  const nameSpan = document.getElementById('modalLeadName');
  const modalWaBtn = document.getElementById('modalWhatsAppBtn');

  if (nameSpan) {
    nameSpan.textContent = clientName || 'Client';
  }

  if (modalWaBtn) {
    const text = encodeURIComponent(
      `Hello properties-m.com, I just submitted my private inquiry for the Hyde Park Portfolio (${clientName || 'Client'}). Please share current unit availability and payment structures.`
    );
    modalWaBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close modal
 */
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

function initModalListeners() {
  const closeBtn = document.getElementById('closeModalBtn');
  const dismissBtn = document.getElementById('modalDismissBtn');
  const modal = document.getElementById('successModal');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  if (dismissBtn) {
    dismissBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/**
 * Notice banner
 */
function showNotice(message, type = 'info') {
  let notice = document.getElementById('formNotice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'formNotice';
    notice.className = 'mt-3 p-3 text-xs font-semibold rounded-lg text-center transition-all duration-300';
    const form = document.getElementById('leadCaptureForm');
    if (form) form.appendChild(notice);
  }

  if (type === 'error') {
    notice.className = 'mt-3 p-3 text-xs font-semibold rounded-lg text-center bg-rose-950/80 text-rose-200 border border-rose-800';
  } else if (type === 'success') {
    notice.className = 'mt-3 p-4 text-xs font-semibold rounded-lg text-center bg-emerald-950/80 text-emerald-200 border border-emerald-800';
  } else {
    notice.className = 'mt-3 p-3 text-xs font-semibold rounded-lg text-center bg-slate-800 text-slate-200 border border-slate-700';
  }

  notice.textContent = message;
  notice.classList.remove('hidden');

  setTimeout(() => {
    if (notice) notice.classList.add('hidden');
  }, 4000);
}

/**
 * Smooth scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 60;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Google Ads & Analytics WhatsApp Tracking
 * Fires Google Ads conversion to AW-18495474156/EvjICOTemJQdEOyTqvNE
 */
function initAnalytics() {
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion(link.href);
      } else if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18495474156/EvjICOTemJQdEOyTqvNE',
            value: 1.0,
            currency: 'EGP'
          });
        } catch (err) {
          console.warn('Google Tag WhatsApp tracking error:', err);
        }
      }
    });
  });
}

/**
 * Scroll spy for quick navigation pills
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.subnav-pill');
  if (!navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Ensure legal links work both under web server and local file protocol
 */
function initLegalLinksRouting() {
  const isFileProtocol = window.location.protocol === 'file:';

  document.querySelectorAll('a[data-legal-route]').forEach(link => {
    const route = link.getAttribute('data-legal-route');
    if (isFileProtocol) {
      link.setAttribute('href', `../${route.replace(/^\//, '')}.html`);
    } else {
      link.setAttribute('href', route);
    }
  });
}
