import { useEffect, useState } from 'react';
import { findRegionLogosForEntity, type DNSRegionLogoAsset } from '@dolomitinordicski/dns-shared-data';

const MANIFEST_URL = 'https://raw.githubusercontent.com/dolomitinordicski/dns-shared-data/main/brand/regions/manifest.json';
type Logo = { id: string; url: string; label: string };
type Manifest = { version: number; assets: DNSRegionLogoAsset[] };
let manifestPromise: Promise<Manifest> | undefined;

async function loadManifest(): Promise<Manifest> {
  if (!manifestPromise) {
    manifestPromise = fetch(MANIFEST_URL)
      .then(async response => {
        if (!response.ok) throw new Error('Region logo manifest unavailable');
        const value: unknown = await response.json();
        if (!value || typeof value !== 'object') throw new Error('Invalid logo manifest');
        const manifest = value as Partial<Manifest>;
        if (manifest.version !== 1 || !Array.isArray(manifest.assets)) throw new Error('Unsupported logo manifest');
        return manifest as Manifest;
      })
      .catch(error => { manifestPromise = undefined; throw error; });
  }
  return manifestPromise;
}

/** Official public region branding; independent from season-specific operational snapshots. */
export function useRegionLogos(areaId: string) {
  const [state, setState] = useState<{ status: 'loading' | 'ready' | 'error'; logos: Logo[] }>({ status: 'loading', logos: [] });
  useEffect(() => {
    let active = true;
    if (areaId === 'all') {
      setState({ status: 'ready', logos: [] });
      return () => { active = false; };
    }
    setState({ status: 'loading', logos: [] });
    void loadManifest().then(manifest => {
      if (!active) return;
      const selected = findRegionLogosForEntity(manifest.assets, 'reportingArea', areaId)
        .filter(asset => typeof asset.filename === 'string' && /^[a-z0-9][a-z0-9.-]*\.svg$/i.test(asset.filename))
        .map(asset => ({
          id: asset.id,
          label: asset.label,
          url: new URL(asset.filename, MANIFEST_URL).href,
        }));
      setState({ status: 'ready', logos: selected });
    }).catch(() => { if (active) setState({ status: 'error', logos: [] }); });
    return () => { active = false; };
  }, [areaId]);
  return state;
}
