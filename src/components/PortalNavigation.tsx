import React from 'react';
import type { Language, NavigationTab } from '../types';

interface Props {
  activeTab: NavigationTab;
  lang: Language;
  onNavigate: (tab: NavigationTab) => void;
}

const tabs = [
  ['home', { de: 'Start', it: 'Home', en: 'Home' }],
  ['vision', { de: 'Vision', it: 'Vision', en: 'Vision' }],
  ['corporate-design', { de: 'Corporate Design', it: 'Corporate Design', en: 'Corporate Design' }],
  ['quality-criteria', { de: 'Qualitätskriterien', it: 'Criteri qualità', en: 'Quality criteria' }],
  ['widgets', { de: 'Widget Creator', it: 'Widget Creator', en: 'Widget Creator' }],
  ['regions', { de: 'DNS Gebiete', it: 'Aree DNS', en: 'DNS areas' }],
  ['downloads', { de: 'Downloads', it: 'Download', en: 'Downloads' }],
  ['contacts', { de: 'Kontakt', it: 'Contatti', en: 'Contacts' }],
] as const;

/** Horizontal Foundation navigation: same shell/classes as DNS Workspace. */
export const PortalNavigation: React.FC<Props> = ({ activeTab, lang, onNavigate }) => (
  <nav id="dns-portal-navigation" data-dns-tool-nav className="dns-tab-nav" aria-label="Partner Hub">
    <div className="dns-tab-nav-inner">
      {tabs.map(([tab, labels]) => (
        <button
          type="button"
          key={tab}
          className={`dns-tab${activeTab === tab ? ' dns-tab-active' : ''}`}
          aria-current={activeTab === tab ? 'page' : undefined}
          onClick={() => onNavigate(tab)}
        >
          {labels[lang]}
        </button>
      ))}
    </div>
  </nav>
);
