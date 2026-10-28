import React from 'react';
import type { NavigationTab, Language, AccessibilitySettings } from '../types';
import { ArrowRight, Code2, BookOpen } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: NavigationTab) => void;
  lang: Language;
  a11y?: AccessibilitySettings;
}

const copy = {
  it: { eyebrow: 'DOLOMITI NORDICSKI · PARTNER SERVICES', title: 'Partner Hub', intro: 'Uno spazio condiviso per le strutture partner: informazioni ufficiali, materiali e strumenti DNS.', primary: 'Attiva il tuo profilo', secondary: 'Esplora il Widget Creator', guide: 'Corporate Design' },
  de: { eyebrow: 'DOLOMITI NORDICSKI · PARTNERSERVICES', title: 'Partner Hub', intro: 'Der gemeinsame Bereich für Partnerbetriebe: offizielle Informationen, Materialien und DNS-Werkzeuge.', primary: 'Betriebsprofil aktivieren', secondary: 'Widget Creator entdecken', guide: 'Corporate Design' },
  en: { eyebrow: 'DOLOMITI NORDICSKI · PARTNER SERVICES', title: 'Partner Hub', intro: 'A shared home for partner properties: official information, brand assets and DNS tools.', primary: 'Activate your profile', secondary: 'Explore Widget Creator', guide: 'Corporate Design' },
};

export const Hero: React.FC<HeroProps> = ({ setActiveTab, lang }) => {
  const t = copy[lang];
  return <section className="dns-portal-hero" aria-labelledby="dns-portal-hero-title">
    <div className="dns-portal-container dns-portal-hero-inner">
      <div className="dns-portal-hero-copy">
        <p className="dns-portal-kicker">{t.eyebrow}</p>
        <h1 id="dns-portal-hero-title">{t.title}</h1>
        <p className="dns-portal-lead">{t.intro}</p>
        <div className="dns-portal-actions">
          <button type="button" data-variant="primary" className="dns-button" onClick={() => document.getElementById('dns-onboarding-title')?.scrollIntoView({ behavior: 'smooth' })}>{t.primary}<ArrowRight size={16}/></button>
          <button type="button" data-variant="secondary" className="dns-button" onClick={() => setActiveTab('widgets')}><Code2 size={16}/>{t.secondary}</button>
          <button type="button" data-variant="tertiary" className="dns-button" onClick={() => setActiveTab('corporate-design')}><BookOpen size={16}/>{t.guide}</button>
        </div>
      </div>
      <div className="dns-portal-hero-mark" aria-hidden="true">
        <span>DNS</span>
        <small>DOLOMITI NORDICSKI</small>
      </div>
    </div>
  </section>;
};
