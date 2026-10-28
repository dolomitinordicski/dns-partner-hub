import React from 'react';
import { Sparkles, Award, Sun, Ticket, ChevronRight } from 'lucide-react';
import { WidgetTrailPreview } from './WidgetTrailPreview';
import { DNS_SHARED_WEB_LOGO_URL } from '../../services/foundationBrand';
import type { Language } from '../../types';

interface WidgetPreviewProps {
  lang: Language;
  widgetLang: Language;
  activePalette: { label: string };
  isLight: boolean;
  currentBgColor: string;
  regionName: string;
  includeBadge: boolean;
  includeTrails: boolean;
  includeWeather: boolean;
  includePrices: boolean;
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  lang, widgetLang, activePalette, isLight, currentBgColor, regionName,
  includeBadge, includeTrails, includeWeather, includePrices
}) => (
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#AAD0D1]" />
                <span>
                  {lang === 'de' && `Live-Vorschau Widget (${widgetLang.toUpperCase()})`}
                  {lang === 'it' && `Anteprima Live Widget (${widgetLang.toUpperCase()})`}
                  {lang === 'en' && `Unified Live Widget Preview (${widgetLang.toUpperCase()})`}
                </span>
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-none bg-[#0D4D5E] text-[#AAD0D1] border border-[#417483]/50 uppercase font-bold">
                {activePalette.label} • {widgetLang.toUpperCase()}
              </span>
            </div>

            {/* SIMULATED WIDGET BOX WITH ZERO ROUNDED CORNERS (rounded-none) */}
            <div 
              className={`rounded-none p-6 sm:p-7 border-2 transition-all shadow-2xl space-y-5 ${
                isLight 
                  ? 'border-slate-400 text-slate-900 shadow-slate-900/15' 
                  : 'border-[#417483]/60 text-white shadow-black/50'
              }`}
              style={{ backgroundColor: currentBgColor }}
            >
              
              {/* Widget Header with NO BORDER ON LOGO */}
              <div className={`flex items-center justify-between border-b pb-4 ${
                isLight ? 'border-slate-300' : 'border-white/20'
              }`}>
                <div className="flex items-center space-x-3.5">
                  {/* LOGO: BORDERLESS & ENLARGED BY 20% */}
                  <div className="flex items-center justify-center shrink-0">
                    <img 
                      src={DNS_SHARED_WEB_LOGO_URL} 
                      alt="Dolomiti NordicSki Logo" 
                      className="h-10 sm:h-11 w-auto object-contain rounded-none"
                    />
                  </div>
                  <div>
                    <h4 className={`font-black text-base sm:text-lg leading-snug tracking-tight ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}>
                      Dolomiti NordicSki • {regionName}
                    </h4>
                    <span className={`text-[10px] uppercase tracking-widest font-mono block ${
                      isLight ? 'text-slate-700 font-bold' : 'text-slate-300 opacity-90'
                    }`}>
                      {widgetLang === 'de' && 'Offizieller Live-Loipenservice'}
                      {widgetLang === 'it' && 'Bollettino Ufficiale Piste & Servizi'}
                      {widgetLang === 'en' && 'Official Live Trail Service'}
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-none text-[10px] font-black uppercase tracking-wider shrink-0 border ${
                  isLight
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                }`}>
                  {widgetLang === 'de' ? 'DEMO · KEINE LIVE-DATEN' : widgetLang === 'it' ? 'DEMO · DATI NON LIVE' : 'DEMO · NOT LIVE DATA'}
                </span>
              </div>

              <p role="note" className={`text-[11px] font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                {widgetLang === 'de' ? 'Nur Vorschau mit Beispieldaten. Der offizielle Loipenstatus ist noch nicht verbunden.'
                  : widgetLang === 'it' ? 'Anteprima con dati dimostrativi. Lo stato ufficiale delle piste non è ancora collegato.'
                  : 'Preview with sample data. Official live trail status is not connected yet.'}
              </p>

              {/* SECTION 1: EYE-CATCHING PARTNER BADGE (Official Dolomiti NordicSki Cyan/Teal Palette) */}
              {includeBadge && (
                <div className={`p-4 rounded-none border-2 transition-all shadow-md relative overflow-hidden ${
                  isLight
                    ? 'bg-gradient-to-r from-[#E8F4F6] via-[#F4FAFB] to-[#E8F4F6] border-[#0D4D5E] text-[#052832]'
                    : 'bg-gradient-to-r from-[#0D4D5E] via-[#083845] to-[#0D4D5E] border-[#AAD0D1] text-white'
                }`}>
                  {/* Decorative Corner Accent */}
                  <div className={`absolute top-0 right-0 text-[9px] font-black px-2.5 py-0.5 uppercase tracking-widest rounded-none shadow-sm flex items-center space-x-1 border-b border-l ${
                    isLight 
                      ? 'bg-[#0D4D5E] text-white border-[#052832]' 
                      : 'bg-[#AAD0D1] text-[#052832] border-[#417483]'
                  }`}>
                    <Award className="w-3 h-3" />
                    <span>CERTIFIED 2026</span>
                  </div>

                  <div className="flex items-start space-x-3.5 pt-1">
                    <div className={`p-2.5 rounded-none border shadow-md shrink-0 ${
                      isLight ? 'bg-[#0D4D5E] border-[#052832] text-[#AAD0D1]' : 'bg-[#0D4D5E] border-[#AAD0D1] text-[#AAD0D1]'
                    }`}>
                      <Award className="w-7 h-7 font-extrabold" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                        }`}>
                          {widgetLang === 'de' && 'OFFIZIELLER PARTNERBETRIEB'}
                          {widgetLang === 'it' && 'STRUTTURA PARTNER UFFICIALE'}
                          {widgetLang === 'en' && 'OFFICIAL PARTNER PROPERTY'}
                        </span>
                      </div>

                      <h5 className={`font-black text-sm sm:text-base leading-tight tracking-tight ${
                        isLight ? 'text-[#052832]' : 'text-white'
                      }`}>
                        {widgetLang === 'de' && 'Zertifiziertes Dolomiti NordicSki Partner Hotel'}
                        {widgetLang === 'it' && 'Struttura Ricettiva Certificata Dolomiti NordicSki'}
                        {widgetLang === 'en' && 'Certified Dolomiti NordicSki Partner Property'}
                      </h5>

                      <p className={`text-[11px] leading-relaxed ${
                        isLight ? 'text-[#083845] font-medium' : 'text-[#E8F4F6] font-light'
                      }`}>
                        {widgetLang === 'de' && 'Kostenloser Loipenpass-Service, beheizter Skiraum mit Wachstisch & direkte Anbindung an das Loipennetz.'}
                        {widgetLang === 'it' && 'Servizio vendita voucher skipass in struttura, deposito sci riscaldato con banco sciolina e accesso diretto ai tracciati.'}
                        {widgetLang === 'en' && 'Direct pass issuing service, heated ski depot with professional waxing bench, and direct trail access.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <WidgetTrailPreview widgetLang={widgetLang} isLight={isLight} includeTrails={includeTrails} />

              {/* SECTION 3: WETTER / METEO (If active) */}
              {includeWeather && (
                <div className={`space-y-2.5 pt-3 border-t ${
                  isLight ? 'border-slate-300' : 'border-white/20'
                }`}>
                  <div className={`flex items-center space-x-2 text-xs font-black uppercase tracking-wider ${
                    isLight ? 'text-amber-950' : 'text-amber-300'
                  }`}>
                    <Sun className={`w-4 h-4 ${
                      isLight ? 'text-amber-700' : 'text-amber-300'
                    }`} />
                    <span>
                      {widgetLang === 'de' && 'Wetter & Schneebericht'}
                      {widgetLang === 'it' && 'Meteo & Bollettino Neve'}
                      {widgetLang === 'en' && 'Weather & Snow Conditions'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-amber-100/70 border-amber-300 text-amber-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-amber-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Temperatur' : 'Temperatura'}
                      </span>
                      <span className={`font-black text-sm ${
                        isLight ? 'text-amber-950' : 'text-amber-200'
                      }`}>-2°C / +3°C</span>
                    </div>

                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-amber-100/70 border-amber-300 text-amber-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-amber-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Wetterlage' : 'Cielo'}
                      </span>
                      <span className={`font-black text-sm ${
                        isLight ? 'text-amber-950' : 'text-amber-200'
                      }`}>
                        {widgetLang === 'de' ? 'Sonnig' : widgetLang === 'it' ? 'Soleggiato' : 'Sunny'}
                      </span>
                    </div>

                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-amber-100/70 border-amber-300 text-amber-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-amber-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Schneehöhe' : 'Altezza Neve'}
                      </span>
                      <span className={`font-black text-sm ${
                        isLight ? 'text-amber-950' : 'text-amber-200'
                      }`}>45 - 80 cm</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: PREZZI / TARIFFS (If active) */}
              {includePrices && (
                <div className={`space-y-2.5 pt-3 border-t ${
                  isLight ? 'border-slate-300' : 'border-white/20'
                }`}>
                  <div className={`flex items-center space-x-2 text-xs font-black uppercase tracking-wider ${
                    isLight ? 'text-emerald-950' : 'text-emerald-300'
                  }`}>
                    <Ticket className={`w-4 h-4 ${
                      isLight ? 'text-emerald-700' : 'text-emerald-300'
                    }`} />
                    <span>
                      {widgetLang === 'de' && 'Loipenpass-Tarife'}
                      {widgetLang === 'it' && 'Prezzi & Tariffe Skipass'}
                      {widgetLang === 'en' && 'Pass Prices & Tariffs'}
                    </span>
                  </div>

                  <p role="status" className="text-xs opacity-80">
                    {widgetLang === 'de' ? 'Aktuelle Preise aus der offiziellen Quelle noch nicht verfügbar.' : widgetLang === 'it' ? 'Tariffe aggiornate dalla fonte ufficiale non ancora disponibili.' : 'Current official prices are not yet available.'}
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className={`p-3 rounded-none border text-center ${
                      isLight ? 'bg-emerald-100/70 border-emerald-300' : 'bg-black/30 border-white/15'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-emerald-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Tageskarte' : widgetLang === 'it' ? 'Giornaliero' : 'Day Pass'}
                      </span>
                      <span className={`font-black text-base ${
                        isLight ? 'text-emerald-950' : 'text-emerald-300'
                      }`}>—</span>
                    </div>

                    <div className={`p-3 rounded-none border text-center ${
                      isLight ? 'bg-emerald-100/70 border-emerald-300' : 'bg-black/30 border-white/15'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-emerald-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? '7 Tage Pass' : widgetLang === 'it' ? '7 Giorni' : '7-Day Pass'}
                      </span>
                      <span className={`font-black text-base ${
                        isLight ? 'text-emerald-950' : 'text-emerald-300'
                      }`}>—</span>
                    </div>

                    <div className={`p-3 rounded-none border text-center ${
                      isLight ? 'bg-emerald-100/70 border-emerald-300' : 'bg-black/30 border-white/15'
                    }`}>
                      <span className={`text-[9px] block font-extrabold uppercase tracking-wider ${
                        isLight ? 'text-emerald-900' : 'text-slate-300 opacity-80'
                      }`}>
                        {widgetLang === 'de' ? 'Saisonkarte' : widgetLang === 'it' ? 'Stagionale' : 'Season Pass'}
                      </span>
                      <span className={`font-black text-base ${
                        isLight ? 'text-emerald-950' : 'text-emerald-300'
                      }`}>—</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Link */}
              <div className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                isLight ? 'border-slate-300 text-slate-800' : 'border-white/20 text-slate-200'
              }`}>
                <span className="font-bold">Powered by Dolomiti NordicSki</span>
                <span className={`font-black uppercase tracking-wider underline flex items-center space-x-1 cursor-pointer ${
                  isLight ? 'text-[#0D4D5E] hover:text-[#052832]' : 'text-teal-200 hover:text-white'
                }`}>
                  <span>
                    {widgetLang === 'de' && 'Offiziellen Bericht prüfen'}
                    {widgetLang === 'it' && 'Verifica Bollettino Ufficiale'}
                    {widgetLang === 'en' && 'Check Official Report'}
                  </span>
                  <ChevronRight className="w-3 h-3 inline" />
                </span>
              </div>

            </div>
          </div>

);
