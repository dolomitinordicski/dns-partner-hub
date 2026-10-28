import React, { useState } from 'react';
import { Language } from '../types';
import { PARTNER_BENEFITS } from '../data/portalData';
import { DNS_PARTNER_QUALITY_CRITERIA, DNS_PARTNER_QUALITY_SOURCE } from '@dolomitinordicski/dns-shared-data/partner-quality-criteria';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Utensils, 
  Ticket, 
  Info, 
  Shirt, 
  Sparkles,
  Send,
  Globe,
  Download,
  Megaphone,
  Check,
  ChevronRight,
  Gift
} from 'lucide-react';

interface QualityCriteriaSectionProps {
  lang: Language;
  initialTab?: 'benefits' | 'criteria' | 'application';
}

export const QualityCriteriaSection: React.FC<QualityCriteriaSectionProps> = ({ 
  lang, 
  initialTab = 'benefits' 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'benefits' | 'criteria' | 'application'>(initialTab);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleCriterion = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(i => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const getCriterionIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className="w-5 h-5 text-[var(--color-dns-light)]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[var(--color-dns-light)]" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[var(--color-dns-light)]" />;
      case 'Ticket': return <Ticket className="w-5 h-5 text-[var(--color-dns-light)]" />;
      case 'Globe': return <Globe className="w-5 h-5 text-[var(--color-dns-light)]" />;
      case 'Award': return <Award className="w-5 h-5 text-[var(--color-dns-light)]" />;
      case 'Info': return <Info className="w-5 h-5 text-[var(--color-dns-light)]" />;
      default: return <Shirt className="w-5 h-5 text-[var(--color-dns-light)]" />;
    }
  };

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ticket': return <Ticket className="w-6 h-6 text-[var(--color-dns-light)]" />;
      case 'Globe': return <Globe className="w-6 h-6 text-[var(--color-dns-light)]" />;
      case 'Download': return <Download className="w-6 h-6 text-[var(--color-dns-light)]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[var(--color-dns-light)]" />;
      case 'Megaphone': return <Megaphone className="w-6 h-6 text-[var(--color-dns-light)]" />;
      case 'Award': return <Award className="w-6 h-6 text-[var(--color-dns-light)]" />;
      default: return <Gift className="w-6 h-6 text-[var(--color-dns-light)]" />;
    }
  };

  const checkedCount = DNS_PARTNER_QUALITY_CRITERIA.filter(c => c.phase !== 'post-review' && checkedIds.includes(c.id)).length;
  const selfCheckCount = DNS_PARTNER_QUALITY_CRITERIA.filter(c => c.phase !== 'post-review').length;

  const openEmailDraft = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const value = (name: string) => String(fields.get(name) ?? '').trim();
    const subject = `DNS Partnerbetrieb / Alloggio partner – ${value('property')}`;
    const body = [
      `Betrieb / Struttura: ${value('property')}`,
      `Ort / Località: ${value('location')}`,
      `E-Mail: ${value('email')}`,
      `Telefon: ${value('phone')}`,
      `Anmerkungen / Note: ${value('notes')}`,
      '',
      'Selbsteinschätzung / Autovalutazione:',
      ...DNS_PARTNER_QUALITY_CRITERIA.filter(c => c.phase !== 'post-review').map(c =>
        `${checkedIds.includes(c.id) ? '[x]' : '[ ]'} ${c.title.de} / ${c.title.it}`
      ),
    ].join('\n');
    // Opens user's mail client. The portal does not send or persist contact details.
    window.location.href = `mailto:info@dolomitinordicski.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="py-12 bg-[var(--color-dns-primary-dark)] text-white min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-[var(--color-dns-mid)]/30 pb-6 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--color-dns-deep)] border border-[var(--color-dns-mid)]/50 text-[var(--color-dns-light)] text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-[var(--color-dns-light)]" />
            <span>
              {lang === 'it' && 'Standard Ufficiali & Vantaggi Esclusivi per gli Alloggi Partner'}
              {lang === 'de' && 'Offizielle Qualitätskriterien & Partnervorteile 2026'}
              {lang === 'en' && 'Official Quality Standards & Exclusive Partner Benefits'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'it' && 'Vantaggi Partner & Criteri di Qualità'}
            {lang === 'de' && 'Partnervorteile & Qualitätskriterien'}
            {lang === 'en' && 'Partner Benefits & Quality Standards'}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
            {lang === 'it' && 'Scopri tutti i vantaggi esclusivi riservati alle strutture convenzionate Dolomiti NordicSki e verifica la checklist dei criteri di qualità ufficiali per richiedere l\'accreditamento.'}
            {lang === 'de' && 'Entdecken Sie die exklusiven Vorteile für Partnerbetriebe und prüfen Sie die offizielle Qualitäts-Checkliste für die Zertifizierung.'}
            {lang === 'en' && 'Discover the exclusive benefits reserved for accredited partner hotels and check the official accreditation criteria.'}
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-[var(--color-dns-primary-dark)] rounded-2xl border border-[var(--color-dns-mid)]/40 shadow-lg">
          <button
            onClick={() => setActiveSubTab('benefits')}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeSubTab === 'benefits'
                ? 'bg-[var(--color-dns-deep)] text-[var(--color-dns-light)] border border-[var(--color-dns-light)]/50 shadow-md scale-[1.01]'
                : 'text-slate-300 hover:text-white hover:bg-[var(--color-dns-primary-dark)]'
            }`}
          >
            <Gift className="w-4 h-4 text-[var(--color-dns-light)]" />
            <span>
              {lang === 'de' && 'Partnervorteile (6 Säulen)'}
              {lang === 'it' && 'Vantaggi Partner (6 Pilastri)'}
              {lang === 'en' && 'Partner Benefits (6 Pillars)'}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('criteria')}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeSubTab === 'criteria'
                ? 'bg-[var(--color-dns-deep)] text-[var(--color-dns-light)] border border-[var(--color-dns-light)]/50 shadow-md scale-[1.01]'
                : 'text-slate-300 hover:text-white hover:bg-[var(--color-dns-primary-dark)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[var(--color-dns-light)]" />
            <span>
              {lang === 'de' && 'Qualitätskriterien Check'}
              {lang === 'it' && 'Checklist Criteri Qualità'}
              {lang === 'en' && 'Quality Criteria Checklist'}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('application')}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeSubTab === 'application'
                ? 'bg-[var(--color-dns-deep)] text-[var(--color-dns-light)] border border-[var(--color-dns-light)]/50 shadow-md scale-[1.01]'
                : 'text-slate-300 hover:text-white hover:bg-[var(--color-dns-primary-dark)]'
            }`}
          >
            <Send className="w-4 h-4 text-[var(--color-dns-light)]" />
            <span>
              {lang === 'de' && 'Zertifizierungsantrag'}
              {lang === 'it' && 'Richiesta Accreditamento'}
              {lang === 'en' && 'Accreditation Form'}
            </span>
          </button>
        </div>

        {/* TAB 1: PARTNERVORTEILE / BENEFITS */}
        {activeSubTab === 'benefits' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--color-dns-primary-dark)] p-6 rounded-2xl border border-[var(--color-dns-mid)]/30 shadow-xl">
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[var(--color-dns-light)]" />
                  <span>
                    {lang === 'de' && 'Warum Partner von Dolomiti NordicSki werden?'}
                    {lang === 'it' && 'Perché Diventare Partner Dolomiti NordicSki?'}
                    {lang === 'en' && 'Why Become a Dolomiti NordicSki Partner?'}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  {lang === 'de' && 'Als zertifizierter Partnerbetrieb profitieren Sie von direkten Buchungen, Marketingpaketen und exklusiven B2B-Services für das weltweit größte Langlaufkarussell.'}
                  {lang === 'it' && 'Come struttura accreditata benefici di visibilità diretta sul target appassionato, strumenti di vendita skipass in reception e kit di comunicazione gratuito.'}
                  {lang === 'en' && 'As an accredited accommodation partner, you gain direct visibility, guest ticket issuance tools, and official marketing assets.'}
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('application')}
                className="px-5 py-3 rounded-xl bg-[var(--color-dns-deep)] hover:bg-[var(--color-dns-deep)]/80 border border-[var(--color-dns-light)]/50 text-[var(--color-dns-light)] font-bold text-xs shrink-0 flex items-center space-x-2 transition-all shadow-lg hover:scale-105"
              >
                <span>{lang === 'it' ? 'Diventa Partner Ora' : 'Become Partner Now'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Benefits Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTNER_BENEFITS.map((b) => (
                <div
                  key={b.id}
                  className="bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/30 hover:border-[var(--color-dns-light)]/50 rounded-2xl p-6 space-y-4 shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/40 group-hover:scale-110 transition-transform">
                        {getBenefitIcon(b.icon)}
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[var(--color-dns-primary-dark)] text-[var(--color-dns-light)] border border-[var(--color-dns-mid)]/40">
                        {b.badge[lang]}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-white group-hover:text-[var(--color-dns-light)] transition-colors leading-snug">
                      {b.title[lang]}
                    </h4>

                    <p className="text-xs font-semibold text-[var(--color-dns-light)]/90">
                      {b.subtitle[lang]}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {b.description[lang]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--color-dns-mid)]/20 flex items-center justify-between text-[11px] font-bold text-[var(--color-dns-light)]">
                    <span className="flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Incluso nella Partnership</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: QUALITÄTSKRITERIEN / CRITERIA */}
        {activeSubTab === 'criteria' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--color-dns-mid)]/30 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[var(--color-dns-light)]" />
                    <span>
                      {lang === 'de' && 'Selbstbewertung Qualitätscheck'}
                      {lang === 'it' && 'Checklist di Autovalutazione Struttura'}
                      {lang === 'en' && 'Self-Assessment Quality Checklist'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'de' && 'Prüfen Sie die vorhandenen Leistungen. Dies ist eine Selbsteinschätzung, keine Zertifizierungsentscheidung:'}
                    {lang === 'it' && 'Indica i servizi disponibili: è un’autovalutazione, non una certificazione.'}
                    {lang === 'en' && 'Mark the services offered. This is self-assessment, not certification.'}
                  </p>
                </div>

                <div className="px-5 py-3 rounded-xl bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/40 flex items-center space-x-4 shrink-0">
                  <div>
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">
                      {lang === 'de' && 'Selbstcheck'}
                      {lang === 'it' && 'Autovalutazione'}
                      {lang === 'en' && 'Self-assessment'}
                    </span>
                    <span className="text-xl font-black text-[var(--color-dns-light)]">
                      {checkedCount} / {selfCheckCount}
                    </span>
                  </div>
                  <span className="rounded-md border border-[var(--color-dns-mid)] px-3 py-1 text-[11px] font-semibold text-[var(--color-dns-light)]">
                    {lang === 'de' ? 'Keine automatische Zertifizierung' : lang === 'it' ? 'Nessuna certificazione automatica' : 'Not an automatic certification'}
                  </span>
                </div>
              </div>

              <a href={DNS_PARTNER_QUALITY_SOURCE.url} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-dns-light)] underline underline-offset-4">
                {lang === 'de' ? 'Quelle: DNS Qualitätskriterien 2025, S. 8' : lang === 'it' ? 'Fonte: Criteri qualità DNS 2025, pag. 8' : 'Source: DNS Quality Criteria 2025, p. 8'}
              </a>

              <p className="text-xs text-slate-300">
                {lang === 'de' ? 'Die Kennzeichnung wird erst nach einer Prüfung durch DNS angebracht. Das Frühstückskriterium gilt nur für Unterkünfte mit Frühstück.' : lang === 'it' ? 'La targa DNS si espone soltanto dopo la verifica. La colazione sportiva si applica solo agli alloggi che offrono la colazione.' : 'The DNS plaque is displayed only after review. The breakfast criterion applies only where breakfast is served.'}
              </p>
              {/* Criteria Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DNS_PARTNER_QUALITY_CRITERIA.map((criterion) => {
                  const isChecked = checkedIds.includes(criterion.id);
                  return (
                    <button
                      type="button"
                      aria-pressed={isChecked}
                      disabled={criterion.phase === 'post-review'}
                      key={criterion.id}
                      onClick={() => toggleCriterion(criterion.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all flex items-start space-x-4 ${
                        isChecked
                          ? 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-light)] shadow-md'
                          : 'bg-[var(--color-dns-primary-dark)]/50 border-[var(--color-dns-mid)]/20 hover:border-[var(--color-dns-mid)]/60 opacity-80'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${
                          isChecked
                            ? 'bg-[var(--color-dns-deep)] border-[var(--color-dns-light)] text-[var(--color-dns-light)]'
                            : 'border-[var(--color-dns-mid)]/40 bg-[var(--color-dns-primary-dark)] text-transparent'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white flex items-center space-x-2">
                            {getCriterionIcon(criterion.icon)}
                            <span>{criterion.title[lang]}</span>
                          </span>
                          {criterion.phase === 'conditional' ? (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--color-dns-deep)] text-[var(--color-dns-light)] border border-[var(--color-dns-mid)]/50">
                              {lang === 'de' ? 'Bei Frühstück' : lang === 'it' ? 'Se offre colazione' : 'When breakfast is served'}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--color-dns-primary-dark)] text-slate-300 border border-[var(--color-dns-mid)]/30">
                              {criterion.phase === 'post-review' ? (lang === 'de' ? 'Nach DNS-Prüfung' : lang === 'it' ? 'Dopo verifica DNS' : 'After DNS review') : (lang === 'de' ? 'DNS-Kriterium' : lang === 'it' ? 'Criterio DNS' : 'DNS criterion')}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-light">
                          {criterion.description[lang]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Call to action to submit */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveSubTab('application')}
                  className="px-6 py-3 rounded-xl bg-[var(--color-dns-deep)] hover:bg-[var(--color-dns-deep)]/80 border border-[var(--color-dns-light)]/50 text-[var(--color-dns-light)] font-bold text-xs flex items-center space-x-2 transition-all shadow-lg cursor-pointer"
                >
                  <span>{lang === 'de' ? 'DNS für eine Prüfung kontaktieren' : lang === 'it' ? 'Contatta DNS per la verifica' : 'Contact DNS for review'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANTRAG ZERTIFIZIERUNG / APPLICATION */}
        {activeSubTab === 'application' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl mx-auto">
              <div className="border-b border-[var(--color-dns-mid)]/30 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Send className="w-5 h-5 text-[var(--color-dns-light)]" />
                  <span>
                    {lang === 'de' && 'Antrag auf Partner-Zertifizierung 2026'}
                    {lang === 'it' && 'Richiesta Accreditamento Struttura Partner 2026'}
                    {lang === 'en' && 'Partner Accreditation Application 2026'}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {lang === 'de' && 'Füllen Sie das Formular aus, um die offizielle Zertifizierung zu beantragen.'}
                  {lang === 'it' && 'Compila il modulo per richiedere l\'accreditamento ufficiale e l\'inserimento sul portale Dolomiti NordicSki.'}
                  {lang === 'en' && 'Fill out the form to request official accreditation on the Dolomiti NordicSki portal.'}
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-light)]/50 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[var(--color-dns-light)] mx-auto animate-bounce" />
                  <h4 className="font-extrabold text-lg text-[var(--color-dns-light)]">
                    {lang === 'de' && 'Anforderung erfolgreich gesendet!'}
                    {lang === 'it' && 'Richiesta Inviata con Successo!'}
                    {lang === 'en' && 'Application Sent Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-200 max-w-md mx-auto leading-relaxed">
                    {lang === 'de' && 'Das Hauptbüro Dolomiti NordicSki wird Ihre Daten prüfen und sich innerhalb von 48 Stunden bei Ihnen melden.'}
                    {lang === 'it' && 'L\'Ufficio Centrale Dolomiti NordicSki verificherà i dati della tua struttura e ti contatterà entro 48 ore lavorative.'}
                    {lang === 'en' && 'The Dolomiti NordicSki central office will review your application and contact you within 48 working hours.'}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-dns-deep)] text-xs font-bold text-[var(--color-dns-light)] border border-[var(--color-dns-light)]/40"
                  >
                    {lang === 'it' ? 'Invia Un\'Altra Richiesta' : 'Send Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-200">
                        {lang === 'de' && 'Name des Beherbergungsbetriebs'}
                        {lang === 'it' && 'Nome Struttura Ricettiva'}
                        {lang === 'en' && 'Property / Accommodation Name'}
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Hotel Alpine Resort"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/40 text-xs font-medium text-white focus:border-[var(--color-dns-light)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-200">
                        {lang === 'de' && 'Ort & Langlaufregion'}
                        {lang === 'it' && 'Località & Area Fondo'}
                        {lang === 'en' && 'Location & Nordic Region'}
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Toblach / 3 Zinnen"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/40 text-xs font-medium text-white focus:border-[var(--color-dns-light)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-200">
                        {lang === 'de' && 'Kontakt E-Mail'}
                        {lang === 'it' && 'Email di Contatto'}
                        {lang === 'en' && 'Contact Email'}
                      </label>
                      <input 
                        type="email" 
                        required 
                        placeholder="info@hotel-alpine.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/40 text-xs font-medium text-white focus:border-[var(--color-dns-light)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-200">
                        {lang === 'de' && 'Telefon Rezeption'}
                        {lang === 'it' && 'Telefono Reception'}
                        {lang === 'en' && 'Reception Phone'}
                      </label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+39 0474 123456"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/40 text-xs font-medium text-white focus:border-[var(--color-dns-light)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">
                      {lang === 'de' && 'Anmerkungen oder besondere Anfragen'}
                      {lang === 'it' && 'Note o Richieste Particolari'}
                      {lang === 'en' && 'Notes or Special Requests'}
                    </label>
                    <textarea 
                      rows={3}
                      placeholder={lang === 'de' ? 'Beschreiben Sie Ihre Langlaufeinrichtungen...' : lang === 'it' ? 'Descrivi brevemente i servizi dedicati allo sci di fondo...' : 'Briefly describe your Nordic skiing facilities...'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-dns-primary-dark)] border border-[var(--color-dns-mid)]/40 text-xs font-medium text-white focus:border-[var(--color-dns-light)] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[var(--color-dns-deep)] hover:bg-[var(--color-dns-deep)]/80 border border-[var(--color-dns-light)]/40 text-[var(--color-dns-light)] font-bold text-sm shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    {lang === 'de' && 'Zertifizierungsantrag absenden'}
                    {lang === 'it' && 'Invia Richiesta di Accreditamento'}
                    {lang === 'en' && 'Submit Accreditation Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
