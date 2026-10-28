/**
 * Widget products are deliberately separate. A client-provided partner code or
 * role is not evidence of an entitlement: only a DNS Core server grant can
 * enable the partner product.
 */
export type DNSWidgetProduct = 'general' | 'partner';

export interface DNSWidgetPartnerGrant {
  readonly source: 'dns-core';
  readonly organizationId: string;
  readonly partnerId: string;
  readonly widgetEntitlement: true;
  readonly verifiedAt: string;
}

export type DNSWidgetContext =
  | { readonly product: 'general' }
  | { readonly product: 'partner'; readonly grant: DNSWidgetPartnerGrant };

export interface DNSTrailSnapshot {
  readonly source: string;
  readonly observedAt: string;
  readonly fetchedAt: string;
  readonly areaId: string;
  readonly status: 'available' | 'unavailable' | 'stale' | 'error';
  readonly openKm: number | null;
  readonly totalKm: number | null;
}

export function isPartnerWidgetContext(context: DNSWidgetContext): context is Extract<DNSWidgetContext, { product: 'partner' }> {
  return context.product === 'partner'
    && context.grant.source === 'dns-core'
    && context.grant.widgetEntitlement === true
    && Boolean(context.grant.organizationId && context.grant.partnerId && context.grant.verifiedAt);
}
