import type { DNSTrailSnapshot } from './widgetContracts';

/**
 * Boundary for official trail observations. This does not fetch data or
 * endorse a particular upstream provider; the feed adapter must pass through
 * this validation before anything is presented as available.
 */
export function validateTrailSnapshot(
  input: unknown,
  expectedAreaId: string,
  maxAgeMs: number,
  nowMs: number = Date.now()
): DNSTrailSnapshot | null {
  if (!input || typeof input !== 'object' || maxAgeMs <= 0 || !expectedAreaId) return null;
  const value = input as Record<string, unknown>;
  if (typeof value.source !== 'string' || !value.source.trim()
    || value.areaId !== expectedAreaId
    || typeof value.observedAt !== 'string'
    || typeof value.fetchedAt !== 'string'
    || !['available', 'unavailable', 'stale', 'error'].includes(String(value.status))) return null;

  const observedMs = Date.parse(value.observedAt);
  const fetchedMs = Date.parse(value.fetchedAt);
  if (!Number.isFinite(observedMs) || !Number.isFinite(fetchedMs)
    || observedMs > nowMs || fetchedMs > nowMs || fetchedMs < observedMs) return null;

  const kmIsValid = (km: unknown): km is number | null =>
    km === null || (typeof km === 'number' && Number.isFinite(km) && km >= 0);
  if (!kmIsValid(value.openKm) || !kmIsValid(value.totalKm)
    || (value.openKm !== null && value.totalKm !== null && value.openKm > value.totalKm)) return null;

  const isFresh = nowMs - observedMs <= maxAgeMs;
  return {
    source: value.source.trim(),
    areaId: expectedAreaId,
    observedAt: value.observedAt,
    fetchedAt: value.fetchedAt,
    status: value.status === 'available' && !isFresh ? 'stale' : value.status as DNSTrailSnapshot['status'],
    openKm: value.openKm,
    totalKm: value.totalKm
  };
}
