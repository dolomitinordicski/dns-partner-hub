import React from 'react';
import { Language } from '../types';
import { REPORTING_AREAS, DESTINATIONS } from '@dolomitinordicski/dns-shared-data';
import { AlpinePeakWireframe, SkiTrackWireframe, WireframeBadge } from './WireframeDecorations';
import { MapPin } from 'lucide-react';

interface RegionsSectionProps {
  lang: Language;
}

export const RegionsSection: React.FC<RegionsSectionProps> = ({ lang }) => {
  return (
    <div className="py-12 bg-[#052832] text-white min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#417483]/30 pb-6 space-y-3 relative overflow-hidden">
          <AlpinePeakWireframe className="absolute top-0 right-4 w-28 h-28 opacity-15 pointer-events-none hidden sm:block" />
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D4D5E] border border-[#417483]/50 text-[#AAD0D1] text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#AAD0D1]" />
              <span>
                {lang === 'it' && 'Le 8 Zone del Carosello Dolomiti NordicSki'}
                {lang === 'de' && 'Die 8 Langlaufregionen im Verbund'}
                {lang === 'en' && 'The 8 Carousel Regions'}
              </span>
            </div>
            <WireframeBadge label="8 REGIONS VECTOR" className="text-[#AAD0D1] hidden sm:inline-flex" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'it' && 'Le 8 Aree Alpine & Rete dei Partner'}
            {lang === 'de' && 'Die 8 Regionen & Partnernetzwerk'}
            {lang === 'en' && 'The 8 Regions & Partner Network'}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
            {lang === 'it' && 'Oltre 1.000 km di piste battute quotidianamente in 8 valli tra le Dolomiti patrimonio mondiale UNESCO e il Tirolo Orientale, tutte accessibili con l\'unico Skipass Dolomiti NordicSki.'}
            {lang === 'de' && 'Die DNS Gebiete und Orte aus den gemeinsamen Stammdaten.'}
            {lang === 'en' && 'DNS areas and destinations from the shared canonical dataset.'}
          </p>
        </div>

        {/* Region names and constituent destinations derive only from DNS Shared Data. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REPORTING_AREAS.filter(area => area.active).map(area => {
            const destinations = DESTINATIONS.filter(destination => destination.active && destination.reportingAreaId === area.id);
            return (
              <section key={area.id} className="dns-card p-5 space-y-3" aria-label={area.localizedName[lang]}>
                <h3 className="font-bold text-lg">{area.localizedName[lang]}</h3>
                <p className="text-xs opacity-75">{lang === 'de' ? 'DNS Gebiet' : lang === 'it' ? 'Area DNS' : 'DNS area'}</p>
                {destinations.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold">{lang === 'de' ? 'Orte' : lang === 'it' ? 'Località' : 'Destinations'}</p>
                    <ul className="text-sm space-y-1">
                      {destinations.map(destination => (
                        <li key={destination.id}>{destination.localizedName[lang]}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
};
