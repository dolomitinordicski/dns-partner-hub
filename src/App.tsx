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
import { PartnerOnboarding } from './components/PartnerOnboarding';
import { PartnerLoginModal } from './components/PartnerLoginModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal, LegalTab } from './components/LegalModal';

import { Footer } from './components/Footer';
import { ChevronRight } from 'lucide-react';

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
        <nav id="dns-portal-navigation" data-dns-app-nav data-dns-open="false" aria-label="Partner Hub" className="dns-card" style={{borderRadius:0,padding:'20px 12px',display:'flex',flexDirection:'column',gap:4}}>
          {([
            ['home',{de:'Start',it:'Home',en:'Home'}],
            ['vision',{de:'Vision',it:'Vision',en:'Vision'}],
            ['corporate-design',{de:'Corporate Design',it:'Corporate Design',en:'Corporate Design'}],
            ['quality-criteria',{de:'Qualitätskriterien',it:'Criteri di qualità',en:'Quality criteria'}],
            ['widgets',{de:'Widget Creator',it:'Widget Creator',en:'Widget Creator'}],
            ['regions',{de:'DNS Gebiete',it:'Aree DNS',en:'DNS areas'}],
            ['downloads',{de:'Downloads',it:'Download',en:'Downloads'}],
            ['contacts',{de:'Kontakt',it:'Contatti',en:'Contacts'}],
          ] as const).map(([tab,labels])=><button type="button" key={tab} className="dns-button" data-variant={activeTab===tab?'primary':'tertiary'} aria-current={activeTab===tab?'page':undefined} style={{justifyContent:'flex-start',fontSize:12}} onClick={()=>{setActiveTab(tab);window.dispatchEvent(new Event('dns:portal-navigate'));window.scrollTo({top:0,behavior:'smooth'});}}>{labels[lang]}</button>)}
        </nav>
        <main data-dns-shell-main className="flex-1" style={{minWidth:0}}>

        
        {/* Foundation portal home: no separate marketing hero or duplicated navigation. */}
        {activeTab === 'home' && (
          <div className="space-y-8 py-8">
            <header className="space-y-2">
              <p className="dns-kicker">Dolomiti NordicSki</p>
              <h1 className="text-2xl font-bold" style={{color:'var(--color-dns-deep,#0D4D5E)',fontFamily:'var(--dns-font-heading,system-ui)'}}>Partner Hub</h1>
              <p style={{color:'var(--color-dns-mid,#417483)'}}>
                {lang === 'de' ? 'Informationen und Werkzeuge für unsere Partnerbetriebe.' : lang === 'it' ? 'Informazioni e strumenti per le strutture partner.' : 'Information and tools for our partner properties.'}
              </p>
            </header>
            <section className="dns-card p-5 sm:p-8" aria-label="Partner onboarding">
              <PartnerOnboarding lang={lang} onWidget={() => setActiveTab('widgets')} />
            </section>
            <section className="space-y-4" aria-label="Partner services">
              <h2 className="dns-section-title">{lang === 'de' ? 'Partner-Services' : lang === 'it' ? 'Servizi partner' : 'Partner services'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {([
                  ['corporate-design', {de:'Corporate Design',it:'Corporate Design',en:'Corporate Design'}],
                  ['widgets', {de:'Widget Creator',it:'Widget Creator',en:'Widget Creator'}],
                  ['quality-criteria', {de:'Qualitätskriterien',it:'Criteri di qualità',en:'Quality criteria'}],
                  ['downloads', {de:'Downloads',it:'Download',en:'Downloads'}],
                ] as const).map(([tab,label])=>(
                  <button key={tab} type="button" className="dns-card p-5 text-left flex items-center justify-between gap-3" style={{border:'1px solid var(--color-dns-border,rgba(65,116,131,.20))',color:'var(--color-dns-deep,#0D4D5E)'}} onClick={()=>setActiveTab(tab)}>
                    <span className="font-semibold">{label[lang]}</span><ChevronRight size={18} aria-hidden="true"/>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

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
