/**
 * HYDE PARK PORTFOLIO — BY PROPERTIES-M.COM
 * Custom Client Engine: Country Code Dropdown (Zero Mojibake Vector SVG),
 * Form Handling, Zapier Webhook Lead Routing, Google Ads Conversion Tracking,
 * Unit Category Tabs & Smooth Interactive Retouches.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountrySelector();
  initLeadCaptureForm();
  initUnitTabs();
  initSmoothScroll();
});

/**
 * Split Country Code Selector with Pure Vector SVG Flags (Zero Mojibake)
 */
function initCountrySelector() {
  const trigger = document.getElementById('hpCountryTrigger');
  const dropdown = document.getElementById('hpCountryDropdown');
  const searchInput = document.getElementById('hpCountrySearchInput');
  const listContainer = document.getElementById('hpCountryList');
  const selectedFlag = document.getElementById('hpSelectedFlag');
  const selectedDialCode = document.getElementById('hpSelectedDialCode');
  const hiddenCodeInput = document.getElementById('hpCountryCodeVal');
  const hiddenNameInput = document.getElementById('hpCountryNameVal');

  if (!trigger || !dropdown || !listContainer) return;

  const countries = window.COUNTRY_CODES || [
    {
      code: 'EG',
      name: 'Egypt',
      dialCode: '+20',
      flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="5.33" fill="#C8102E"/>
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
        <rect y="10.67" width="24" height="5.33" fill="#000000"/>
        <path d="M11 6.5h2v3h-2z" fill="#888888"/>
        <circle cx="12" cy="7.5" r="0.8" fill="#555555"/>
      </svg>`
    }
  ];

  function renderList(items) {
    listContainer.innerHTML = '';
    if (items.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'hp-country-option';
      emptyLi.style.color = '#94A3B8';
      emptyLi.textContent = 'No matching country';
      listContainer.appendChild(emptyLi);
      return;
    }

    items.forEach((c) => {
      const li = document.createElement('li');
      li.className = 'hp-country-option';
      li.setAttribute('role', 'option');
      li.setAttribute('data-code', c.code);
      li.setAttribute('data-dial', c.dialCode);
      li.setAttribute('data-name', c.name);

      li.innerHTML = `
        <span class="hp-option-flag">${c.flagSvg}</span>
        <span class="hp-option-name">${c.name}</span>
        <span class="hp-option-dial">${c.dialCode}</span>
      `;

      li.addEventListener('click', (e) => {
        e.stopPropagation();
        selectCountry(c);
        closeDropdown();
      });

      listContainer.appendChild(li);
    });
  }

  function selectCountry(country) {
    if (selectedFlag) selectedFlag.innerHTML = country.flagSvg;
    if (selectedDialCode) selectedDialCode.textContent = country.dialCode;
    if (hiddenCodeInput) hiddenCodeInput.value = country.dialCode;
    if (hiddenNameInput) hiddenNameInput.value = country.name;
    trigger.setAttribute('aria-label', `Selected ${country.name} (${country.dialCode})`);
  }

  function openDropdown() {
    dropdown.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
    if (searchInput) {
      searchInput.value = '';
      renderList(countries);
      setTimeout(() => searchInput.focus(), 60);
    }
  }

  function closeDropdown() {
    dropdown.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains('active')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = countries.filter(
        c => c.name.toLowerCase().includes(query) || c.dialCode.includes(query) || c.code.toLowerCase().includes(query)
      );
      renderList(filtered);
    });

    searchInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdown.classList.contains('active')) {
      closeDropdown();
      trigger.focus();
    }
  });

  // Default selection: Egypt (+20)
  renderList(countries);
  const defaultCountry = countries.find(c => c.code === 'EG') || countries[0];
  if (defaultCountry) {
    selectCountry(defaultCountry);
  }
}

/**
 * Interactive Unit Category Tabs (One Hyde Park: Apartments vs Villas)
 */
function initUnitTabs() {
  const tabButtons = document.querySelectorAll('.hp-tab-btn');
  const tabPanels = document.querySelectorAll('.hp-tab-panel');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/**
 * Smooth Anchor Navigation
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Lead Capture Form Processing with Zapier Webhook & Google Ads Conversion
 */
function initLeadCaptureForm() {
  const leadForm = document.getElementById('hpLeadForm');
  const successState = document.getElementById('hpLeadSuccess');
  const cardHeader = document.getElementById('hpLeadHeader');
  const resetBtn = document.getElementById('hpResetFormBtn');

  if (!leadForm) return;

  leadForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const fullNameInput = document.getElementById('hpFullName');
    const phoneInput = document.getElementById('hpPhone');
    const countryCodeVal = document.getElementById('hpCountryCodeVal')?.value || '+20';
    const countryNameVal = document.getElementById('hpCountryNameVal')?.value || 'Egypt';

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const phoneRaw = phoneInput ? phoneInput.value.trim().replace(/^0+/, '') : '';

    if (!fullName || fullName.length < 2) {
      alert('Please enter your full name.');
      fullNameInput?.focus();
      return;
    }

    if (!phoneRaw || phoneRaw.length < 6) {
      alert('Please enter a valid phone number.');
      phoneInput?.focus();
      return;
    }

    const fullPhone = `${countryCodeVal} ${phoneRaw}`;
    const submitBtn = leadForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> TRANSMITTING...';
    submitBtn.disabled = true;

    const payload = {
      fullName: fullName,
      phoneNumber: fullPhone,
      countryCode: countryCodeVal,
      countryName: countryNameVal,
      rawPhone: phoneRaw,
      landingPageUrl: window.location.href,
      submissionDate: new Date().toISOString(),
      projectFocus: 'Hyde Park Developments Portfolio (One Hyde Park, Terraces, Hyde Park Central)',
      source: 'Hyde Park Landing Page (/Hydepark) - properties-m.com',
      routedEmails: [
        'Rahma@irtkaz.com',
        'Mostafa.a.ashmawy@gmail.com',
        'Mostafa.ashmawy@irtkaz.com'
      ]
    };

    try {
      // 1. Submit Primary Lead to Web3Forms API
      const web3FormData = new FormData(leadForm);
      web3FormData.set('access_key', '9f6d054c-a955-4ed1-b85d-91c7f8b0a16a');
      web3FormData.set('name', fullName);
      web3FormData.set('phone', fullPhone);
      web3FormData.set('country', countryNameVal);
      web3FormData.set('country_code', countryCodeVal);
      web3FormData.set('page_url', window.location.href);
      web3FormData.set('subject', `New Lead: Hyde Park Portfolio — ${fullName} (${fullPhone})`);
      web3FormData.set('from_name', 'Properties-M Real Estate Advisory');
      web3FormData.set('project', 'Hyde Park Developments (One Hyde Park, Terraces, Central)');

      try {
        const web3Response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: web3FormData
        });
        const web3Result = await web3Response.json();
        console.log('Web3Forms response:', web3Result);
      } catch (w3Err) {
        console.warn('Web3Forms dispatch warning:', w3Err);
      }

      // 2. Secondary Zapier Production Webhook Dispatch
      try {
        await fetch("https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/", {
          method: "POST",
          body: JSON.stringify(payload)
        });
      } catch (postErr) {
        // Fallback for strict browser CORS handling
        console.warn("Direct Zapier POST failed, attempting no-cors fallback", postErr);
        await fetch("https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/", {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload)
        });
      }

      // 3. Google Ads Conversion Event
      if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion();
      } else if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-18495474156/EvjICOTemJQdEOyTqvNE',
          'value': 1.0,
          'currency': 'EGP'
        });
      }

      // Show Thank You success state
      if (successState) {
        successState.style.display = 'block';
        leadForm.style.display = 'none';
        if (cardHeader) cardHeader.style.display = 'none';
      }

      // LocalStorage Backup Archive
      try {
        const stored = JSON.parse(localStorage.getItem('properties_m_hydepark_leads') || '[]');
        stored.push(payload);
        localStorage.setItem('properties_m_hydepark_leads', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      showToast(
        'Inquiry Transmitted',
        'Thank you. Your request for the Hyde Park portfolio has been delivered to our senior consultants.'
      );

      leadForm.reset();

    } catch (err) {
      console.error('Lead submission error:', err);
      alert('Unable to transmit your enquiry. Please chat directly with us on WhatsApp.');
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });

  if (resetBtn && successState && leadForm) {
    resetBtn.addEventListener('click', () => {
      successState.style.display = 'none';
      leadForm.style.display = '';
      if (cardHeader) cardHeader.style.display = '';
    });
  }
}

/**
 * Toast Notification Helper
 */
function showToast(title, message) {
  const toast = document.getElementById('hpToast');
  if (!toast) return;

  const titleEl = toast.querySelector('h4');
  const msgEl = toast.querySelector('p');

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 6000);
}
