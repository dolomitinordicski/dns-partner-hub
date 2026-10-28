import { REPORTING_AREAS } from '@dolomitinordicski/dns-shared-data';
import type { Language } from '../../types';

/** Use Shared Data's canonical IDs and localized names; no Portal-side copies. */
export const WIDGET_REPORTING_AREAS = REPORTING_AREAS.filter(area => area.active);

export function getWidgetAreaName(areaId: string, language: Language): string {
  if (areaId === 'all') {
    return language === 'de' ? 'Alle DNS Gebiete'
      : language === 'it' ? 'Tutte le aree DNS' : 'All DNS areas';
  }
  return WIDGET_REPORTING_AREAS.find(area => area.id === areaId)?.localizedName[language]
    ?? 'Dolomiti NordicSki';
}

/** Transitional embed compatibility: aliases are sourced from Shared Data, not hardcoded. */
export function toLegacyWidgetAreaId(canonicalId: string): string {
  if (canonicalId === 'all') return 'all';
  const area = WIDGET_REPORTING_AREAS.find(entry => entry.id === canonicalId);
  return area?.legacyRefs.partnerPortal?.[0] ?? canonicalId;
}
