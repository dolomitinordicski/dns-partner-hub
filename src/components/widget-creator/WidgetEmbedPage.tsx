import { usePublicWidgetSnapshot } from './usePublicWidgetSnapshot';
import { PublishedWidgetData } from './PublishedWidgetData';
import { getWidgetAreaName, WIDGET_REPORTING_AREAS } from './reportingAreas';
import { OFFICIAL_PALETTES } from './embedModel';
import type { Language } from '../../types';

const params = new URLSearchParams(window.location.search);
const candidate = params.get('area') ?? 'all';
const areaId = candidate === 'all' || WIDGET_REPORTING_AREAS.some(a => a.id === candidate) ? candidate : 'all';
const lang: Language = ['de', 'it', 'en'].includes(params.get('lang') ?? '')
  ? params.get('lang') as Language : 'de';
const palette = OFFICIAL_PALETTES.find(p => p.id === params.get('theme')) ?? OFFICIAL_PALETTES[0];
const enabled = (name: string, fallback: boolean) => params.get(name) == null ? fallback : params.get(name) === '1';

export function WidgetEmbedPage() {
  const { snapshot, status, reason } = usePublicWidgetSnapshot('2026-27', areaId);
  return (
    <main className="min-h-screen p-2 sm:p-3" style={{background:'transparent'}}>
      {status === 'error' && <p role="alert" className="text-sm p-2">
        {lang === 'it' ? 'Errore di lettura dati DNS' : lang === 'de' ? 'Fehler beim Laden der DNS-Daten' : 'DNS data read error'}
        {reason ? ': ' + reason : ''}
      </p>}
      <PublishedWidgetData lang={lang} snapshot={snapshot} regionName={getWidgetAreaName(areaId, lang)}
        includeTrails={enabled('trails', true)} includeWeather={enabled('weather', false)}
        includePrices={enabled('prices', false)} paletteColor={palette.color}
        isLight={!!palette.isLight} areaId={areaId} layout={params.get('layout') === 'compact' ? 'compact' : 'standard'} />
    </main>
  );
}
