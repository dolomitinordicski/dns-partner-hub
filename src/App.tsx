import React from 'react';
import { DNS_DEFAULT_UI_LANGUAGE, DNS_UI_LANGUAGE_STORAGE_KEY, resolveDNSLanguagePreference } from '@dolomitinordicski/dns-shared-data/localization';
import { DNS_LOGO_BASE64 } from './data/portalData';
import type { Language } from './types';
import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data/design-system';

// Foundation owns the shell, buttons, cards, focus and accessibility presentation.
// Legacy modules are deliberately disconnected while their screens are rebuilt.
const screens = ['home','onboarding','widgets','corporate-design','quality-criteria','downloads','regions','contacts'] as const;
type Screen = (typeof screens)[number];
const names: Record<Language,Record<Screen,string>> = {
 de:{home:'Übersicht',onboarding:'Partnerprofil',widgets:'Widget Creator', 'corporate-design':'Corporate Design','quality-criteria':'Qualitätskriterien',downloads:'Downloads',regions:'DNS Gebiete',contacts:'Kontakt'},
 it:{home:'Panoramica',onboarding:'Profilo partner',widgets:'Widget Creator','corporate-design':'Corporate Design','quality-criteria':'Criteri di qualità',downloads:'Download',regions:'Aree DNS',contacts:'Contatti'},
 en:{home:'Overview',onboarding:'Partner profile',widgets:'Widget Creator','corporate-design':'Corporate Design','quality-criteria':'Quality criteria',downloads:'Downloads',regions:'DNS areas',contacts:'Contact'}
};
function languagePreference():Language {
 try { const value=localStorage.getItem(DNS_UI_LANGUAGE_STORAGE_KEY);return value==='en'?'en':resolveDNSLanguagePreference({stored:value}) as Language; }
 catch { return DNS_DEFAULT_UI_LANGUAGE as Language; }
}
const headerTokens = DNS_DESIGN_SYSTEM.header;

export default function App() {
 const [lang,setLang]=React.useState<Language>(languagePreference);
 const [active,setActive]=React.useState<Screen>('home');
 const [drawer,setDrawer]=React.useState(false);
 React.useEffect(()=>{document.documentElement.lang=lang;try{localStorage.setItem(DNS_UI_LANGUAGE_STORAGE_KEY,lang)}catch{};document.dispatchEvent(new CustomEvent('dns:portal-language',{detail:{language:lang}}));},[lang]);
 React.useEffect(()=>{document.querySelector('[data-dns-app-nav]')?.setAttribute('data-dns-open',String(drawer));},[drawer]);
 const navigate=(screen:Screen)=>{setActive(screen);setDrawer(false);window.scrollTo({top:0,behavior:'smooth'});};
 return <div style={{minHeight:'100vh',background:'var(--color-dns-background,#F4F8F9)',color:'var(--color-dns-deep,#0D4D5E)'}}>
   <header data-dns-tool-header className="dns-tool-header-shell" style={{position:'sticky',top:0,zIndex:30,background:headerTokens.background,color:headerTokens.titleColor,borderBottom:'1px solid var(--color-dns-border,rgba(65,116,131,.20))'}}>
    <div style={{display:'flex',alignItems:'center',gap:12,justifyContent:'space-between',padding:'12px var(--dns-shell-padding-x)',maxWidth:1440,margin:'auto',flexWrap:'wrap'}}>
     <button type="button" onClick={()=>navigate('home')} className="dns-tool-header-brand" aria-label="Dolomiti NordicSki Partner Hub" style={{display:'flex',alignItems:'center',gap:12,background:'transparent',color:'inherit',border:0,cursor:'pointer'}}>
       <img src={DNS_LOGO_BASE64} alt="" style={{height:40,width:'auto'}}/><span style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}><strong className="dns-tool-header-title" style={{color:headerTokens.titleColor}}>Dolomiti NordicSki</strong><span className="dns-tool-header-subtitle" style={{color:headerTokens.subtitleColor}}>Partner Hub</span></span>
     </button>
     <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
      {(['de','it','en'] as Language[]).map(l=><button key={l} type="button" className="dns-button" data-variant={lang===l?'primary':'tertiary'} aria-pressed={lang===l} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}
      <button type="button" className="dns-button" data-variant="secondary" onClick={()=>document.dispatchEvent(new Event('dns:open-accessibility'))} aria-label={lang==='de'?'Barrierefreiheit':lang==='it'?'Accessibilità':'Accessibility'}>Aa</button>
      <button type="button" className="dns-button" data-variant="secondary" aria-controls="dns-portal-navigation" aria-expanded={drawer} onClick={()=>setDrawer(!drawer)}>☰</button>
     </div>
    </div>
   </header>
   <div data-dns-portal-layout>
    <nav id="dns-portal-navigation" data-dns-app-nav data-dns-open={String(drawer)} aria-label="Partner Hub" className="dns-card" style={{borderRadius:0,padding:16}}>
     <div style={{display:'grid',gap:8}}>
      {screens.map(screen=><button type="button" key={screen} className="dns-button" data-variant={active===screen?'primary':'tertiary'} aria-current={active===screen?'page':undefined} onClick={()=>navigate(screen)} style={{justifyContent:'flex-start'}}>{names[lang][screen]}</button>)}
     </div>
    </nav>
    <main data-dns-shell-main style={{paddingBlock:32,minWidth:0}}>
     <p className="dns-kicker">Dolomiti NordicSki · Partner Hub</p>
     <h1 style={{fontFamily:'var(--font-display,"Be Vietnam Pro",sans-serif)',fontSize:'clamp(24px,3vw,36px)',fontWeight:700,margin:'12px 0'}}>{names[lang][active]}</h1>
     {active==='home'?<section style={{display:'grid',gap:16}}>
       <p>{lang==='de'?'Der gemeinsame Zugang zu den DNS Partner-Services.':lang==='it'?'Accesso comune ai servizi DNS per i partner.':'Shared access to DNS partner services.'}</p>
       <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:12}}>
        {screens.filter(x=>x!=='home').map(screen=><button type="button" key={screen} className="dns-card" style={{textAlign:'left',padding:20,border:'1px solid var(--color-dns-border,rgba(65,116,131,.20))',color:'inherit'}} onClick={()=>navigate(screen)}><strong>{names[lang][screen]}</strong></button>)}
       </div>
      </section>:<section className="dns-card" style={{padding:24}}>
       <p>{lang==='de'?'Dieses Modul wird neu aufgebaut und mit DNS Core verbunden.':lang==='it'?'Questo modulo sarà ricostruito con Foundation e collegato a DNS Core.':'This module will be rebuilt with Foundation and connected to DNS Core.'}</p>
      </section>}
    </main>
   </div>
   <footer data-dns-tool-footer style={{padding:20,borderTop:'1px solid var(--color-dns-border,rgba(65,116,131,.20))'}}>Dolomiti NordicSki · Partner Hub</footer>
 </div>;
}
