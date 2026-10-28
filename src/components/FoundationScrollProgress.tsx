import { useEffect, useRef } from 'react';
import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data/design-system';
import { getDNSShellProfile } from '@dolomitinordicski/dns-shared-data/shell-profiles';
import { initDNSNavigationRuntime } from '@dolomitinordicski/dns-shared-data/ui/navigation';

/**
 * Foundation's standard scroll-progress track, without a fake tab-navigation bar.
 * Portal retains its official app sidebar; Foundation owns measurement and progress.
 */
export function FoundationScrollProgress() {
  const hostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-dns-tool-header]');
    const host = hostRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!header || !host || !track || !bar) return;

    const runtime = initDNSNavigationRuntime({
      header,
      nav: host,
      progressTrack: track,
      progressBar: bar,
      headerTokens: {
        ...DNS_DESIGN_SYSTEM.header,
        scrollBehavior: {
          ...DNS_DESIGN_SYSTEM.header.scrollBehavior,
          hideOnScrollDown: getDNSShellProfile('portal').header.hideOnScrollDown,
        },
      },
    });
    return () => runtime.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="sticky top-[var(--dns-header-visible-height,0px)] z-[25] w-full">
      <div
        ref={trackRef}
        className="dns-scroll-progress-track"
        data-dns-scroll-progress
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <span ref={barRef} className="dns-scroll-progress-bar" data-dns-scroll-progress-bar />
      </div>
    </div>
  );
}
