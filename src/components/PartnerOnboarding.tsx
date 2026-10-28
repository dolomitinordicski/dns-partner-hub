import React, { useState } from 'react';
import type { Language } from '../types';

type Stage = 'start' | 'profile' | 'widget';
const copy = {
  it: { heading:'Attiva il tuo DNS Partner Hub',intro:'Conferma il profilo della tua struttura e prepara il widget DNS.',start:'Attivazione account',profile:'Verifica dati',widget:'Crea widget',email:'Email della struttura registrata presso DNS',continue:'Continua',name:'Nome della struttura',beds:'Posti letto autorizzati',rooms:'Camere / unità',opening:'Apertura',annual:'Annuale',seasonal:'Stagionale',unknown:'Da confermare',next:'Vai al Widget Creator',back:'Indietro',notice:'Anteprima del percorso. Nessun dato viene inviato o salvato. La verifica email e l’importazione saranno abilitate dopo il collegamento al backend sicuro.',historical:'Le risposte del questionario storico saranno mostrate qui per conferma, dopo la riconciliazione DNS.',widgetText:'Il prossimo passaggio sarà creare il widget DNS e ottenere il codice da installare sul sito. La certificazione sarà verificata separatamente.' },
  de: { heading:'DNS Partner Hub aktivieren',intro:'Bestätigt die Betriebsdaten und bereitet euer DNS-Widget vor.',start:'Konto aktivieren',profile:'Daten prüfen',widget:'Widget erstellen',email:'Bei DNS registrierte E-Mail-Adresse',continue:'Weiter',name:'Name des Betriebs',beds:'Genehmigte Betten',rooms:'Zimmer / Einheiten',opening:'Öffnungszeiten',annual:'Ganzjährig',seasonal:'Saisonal',unknown:'Noch zu bestätigen',next:'Zum Widget Creator',back:'Zurück',notice:'Vorschau des Ablaufs. Es werden keine Daten gespeichert oder versendet. E-Mail-Verifizierung und Datenimport folgen nach sicherer Backend-Anbindung.',historical:'Frühere Fragebogenantworten werden nach geprüfter Zuordnung hier zur Bestätigung angezeigt.',widgetText:'Anschließend erstellt ihr das DNS-Widget und erhaltet den Einbettungscode. Die Zertifizierung wird separat geprüft.' },
  en: { heading:'Activate your DNS Partner Hub',intro:'Confirm your property profile and prepare your DNS widget.',start:'Activate account',profile:'Check details',widget:'Create widget',email:'Email registered with DNS',continue:'Continue',name:'Property name',beds:'Licensed beds',rooms:'Rooms / units',opening:'Opening',annual:'Year-round',seasonal:'Seasonal',unknown:'To be confirmed',next:'Open Widget Creator',back:'Back',notice:'Workflow preview only. Nothing is saved or sent. Email verification and historical import will be enabled after secure backend integration.',historical:'Historic questionnaire responses will appear here for confirmation once DNS has matched them to the property.',widgetText:'Next, create the DNS widget and obtain its website embed code. Certification eligibility is checked separately.' },
} as const;

export function PartnerOnboarding({ lang, onWidget }: { lang: Language; onWidget: () => void }) {
  const t=copy[lang];
  const [stage,setStage]=useState<Stage>('start');
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [beds,setBeds]=useState('');
  const [rooms,setRooms]=useState('');
  const [opening,setOpening]=useState('unknown');
  const step=stage==='start'?0:stage==='profile'?1:2;
  const stages=[t.start,t.profile,t.widget];
  const validBeds=beds==='' || (/^\d+$/.test(beds) && Number.isSafeInteger(Number(beds)));
  const validRooms=rooms==='' || (/^\d+$/.test(rooms) && Number.isSafeInteger(Number(rooms)));
  return <section aria-labelledby="dns-onboarding-title" className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
    <div className="bg-white text-[#083845] rounded-2xl border border-[#AAD0D1] p-6 sm:p-8 space-y-6 shadow-sm">
      <div><p className="text-xs uppercase tracking-widest font-bold text-[#417483]">Dolomiti NordicSki · Partner Hub</p><h2 id="dns-onboarding-title" className="text-2xl font-extrabold">{t.heading}</h2><p className="mt-2">{t.intro}</p></div>
      <ol className="grid grid-cols-3 gap-2" aria-label="Progress">{stages.map((title,i)=><li key={title} className={'text-xs sm:text-sm border rounded-lg p-3 '+(i===step?'bg-[#AAD0D1] border-[#417483] font-bold':'border-slate-200')}>{i+1}. {title}</li>)}</ol>
      {stage==='start' && <div className="space-y-3"><label className="block font-semibold" htmlFor="dns-activation-email">{t.email}</label><input id="dns-activation-email" type="email" autoComplete="email" className="dns-input w-full" value={email} onChange={e=>setEmail(e.target.value)}/><button type="button" disabled={!/^\S+@\S+\.\S+$/.test(email)} onClick={()=>setStage('profile')} className="dns-button" data-variant="primary">{t.continue}</button></div>}
      {stage==='profile' && <div className="space-y-4">
        <p className="rounded-lg bg-[#E8F4F6] p-3 text-sm">{t.historical}</p>
        <label className="block">{t.name}<input className="dns-input mt-1 block w-full" value={name} onChange={e=>setName(e.target.value)}/></label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><label>{t.beds}<input type="number" min="0" step="1" className="dns-input mt-1 block w-full" value={beds} onChange={e=>setBeds(e.target.value)}/></label><label>{t.rooms}<input type="number" min="0" step="1" className="dns-input mt-1 block w-full" value={rooms} onChange={e=>setRooms(e.target.value)}/></label></div>
        <label className="block">{t.opening}<select className="dns-select mt-1 block w-full" value={opening} onChange={e=>setOpening(e.target.value)}><option value="unknown">{t.unknown}</option><option value="annual">{t.annual}</option><option value="seasonal">{t.seasonal}</option></select></label>
        <div className="flex gap-3"><button type="button" onClick={()=>setStage('start')} className="dns-button" data-variant="secondary">{t.back}</button><button type="button" disabled={!name.trim() || !validBeds || !validRooms} onClick={()=>setStage('widget')} className="dns-button" data-variant="primary">{t.continue}</button></div>
      </div>}
      {stage==='widget' && <div className="space-y-4"><p>{t.widgetText}</p><div className="flex gap-3"><button type="button" onClick={()=>setStage('profile')} className="dns-button" data-variant="secondary">{t.back}</button><button type="button" onClick={onWidget} className="dns-button" data-variant="primary">{t.next}</button></div></div>}
      <p role="status" className="text-xs text-[#417483] border-t pt-4">{t.notice}</p>
    </div>
  </section>;
}
