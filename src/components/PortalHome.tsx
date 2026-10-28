import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { Language, NavigationTab } from '../types';
import { PartnerOnboarding } from './PartnerOnboarding';

interface Props { lang: Language; onNavigate: (tab: NavigationTab) => void; }
const services = [
 ['corporate-design',{de:'Corporate Design',it:'Corporate Design',en:'Corporate Design'}],
 ['widgets',{de:'Widget Creator',it:'Widget Creator',en:'Widget Creator'}],
 ['quality-criteria',{de:'Qualitätskriterien',it:'Criteri di qualità',en:'Quality criteria'}],
 ['downloads',{de:'Downloads',it:'Download',en:'Downloads'}],
] as const;
export const PortalHome: React.FC<Props> = ({lang,onNavigate}) => (
 <div className="space-y-8 py-8">
  <header className="space-y-2">
   <p className="dns-kicker">Dolomiti NordicSki</p>
   <h1 className="text-2xl font-bold" style={{color:'var(--color-dns-deep,#0D4D5E)',fontFamily:'var(--dns-font-heading,system-ui)'}}>Partner Hub</h1>
   <p style={{color:'var(--color-dns-mid,#417483)'}}>{lang==='de'?'Informationen und Werkzeuge für unsere Partnerbetriebe.':lang==='it'?'Informazioni e strumenti per le strutture partner.':'Information and tools for our partner properties.'}</p>
  </header>
  <section className="dns-card p-5 sm:p-8" aria-label="Partner onboarding">
   <PartnerOnboarding lang={lang} onWidget={()=>onNavigate('widgets')}/>
  </section>
  <section className="space-y-4" aria-label="Partner services">
   <h2 className="dns-section-title">{lang==='de'?'Partner-Services':lang==='it'?'Servizi partner':'Partner services'}</h2>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {services.map(([tab,label])=>(
     <button key={tab} type="button" className="dns-card p-5 text-left flex items-center justify-between gap-3" style={{border:'1px solid var(--color-dns-border,rgba(65,116,131,.20))',color:'var(--color-dns-deep,#0D4D5E)'}} onClick={()=>onNavigate(tab)}>
      <span className="font-semibold">{label[lang]}</span><ChevronRight size={18} aria-hidden="true"/>
     </button>
    ))}
   </div>
  </section>
 </div>
);
