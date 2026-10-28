import React, { useState } from 'react';
import { Language, AccessLevel } from '../types';
import { NORDIC_REGIONS } from '../data/portalData';
import { OFFICIAL_PALETTES, createWidgetEmbed, type WidgetThemePreset } from './widget-creator/embedModel';
import { WidgetPreview } from './widget-creator/WidgetPreview';
import { 
  Code, 
  Copy, 
  Check, 
  Sparkles, 
  CloudSnow, 
  Ticket, 
  Sliders,
  Sun,
  Lock,
  Layers,
  Palette,
  Globe,
  Award
} from 'lucide-react';

interface WidgetCreatorProps {
  lang: Language;
  accessLevel?: AccessLevel;
}

export const WidgetCreator: React.FC<WidgetCreatorProps> = ({ lang, accessLevel = 'public' }) => {
  // No official certified seal until server-authorized widget entitlement exists.
  const isPartner = false;

  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [widgetLang, setWidgetLang] = useState<Language>(lang);
  const [themePreset, setThemePreset] = useState<WidgetThemePreset>('dns-primary');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Content toggles state
  const [includeTrails, setIncludeTrails] = useState<boolean>(true);
  const [includeWeather, setIncludeWeather] = useState<boolean>(true);
  const [includePrices, setIncludePrices] = useState<boolean>(isPartner ? true : false);

  const includeBadge = false; // Fail-closed: role selected in the client is not certification.

  const regionName = selectedRegion === 'all' 
    ? (widgetLang === 'it' ? 'Tutte le 8 Aree Dolomiti NordicSki' : widgetLang === 'de' ? 'Alle 8 Regionen' : 'All 8 Regions')
    : NORDIC_REGIONS.find(r => r.id === selectedRegion)?.name || 'Dolomiti NordicSki';

  const activePalette = OFFICIAL_PALETTES.find(p => p.id === themePreset) || OFFICIAL_PALETTES[0];
  const currentBgColor = activePalette.color;
  const isLight = !!activePalette.isLight;

  const { iframeSrc, iframeHeight, embedCode } = createWidgetEmbed({
    selectedRegion, widgetLang, themePreset, backgroundColor: currentBgColor,
    includeTrails, includeWeather, includePrices, includeBadge
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="py-10 bg-[#052832] text-white space-y-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#417483]/30 pb-6 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none bg-[#0D4D5E] border border-[#417483]/50 text-[#AAD0D1] text-xs font-bold uppercase tracking-wider">
            <Code className="w-3.5 h-3.5 text-[#AAD0D1]" />
            <span>
              {isPartner
                ? (lang === 'de' ? 'Offizielles Partner-Widget für Hotel-Websites' : lang === 'it' ? 'Widget Ufficiale Struttura Partner Hotel' : 'Official Partner Hotel Widget')
                : (lang === 'de' ? 'Kostenloses Website-Widget' : lang === 'it' ? 'Widget Unificato per il tuo Sito Web' : 'Unified Website Widget')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isPartner
              ? (lang === 'de' ? 'Partner Hotel-Widget Generator' : lang === 'it' ? 'Generatore Widget Partner Hotel' : 'Partner Hotel Widget Builder')
              : (lang === 'de' ? 'Dolomiti NordicSki Widget Generator' : lang === 'it' ? 'Generatore Widget Unificato' : 'Unified Widget Builder')}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl font-light">
            {isPartner ? (
              lang === 'de' 
                ? 'Erstellen Sie Ihr maßgeschneidertes Hotel-Widget mit kantigem Alpin-Design. Enthält das exklusive Partner-Siegel 2026, den Live-Loipenstatus, Wetter und Tarife.'
                : lang === 'it'
                ? 'Crea il tuo widget personalizzato per la tua struttura con un elegante design alpino a bordi netti. Include il bollino d\'eccellenza partner 2026, lo stato piste, il meteo ed i prezzi.'
                : 'Build your customized hotel widget with crisp sharp alpine aesthetics. Features the 2026 partner excellence badge, live trail report, weather, and tariffs.'
            ) : (
              lang === 'de'
                ? 'Erstellen Sie ein modulares Website-Widget in den offiziellen Dolomiti NordicSki Farben. Wählen Sie die Sprache (ITA, DE, EN) und die gewünschten Module.'
                : lang === 'it'
                ? 'Crea un widget unico nelle quattro palette ufficiali Dolomiti NordicSki. Seleziona la lingua (ITA, DE, EN) e configura i moduli da mostrare.'
                : 'Build a unified widget in the official Dolomiti NordicSki palettes. Choose the widget language (ITA, DE, EN) and active content modules.'
            )}
          </p>
        </div>

        {/* Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-[#083845] border border-[#417483]/40 rounded-none p-6 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-2 border-b border-[#417483]/30 pb-4">
              <Sliders className="w-5 h-5 text-[#AAD0D1]" />
              <h3 className="font-extrabold text-lg text-white uppercase tracking-wider">
                {lang === 'de' && 'Widget konfigurieren'}
                {lang === 'it' && 'Configura Widget'}
                {lang === 'en' && 'Configure Widget'}
              </h3>
            </div>

            {/* 1. Language Switcher (ITA, DE, EN) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center space-x-1.5 uppercase tracking-wider text-[#AAD0D1]">
                  <Globe className="w-4 h-4" />
                  <span>
                    {lang === 'de' && 'Widget-Sprache:'}
                    {lang === 'it' && 'Lingua del Widget:'}
                    {lang === 'en' && 'Widget Language:'}
                  </span>
                </span>
                <span className="text-[10px] text-[#AAD0D1] font-mono font-bold uppercase">
                  {widgetLang.toUpperCase()}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: 'it', label: 'ITA', name: 'Italiano' },
                  { code: 'de', label: 'DEU', name: 'Deutsch' },
                  { code: 'en', label: 'ENG', name: 'English' }
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setWidgetLang(l.code as Language)}
                    className={`py-2 px-3 rounded-none text-xs font-bold border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                      widgetLang === l.code
                        ? 'border-[#AAD0D1] bg-[#0D4D5E] text-[#AAD0D1] shadow-md ring-1 ring-[#AAD0D1]'
                        : 'border-[#417483]/40 bg-[#052832] text-slate-300 hover:border-[#417483]'
                    }`}
                  >
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Official 4 Colors Palette Selector */}
            <div className="space-y-3 pt-3 border-t border-[#417483]/30">
              <label className="text-xs font-bold text-[#AAD0D1] flex items-center space-x-1.5 uppercase tracking-wider">
                <Palette className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'de' && 'Stile / Offizielle Farben (4):'}
                  {lang === 'it' && 'Stile / Colori Ufficiali DNS (4):'}
                  {lang === 'en' && 'Style / Official DNS Colors (4):'}
                </span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {OFFICIAL_PALETTES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setThemePreset(p.id)}
                    className={`p-3 rounded-none text-left border transition-all cursor-pointer space-y-1 ${
                      themePreset === p.id
                        ? 'border-[#AAD0D1] bg-[#0D4D5E] text-white ring-1 ring-[#AAD0D1]'
                        : 'border-[#417483]/40 bg-[#052832] text-slate-300 hover:border-[#417483]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span 
                        className="w-4 h-4 rounded-none border border-white/50 shrink-0 shadow-sm" 
                        style={{ backgroundColor: p.color }}
                      ></span>
                      <span className="font-bold text-xs truncate">{p.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-300 block font-light leading-tight">
                      {p.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Region Selection */}
            <div className="space-y-1.5 pt-3 border-t border-[#417483]/30">
              <label className="text-xs font-bold text-slate-200 block uppercase tracking-wider">
                {lang === 'de' && 'Gebiet / Region:'}
                {lang === 'it' && 'Seleziona Area / Region:'}
                {lang === 'en' && 'Select Region:'}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-[#052832] border border-[#417483]/50 text-xs font-bold text-white focus:border-[#AAD0D1] focus:outline-none cursor-pointer"
              >
                <option value="all">
                  {widgetLang === 'de' && 'Alle 8 Regionen (1.000 km)'}
                  {widgetLang === 'it' && 'Tutte le 8 Aree (Carosello Completo 1.000 km)'}
                  {widgetLang === 'en' && 'All 8 Regions (Full 1,000 km Carousel)'}
                </option>
                {NORDIC_REGIONS.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.kmTracks} km)
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Content Modules Toggles */}
            <div className="space-y-3 pt-3 border-t border-[#417483]/30">
              <label className="text-xs font-bold text-[#AAD0D1] block flex items-center space-x-1.5 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'de' && 'Inhalte auswählen:'}
                  {lang === 'it' && 'Moduli Contenuto Widget:'}
                  {lang === 'en' && 'Select Content Modules:'}
                </span>
              </label>

              <div className="space-y-2">
                
                {/* Badge Toggle */}
                {isPartner ? (
                  <div className="p-3 rounded-none bg-[#0D4D5E] border border-[#AAD0D1]/60 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <Award className="w-5 h-5 text-[#AAD0D1] shrink-0" />
                      <div>
                        <span className="font-bold text-white block uppercase tracking-wider text-[11px]">
                          {lang === 'de' && 'Exklusives Partner-Siegel 2026'}
                          {lang === 'it' && 'Bollino Partner d\'Eccellenza 2026'}
                          {lang === 'en' && 'Exclusive Partner Badge 2026'}
                        </span>
                        <span className="text-[10px] text-[#AAD0D1]/80 block font-light">
                          {lang === 'de' && 'Inklusive für verifizierte Partner-Hotels'}
                          {lang === 'it' && 'Incluso di default per le strutture accreditate'}
                          {lang === 'en' && 'Included for accredited partner hotels'}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-none bg-[#AAD0D1]/20 text-[#AAD0D1] font-mono text-[10px] font-bold border border-[#AAD0D1]/40 uppercase">
                      ACTIVE
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-none bg-[#052832]/60 border border-[#417483]/20 flex items-center justify-between text-xs opacity-60">
                    <div className="flex items-center space-x-2.5">
                      <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-300 block text-[11px]">
                          {lang === 'de' && 'Partner-Siegel 2026'}
                          {lang === 'it' && 'Bollino Partner Ufficiale'}
                          {lang === 'en' && 'Partner Excellence Badge'}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {lang === 'de' && 'Nur nach Partner-Login verfügbar'}
                          {lang === 'it' && 'Riservato alle strutture partner accreditate'}
                          {lang === 'en' && 'Reserved for accredited partner hotels'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loipen / Piste Toggle */}
                <label className={`p-3 rounded-none border flex items-center justify-between text-xs transition-all ${
                  isPartner 
                    ? 'bg-[#0D4D5E] border-[#AAD0D1]/50 text-white' 
                    : includeTrails 
                    ? 'bg-[#0D4D5E] border-[#AAD0D1] text-white shadow-md' 
                    : 'bg-[#052832] border-[#417483]/30 text-slate-300 hover:border-[#417483]/60 cursor-pointer'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <CloudSnow className="w-4 h-4 text-[#AAD0D1] shrink-0" />
                    <div>
                      <span className="font-bold block">
                        {lang === 'de' && 'Loipenstatus & Präparierung'}
                        {lang === 'it' && 'Stato Piste & Battitura (Loipen)'}
                        {lang === 'en' && 'Trail Status & Grooming'}
                      </span>
                      <span className="text-[10px] text-slate-300 block">
                        {lang === 'de' && 'Offene KM, Schneequalität, Uhrzeit'}
                        {lang === 'it' && 'Km aperti, qualità neve e orario battitura'}
                        {lang === 'en' && 'Open track km, snow condition, grooming time'}
                      </span>
                    </div>
                  </div>
                  {isPartner ? (
                    <span className="px-2 py-0.5 rounded-none bg-teal-400/20 text-[#AAD0D1] font-mono text-[10px] font-bold border border-[#AAD0D1]/30">
                      FIXED
                    </span>
                  ) : (
                    <input 
                      type="checkbox"
                      checked={includeTrails}
                      onChange={(e) => {
                        if (!e.target.checked && !includeWeather && !includePrices) return;
                        setIncludeTrails(e.target.checked);
                      }}
                      className="w-4 h-4 accent-teal-400 cursor-pointer"
                    />
                  )}
                </label>

                {/* Wetter / Meteo Toggle */}
                <label className={`p-3 rounded-none border flex items-center justify-between text-xs cursor-pointer transition-all ${
                  includeWeather 
                    ? 'bg-[#0D4D5E] border-[#AAD0D1] text-white shadow-md' 
                    : 'bg-[#052832] border-[#417483]/30 text-slate-300 hover:border-[#417483]/60'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <Sun className="w-4 h-4 text-amber-300 shrink-0" />
                    <div>
                      <span className="font-bold block">
                        {lang === 'de' && 'Wetter & Schnee (Wetter)'}
                        {lang === 'it' && 'Meteo & Condizioni Neve'}
                        {lang === 'en' && 'Weather & Snow Conditions'}
                      </span>
                      <span className="text-[10px] text-slate-300 block">
                        {lang === 'de' && 'Temperatur, Wetterlage und Schneehöhe'}
                        {lang === 'it' && 'Temperatura, previsione e altezza neve'}
                        {lang === 'en' && 'Temperature, forecast, and snow depth'}
                      </span>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={includeWeather}
                    onChange={(e) => {
                      if (!e.target.checked && !includeTrails && !includePrices) return;
                      setIncludeWeather(e.target.checked);
                    }}
                    className="w-4 h-4 accent-teal-400 cursor-pointer"
                  />
                </label>

                {/* Prezzi / Tariffe Toggle */}
                <label className={`p-3 rounded-none border flex items-center justify-between text-xs cursor-pointer transition-all ${
                  includePrices 
                    ? 'bg-[#0D4D5E] border-[#AAD0D1] text-white shadow-md' 
                    : 'bg-[#052832] border-[#417483]/30 text-slate-300 hover:border-[#417483]/60'
                }`}>
                  <div className="flex items-center space-x-2.5">
                    <Ticket className="w-4 h-4 text-emerald-300 shrink-0" />
                    <div>
                      <span className="font-bold block">
                        {lang === 'de' && 'Preise & Skipass-Tarife'}
                        {lang === 'it' && 'Prezzi & Tariffe Skipass'}
                        {lang === 'en' && 'Pass Prices & Tariffs'}
                      </span>
                      <span className="text-[10px] text-slate-300 block">
                        {lang === 'de' && 'Tageskarten, 7-Tagespass und Saisonpreise'}
                        {lang === 'it' && 'Giornalieri, settimanali e stagionale Dolomiti'}
                        {lang === 'en' && 'Day pass, 7-day pass, and seasonal tariffs'}
                      </span>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={includePrices}
                    onChange={(e) => {
                      if (!e.target.checked && !includeTrails && !includeWeather) return;
                      setIncludePrices(e.target.checked);
                    }}
                    className="w-4 h-4 accent-teal-400 cursor-pointer"
                  />
                </label>

              </div>
            </div>

            {/* Embed Code Copy */}
            <div className="pt-3 border-t border-[#417483]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#AAD0D1] flex items-center space-x-1 uppercase tracking-wider">
                  <Code className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'de' && 'HTML Embed-Code:'}
                    {lang === 'it' && 'Codice HTML Embed:'}
                    {lang === 'en' && 'HTML Embed Code:'}
                  </span>
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-none bg-[#0D4D5E] hover:bg-[#0D4D5E]/80 border border-[#AAD0D1]/60 text-[#AAD0D1] font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-[#AAD0D1]" />
                      <span>
                        {lang === 'de' && 'Kopiert!'}
                        {lang === 'it' && 'Copiato!'}
                        {lang === 'en' && 'Copied!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#AAD0D1]" />
                      <span>
                        {lang === 'de' && 'Code kopieren'}
                        {lang === 'it' && 'Copia Codice'}
                        {lang === 'en' && 'Copy Code'}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                readOnly
                rows={3}
                value={embedCode}
                className="w-full p-3 rounded-none bg-[#052832] border border-[#417483]/50 font-mono text-[11px] text-slate-200 select-all focus:outline-none"
              ></textarea>
            </div>

          </div>

          <WidgetPreview
            lang={lang} widgetLang={widgetLang} activePalette={activePalette}
            isLight={isLight} currentBgColor={currentBgColor} regionName={regionName}
            includeBadge={includeBadge} includeTrails={includeTrails}
            includeWeather={includeWeather} includePrices={includePrices}
          />
        </div>

      </div>
    </div>
  );
};
