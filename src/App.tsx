import React, { useEffect, useState } from 'react';
import { DNS_DEFAULT_UI_LANGUAGE, DNS_UI_LANGUAGE_STORAGE_KEY, resolveDNSLanguagePreference } from '@dolomitinordicski/dns-shared-data/localization';
import { NavigationTab, Language, AccessibilitySettings, AccessLevel } from './types';
import { Header } from './components/Header';
import { VisionSection } from './components/VisionSection';
import { CorporateDesignSection } from './components/CorporateDesignSection';
import { QualityCriteriaSection } from './components/QualityCriteriaSection';
import { DownloadsSection } from './components/DownloadsSection';
import { RegionsSection } from './components/RegionsSection';
import { ContactSection } from './components/ContactSection';
import { WidgetCreator } from './components/WidgetCreator';
import { PortalNavigation } from './components/PortalNavigation';
import { PortalHome } from './components/PortalHome';
import { PartnerLoginModal } from './components/PartnerLoginModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal, LegalTab } from './components/LegalModal';

import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(DNS_UI_LANGUAGE_STORAGE_KEY);
      if (saved === 'en') return 'en'; // Partner Hub supports English in addition to Foundation DE/IT.
      return resolveDNSLanguagePreference({ stored: saved }) as Language;
    } catch {
      return DNS_DEFAULT_UI_LANGUAGE;
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try { window.localStorage.setItem(DNS_UI_LANGUAGE_STORAGE_KEY, lang); } catch { /* storage optional */ }
  }, [lang]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isA11yModalOpen, setIsA11yModalOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('privacy');

  const handleOpenLegal = (tab: LegalTab = 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };
  
  // 4-Level Access State (public | partner | regional | admin)
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('public');
  const [partnerCode, setPartnerCode] = useState<string>('');
  const [partnerName, setPartnerName] = useState<string>('');

  // Accessibility State Management
  const [a11y, setA11y] = useState<AccessibilitySettings>({
    theme: 'light',
    fontSize: 'normal',
    highContrast: false,
    readableFont: false,
    reducedMotion: false,
  });

  const isLight = a11y.theme === 'light';

  // Role elevation is disabled until the server-authenticated DNS grant integration is ready.
  const handleLoginSuccess = (_code: string, _name: string, _role?: 'partner' | 'regional' | 'admin') => {
    setAccessLevel('public');
    setPartnerCode('');
    setPartnerName('');
  };

  const handleSelectDemoRole = (_role: AccessLevel) => {
    // A browser action must never assign a privileged DNS role.
  };

  const handleLogout = () => {
    setAccessLevel('public');
    setPartnerCode('');
    setPartnerName('');
    if (activeTab === 'regional-tools' || activeTab === 'voucher-system') {
      setActiveTab('vision');
    }
  };

  const rootClasses = `min-h-screen font-sans antialiased selection:bg-[#AAD0D1] selection:text-[#083845] flex flex-col justify-between transition-colors duration-300 ${
    isLight ? 'bg-[#F4F8F9] text-[#083845]' : 'bg-[#052832] text-white'
  } ${
    a11y.fontSize === 'large' ? 'text-base' : a11y.fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
  } ${
    a11y.highContrast ? 'contrast-125' : ''
  } ${
    a11y.readableFont ? 'tracking-wide leading-relaxed font-sans' : ''
  } ${
    a11y.reducedMotion ? '[&_*]:!transition-none [&_*]:!animation-none' : ''
  }`;

  return (
    <div className={rootClasses}>
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        accessLevel={accessLevel}
        partnerName={partnerName}
        partnerCode={partnerCode}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        a11y={a11y}
        setA11y={setA11y}
        onOpenA11yModal={() => setIsA11yModalOpen(true)}
        onSelectDemoRole={handleSelectDemoRole}
      />



{/* Main Content Area */}
      <div data-dns-portal-layout style={{flex:1}}>
        <PortalNavigation activeTab={activeTab} lang={lang} onNavigate={(tab) => {setActiveTab(tab);window.dispatchEvent(new Event('dns:portal-navigate'));window.scrollTo({top:0,behavior:'smooth'});}} />
        <main data-dns-shell-main className="flex-1" style={{minWidth:0}}>

        
        {activeTab === 'home' && <PortalHome lang={lang} onNavigate={setActiveTab} />}

        {/* VISION TAB */}
        {activeTab === 'vision' && <VisionSection lang={lang} />}

        {/* CORPORATE DESIGN TAB */}
        {activeTab === 'corporate-design' && <CorporateDesignSection lang={lang} a11y={a11y} accessLevel={accessLevel} />}

        {/* BENEFITS & QUALITY CRITERIA TAB */}
        {(activeTab === 'benefits' || activeTab === 'quality-criteria') && (
          <QualityCriteriaSection 
            lang={lang} 
            initialTab={activeTab === 'benefits' ? 'benefits' : 'criteria'}
          />
        )}

        {/* WIDGET & EMBED GENERATOR TAB */}
        {activeTab === 'widgets' && (
          <div className="py-12 bg-[#052832] text-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
              <WidgetCreator lang={lang} accessLevel={accessLevel} />
            </div>
          </div>
        )}

        {/* Legacy modules isolated until DNS Core authorization is ready. */}
        {(activeTab === 'voucher-system' || activeTab === 'regional-tools') && (
          <section className="max-w-3xl mx-auto px-4 sm:px-8 py-16" role="status">
            <div className="rounded-2xl border border-[#82B2BD]/40 bg-white p-8 text-[#083845] shadow-sm space-y-4">
              <h1 className="text-2xl font-bold">
                {lang === 'de' ? 'Modul in Vorbereitung' : lang === 'it' ? 'Modulo in preparazione' : 'Module in preparation'}
              </h1>
              <p>
                {lang === 'de' ? 'Dieses Modul wird erst nach der sicheren Anbindung an DNS Core freigeschaltet.' : lang === 'it' ? 'Questo modulo sarà disponibile dopo il collegamento sicuro a DNS Core.' : 'This module will become available after secure integration with DNS Core.'}
              </p>
              <button type="button" onClick={() => setActiveTab('home')} className="rounded-lg bg-[#0D4D5E] px-5 py-3 text-white font-semibold">
                {lang === 'de' ? 'Zur Startseite' : lang === 'it' ? 'Torna alla home' : 'Back to home'}
              </button>
            </div>
          </section>
        )}

        {/* REGIONS TAB */}
        {activeTab === 'regions' && <RegionsSection lang={lang} />}

        {/* DOWNLOADS TAB */}
        {activeTab === 'downloads' && <DownloadsSection lang={lang} a11y={a11y} accessLevel={accessLevel} />}

        {/* CONTACTS TAB */}
        {activeTab === 'contacts' && (
          <ContactSection 
            lang={lang} 
            accessLevel={accessLevel} 
            onOpenLogin={() => setIsLoginModalOpen(true)} 
          />
        )}

        </main>
      </div>

      {/* Partner Login Modal Dialog */}
      <PartnerLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        lang={lang}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Accessibility Control Modal */}
      <AccessibilityModal
        isOpen={isA11yModalOpen}
        onClose={() => setIsA11yModalOpen(false)}
        a11y={a11y}
        setA11y={setA11y}
        lang={lang}
      />

      {/* GDPR Legal Modal (Privacy, Cookie Policy, Note Legali) */}
      <LegalModal
        isOpen={isLegalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setIsLegalModalOpen(false)}
        lang={lang}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent
        lang={lang}
        onOpenPolicy={() => handleOpenLegal('cookie')}
      />

      {/* Footer */}
      <div data-dns-tool-footer><Footer setActiveTab={setActiveTab} lang={lang} onOpenLegal={handleOpenLegal} /></div>

      {/* Floating Go To Top Button (Always visible across all devices) */}

    </div>
  );
}
