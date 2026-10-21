/**
 * Properties-M Real Estate Advisory Script
 * Main Interactive Logic: Navigation, Filters, FAQ, Form Validation & Conversion Tracking
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Initialize Core Modules
    initNavbarScroll();
    initMobileMenu();
    initDestinationFilters();
    initFaqAccordion();
    initFormHandling();
    initConversionTracking();
});

/* ==========================================================================
   Navbar Scroll Effect
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    const navLinks = navMenu.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ==========================================================================
   Interactive Destination Filtering
   ========================================================================== */
function initDestinationFilters() {
    const filterTabs = document.querySelectorAll('.dest-tab');
    const destCards = document.querySelectorAll('.destination-card');

    if (!filterTabs.length || !destCards.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            destCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all other items
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('open');
            });

            // Toggle current
            if (isOpen) {
                item.classList.remove('open');
            } else {
                item.classList.add('open');
            }
        });
    });
}

/* ==========================================================================
   Form Handling & International Phone Validation
   ========================================================================== */
function initFormHandling() {
    const consultationForm = document.getElementById('consultation-form');
    const submitBtn = document.getElementById('submit-btn');
    const spinner = document.getElementById('form-spinner');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (!consultationForm) return;

    consultationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const phoneInput = document.getElementById('form-phone');
        const destinationInput = document.getElementById('form-destination');

        if (!nameInput.value.trim() || !phoneInput.value.trim()) {
            alert('Please provide your name and contact phone number.');
            return;
        }

        // Clean spaces, dashes, brackets, dots
        let cleanPhone = phoneInput.value.trim().replace(/[\s\-\(\)\.]/g, '');

        // Convert leading 00 to + format (e.g. 00966 -> +966)
        if (cleanPhone.startsWith('00')) {
            cleanPhone = '+' + cleanPhone.slice(2);
        }

        // Worldwide valid phone regex (7 to 16 digits, with optional +)
        const globalPhoneRegex = /^\+?[0-9]{7,16}$/;
        if (!globalPhoneRegex.test(cleanPhone)) {
            alert('Please enter a valid phone number with country code (e.g. +201003565002, +966501234567)');
            phoneInput.focus();
            return;
        }

        // Prepare FormData
        const formData = new FormData(consultationForm);
        formData.set('phone', cleanPhone);

        const accessKeyInput = document.getElementById('web3forms-key');
        const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

        // UI Loading State
        submitBtn.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';

        // Check if placeholder access key
        if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
            console.log('%c[Properties-M Lead Captured - Test Mode]', 'color: #c5a880; font-weight: bold; font-size: 14px;');
            console.log('Lead Details:', {
                name: nameInput.value,
                phone: cleanPhone,
                destination: destinationInput ? destinationInput.value : 'General',
                developer: formData.get('developer'),
                budget: formData.get('budget')
            });

            setTimeout(() => {
                resetForm();
                openModal();
                triggerGoogleConversion();
            }, 1000);
            return;
        }

        // Live API Submission
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                resetForm();
                openModal();
                triggerGoogleConversion();
            } else {
                console.error('Web3Forms Error:', result);
                alert('Submission failed: ' + (result.message || 'Please verify your details and try again.'));
                resetSubmitBtn();
            }
        } catch (error) {
            console.error('Network/Submission Error:', error);
            alert('An error occurred during submission. Please check your connection or contact us via WhatsApp.');
            resetSubmitBtn();
        }
    });

    function resetForm() {
        consultationForm.reset();
        resetSubmitBtn();
    }

    function resetSubmitBtn() {
        submitBtn.disabled = false;
        if (spinner) spinner.style.display = 'none';
    }

    function openModal() {
        successModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        successModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    window.closeModal = closeModal;

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal.classList.contains('open')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   Google Ads Conversion Tracking & WhatsApp Click Handlers
   ========================================================================== */
function triggerGoogleConversion(url) {
    if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion(url);
    } else if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': 'AW-18495474156/EvjICOTemJQdEOyTqvNE',
            'value': 1.0,
            'currency': 'EGP',
            'event_callback': function () {
                if (typeof url !== 'undefined' && url) {
                    window.location = url;
                }
            }
        });
    } else if (typeof url !== 'undefined' && url) {
        window.location = url;
    }
}

function initConversionTracking() {
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    waLinks.forEach(link => {
        link.addEventListener('click', () => {
            triggerGoogleConversion();
        });
    });
}
