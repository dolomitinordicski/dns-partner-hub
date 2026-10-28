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
  trails: { status: string; observedAt: string | null; openKm: number | null; totalKm: number | null };
  weather: { status: string; observedAt: string | null; temperatureC: number | null; snowDepthCm: number | null };
}
type State = { status: 'loading' | 'available' | 'unavailable' | 'error'; snapshot: PublicWidgetSnapshot | null };

function isSnapshot(value: unknown, season: string, area: string | null): value is PublicWidgetSnapshot {
  if (!value || typeof value !== 'object') return false;
  const s = value as Partial<PublicWidgetSnapshot>;
  if (s.schemaVersion !== 1 || s.seasonId !== season || s.areaId !== area ||
      typeof s.revision !== 'string' || !s.revision ||
      typeof s.publishedAt !== 'string' || !Number.isFinite(Date.parse(s.publishedAt))) return false;
  const logo = s.logo;
  if (logo != null && (typeof logo.url !== 'string' || !logo.url.startsWith('https://') ||
      !logo.alt || !['de', 'it', 'en'].every(key => typeof logo.alt[key as 'de' | 'it' | 'en'] === 'string'))) return false;
  if (!s.pricing || !['available', 'unavailable', 'stale'].includes(s.pricing.status) ||
      !Array.isArray(s.pricing.items) ||
      s.pricing.items.some(p => !p || typeof p.productCode !== 'string' ||
        p.currency !== 'EUR' || !Number.isFinite(p.amount) || p.amount < 0)) return false;
  if (!s.trails || !['available', 'unavailable', 'stale'].includes(s.trails.status) ||
      !s.weather || !['available', 'unavailable', 'stale'].includes(s.weather.status)) return false;
  return true;
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
