import { useEffect, useState } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { WIDGET_REPORTING_AREAS } from './reportingAreas';

interface PublicPrice {
  productCode: string;
  currency: 'EUR';
  amount: number;
}
export interface PublicWidgetSnapshot {
  schemaVersion: 1;
  revision: string;
  seasonId: string;
  areaId: string | null;
  publishedAt: string;
  logo: { url: string; alt: { de: string; it: string; en: string } } | null;
  pricing: { status: string; items: PublicPrice[] };
  trails: { status: string; openKm: number | null; totalKm: number | null };
  weather: { status: string; temperatureC: number | null; snowDepthCm: number | null };
}
type State = { status: 'loading' | 'available' | 'unavailable' | 'error'; snapshot: PublicWidgetSnapshot | null };

function isSnapshot(value: unknown, season: string, area: string | null): value is PublicWidgetSnapshot {
  if (!value || typeof value !== 'object') return false;
  const s = value as Partial<PublicWidgetSnapshot>;
  return s.schemaVersion === 1 && s.seasonId === season && s.areaId === area
    && typeof s.revision === 'string' && typeof s.publishedAt === 'string'
    && !!s.pricing && Array.isArray(s.pricing.items) && !!s.trails && !!s.weather;
}

/** Reads a published exact document, never lists or accesses operational collections. */
export function usePublicWidgetSnapshot(seasonId: string, areaId: string) {
  const [state, setState] = useState<State>({ status: 'loading', snapshot: null });
  useEffect(() => {
    let active = true;
    const canonicalAreaId = areaId === 'all' ? null : areaId;
    if (canonicalAreaId && !WIDGET_REPORTING_AREAS.some(a => a.id === canonicalAreaId)) {
      setState({ status: 'unavailable', snapshot: null });
      return;
    }
    const read = async () => {
      try {
        const id = seasonId + '__' + (canonicalAreaId ?? 'all');
        const result = await getDocFromServer(doc(db, 'widgetPublicSnapshots', id));
        if (!active) return;
        const record = result.data();
        const value: unknown = record?.snapshot;
        if (result.exists() && record?.publicationStatus === 'published' && isSnapshot(value, seasonId, canonicalAreaId)) {
          setState({ status: 'available', snapshot: value });
        } else setState({ status: 'unavailable', snapshot: null });
      } catch {
        if (active) setState({ status: 'error', snapshot: null });
      }
    };
    setState({ status: 'loading', snapshot: null });
    void read();
    const timer = window.setInterval(() => { void read(); }, 5 * 60 * 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, [seasonId, areaId]);
  return state;
}
