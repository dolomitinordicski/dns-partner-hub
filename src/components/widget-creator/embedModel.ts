import type { DNSWidgetContext } from './widgetContracts';
import { toLegacyWidgetAreaId } from './reportingAreas';
import type { Language } from '../../types';

export type WidgetThemePreset = 'dns-primary' | 'dns-deep' | 'dns-muted-teal' | 'frosted-ice';

export const OFFICIAL_PALETTES: {
  id: WidgetThemePreset; label: string; color: string; isLight?: boolean; desc: string;
}[] = [
  { id: 'dns-primary', label: 'DNS Alpine Primary', color: '#0D4D5E', desc: 'Ottanio Primario (#0D4D5E)' },
  { id: 'dns-deep', label: 'DNS Deep', color: '#083845', desc: 'Blu Petrolio Scuro (#083845)' },
  { id: 'dns-muted-teal', label: 'DNS Muted Teal', color: '#417483', desc: 'Ottanio Medio (#417483)' },
  { id: 'frosted-ice', label: 'Frosted Ice', color: '#E8F4F6', isLight: true, desc: 'Ghiaccio Chiaro (#E8F4F6)' },
];

export interface WidgetEmbedOptions {
  readonly context?: DNSWidgetContext;
  selectedRegion: string;
  widgetLang: Language;
  themePreset: WidgetThemePreset;
  backgroundColor: string;
  includeTrails: boolean;
  includeWeather: boolean;
  includePrices: boolean;
  includeBadge: boolean;
}

export function createWidgetEmbed(options: WidgetEmbedOptions) {
  // The partner embed must be issued and validated by DNS Core, never composed client-side.
  // Public embeds retain their existing URL and configuration unchanged.
  if (options.context?.product === 'partner') {
    throw new Error('Partner widgets require a DNS Core-issued embed token and endpoint.');
  }
  const { selectedRegion, widgetLang, themePreset, backgroundColor, includeTrails, includeWeather, includePrices, includeBadge } = options;
  const queryParams = new URLSearchParams({
    area: toLegacyWidgetAreaId(selectedRegion),
    badge: includeBadge ? '1' : '0',
    trails: includeTrails ? '1' : '0',
    weather: includeWeather ? '1' : '0',
    prices: includePrices ? '1' : '0',
    theme: themePreset,
    bg: encodeURIComponent(backgroundColor),
    lang: widgetLang
  }).toString();
  // Stable DNS-hosted deployment: no build/version parameter in partner embed HTML.
  // Fail closed until DNS confirms the widget route and configures its public URL.
  const configuredEndpoint = import.meta.env.VITE_DNS_WIDGET_EMBED_URL?.trim();
  if (!configuredEndpoint) return { iframeSrc: '', iframeHeight: 0, embedCode: '' };
  const endpoint = new URL(configuredEndpoint);
  if (endpoint.protocol !== 'https:') return { iframeSrc: '', iframeHeight: 0, embedCode: '' };
  endpoint.search = queryParams;
  const iframeSrc = endpoint.toString();
  const iframeHeight = (includeBadge ? 120 : 0) + (includeTrails ? 160 : 0) + (includeWeather ? 100 : 0) + (includePrices ? 140 : 0) + 120;
  const embedCode = `<iframe src="${iframeSrc}" width="100%" height="${iframeHeight}" frameborder="0" style="border:none; border-radius:0px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.25);" title="Dolomiti NordicSki Live Widget (${widgetLang.toUpperCase()})"></iframe>`;
  return { iframeSrc, iframeHeight, embedCode };
}
