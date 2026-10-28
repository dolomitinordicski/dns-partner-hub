import React from 'react';
import type { NavigationTab, Language, AccessibilitySettings, AccessLevel } from '../types';
import { DNS_FOUNDATION_RELEASE_VERSION } from '@dolomitinordicski/dns-shared-data/release';
import { DNS_SHARED_WEB_LOGO_URL } from '../services/foundationBrand';
import { Menu, X } from 'lucide-react';
import { initDNSAccessibilityRuntime } from '@dolomitinordicski/dns-shared-data/ui/accessibility';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  accessLevel: AccessLevel;
  partnerName: string;
  partnerCode: string;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  a11y: AccessibilitySettings;
  setA11y: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  onOpenA11yModal: () => void;
  onSelectDemoRole?: (role: AccessLevel) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang, setLang, accessLevel, onOpenLoginModal, onLogout, onOpenA11yModal
}) => {
  const [open, setOpen] = React.useState(false);
  const a11yMount = React.useRef<HTMLDivElement>(null);
  const a11yRuntime = React.useRef<ReturnType<typeof initDNSAccessibilityRuntime> | null>(null);

  React.useEffect(() => {
    if (!a11yMount.current) return;
    const runtime = initDNSAccessibilityRuntime({ mountTarget: a11yMount.current, language: lang === 'it' ? 'it' : 'de' });
    a11yRuntime.current = runtime;
    return () => { runtime.disconnect(); a11yRuntime.current = null; };
  }, []);

  React.useEffect(() => {
    a11yRuntime.current?.setLanguage(lang === 'it' ? 'it' : 'de');
  }, [lang]);

  React.useEffect(() => {
    document.querySelector('[data-dns-app-nav]')?.setAttribute('data-dns-open', String(open));
  }, [open]);

  React.useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('dns:portal-navigate', close);
    return () => window.removeEventListener('dns:portal-navigate', close);
  }, []);

  return (
    <header data-dns-tool-header className="dns-foundation-header bg-[var(--dns-header-bg)] text-white">
      <div className="dns-tool-header-shell">
        <div className="dns-tool-header-brand">
          <img className="dns-tool-header-logo" src={DNS_SHARED_WEB_LOGO_URL} alt="Dolomiti NordicSki" />
          <div className="dns-tool-header-identity">
            <div className="dns-tool-header-title"><strong>DNS</strong> <span>PARTNER HUB</span></div>
            <div className="dns-tool-header-subtitle">{lang === 'de' ? 'Services & Ressourcen' : lang === 'it' ? 'Servizi e risorse' : 'Services & Resources'}</div>
          </div>
        </div>
        <div className="dns-tool-header-actions">
          <div className="dns-tool-header-controls">
            <div ref={a11yMount} data-dns-accessibility-mount />
            <div className="dns-tool-header-language" role="group" aria-label={lang === 'de' ? 'Sprache' : lang === 'it' ? 'Lingua' : 'Language'}>
              {(['de', 'it', 'en'] as Language[]).map(l => (
                <button
                  key={l}
                  type="button"
                  data-dns-press
                  className={`border-b-2 px-1 py-2 text-[10px] font-bold tracking-wide ${lang === l ? 'border-white text-white' : 'border-transparent text-[var(--color-dns-light)]'}`}
                  aria-pressed={lang === l}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" className="dns-tool-header-session-action" onClick={accessLevel === 'public' ? onOpenLoginModal : onLogout}>
              {accessLevel === 'public' ? (lang === 'de' ? 'Anmelden' : lang === 'it' ? 'Accedi' : 'Login') : (lang === 'de' ? 'Abmelden' : lang === 'it' ? 'Esci' : 'Logout')}
            </button>
            <button type="button" aria-label={lang === 'de' ? 'Menü' : lang === 'it' ? 'Menu' : 'Menu'} aria-expanded={open} aria-controls="dns-portal-navigation" onClick={() => setOpen(!open)} className="inline-flex items-center justify-center rounded-md border border-[var(--color-dns-border)] px-2 py-1 text-white lg:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
          <div className="dns-tool-header-status" data-state="ready" aria-label="DNS Foundation runtime" aria-live="polite">
            <span className="dns-tool-header-status-dot" />
            Foundation v{DNS_FOUNDATION_RELEASE_VERSION}
          </div>
        </div>
      </div>
    </header>
  );
};
