import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './tailwind.css';
import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data/design-system';
import { initDNSUIPrimitives } from '@dolomitinordicski/dns-shared-data/ui/primitives';
import { initDNSShellRuntime } from '@dolomitinordicski/dns-shared-data/ui/shell';
import { initDNSFooterRuntime } from '@dolomitinordicski/dns-shared-data/ui/footer';
import { initDNSToolChromeRuntime } from '@dolomitinordicski/dns-shared-data/ui/tool-chrome';

// Foundation owns the source tokens. Keep existing component classes during migration.
const { colors, typography } = DNS_DESIGN_SYSTEM;
const rootStyle = document.documentElement.style;
rootStyle.setProperty('--dns-primary', colors.deep);
rootStyle.setProperty('--dns-deep', colors.primaryDark);
rootStyle.setProperty('--dns-teal', colors.mid);
rootStyle.setProperty('--dns-soft', colors.light);
rootStyle.setProperty('--dns-bg', colors.background);
rootStyle.setProperty('--dns-font-heading', `"${typography.primaryFamily}", system-ui, sans-serif`);
rootStyle.setProperty('--dns-font-body', `"${typography.secondaryFamily}", system-ui, sans-serif`);


// Foundation primitives are shared; retain the existing accessibility dialog for now.
initDNSUIPrimitives();
initDNSShellRuntime('portal');
// Foundation owns footer decoration and the shared corporate header/navigation runtime.
initDNSFooterRuntime();
initDNSToolChromeRuntime({ autoCreateProgress: false });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
