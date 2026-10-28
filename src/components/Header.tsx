import React from 'react';
import type { NavigationTab, Language, AccessibilitySettings, AccessLevel } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { Accessibility, Menu, X } from 'lucide-react';

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

  React.useEffect(() => {
    document.querySelector('[data-dns-app-nav]')?.setAttribute('data-dns-open', String(open));
  }, [open]);

  React.useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('dns:portal-navigate', close);
    return () => window.removeEventListener('dns:portal-navigate', close);
  }, []);

  return (
    <header data-dns-tool-header className="dns-foundation-header">
      <div className="dns-tool-header-shell">
        <div className="dns-tool-header-brand">
          <img className="dns-tool-header-logo" src={DNS_LOGO_BASE64} alt="Dolomiti NordicSki" />
          <div className="dns-tool-header-identity">
            <div className="dns-tool-header-title"><strong>DNS</strong> <span>PARTNER HUB</span></div>
            <div className="dns-tool-header-subtitle">Dolomiti NordicSki</div>
          </div>
        </div>
        <div className="dns-tool-header-actions">
          <div className="dns-tool-header-controls">
            <div className="dns-tool-header-language" role="group" aria-label={lang === 'de' ? 'Sprache' : lang === 'it' ? 'Lingua' : 'Language'}>
              {(['de', 'it', 'en'] as Language[]).map(l => (
                <button key={l} type="button" className="dns-button" data-variant={lang === l ? 'primary' : 'tertiary'} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <button type="button" className="dns-button" data-variant="icon" aria-label={lang === 'de' ? 'Barrierefreiheit' : lang === 'it' ? 'Accessibilità' : 'Accessibility'} onClick={onOpenA11yModal}><Accessibility size={18} /></button>
            <button type="button" className="dns-tool-header-session-action" onClick={accessLevel === 'public' ? onOpenLoginModal : onLogout}>
              {accessLevel === 'public' ? (lang === 'de' ? 'Anmelden' : lang === 'it' ? 'Accedi' : 'Login') : (lang === 'de' ? 'Abmelden' : lang === 'it' ? 'Esci' : 'Logout')}
            </button>
            <button type="button" aria-label={lang === 'de' ? 'Menü' : lang === 'it' ? 'Menu' : 'Menu'} aria-expanded={open} aria-controls="dns-portal-navigation" onClick={() => setOpen(!open)} className="dns-button dns-portal-mobile-toggle" data-variant="icon">{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
      </div>
    </header>
  );
};
