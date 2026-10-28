import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './tailwind.css';
// Local bundled font files: no request to third-party font CDNs at runtime.
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { applyDNSDesignVariables } from '@dolomitinordicski/dns-shared-data/foundation';
import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data/design-system';
import { getDNSShellProfile } from '@dolomitinordicski/dns-shared-data/shell-profiles';
import { initDNSUIPrimitives } from '@dolomitinordicski/dns-shared-data/ui/primitives';
import { initDNSShellRuntime } from '@dolomitinordicski/dns-shared-data/ui/shell';
import { initDNSFooterRuntime } from '@dolomitinordicski/dns-shared-data/ui/footer';
import { initDNSToolChromeRuntime } from '@dolomitinordicski/dns-shared-data/ui/tool-chrome';

// Apply Foundation's canonical design variables, not local design-token aliases.
applyDNSDesignVariables();

// Foundation owns the UI primitives, shell, footer and header/navigation behavior.
initDNSUIPrimitives();
initDNSShellRuntime('portal');
// Foundation owns footer decoration and the shared corporate header/navigation runtime.
initDNSFooterRuntime();
initDNSToolChromeRuntime({
  autoCreateProgress: true,
  // Keep the header visible as required by the canonical Portal shell profile.
  headerTokens: {
    ...DNS_DESIGN_SYSTEM.header,
    scrollBehavior: {
      ...DNS_DESIGN_SYSTEM.header.scrollBehavior,
      hideOnScrollDown: getDNSShellProfile('portal').header.hideOnScrollDown,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
