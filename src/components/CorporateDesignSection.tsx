import React, { useState } from 'react';
import { Language, AccessibilitySettings, AccessLevel } from '../types';
import { LOGO_VARIANTS, BRAND_GUIDELINES } from '../data/portalData';
import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data/design-system';
import { DNS_SHARED_WEB_LOGO_URL } from '../services/foundationBrand';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Palette, 
  Layers, 
  Info,
  Type,
  History,
  RotateCcw,
  Compass,
  HeartPulse,
  Leaf,
  Lightbulb,
  Flame,
  CheckCircle,
  Code,
  Globe
} from 'lucide-react';

interface CorporateDesignSectionProps {
  lang: Language;
  a11y?: AccessibilitySettings;
  accessLevel?: AccessLevel;
}

const getLoc = (val: string | Record<Language, string> | undefined, currentLang: Language, fallback: string = ''): string => {
  if (!val) return fallback;
  if (typeof val === 'string') return val;
  return val[currentLang] || val.de || val.it || val.en || fallback;
};


// The corporate color specification lives in DNS Shared Data, not this portal.
const corporatePalette = DNS_DESIGN_SYSTEM.corporateColors;

const rgbFromHex = (hex: string): string => {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((position) => parseInt(value.slice(position, position + 2), 16)).join(', ');
};

export const CorporateDesignSection: React.FC<CorporateDesignSectionProps> = ({ lang, a11y, accessLevel = 'public' }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedLogoId, setSelectedLogoId] = useState<string>('logo-main-color');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [activeTimelineYear, setActiveTimelineYear] = useState<number>(2025);
  const [statementLang, setStatementLang] = useState<'de' | 'it' | 'en'>('de');

  const isLight = a11y?.theme === 'light';

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleDownloadLogo = (logoName: string, format: string) => {
    setDownloadSuccess(`${logoName} (${format})`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const activeLogo = LOGO_VARIANTS.find(l => l.id === selectedLogoId) || LOGO_VARIANTS[0];

  const timelineYears = [2000, 2005, 2010, 2015, 2020, 2023, 2025];

  return (
    <div className={`py-12 min-h-screen space-y-16 transition-colors ${
      isLight ? 'bg-[var(--color-dns-bg)] text-[var(--color-dns-primary-dark)]' : 'bg-[var(--color-dns-primary-dark)] text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className={`border-b pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 ${
          isLight ? 'border-[var(--color-dns-secondary-dark)]/40' : 'border-[var(--color-dns-mid)]/30'
        }`}>
          <div className="space-y-3 max-w-3xl">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-md text-xs font-bold border ${
              isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-light)]/30 text-[var(--color-dns-light)]'
            }`}>
              <Palette className="w-3.5 h-3.5" />
              <span>
                {lang === 'it' && 'Manuale Ufficiale Corporate Design & Brand Identity'}
                {lang === 'de' && 'Offizielles Corporate Design Handbuch'}
                {lang === 'en' && 'Official Corporate Design & Brand Guidelines'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-[family-name:var(--font-display)]">
              {lang === 'it' && 'Corporate Design & Gestione del Brand'}
              {lang === 'de' && 'Corporate Design & Markenführung'}
              {lang === 'en' && 'Corporate Design & Brand Management'}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed font-light ${
              isLight ? 'text-[var(--color-dns-mid)]' : 'text-slate-200'
            }`}>
              {lang === 'it' && 'In questa sezione sono raccolti tutti gli elementi grafici ufficiali, i loghi ad alta risoluzione, la palette cromatica e le linee guida per la corretta applicazione del marchio Dolomiti NordicSki da parte degli alloggi partner, enti turistici e media.'}
              {lang === 'de' && 'Hier finden Sie alle offiziellen Grafikelemente, hochauflösenden Logos, Farbpaletten und Richtlinien zur korrekten Verwendung der Marke Dolomiti NordicSki durch Partnerbetriebe, Tourismusvereine und Medien.'}
              {lang === 'en' && 'Access official graphic elements, high-resolution master logos, colour palettes, and usage guidelines for accommodation partners, tourist boards, and press.'}
            </p>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDownloadLogo('Corporate Design Manual 2026', 'PDF');
            }}
            className={`inline-flex items-center space-x-2 px-5 py-3 rounded-xl font-black text-sm shadow-lg transition-all shrink-0 hover:scale-[1.02] ${
              isLight 
                ? 'bg-[var(--color-dns-deep)] hover:bg-[var(--color-dns-primary-dark)] text-white' 
                : 'bg-[var(--color-dns-light)] hover:bg-white text-[var(--color-dns-primary-dark)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>
              {lang === 'it' && 'Scarica Manuale PDF (14.8 MB)'}
              {lang === 'de' && 'Handbuch PDF herunterladen (14.8 MB)'}
              {lang === 'en' && 'Download Manual PDF (14.8 MB)'}
            </span>
            <Download className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Success Alert Banner */}
        {downloadSuccess && (
          <div className="p-4 rounded-xl bg-[var(--color-dns-deep)] border border-[var(--color-dns-light)]/50 text-[var(--color-dns-light)] flex items-center justify-between animate-fadeIn shadow-xl">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-dns-light)]" />
              <span className="text-sm font-bold">
                {lang === 'it' && `Download avviato con successo: ${downloadSuccess}`}
                {lang === 'de' && `Download erfolgreich gestartet: ${downloadSuccess}`}
                {lang === 'en' && `Download successfully started: ${downloadSuccess}`}
              </span>
            </div>
            <span className="text-xs text-[var(--color-dns-light)] font-bold uppercase tracking-wider">OK</span>
          </div>
        )}

        {/* 1. VISUAL IDENTITY: 3 COLORS 1 VOICE & SYMBOLOGY */}
        <div className={`border rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl transition-colors ${
          isLight ? 'bg-[var(--color-dns-surface)] border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/40'
        }`}>
          <div className={`border-b pb-6 space-y-2 ${isLight ? 'border-[var(--color-dns-secondary-dark)]/30' : 'border-[var(--color-dns-mid)]/30'}`}>
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${isLight ? 'text-[var(--color-dns-deep)]' : 'text-[var(--color-dns-light)]'}`}>
              3 COLORS • 1 VOICE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-display)]">
              {lang === 'de' && 'Farbsymbolik & Visuelle Identität'}
              {lang === 'it' && 'Simbologia dei Colori & Identità Visiva'}
              {lang === 'en' && 'Colour Symbolism & Visual Identity'}
            </h3>
            <p className="text-xs sm:text-sm font-light opacity-90">
              {lang === 'de' && 'Die offiziellen Farben stehen für die reine Höhenluft, die Gelassenheit des alpinen Himmels und die Beständigkeit des Jahrtausend-Eises.'}
              {lang === 'it' && 'I colori ufficiali rappresentano l\'aria pura di alta quota, la serenità del cielo alpino e la resilienza del ghiaccio millenario.'}
              {lang === 'en' && 'Official colours represent crisp mountain air, alpine sky serenity, and glacier endurance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Color 1 */}
            <div className={`border rounded-2xl p-6 space-y-4 hover:border-[var(--color-dns-deep)] transition-all group ${
              isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)]/50' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/30'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-dns-deep)] border border-[var(--color-dns-light)]/40 flex items-center justify-center font-mono font-bold text-xs text-[var(--color-dns-light)] shadow-inner">
                {corporatePalette.frostedIceBlue.hex.slice(1)}
              </div>
              <div>
                <h4 className="font-extrabold text-lg group-hover:text-[var(--color-dns-deep)] transition-colors">
                  {corporatePalette.frostedIceBlue.name}
                </h4>
                <p className="text-xs mt-2 leading-relaxed font-light opacity-90">
                  {lang === 'de' && corporatePalette.frostedIceBlue.description.de}
                  {lang === 'it' && corporatePalette.frostedIceBlue.description.it}
                  {lang === 'en' && <>Represents <strong>clarity, freshness, and purity</strong>. Embodies mountain air and untouched snow.</>}
                </p>
              </div>
              <div className="pt-3 border-t border-current/20 text-[11px] font-mono opacity-80">
                HEX: {corporatePalette.frostedIceBlue.hex} • RGB: {rgbFromHex(corporatePalette.frostedIceBlue.hex)}
              </div>
            </div>

            {/* Color 2 */}
            <div className={`border rounded-2xl p-6 space-y-4 hover:border-[var(--color-dns-deep)] transition-all group ${
              isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)]/50' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/30'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-dns-mid)] border border-[var(--color-dns-light)]/40 flex items-center justify-center font-mono font-bold text-xs text-white shadow-inner">
                {corporatePalette.nordicSkyBlue.hex.slice(1)}
              </div>
              <div>
                <h4 className="font-extrabold text-lg group-hover:text-[var(--color-dns-deep)] transition-colors">
                  {corporatePalette.nordicSkyBlue.name}
                </h4>
                <p className="text-xs mt-2 leading-relaxed font-light opacity-90">
                  {lang === 'de' && corporatePalette.nordicSkyBlue.description.de}
                  {lang === 'it' && corporatePalette.nordicSkyBlue.description.it}
                  {lang === 'en' && <>Symbolises <strong>serenity, balance, and freedom</strong>. Reflects the vast alpine sky over the Dolomites.</>}
                </p>
              </div>
              <div className="pt-3 border-t border-current/20 text-[11px] font-mono opacity-80">
                HEX: {corporatePalette.nordicSkyBlue.hex} • RGB: {rgbFromHex(corporatePalette.nordicSkyBlue.hex)}
              </div>
            </div>

            {/* Color 3 */}
            <div className={`border rounded-2xl p-6 space-y-4 hover:border-[var(--color-dns-deep)] transition-all group ${
              isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)]/50' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/30'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-dns-light)] border border-white/40 flex items-center justify-center font-mono font-bold text-xs text-[var(--color-dns-primary-dark)] shadow-inner">
                {corporatePalette.deepGlacierBlue.hex.slice(1)}
              </div>
              <div>
                <h4 className="font-extrabold text-lg group-hover:text-[var(--color-dns-deep)] transition-colors">
                  {corporatePalette.deepGlacierBlue.name}
                </h4>
                <p className="text-xs mt-2 leading-relaxed font-light opacity-90">
                  {lang === 'de' && corporatePalette.deepGlacierBlue.description.de}
                  {lang === 'it' && corporatePalette.deepGlacierBlue.description.it}
                  {lang === 'en' && <>Evokes <strong>strength, trust, and endurance</strong>. Inspired by mountain lakes and the cross-country spirit.</>}
                </p>
              </div>
              <div className="pt-3 border-t border-current/20 text-[11px] font-mono opacity-80">
                HEX: {corporatePalette.deepGlacierBlue.hex} • RGB: {rgbFromHex(corporatePalette.deepGlacierBlue.hex)}
              </div>
            </div>

          </div>
        </div>

        {/* 2. TYPEFACE GUIDE */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg border ${
              isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-light)]/30 text-[var(--color-dns-light)]'
            }`}>
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-[family-name:var(--font-display)]">
                {lang === 'de' && 'Typografie & Offizielle Schriftarten'}
                {lang === 'it' && 'Tipografia & Caratteri Ufficiali'}
                {lang === 'en' && 'Typography & Official Fonts'}
              </h3>
              <p className="text-xs font-light opacity-80">
                {lang === 'de' && 'Typografische Hierarchie und freigegebene Schriftarten für Druck, Web und Publikationen'}
                {lang === 'it' && 'Gerarchia tipografica e caratteri approvati per stampa, web e pubblicazioni'}
                {lang === 'en' && 'Typographic hierarchy and approved typefaces for print, web, and publishing'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Print Typeface */}
            <div className={`border rounded-2xl p-6 space-y-4 shadow-xl border-l-8 ${
              isLight ? 'bg-[var(--color-dns-surface)] border-[var(--color-dns-secondary-dark)] border-l-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-mid)]/40 border-l-[var(--color-dns-light)]'
            }`}>
              <span className={`text-xs font-mono font-bold uppercase ${isLight ? 'text-[var(--color-dns-deep)]' : 'text-[var(--color-dns-light)]'}`}>
                PRINT & PUBLISHING
              </span>
              <h4 className="font-extrabold text-xl font-[family-name:var(--font-display)]">Futura Std & Univers LT</h4>
              <div className="space-y-2 text-sm opacity-90">
                <p className="font-bold text-base">Futura Std Bold ({lang === 'de' ? 'Druck-Überschriften' : lang === 'en' ? 'Print Headings' : 'Titoli Stampa'})</p>
                <p className="font-normal text-sm">Futura Std Book ({lang === 'de' ? 'Untertitel' : lang === 'en' ? 'Subtitles' : 'Sottotitoli'})</p>
                <p className="font-light text-xs">Univers LT Std 45 Light ({lang === 'de' ? 'Fließtext' : lang === 'en' ? 'Body Text' : 'Testo Corrente'})</p>
                <p className="font-light text-xs italic">Univers Std 47 Light Condensed ({lang === 'de' ? 'Technische Details' : lang === 'en' ? 'Technical Details' : 'Dettagli Tecnici'})</p>
              </div>
            </div>

            {/* Web Typeface */}
            <div className={`border rounded-2xl p-6 space-y-4 shadow-xl border-l-8 ${
              isLight ? 'bg-[var(--color-dns-surface)] border-[var(--color-dns-secondary-dark)] border-l-[var(--color-dns-mid)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-mid)]/40 border-l-[var(--color-dns-mid)]'
            }`}>
              <span className={`text-xs font-mono font-bold uppercase ${isLight ? 'text-[var(--color-dns-deep)]' : 'text-[var(--color-dns-light)]'}`}>
                WEB & DIGITAL ECOSYSTEM
              </span>
              <h4 className="font-extrabold text-xl font-[family-name:var(--font-display)]">Be Vietnam Pro & Roboto</h4>
              <div className="space-y-2 text-sm opacity-90">
                <p className="font-black text-base font-[family-name:var(--font-display)]">Be Vietnam Pro Black 900 ({lang === 'de' ? 'Hauptüberschriften' : lang === 'en' ? 'Headings' : 'Headings'})</p>
                <p className="font-light text-sm font-[family-name:var(--font-display)]">Be Vietnam Pro Light 300 ({lang === 'de' ? 'Unterüberschriften' : lang === 'en' ? 'Subheadings' : 'Subheadings'})</p>
                <p className="font-light text-xs font-[family-name:var(--font-alt)]">Roboto Light ({lang === 'de' ? 'Digitaler Fließtext' : lang === 'en' ? 'Digital Body Text' : 'Body Text Digital'})</p>
                <p className="font-normal text-xs font-[family-name:var(--font-alt)]">Roboto Regular Condensed ({lang === 'de' ? 'Tabellen & Daten' : lang === 'en' ? 'Tables & Data' : 'Tabelle & Data'})</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. LOGO EVOLUTION TIMELINE & DECODING */}
        <div className={`border rounded-3xl p-6 sm:p-10 space-y-10 shadow-2xl transition-colors ${
          isLight ? 'bg-[var(--color-dns-surface)] border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/40'
        }`}>
          
          {/* Timeline Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 border-current/20">
            <div>
              <div className={`flex items-center space-x-2 font-bold text-xs ${isLight ? 'text-[var(--color-dns-deep)]' : 'text-[var(--color-dns-light)]'}`}>
                <History className="w-4 h-4" />
                <span>
                  {lang === 'de' && 'MARKENEVOLUTION (2000 - 2025)'}
                  {lang === 'it' && 'EVOLUZIONE DEL BRAND (2000 - 2025)'}
                  {lang === 'en' && 'BRAND EVOLUTION (2000 - 2025)'}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-display)] mt-1">
                {lang === 'de' && 'Die Geschichte des Logos Dolomiti NordicSki'}
                {lang === 'it' && 'La Storia del Logo Dolomiti NordicSki'}
                {lang === 'en' && 'History of the Dolomiti NordicSki Logo'}
              </h3>
            </div>

            <button
              onClick={() => setActiveTimelineYear(2025)}
              className={`px-4 py-2 rounded-xl border font-bold text-xs flex items-center space-x-2 transition-all shadow-md ${
                isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-light)]/40 text-[var(--color-dns-light)]'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                {lang === 'de' && 'Timeline 2025 neu starten'}
                {lang === 'it' && 'Riavvia Timeline 2025'}
                {lang === 'en' && 'Restart Timeline 2025'}
              </span>
            </button>
          </div>

          {/* Interactive Stepper */}
          <div className="space-y-6">
            <div className="flex items-center justify-between overflow-x-auto pb-4 gap-2">
              {timelineYears.map((yr) => {
                const isActive = activeTimelineYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setActiveTimelineYear(yr)}
                    className={`px-4 py-2 rounded-xl font-mono text-xs font-extrabold transition-all shrink-0 border ${
                      isActive
                        ? isLight
                          ? 'bg-[var(--color-dns-deep)] text-white border-[var(--color-dns-primary-dark)] shadow-lg scale-110'
                          : 'bg-[var(--color-dns-light)] text-[var(--color-dns-primary-dark)] border-white shadow-lg scale-110'
                        : isLight
                          ? 'bg-[var(--color-dns-bg)] text-[var(--color-dns-primary-dark)] border-[var(--color-dns-secondary-dark)]'
                          : 'bg-[var(--color-dns-primary-dark)] text-slate-300 border-[var(--color-dns-mid)]/40'
                    }`}
                  >
                    {yr}
                  </button>
                );
              })}
            </div>

            {/* Stage Preview */}
            <div className={`p-8 rounded-2xl border text-center space-y-4 ${
              isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/40'
            }`}>
              <div className="bg-white p-6 rounded-2xl max-w-md mx-auto shadow-xl border border-slate-200 flex items-center justify-center h-32 sm:h-40">
                <img 
                  src={DNS_SHARED_WEB_LOGO_URL} 
                  alt={`Dolomiti NordicSki Logo ${activeTimelineYear}`} 
                  className="max-h-24 sm:max-h-28 w-auto object-contain transition-all duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className={`text-xs font-mono font-bold ${isLight ? 'text-[var(--color-dns-deep)]' : 'text-[var(--color-dns-light)]'}`}>
                  {lang === 'de' && `MARKENVERSION ${activeTimelineYear}`}
                  {lang === 'it' && `VERSIONE BRAND ${activeTimelineYear}`}
                  {lang === 'en' && `BRAND VERSION ${activeTimelineYear}`}
                </span>
                <p className="text-xs opacity-90 max-w-lg mx-auto font-light leading-relaxed">
                  {activeTimelineYear === 2025 
                    ? (lang === 'de' 
                        ? 'Das Restyling 2025 erneuert die Typografie, verfeinert den 3D Nordic Swoosh und lässt den Langläufer dynamisch und geschlechtsneutral auftreten.'
                        : lang === 'en'
                        ? 'The 2025 restyling renews typography, refines the 3D Nordic Swoosh, and portrays the cross-country skier dynamically and gender-neutrally.'
                        : 'Il restyling 2025 rinnova la tipografia, affina il Nordic Swoosh 3D e rende la figura del fondista dinamica e neutrale.')
                    : (lang === 'de'
                        ? `Historische Version ${activeTimelineYear}: Ständige Weiterentwicklung von Qualität und Integration des Langlaufkarussells.`
                        : lang === 'en'
                        ? `Historical version ${activeTimelineYear}: continuous evolution of quality and cross-country carousel integration.`
                        : `Versione storica ${activeTimelineYear}: l'evoluzione costante della qualità e dell'integrazione del carosello di fondo.`)}
                </p>
              </div>
            </div>
          </div>

          {/* LOGO DECODING (3 CORE ELEMENTS) */}
          <div className="pt-6 border-t border-current/20 space-y-6">
            <h4 className="text-xl font-black font-[family-name:var(--font-display)]">
              {lang === 'de' && 'Anatomie & Decodierung des Logos (3 Kern-Elemente)'}
              {lang === 'it' && 'Anatomia e Decodifica del Logo (3 Elementi Chiave)'}
              {lang === 'en' && 'Logo Anatomy & Decoding (3 Core Elements)'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Element 1 */}
              <div className={`border rounded-2xl p-6 space-y-3 shadow-xl ${
                isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/40'
              }`}>
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded border ${
                  isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-mid)]/50 text-[var(--color-dns-light)]'
                }`}>
                  1. TEXTUAL ELEMENT
                </span>
                <h5 className="font-extrabold text-base">DOLOMITI + NORDICSKI</h5>
                <p className="text-xs opacity-90 leading-relaxed font-light">
                  {lang === 'de' && <>Die Wortmarke kombiniert <strong>"DOLOMITI"</strong> in prägnanter Schrift und heller Farbe (USP-Fokus) mit <strong>"NORDICSKI"</strong> für optimale Lesbarkeit auf Distanz.</>}
                  {lang === 'it' && <>Il logotipo combina <strong>"DOLOMITI"</strong> in lettere audaci e colore più chiaro (richiamo immediato alla USP) con <strong>"NORDICSKI"</strong> in colore scuro per massima leggibilità a distanza.</>}
                  {lang === 'en' && <>The logotype combines <strong>"DOLOMITI"</strong> in bold lettering and lighter colour (USP focus) with <strong>"NORDICSKI"</strong> in darker tone for maximum legibility at a distance.</>}
                </p>
              </div>

              {/* Element 2 */}
              <div className={`border rounded-2xl p-6 space-y-3 shadow-xl ${
                isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/40'
              }`}>
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded border ${
                  isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-mid)]/50 text-[var(--color-dns-light)]'
                }`}>
                  2. SKIER
                </span>
                <h5 className="font-extrabold text-base">
                  {lang === 'de' && 'LANGLÄUFER-PIKTOGRAMM'}
                  {lang === 'it' && 'PITTOGRAMMA FONDISTA'}
                  {lang === 'en' && 'SKIER PICTOGRAM'}
                </h5>
                <p className="text-xs opacity-90 leading-relaxed font-light">
                  {lang === 'de' && <>Konzipiert als <strong>geschlechtsneutrale Figur</strong>. Bewegt sich auf den Betrachter zu und vermittelt Dynamik, Herzlichkeit und Sportleidenschaft.</>}
                  {lang === 'it' && <>Concepito come una <strong>figura neutrale dal punto di vista del genere</strong>. Si muove nella direzione dell'osservatore, trasmettendo dinamismo, accoglienza e passione per lo sport.</>}
                  {lang === 'en' && <>Designed as a <strong>gender-neutral figure</strong> moving towards the viewer, conveying dynamism, hospitality, and passion for sport.</>}
                </p>
              </div>

              {/* Element 3 */}
              <div className={`border rounded-2xl p-6 space-y-3 shadow-xl ${
                isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/40'
              }`}>
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded border ${
                  isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-mid)]/50 text-[var(--color-dns-light)]'
                }`}>
                  3. NORDIC SWOOSH
                </span>
                <h5 className="font-extrabold text-base">
                  {lang === 'de' && 'DYNAMISCHER 3D-SCHWUNG'}
                  {lang === 'it' && 'CURVA DINAMICA 3D'}
                  {lang === 'en' && 'DYNAMIC 3D SWOOSH'}
                </h5>
                <p className="text-xs opacity-90 leading-relaxed font-light">
                  {lang === 'de' && <>Erinnert an die <strong>ikonischen Langlaufspuren</strong> und das Prinzip von Herzlichkeit und Verbindung aller 1.000 km Loipen zu einem Karussell.</>}
                  {lang === 'it' && <>Richiama le <strong>iconiche tracce da fondo</strong> ed il concetto di abbraccio/ospitalità, unendo i 1.000 km di piste in un unico grande carosello alpino.</>}
                  {lang === 'en' && <>Evokes <strong>iconic cross-country tracks</strong> and the concept of hospitality, uniting all 1,000 km of trails into one grand carousel.</>}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* 4. LOGO INSPECTOR & DOWNLOAD CENTER */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg border ${
              isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-light)]/30 text-[var(--color-dns-light)]'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-[family-name:var(--font-display)]">
                {lang === 'de' && 'Offizielle Logos & Vektorformate'}
                {lang === 'it' && 'Loghi Ufficiali & Formati Vettoriali'}
                {lang === 'en' && 'Official Logos & Vector Formats'}
              </h3>
              <p className="text-xs font-light opacity-80">
                {lang === 'de' && 'Wählen Sie die Variante und laden Sie das Logo im passenden Format herunter (Druck Vektor oder Digital Web)'}
                {lang === 'it' && 'Seleziona la variante e scarica il logo nel formato necessario (Print Vettoriale o Digital Web)'}
                {lang === 'en' && 'Select the variant and download the logo in the required format (Print Vector or Digital Web)'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Logo Selector Tabs */}
            <div className="lg:col-span-4 space-y-3">
              {LOGO_VARIANTS.map((variant) => {
                const isSelected = variant.id === selectedLogoId;
                const vName = getLoc(variant.name, lang);
                const vUseCase = getLoc(variant.useCase, lang);
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedLogoId(variant.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col space-y-2 ${
                      isSelected
                        ? isLight
                          ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-deep)] shadow-md'
                          : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-light)] shadow-md'
                        : isLight
                          ? 'bg-white border-[var(--color-dns-secondary-dark)]/50 hover:bg-[var(--color-dns-bg)]'
                          : 'bg-[var(--color-dns-primary-dark)]/80 border-[var(--color-dns-mid)]/30 hover:bg-[var(--color-dns-deep)]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-sm ${
                        isSelected ? (isLight ? 'text-[var(--color-dns-deep)]' : 'text-[var(--color-dns-light)]') : 'opacity-90'
                      }`}>
                        {vName}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/10 border border-current/20">
                        {variant.downloadSize}
                      </span>
                    </div>
                    <p className="text-xs opacity-80 line-clamp-2 font-light">
                      {vUseCase}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Logo Visual Stage */}
            <div className={`lg:col-span-8 border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl ${
              isLight ? 'bg-white border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-mid)]/50'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/20 pb-4">
                <div>
                  <h4 className="font-black text-lg font-[family-name:var(--font-display)]">{getLoc(activeLogo.name, lang)}</h4>
                  <p className="text-xs opacity-80 mt-0.5 font-light">{getLoc(activeLogo.useCase, lang)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium opacity-80">
                    {lang === 'de' && 'Vorschau-Hintergrund:'}
                    {lang === 'it' && 'Sfondo Anteprima:'}
                    {lang === 'en' && 'Preview Background:'}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase px-2 py-1 rounded border border-current/20 bg-current/10">
                    {activeLogo.bgType}
                  </span>
                </div>
              </div>

              {/* Graphical rendering of logo */}
              <div className={`w-full h-64 sm:h-80 rounded-xl flex items-center justify-center p-8 border border-current/20 relative overflow-hidden transition-colors ${
                activeLogo.bgType === 'dark' ? 'bg-[var(--color-dns-primary-dark)]' :
                activeLogo.bgType === 'light' ? 'bg-white' :
                activeLogo.bgType === 'color' ? 'bg-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-primary-dark)] bg-[radial-gradient(var(--color-dns-mid)_1px,transparent_1px)] [background-size:16px_16px]'
              }`}>
                {/* Official Base64 Logo Image Rendering */}
                <div className="flex flex-col items-center justify-center text-center space-y-4 select-none">
                  <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md flex items-center justify-center border border-slate-200">
                    <img 
                      src={DNS_SHARED_WEB_LOGO_URL} 
                      alt="Dolomiti NordicSki Masterbrand" 
                      className="max-h-28 sm:max-h-36 w-auto object-contain"
                    />
                  </div>
                  
                  <div className="pt-2 flex items-center space-x-2 opacity-80 text-[10px] font-mono tracking-widest uppercase text-[var(--color-dns-deep)]">
                    <span>
                      {lang === 'de' && '[ SCHUTZZONE MINDESTABSTAND = H(D) ]'}
                      {lang === 'it' && '[ AREA DI RISPETTO MARGINE = H(D) ]'}
                      {lang === 'en' && '[ CLEAR SPACE MARGIN = H(D) ]'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Download Buttons for Formats */}
              <div className="space-y-3 pt-2">
                <span className={`text-xs font-bold uppercase tracking-wider block ${isLight ? 'text-[var(--color-dns-deep)]' : 'text-[var(--color-dns-light)]'}`}>
                  {lang === 'it' && 'Scarica nei Formati Standard:'}
                  {lang === 'de' && 'Herunterladen im Standardformat:'}
                  {lang === 'en' && 'Download Standard Formats:'}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeLogo.fileFormats.map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => handleDownloadLogo(getLoc(activeLogo.name, lang), fmt)}
                      className={`px-4 py-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all group shadow-md ${
                        isLight 
                          ? 'bg-[var(--color-dns-bg)] hover:bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-primary-dark)]' 
                          : 'bg-[var(--color-dns-primary-dark)] hover:bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/50 text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Download className="w-3.5 h-3.5 text-[var(--color-dns-deep)] group-hover:scale-110 transition-transform" />
                        <span>{fmt}</span>
                      </div>
                      <span className="text-[10px] opacity-70 font-mono">
                        {fmt === 'EPS' ? 'Vector' : fmt === 'SVG' ? 'Web' : fmt.includes('PNG') ? 'HD 300DPI' : 'Doc'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. BRAND GUIDELINES (DOS & DON'TS) */}
        <div className="space-y-6 pt-6 border-t border-current/20">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg border ${
              isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)] text-[var(--color-dns-deep)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-light)]/30 text-[var(--color-dns-light)]'
            }`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-[family-name:var(--font-display)]">
                {lang === 'de' && 'Nutzungsregeln & Co-Branding'}
                {lang === 'it' && 'Regole d\'Uso & Co-Branding'}
                {lang === 'en' && 'Usage Rules & Co-Branding'}
              </h3>
              <p className="text-xs font-light opacity-80">
                {lang === 'de' && 'Korrekte Markenintegration für Hotels, Pensionen und lokale Marketing-Websites.'}
                {lang === 'it' && 'Integrazione corretta del marchio per alberghi, guesthouse e siti promozionali locali.'}
                {lang === 'en' && 'Correct brand integration for hotels, guest houses, and local promotional portals.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRAND_GUIDELINES.map((guideline, idx) => {
              const gTitle = getLoc(guideline.title, lang);
              const gDesc = getLoc(guideline.description, lang);
              return (
                <div 
                  key={idx}
                  className={`border rounded-2xl p-6 space-y-4 shadow-xl ${
                    isLight ? 'bg-white border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-deep)] border-[var(--color-dns-mid)]/40'
                  }`}
                >
                  <h4 className="font-black text-base flex items-center space-x-2 font-[family-name:var(--font-display)] text-[var(--color-dns-deep)]">
                    <Info className="w-4 h-4" />
                    <span>{gTitle}</span>
                  </h4>
                  <p className="text-xs leading-relaxed font-light opacity-90">
                    {gDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-current/20">
                    {/* DOs */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 text-[var(--color-dns-deep)]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'de' && 'Erlaubt (DOs)'}
                          {lang === 'it' && 'Ammesso (DOs)'}
                          {lang === 'en' && 'Allowed (DOs)'}
                        </span>
                      </span>
                      <ul className="space-y-1.5">
                        {guideline.dos.map((doItem, dIdx) => (
                          <li key={dIdx} className="text-[11px] flex items-start space-x-1.5 opacity-90">
                            <span className="text-[var(--color-dns-deep)] mt-0.5">•</span>
                            <span>{getLoc(doItem, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DON'Ts */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 flex items-center space-x-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'de' && 'Nicht erlaubt (DON\'Ts)'}
                          {lang === 'it' && 'Vietato (DON\'Ts)'}
                          {lang === 'en' && 'Forbidden (DON\'Ts)'}
                        </span>
                      </span>
                      <ul className="space-y-1.5">
                        {guideline.donts.map((dontItem, dnIdx) => (
                          <li key={dnIdx} className="text-[11px] flex items-start space-x-1.5 opacity-90">
                            <span className="text-rose-500 mt-0.5">•</span>
                            <span>{getLoc(dontItem, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AGENCY CREDIT FOOTER NOTICE */}
        <div className={`p-6 rounded-2xl border text-center space-y-2 ${
          isLight ? 'bg-[var(--color-dns-bg)] border-[var(--color-dns-secondary-dark)]' : 'bg-[var(--color-dns-primary-dark)] border-[var(--color-dns-mid)]/30'
        }`}>
          <p className="text-xs font-light opacity-90">
            {lang === 'de' && <>Das Corporate Design wurde von der Agentur <strong className="text-[var(--color-dns-deep)]">PINKHAND</strong> entwickelt.</>}
            {lang === 'it' && <>Il Corporate Design è stato sviluppato dall'agenzia <strong className="text-[var(--color-dns-deep)]">PINKHAND</strong>.</>}
            {lang === 'en' && <>The Corporate Design was developed by the agency <strong className="text-[var(--color-dns-deep)]">PINKHAND</strong>.</>}
          </p>
        </div>

      </div>
    </div>
  );
};
