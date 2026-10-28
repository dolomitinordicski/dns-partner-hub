import React from 'react';
import type { NavigationTab, Language, AccessibilitySettings, AccessLevel } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { Accessibility, Menu, X, LogIn, Moon, Sun } from 'lucide-react';

type Props = {
 activeTab: NavigationTab; setActiveTab:(tab:NavigationTab)=>void; lang:Language; setLang:(lang:Language)=>void;
 accessLevel:AccessLevel; partnerName:string; partnerCode:string;
 onOpenLoginModal:()=>void; onLogout:()=>void; a11y:AccessibilitySettings;
 setA11y:React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
 onOpenA11yModal:()=>void; onSelectDemoRole?:(role:AccessLevel)=>void;
};
const labels: Record<Language, {home:string; vision:string; brand:string; quality:string; widget:string; regions:string; downloads:string; contacts:string; login:string; a11y:string; menu:string}> = {
 it:{home:'Home',vision:'Vision',brand:'Corporate Design',quality:'Criteri di qualità',widget:'Widget Creator',regions:'Aree DNS',downloads:'Download',contacts:'Contatti',login:'Accesso partner',a11y:'Accessibilità',menu:'Apri menu'},
 de:{home:'Start',vision:'Vision',brand:'Corporate Design',quality:'Qualitätskriterien',widget:'Widget Creator',regions:'DNS Gebiete',downloads:'Downloads',contacts:'Kontakt',login:'Partnerzugang',a11y:'Barrierefreiheit',menu:'Menü öffnen'},
 en:{home:'Home',vision:'Vision',brand:'Corporate Design',quality:'Quality criteria',widget:'Widget Creator',regions:'DNS areas',downloads:'Downloads',contacts:'Contacts',login:'Partner login',a11y:'Accessibility',menu:'Open menu'}
};
export const Header: React.FC<Props> = ({activeTab,setActiveTab,lang,setLang,accessLevel,onOpenLoginModal,onLogout,a11y,setA11y,onOpenA11yModal}) => {
 const [open,setOpen]=React.useState(false);
 const t=labels[lang];
 const items: {id:NavigationTab;label:string}[]=[
  {id:'home',label:t.home},{id:'vision',label:t.vision},{id:'corporate-design',label:t.brand},
  {id:'quality-criteria',label:t.quality},{id:'widgets',label:t.widget},{id:'regions',label:t.regions},
  {id:'downloads',label:t.downloads},{id:'contacts',label:t.contacts}
 ];
 const navigate=(id:NavigationTab)=>{setActiveTab(id);setOpen(false);window.scrollTo({top:0,behavior:'smooth'});};
 return <header className="dns-portal-header" data-dns-tool-header>
   <div className="dns-portal-header-inner">
    <button className="dns-portal-brand" type="button" onClick={()=>navigate('home')} aria-label="Dolomiti NordicSki · Partner Hub">
      <img src={DNS_LOGO_BASE64} alt="" className="dns-portal-brand-logo"/>
      <span className="dns-portal-brand-title"><strong>DOLOMITI NORDICSKI</strong><small>PARTNER HUB</small></span>
    </button>
    <nav className="dns-portal-nav" aria-label="Partner Hub" data-dns-tool-nav>
      {items.map(item=><button type="button" key={item.id} onClick={()=>navigate(item.id)} aria-current={activeTab===item.id?'page':undefined} className={'dns-portal-nav-item'+(activeTab===item.id?' is-active':'')}>{item.label}</button>)}
    </nav>
    <div className="dns-portal-utilities">
     <div className="dns-portal-languages" role="group" aria-label="Language">
      {(['de','it','en'] as Language[]).map(l=><button type="button" key={l} aria-pressed={lang===l} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}
     </div>
     <button type="button" className="dns-portal-icon-button" onClick={()=>setA11y(prev=>({...prev,theme:prev.theme==='light'?'dark':'light'}))} aria-label={a11y.theme==='light'?'Dark mode':'Light mode'}>{a11y.theme==='light'?<Moon size={18}/>:<Sun size={18}/>}</button>
     <button type="button" className="dns-portal-icon-button" onClick={onOpenA11yModal} aria-label={t.a11y}><Accessibility size={18}/></button>
     <button type="button" className="dns-portal-login" onClick={accessLevel==='public'?onOpenLoginModal:onLogout}><LogIn size={16}/><span>{accessLevel==='public'?t.login:lang==='de'?'Abmelden':lang==='it'?'Esci':'Sign out'}</span></button>
     <button type="button" className="dns-portal-menu-button" aria-expanded={open} aria-controls="dns-portal-mobile-nav" aria-label={t.menu} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
    </div>
   </div>
   {open&&<nav id="dns-portal-mobile-nav" className="dns-portal-mobile-nav" aria-label="Mobile Partner Hub">
    {items.map(item=><button type="button" key={item.id} onClick={()=>navigate(item.id)} aria-current={activeTab===item.id?'page':undefined}>{item.label}</button>)}
   </nav>}
 </header>;
};
