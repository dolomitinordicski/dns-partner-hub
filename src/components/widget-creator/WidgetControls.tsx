import type { Language } from '../../types';
import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data';
import { WIDGET_REPORTING_AREAS } from './reportingAreas';
import { OFFICIAL_PALETTES, type WidgetThemePreset } from './embedModel';

interface Props {
  lang: Language;
  widgetLang: Language; setWidgetLang: (value: Language) => void;
  themePreset: WidgetThemePreset; setThemePreset: (value: WidgetThemePreset) => void;
  selectedRegion: string; setSelectedRegion: (value: string) => void;
  includeTrails: boolean; setIncludeTrails: (value: boolean) => void;
  includeWeather: boolean; setIncludeWeather: (value: boolean) => void;
  includePrices: boolean; setIncludePrices: (value: boolean) => void;
  layout: 'standard' | 'compact'; setLayout: (layout: 'standard' | 'compact') => void;
  isPartner: boolean; handleCopy: () => void; copiedCode: boolean; embedCode: string;
}
const t = (lang: Language, de: string, it: string, en: string) => lang === 'de' ? de : lang === 'it' ? it : en;
export function WidgetControls(props: Props) {
  const { lang, widgetLang, setWidgetLang, themePreset, setThemePreset, selectedRegion, setSelectedRegion,
    includeTrails, setIncludeTrails, includeWeather, setIncludeWeather, includePrices, setIncludePrices,
    handleCopy, copiedCode, embedCode, layout, setLayout } = props;
  const c = DNS_DESIGN_SYSTEM.colors;
  const field = 'w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-2';
  return (
    <section className="lg:col-span-5 rounded-lg border p-5 space-y-5" style={{ background: c.surface, borderColor: c.mid, color: c.darkText, fontFamily: DNS_DESIGN_SYSTEM.typography.primaryFamily }}>
      <h3 className="font-bold text-lg" style={{ color: c.deep }}>{t(lang, 'Widget konfigurieren', 'Configura widget', 'Configure widget')}</h3>
      <label className="block space-y-1">
        <span className="text-sm font-semibold">{t(lang, 'Sprache', 'Lingua', 'Language')}</span>
        <select className={field} style={{ borderColor: c.mid }} value={widgetLang} onChange={e => setWidgetLang(e.target.value as Language)}>
          <option value="de">Deutsch</option><option value="it">Italiano</option><option value="en">English</option>
        </select>
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-semibold">{t(lang, 'Gebiet', 'Area', 'Area')}</span>
        <select className={field} style={{ borderColor: c.mid }} value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
          <option value="all">{t(lang, 'Alle DNS Gebiete', 'Tutte le aree DNS', 'All DNS areas')}</option>
          {WIDGET_REPORTING_AREAS.map(a => <option key={a.id} value={a.id}>{a.localizedName[widgetLang]}</option>)}
        </select>
      </label>
      <fieldset className="space-y-2"><legend className="font-semibold text-sm">{t(lang, "Format", "Formato", "Layout")}</legend><div className="flex gap-2">{(["standard", "compact"] as const).map(value => <button type="button" key={value} onClick={() => setLayout(value)} aria-pressed={layout === value} className="rounded-md border px-3 py-2 text-sm font-medium" style={{ borderColor: c.mid, background: layout === value ? c.deep : c.surface, color: layout === value ? c.surface : c.deep }}>{value === "standard" ? "Standard" : "Compact"}</button>)}</div></fieldset>
      <fieldset className="space-y-2">
        <legend className="font-semibold text-sm">{t(lang, 'Corporate-Farbe', 'Colore corporate', 'Corporate color')}</legend>
        {OFFICIAL_PALETTES.map(p => <label key={p.id} className="flex items-center gap-3 text-sm">
          <input type="radio" name="widget-palette" checked={themePreset === p.id} onChange={() => setThemePreset(p.id)} />
          <span className="w-6 h-6 rounded border" style={{ background: p.color, borderColor: c.mid }} />
          {p.label}
        </label>)}
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="font-semibold text-sm">{t(lang, 'Module', 'Moduli', 'Modules')}</legend>
        {([
          [t(lang, 'Loipen', 'Piste', 'Trails'), includeTrails, setIncludeTrails],
          [t(lang, 'Wetter', 'Meteo', 'Weather'), includeWeather, setIncludeWeather],
          [t(lang, 'Preise', 'Prezzi', 'Prices'), includePrices, setIncludePrices],
        ] as const).map(([name, value, setter]) => <label key={name} className="flex items-center justify-between text-sm">
          <span>{name}</span><input type="checkbox" checked={value} onChange={e => setter(e.target.checked)} style={{ accentColor: c.mid }} />
        </label>)}
      </fieldset>
      <div className="space-y-2">
        <label htmlFor="widget-embed-code" className="block font-semibold text-sm">{t(lang, 'HTML Einbettung', 'Codice HTML', 'HTML embed')}</label>
        <textarea id="widget-embed-code" rows={4} readOnly value={embedCode} className={field} style={{ borderColor: c.mid }} />
        <button type="button" disabled={!embedCode} onClick={handleCopy} className="rounded-md px-4 py-2 font-semibold disabled:opacity-50" style={{ background: c.deep, color: c.surface }}>
          {copiedCode ? t(lang, 'Kopiert', 'Copiato', 'Copied') : t(lang, 'Code kopieren', 'Copia codice', 'Copy code')}
        </button>
      </div>
    </section>
  );
}
