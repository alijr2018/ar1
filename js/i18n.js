/**
 * i18n - Internationalization Module
 * Handles language detection, loading translations, and dynamic content updates
 */

const I18n = (function() {
  'use strict';

  const SUPPORTED_LANGUAGES = ['fr', 'en', 'ar'];
  const DEFAULT_LANGUAGE = 'fr';
  let currentLang = DEFAULT_LANGUAGE;
  let translations = {};
  let agenciesData = null;

  /**
   * Detect browser language preference
   */
  function detectLanguage() {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang)) {
      return urlLang;
    }

    // Check localStorage
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
      return storedLang;
    }

    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage || '';
    const shortLang = browserLang.split('-')[0].toLowerCase();
    
    if (SUPPORTED_LANGUAGES.includes(shortLang)) {
      return shortLang;
    }

    // Default
    return DEFAULT_LANGUAGE;
  }

  /**
   * Get base path for GitHub Pages compatibility
   */
  function getBasePath() {
    const path = window.location.pathname;
    // For GitHub Pages: extract repo name from path
    // e.g., /ar1/ -> /ar1/
    const match = path.match(/^(\/[^/]+\/)/);
    return match ? match[1] : './';
  }

  /**
   * Load translations from JSON file
   */
  async function loadTranslations(lang) {
    try {
      const base = getBasePath();
      const response = await fetch(`${base}locales/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
      const data = await response.json();
      translations[lang] = data;
      return data;
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      return null;
    }
  }

  /**
   * Load agencies data
   */
  async function loadAgenciesData() {
    if (agenciesData) return agenciesData;
    try {
      const base = getBasePath();
      const response = await fetch(`${base}data/agencies.json`);
      if (!response.ok) throw new Error('Failed to load agencies data');
      agenciesData = await response.json();
      return agenciesData;
    } catch (error) {
      console.error('Error loading agencies data:', error);
      return null;
    }
  }

  /**
   * Get translated string by dot-notation key
   */
  function t(key, lang) {
    const l = lang || currentLang;
    const keys = key.split('.');
    let value = translations[l];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to default language
        let fallback = translations[DEFAULT_LANGUAGE];
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key; // Return key itself as last resort
          }
        }
        return fallback;
      }
    }
    
    return value;
  }

  /**
   * Get translated agency field
   */
  function tAgency(agency, field, lang) {
    const l = lang || currentLang;
    const value = agency[field];
    
    if (value && typeof value === 'object' && l in value) {
      return value[l];
    }
    // Fallback to French
    if (value && typeof value === 'object' && DEFAULT_LANGUAGE in value) {
      return value[DEFAULT_LANGUAGE];
    }
    return value || '';
  }

  /**
   * Set language and apply to the page
   */
  async function setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      lang = DEFAULT_LANGUAGE;
    }

    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Load translations if not loaded yet
    if (!translations[lang]) {
      await loadTranslations(lang);
    }

    // Set HTML attributes
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', t('dir'));

    // Update all translatable elements
    updatePageContent(lang);

    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  /**
   * Update all page content with translations
   */
  async function updatePageContent(lang) {
    // Update text content by data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = t(key);
      if (value && typeof value === 'string') {
        el.textContent = value;
      }
    });

    // Update attributes by data-i18n-attr attribute
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const attrs = el.getAttribute('data-i18n-attr').split(',');
      attrs.forEach(attr => {
        const [attrName, key] = attr.split(':');
        const value = t(key.trim());
        if (value) {
          el.setAttribute(attrName.trim(), value);
        }
      });
    });

    // Update title
    document.title = t('seo.title');

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('seo.description'));
    }

    // Re-render dynamic sections
    await renderAgencies();
    updateLanguageSelectorUI();
  }

  /**
   * Render agencies section
   */
  async function renderAgencies() {
    const container = document.getElementById('agencies-container');
    if (!container) return;

    const data = await loadAgenciesData();
    if (!data || !data.agencies) return;

    container.innerHTML = '';

    data.agencies.forEach(agency => {
      const card = document.createElement('div');
      card.className = 'agency-card fade-in';
      
      const isMain = agency.isMain ? `<span class="agency-badge" data-i18n="agencies.mainBadge">Siège</span>` : '';
      
      card.innerHTML = `
        ${isMain}
        <h3>${tAgency(agency, 'name')}</h3>
        <div class="agency-info">
          <div class="agency-info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${agency.address}, ${tAgency(agency, 'city')} ${agency.postalCode}</span>
          </div>
          <div class="agency-info-item">
            <i class="fas fa-phone"></i>
            <span>${agency.phones.map(p => `<a href="tel:${p.replace(/\s/g, '')}">${p}</a>`).join('<br>')}</span>
          </div>
          ${agency.fax ? `
          <div class="agency-info-item">
            <i class="fas fa-fax"></i>
            <span>${agency.fax}</span>
          </div>` : ''}
          <div class="agency-info-item">
            <i class="fas fa-envelope"></i>
            <span><a href="mailto:${agency.email}">${agency.email}</a></span>
          </div>
          <div class="agency-info-item">
            <i class="fas fa-clock"></i>
            <span>${tAgency(agency, 'hours')}</span>
          </div>
        </div>
        <div class="agency-actions">
          <a href="tel:${agency.phones[0].replace(/\s/g, '')}" class="btn btn-primary">
            <i class="fas fa-phone"></i> <span data-i18n="agencies.call">${t('agencies.call')}</span>
          </a>
          <a href="${agency.mapsUrl}" target="_blank" class="btn btn-outline">
            <i class="fas fa-directions"></i> <span data-i18n="agencies.directions">${t('agencies.directions')}</span>
          </a>
          <a href="https://wa.me/${agency.whatsapp.replace(/[\s+]/g, '')}" target="_blank" class="btn btn-whatsapp">
            <i class="fab fa-whatsapp"></i> <span data-i18n="agencies.whatsapp">${t('agencies.whatsapp')}</span>
          </a>
        </div>
        <div class="agency-map">
          <iframe src="https://maps.google.com/maps?q=${agency.gps.lat},${agency.gps.lng}&z=15&output=embed" 
                  loading="lazy" allowfullscreen></iframe>
        </div>
      `;
      
      container.appendChild(card);
    });

  }

  /**
   * Update language selector UI
   */
  function updateLanguageSelectorUI() {
    document.querySelectorAll('.lang-dropdown button').forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', lang === currentLang);
    });

    // Update the language button text
    const langBtnText = document.querySelector('.lang-btn-text');
    if (langBtnText) {
      const names = { fr: 'FR', en: 'EN', ar: 'عربي' };
      langBtnText.textContent = names[currentLang] || 'FR';
    }
  }

  /**
   * Get current language
   */
  function getCurrentLanguage() {
    return currentLang;
  }

  /**
   * Get supported languages
   */
  function getSupportedLanguages() {
    return SUPPORTED_LANGUAGES;
  }

  /**
   * Get all translations for current language
   */
  function getTranslations() {
    return translations[currentLang] || {};
  }

  // Initialize
  async function init() {
    // Load default language translations
    await loadTranslations(DEFAULT_LANGUAGE);
    
    // Detect and set language
    const lang = detectLanguage();
    await loadTranslations(lang);
    await setLanguage(lang);
  }

  return {
    init,
    setLanguage,
    t,
    tAgency,
    getCurrentLanguage,
    getSupportedLanguages,
    getTranslations,
    loadAgenciesData,
    renderAgencies
  };
})();
