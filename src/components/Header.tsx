import React from 'react';
import type { NavigationTab, Language, AccessibilitySettings, AccessLevel } from '../types';
import { DNS_LOGO_BASE64 } from '../data/portalData';
import { Accessibility, Menu, X } from 'lucide-react';

interface HeaderProps {
 activeTab: NavigationTab;
 setActiveTab:(tab:NavigationTab)=>void;
 lang:Language; setLang:(lang:Language)=>void;
 accessLevel:AccessLevel; partnerName:string; partnerCode:string;
 onOpenLoginModal:()=>void; onLogout:()=>void;
 a11y:AccessibilitySettings;
 setA11y:React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
 onOpenA11yModal:()=>void;
 onSelectDemoRole?:(role:AccessLevel)=>void;
}
export const Header:React.FC<HeaderProps> = ({lang,setLang,accessLevel,onOpenLoginModal,onLogout,onOpenA11yModal}) => {
 const [open,setOpen]=React.useState(false);
 React.useEffect(()=>{
  const close=()=>setOpen(false);
  window.addEventListener('dns:portal-navigate',close);
  return()=>window.removeEventListener('dns:portal-navigate',close);
 },[]);
 return <>
  <header data-dns-tool-header className="dns-card" style={{position:'sticky',top:0,zIndex:50,borderRadius:0,borderBottom:'1px solid var(--color-dns-border,rgba(65,116,131,.20))'}}>
   <div style={{maxWidth:1440,margin:'auto',padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
    <div style={{display:'flex',alignItems:'center',gap:12,minWidth:0}}>
     <img src={DNS_LOGO_BASE64} alt="Dolomiti NordicSki" style={{height:42,width:'auto'}}/>
     <div><strong style={{fontFamily:'var(--font-display, sans-serif)',color:'var(--color-dns-deep,#0D4D5E)'}}>Dolomiti NordicSki</strong><div className="dns-kicker">Partner Hub</div></div>
    </div>
    <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap',justifyContent:'flex-end'}}>
     {(['de','it','en'] as Language[]).map(l=><button key={l} type="button" className="dns-button" data-variant={lang===l?'primary':'tertiary'} aria-pressed={lang===l} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}
     <button type="button" className="dns-button" data-variant="icon" aria-label={lang==='de'?'Barrierefreiheit':lang==='it'?'Accessibilità':'Accessibility'} onClick={onOpenA11yModal}><Accessibility size={18}/></button>
     <button type="button" className="dns-button" data-variant="secondary" onClick={accessLevel==='public'?onOpenLoginModal:onLogout}>{accessLevel==='public'?(lang==='de'?'Anmelden':lang==='it'?'Accedi':'Login'):(lang==='de'?'Abmelden':lang==='it'?'Esci':'Logout')}</button>
     <button type="button" aria-label="Menu" aria-expanded={open} aria-controls="dns-portal-navigation" onClick={()=>setOpen(!open)} className="dns-button dns-portal-mobile-toggle" data-variant="icon">{open?<X size={18}/>:<Menu size={18}/>}</button>
    </div>
   </div>
  </header>
  <style>{`@media(min-width:1024px){.dns-portal-mobile-toggle{display:none!important}}@media(max-width:1023px){[data-dns-app-nav][data-dns-open="false"]{display:none!important}}`}</style>
  <span hidden data-dns-portal-menu-open={open?'true':'false'} id="dns-portal-menu-state"/>
 </>;
};
