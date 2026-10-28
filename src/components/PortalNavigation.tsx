import React from 'react';
import type { Language, NavigationTab } from '../types';

interface Props {
 activeTab: NavigationTab;
 lang: Language;
 onNavigate: (tab: NavigationTab) => void;
}

const tabs = [
 ['home',{de:'Start',it:'Home',en:'Home'}],
 ['vision',{de:'Vision',it:'Vision',en:'Vision'}],
 ['corporate-design',{de:'Corporate Design',it:'Corporate Design',en:'Corporate Design'}],
 ['quality-criteria',{de:'Qualitätskriterien',it:'Criteri di qualità',en:'Quality criteria'}],
 ['widgets',{de:'Widget Creator',it:'Widget Creator',en:'Widget Creator'}],
 ['regions',{de:'DNS Gebiete',it:'Aree DNS',en:'DNS areas'}],
 ['downloads',{de:'Downloads',it:'Download',en:'Downloads'}],
 ['contacts',{de:'Kontakt',it:'Contatti',en:'Contacts'}],
] as const;

export const PortalNavigation: React.FC<Props> = ({activeTab,lang,onNavigate}) => (
 <nav id="dns-portal-navigation" data-dns-app-nav data-dns-open="false" aria-label="Partner Hub" className="dns-card" style={{borderRadius:0,padding:'20px 12px',display:'flex',flexDirection:'column',gap:4}}>
  {tabs.map(([tab,labels])=><button type="button" key={tab} className="dns-button" data-variant={activeTab===tab?'primary':'tertiary'} aria-current={activeTab===tab?'page':undefined} style={{justifyContent:'flex-start',fontSize:12}} onClick={()=>onNavigate(tab)}>{labels[lang]}</button>)}
 </nav>
);
