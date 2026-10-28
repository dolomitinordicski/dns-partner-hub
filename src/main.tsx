import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DNS_DESIGN_SYSTEM } from '@dolomitinordicski/dns-shared-data/design-system';
import { initDNSUIPrimitives } from '@dolomitinordicski/dns-shared-data/ui/primitives';
import { initDNSShellRuntime } from '@dolomitinordicski/dns-shared-data/ui/shell';
import { initDNSAccessibilityRuntime } from '@dolomitinordicski/dns-shared-data/ui/accessibility';
import { applyDNSDesignVariables } from '@dolomitinordicski/dns-shared-data/foundation';

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
applyDNSDesignVariables();
initDNSUIPrimitives();
initDNSShellRuntime('portal');
const a11y = initDNSAccessibilityRuntime({ language: 'de' });
// Use Foundation's single accessibility panel; no local legacy modal.
document.addEventListener('dns:open-accessibility', () => a11y.togglePanel());
document.addEventListener('dns:portal-language', (event) => {
  const language = (event as CustomEvent<{ language: string }>).detail?.language;
  a11y.setLanguage(language === 'it' ? 'it' : 'de');
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
