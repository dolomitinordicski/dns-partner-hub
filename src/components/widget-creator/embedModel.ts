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
  const { selectedRegion, widgetLang, themePreset, backgroundColor, includeTrails, includeWeather, includePrices, includeBadge } = options;
  const queryParams = new URLSearchParams({
    area: selectedRegion,
    badge: includeBadge ? '1' : '0',
    trails: includeTrails ? '1' : '0',
    weather: includeWeather ? '1' : '0',
    prices: includePrices ? '1' : '0',
    theme: themePreset,
    bg: encodeURIComponent(backgroundColor),
    lang: widgetLang
  }).toString();
  const iframeSrc = `https://www.dolomitinordicski.com/widget?${queryParams}`;
  const iframeHeight = (includeBadge ? 120 : 0) + (includeTrails ? 160 : 0) + (includeWeather ? 100 : 0) + (includePrices ? 140 : 0) + 120;
  const embedCode = `<iframe src="${iframeSrc}" width="100%" height="${iframeHeight}" frameborder="0" style="border:none; border-radius:0px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.25);" title="Dolomiti NordicSki Live Widget (${widgetLang.toUpperCase()})"></iframe>`;
  return { iframeSrc, iframeHeight, embedCode };
}
