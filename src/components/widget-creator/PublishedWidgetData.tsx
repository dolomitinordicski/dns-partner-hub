import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data';
import React from 'react';
import type { Language } from '../../types';
import type { PublicWidgetSnapshot } from './usePublicWidgetSnapshot';

interface Props { lang: Language; snapshot: PublicWidgetSnapshot | null }

export function PublishedWidgetData({ lang, snapshot }: Props) {
  if (!snapshot) return null;
  const label = lang === 'de' ? 'Veröffentlichte Daten' : lang === 'it' ? 'Dati pubblicati' : 'Published data';
  const priceItems = snapshot.pricing.status === 'available'
    ? snapshot.pricing.items.filter(p => p.currency === 'EUR' && Number.isFinite(p.amount) && p.amount >= 0)
    : [];
  const trails = snapshot.trails.status === 'available' ? snapshot.trails : null;
  const weather = snapshot.weather.status === 'available' ? snapshot.weather : null;
  return (
    <section aria-label={label} className="p-4 rounded-lg border space-y-3" style={{ background: DNS_DESIGN_SYSTEM.colors.surface, borderColor: DNS_DESIGN_SYSTEM.colors.mid, color: DNS_DESIGN_SYSTEM.colors.darkText }}>
      <h3 className="font-bold">{label} · {snapshot.revision}</h3>
      {snapshot.logo?.url?.startsWith('https://') && (
        <img src={snapshot.logo.url} alt={snapshot.logo.alt[lang]} className="max-h-16 max-w-48 object-contain" />
      )}
      <p>{lang === 'it' ? 'Piste aperte' : lang === 'de' ? 'Offene Loipen' : 'Open trails'}: {trails?.openKm ?? '—'} km</p>
      <p>{lang === 'it' ? 'Temperatura' : lang === 'de' ? 'Temperatur' : 'Temperature'}: {weather?.temperatureC == null ? '—' : weather.temperatureC + ' °C'}</p>
      <p>{lang === 'it' ? 'Neve' : lang === 'de' ? 'Schnee' : 'Snow'}: {weather?.snowDepthCm == null ? '—' : weather.snowDepthCm + ' cm'}</p>
      {priceItems.length ? (
        <div className="flex flex-wrap gap-3">{priceItems.map(p => (
          <span key={p.productCode}>{p.productCode}: {new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(p.amount)}</span>
        ))}</div>
      ) : <p>{lang === 'it' ? 'Prezzi non disponibili' : lang === 'de' ? 'Preise nicht verfügbar' : 'Prices unavailable'}</p>}
    </section>
  );
}
