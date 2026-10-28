import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data';
import React from 'react';
import type { Language } from '../../types';
import type { PublicWidgetSnapshot } from './usePublicWidgetSnapshot';

interface Props { lang: Language; snapshot: PublicWidgetSnapshot | null; regionName: string; includeTrails: boolean; includeWeather: boolean; includePrices: boolean; paletteColor: string; isLight: boolean }

export function PublishedWidgetData({ lang, snapshot, regionName, includeTrails, includeWeather, includePrices, paletteColor, isLight }: Props) {
  const label = lang === 'de' ? 'Veröffentlichte Daten' : lang === 'it' ? 'Dati pubblicati' : 'Published data';
  const priceItems = snapshot?.pricing.status === 'available'
    ? snapshot.pricing.items.filter(p => p.currency === 'EUR' && Number.isFinite(p.amount) && p.amount >= 0)
    : [];
  const trails = snapshot?.trails.status === 'available' ? snapshot.trails : null;
  const weather = snapshot?.weather.status === 'available' ? snapshot.weather : null;
  const c = DNS_DESIGN_SYSTEM.colors;
  const tr = (de: string, it: string, en: string) => lang === 'de' ? de : lang === 'it' ? it : en;
  const valueColor = isLight ? c.deep : c.surface;
  return (
    <section aria-label={label} className="overflow-hidden rounded-lg border" style={{ borderColor: c.mid, background: c.surface, color: c.darkText, boxShadow: DNS_DESIGN_SYSTEM.shadow.card, fontFamily: DNS_DESIGN_SYSTEM.typography.primaryFamily }}>
      <header className="p-5 sm:p-7 space-y-4" style={{ background: paletteColor, color: valueColor }}>
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">{tr('Dolomiti NordicSki · Widget-Vorschau', 'Dolomiti NordicSki · Anteprima widget', 'Dolomiti NordicSki · Widget preview')}</p>
        <div className="flex flex-wrap items-center gap-4">
          {snapshot?.logo?.url?.startsWith('https://') && <img src={snapshot.logo.url} alt={snapshot.logo.alt[lang]} className="max-h-16 max-w-36 object-contain" />}
          <div className="min-w-0 flex-1">
            <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">{regionName}</h3>
            <p className="text-xs mt-1 opacity-80">{snapshot ? tr('Veröffentlichte Daten', 'Dati pubblicati', 'Published data') + ' · ' + snapshot.revision : tr('Noch keine Live-Daten verfügbar', 'Dati live non ancora disponibili', 'Live data not yet available')}</p>
          </div>
        </div>
      </header>
      <div className="p-5 sm:p-7 space-y-5">
        {!snapshot && <p role="status" className="text-sm" style={{ color: c.mid }}>{tr('Die Gestaltung ist sichtbar; offizielle Daten sind noch nicht veröffentlicht.', 'Il layout è visibile; i dati ufficiali non sono ancora pubblicati.', 'Layout preview is available; official data has not been published yet.')}</p>}
        {includeTrails && <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: c.mid }}>{tr('Loipenstatus', 'Stato piste', 'Trail status')}</h4>
          <p className="text-2xl font-extrabold" style={{ color: c.deep }}>{tr('Offene Kilometer', 'Chilometri aperti', 'Open kilometers')} · {trails?.openKm ?? '—'} <span className="text-sm">km</span></p>
        </div>}
        {includeWeather && <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: c.mid }}>{tr('Wetter & Schnee', 'Meteo e neve', 'Weather & snow')}</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md p-4" style={{ background: c.background }}><p className="text-xs">{tr('Temperatur', 'Temperatura', 'Temperature')}</p><p className="text-xl font-bold" style={{ color: c.deep }}>{weather?.temperatureC == null ? '—' : weather.temperatureC + ' °C'}</p></div>
            <div className="rounded-md p-4" style={{ background: c.background }}><p className="text-xs">{tr('Schnee', 'Neve', 'Snow')}</p><p className="text-xl font-bold" style={{ color: c.deep }}>{weather?.snowDepthCm == null ? '—' : weather.snowDepthCm + ' cm'}</p></div>
          </div>
        </div>}
        {includePrices && <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: c.mid }}>{tr('Loipenpass-Tarife', 'Prezzi skipass', 'Pass prices')}</h4>
          {priceItems.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{priceItems.map(p => <div key={p.productCode} className="rounded-md p-4" style={{ background: c.background }}><p className="text-xs">{p.productCode}</p><p className="text-lg font-bold" style={{ color: c.deep }}>{new Intl.NumberFormat(lang, { style: 'currency', currency: p.currency }).format(p.amount)}</p></div>)}</div> : <p className="text-sm">{tr('Preise nicht verfügbar', 'Prezzi non disponibili', 'Prices unavailable')}</p>}
        </div>}
      </div>
      <footer className="px-5 sm:px-7 py-3 text-xs font-semibold" style={{ borderTop: '1px solid ' + c.border, color: c.mid }}>Powered by Dolomiti NordicSki</footer>
    </section>
  );
}
