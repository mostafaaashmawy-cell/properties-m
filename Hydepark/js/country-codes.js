/**
 * properties-m.com - International Country Codes Dataset
 * Built with pristine vector SVG flags to guarantee ZERO mojibake, zero font dependencies,
 * and flawless cross-platform rendering across Windows, macOS, iOS, and Android.
 */

const COUNTRY_CODES = [
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
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    dialCode: '+966',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#006C35"/>
      <path d="M6 7.5h12v1H6z" fill="#FFFFFF"/>
      <path d="M7 10.5h10v0.8H7z" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    dialCode: '+971',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#00732F"/>
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
      <rect y="10.67" width="24" height="5.33" fill="#000000"/>
      <rect width="6" height="16" fill="#FF0000"/>
    </svg>`
  },
  {
    code: 'KW',
    name: 'Kuwait',
    dialCode: '+965',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#007A3D"/>
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
      <rect y="10.67" width="24" height="5.33" fill="#CE1126"/>
      <polygon points="0,0 6,5.33 6,10.67 0,16" fill="#000000"/>
    </svg>`
  },
  {
    code: 'QA',
    name: 'Qatar',
    dialCode: '+974',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#8D1B3D"/>
      <polygon points="0,0 7,0 9,1.7 7,3.5 9,5.3 7,7.1 9,8.9 7,10.7 9,12.5 7,14.3 9,16 0,16" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'BH',
    name: 'Bahrain',
    dialCode: '+973',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#CE1126"/>
      <polygon points="0,0 6,0 8.5,1.6 6,3.2 8.5,4.8 6,6.4 8.5,8 6,9.6 8.5,11.2 6,12.8 8.5,14.4 6,16 0,16" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'OM',
    name: 'Oman',
    dialCode: '+968',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#FFFFFF"/>
      <rect y="5.33" width="24" height="5.34" fill="#DB161B"/>
      <rect y="10.67" width="24" height="5.33" fill="#008000"/>
      <rect width="6" height="16" fill="#DB161B"/>
      <path d="M1.5 2.5h3v2h-3z" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#B22234"/>
      <rect y="1.23" width="24" height="1.23" fill="#FFFFFF"/>
      <rect y="3.69" width="24" height="1.23" fill="#FFFFFF"/>
      <rect y="6.15" width="24" height="1.23" fill="#FFFFFF"/>
      <rect y="8.61" width="24" height="1.23" fill="#FFFFFF"/>
      <rect y="11.07" width="24" height="1.23" fill="#FFFFFF"/>
      <rect y="13.53" width="24" height="1.23" fill="#FFFFFF"/>
      <rect width="10" height="8.6" fill="#3C3B6E"/>
    </svg>`
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    dialCode: '+44',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#012169"/>
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" stroke-width="3"/>
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" stroke-width="1.5"/>
      <path d="M12 0 v16 M0 8 h24" stroke="#FFFFFF" stroke-width="5"/>
      <path d="M12 0 v16 M0 8 h24" stroke="#C8102E" stroke-width="3"/>
    </svg>`
  },
  {
    code: 'CA',
    name: 'Canada',
    dialCode: '+1',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="6" height="16" fill="#FF0000"/>
      <rect x="6" width="12" height="16" fill="#FFFFFF"/>
      <rect x="18" width="6" height="16" fill="#FF0000"/>
      <polygon points="12,4 13.5,7 15,6.5 14,8.5 15.5,10 13,9.5 12,12 11,9.5 8.5,10 10,8.5 9,6.5 10.5,7" fill="#FF0000"/>
    </svg>`
  },
  {
    code: 'AT',
    name: 'Austria',
    dialCode: '+43',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#C8102E"/>
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
      <rect y="10.67" width="24" height="5.33" fill="#C8102E"/>
    </svg>`
  },
  {
    code: 'GR',
    name: 'Greece',
    dialCode: '+30',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#0D5EAF"/>
      <rect y="1.77" width="24" height="1.78" fill="#FFFFFF"/>
      <rect y="5.33" width="24" height="1.78" fill="#FFFFFF"/>
      <rect y="8.89" width="24" height="1.78" fill="#FFFFFF"/>
      <rect y="12.45" width="24" height="1.78" fill="#FFFFFF"/>
      <rect width="9" height="9" fill="#0D5EAF"/>
      <rect x="3.5" width="2" height="9" fill="#FFFFFF"/>
      <rect y="3.5" width="9" height="2" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'FR',
    name: 'France',
    dialCode: '+33',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="8" height="16" fill="#002395"/>
      <rect x="8" width="8" height="16" fill="#FFFFFF"/>
      <rect x="16" width="8" height="16" fill="#ED2939"/>
    </svg>`
  },
  {
    code: 'IT',
    name: 'Italy',
    dialCode: '+39',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="8" height="16" fill="#009246"/>
      <rect x="8" width="8" height="16" fill="#FFFFFF"/>
      <rect x="16" width="8" height="16" fill="#CE2B37"/>
    </svg>`
  },
  {
    code: 'CH',
    name: 'Switzerland',
    dialCode: '+41',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#D52B1E"/>
      <rect x="10.5" y="3.5" width="3" height="9" fill="#FFFFFF"/>
      <rect x="7.5" y="6.5" width="9" height="3" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'JO',
    name: 'Jordan',
    dialCode: '+962',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#000000"/>
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
      <rect y="10.67" width="24" height="5.33" fill="#007A3D"/>
      <polygon points="0,0 9,8 0,16" fill="#CE1126"/>
      <circle cx="3.5" cy="8" r="1" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'LB',
    name: 'Lebanon',
    dialCode: '+961',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="4" fill="#ED1C24"/>
      <rect y="4" width="24" height="8" fill="#FFFFFF"/>
      <rect y="12" width="24" height="4" fill="#ED1C24"/>
      <polygon points="12,4.5 9,11.5 15,11.5" fill="#00A651"/>
    </svg>`
  },
  {
    code: 'IQ',
    name: 'Iraq',
    dialCode: '+964',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#CE1126"/>
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
      <rect y="10.67" width="24" height="5.33" fill="#000000"/>
      <path d="M9 7h6v2H9z" fill="#007A3D"/>
    </svg>`
  },
  {
    code: 'LY',
    name: 'Libya',
    dialCode: '+218',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="4" fill="#E70013"/>
      <rect y="4" width="24" height="8" fill="#000000"/>
      <rect y="12" width="24" height="4" fill="#239E46"/>
      <circle cx="12" cy="8" r="2" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'NL',
    name: 'Netherlands',
    dialCode: '+31',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#AE1C28"/>
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
      <rect y="10.67" width="24" height="5.33" fill="#21468B"/>
    </svg>`
  },
  {
    code: 'AU',
    name: 'Australia',
    dialCode: '+61',
    flagSvg: `<svg viewBox="0 0 24 16" width="24" height="16" class="flag-icon" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#00008B"/>
      <rect width="10" height="7" fill="#012169"/>
      <circle cx="18" cy="8" r="1.5" fill="#FFFFFF"/>
      <circle cx="16" cy="4" r="0.8" fill="#FFFFFF"/>
      <circle cx="20" cy="5" r="0.8" fill="#FFFFFF"/>
    </svg>`
  }
];

if (typeof window !== 'undefined') {
  window.COUNTRY_CODES = COUNTRY_CODES;
}
