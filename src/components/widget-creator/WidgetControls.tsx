import React from 'react';
import { Sliders, Globe, Palette, Layers, Award, Lock, CloudSnow, Sun, Ticket, Code, Check, Copy } from 'lucide-react';
import { NORDIC_REGIONS } from '../../data/portalData';
import type { Language } from '../../types';
import { OFFICIAL_PALETTES, type WidgetThemePreset } from './embedModel';

interface Props {
  lang: Language;
  widgetLang: Language; setWidgetLang: (value: Language) => void;
  themePreset: WidgetThemePreset; setThemePreset: (value: WidgetThemePreset) => void;
  selectedRegion: string; setSelectedRegion: (value: string) => void;
  includeTrails: boolean; setIncludeTrails: (value: boolean) => void;
  includeWeather: boolean; setIncludeWeather: (value: boolean) => void;
  includePrices: boolean; setIncludePrices: (value: boolean) => void;
  isPartner: boolean;
  handleCopy: () => void;
  copiedCode: boolean;
  embedCode: string;
}
export const WidgetControls: React.FC<Props> = ({
  lang, widgetLang, setWidgetLang, themePreset, setThemePreset,
  selectedRegion, setSelectedRegion, includeTrails, setIncludeTrails,
  includeWeather, setIncludeWeather, includePrices, setIncludePrices,
  isPartner, handleCopy, copiedCode, embedCode
}) => (
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
);
