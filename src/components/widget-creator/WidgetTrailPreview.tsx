import React from 'react';
import { CloudSnow } from 'lucide-react';
import type { Language } from '../../types';

/** Presentation-only legacy preview. No live piste data is fetched here. */
interface Props { widgetLang: Language; isLight: boolean; includeTrails: boolean }
export const WidgetTrailPreview: React.FC<Props> = ({ widgetLang, isLight, includeTrails }) => (
  <>
{includeTrails && (
                <div className="space-y-3">
                  <div className={`flex items-center space-x-2 text-xs font-black uppercase tracking-wider ${
                    isLight ? 'text-[#052832]' : 'text-[#AAD0D1]'
                  }`}>
                    <CloudSnow className={`w-4 h-4 ${
                      isLight ? 'text-[#0D4D5E]' : 'text-teal-300'
                    }`} />
                    <span>
                      {widgetLang === 'de' && 'Loipenstatus & Präparierung'}
                      {widgetLang === 'it' && 'Stato Piste & Battitura'}
                      {widgetLang === 'en' && 'Trail Status & Grooming'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-slate-200/80 border-slate-300 text-slate-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] uppercase block font-extrabold tracking-wider ${
                        isLight ? 'text-slate-700' : 'text-slate-300 opacity-90'
                      }`}>
                        {widgetLang === 'de' ? 'Offene Loipen' : widgetLang === 'it' ? 'Piste Aperte' : 'Open Trails'}
                      </span>
                      <span className={`text-base sm:text-lg font-black ${
                        isLight ? 'text-[#052832]' : 'text-[#AAD0D1]'
                      }`}>
                        100% (82/82)
                      </span>
                    </div>

                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-slate-200/80 border-slate-300 text-slate-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] uppercase block font-extrabold tracking-wider ${
                        isLight ? 'text-slate-700' : 'text-slate-300 opacity-90'
                      }`}>
                        {widgetLang === 'de' ? 'Präparierte KM' : widgetLang === 'it' ? 'Km Tracciati' : 'Groomed KM'}
                      </span>
                      <span className={`text-base sm:text-lg font-black ${
                        isLight ? 'text-[#052832]' : 'text-[#AAD0D1]'
                      }`}>
                        1.000 KM
                      </span>
                    </div>

                    <div className={`p-3 rounded-none border space-y-0.5 ${
                      isLight ? 'bg-slate-200/80 border-slate-300 text-slate-950' : 'bg-black/30 border-white/15 text-white'
                    }`}>
                      <span className={`text-[9px] uppercase block font-extrabold tracking-wider ${
                        isLight ? 'text-slate-700' : 'text-slate-300 opacity-90'
                      }`}>
                        {widgetLang === 'de' ? 'Schnee-Qualität' : widgetLang === 'it' ? 'Qualità Neve' : 'Snow Quality'}
                      </span>
                      <span className={`text-base sm:text-lg font-black ${
                        isLight ? 'text-emerald-800' : 'text-emerald-400'
                      }`}>
                        {widgetLang === 'de' ? 'Kompakt' : 'Powder'}
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-none border text-xs flex items-center justify-between ${
                    isLight ? 'bg-slate-200/60 border-slate-300 text-slate-950' : 'bg-black/30 border-white/15 text-white'
                  }`}>
                    <span className="font-bold">
                      {widgetLang === 'de' && 'Letzte Präparierung:'}
                      {widgetLang === 'it' && 'Ultima Battitura:'}
                      {widgetLang === 'en' && 'Last Groomed:'}
                    </span>
                    <span className={`font-black ${
                      isLight ? 'text-[#0D4D5E]' : 'text-[#AAD0D1]'
                    }`}>
                      {widgetLang === 'de' && 'Heute 06:00 Uhr (Klassisch & Skating)'}
                      {widgetLang === 'it' && 'Oggi ore 06:00 (Binario & Skating)'}
                      {widgetLang === 'en' && 'Today 06:00 AM (Classic & Skating)'}
                    </span>
                  </div>
                </div>
              )}
  </>
);
