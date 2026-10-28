import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/components/CorporateDesignSection.tsx', import.meta.url), 'utf8');

assert.match(source, /from '@dolomitinordicski\/dns-shared-data\/design-system'/, 'Corporate Design must load canonical Foundation design tokens');
assert.match(source, /DNS_DESIGN_SYSTEM\.corporateColors/, 'The three corporate swatches must use Shared Data');
assert.doesNotMatch(source, /#[0-9a-fA-F]{6}\b/, 'Hard-coded CSS HEX values are not allowed in Corporate Design');
assert.doesNotMatch(source, /\bBRAND_COLORS\b/, 'Legacy local palette cannot be the source of corporate colors');
assert.doesNotMatch(source, /font-\['Be_Vietnam_Pro'\]/, 'Typography must use a Foundation font token');
console.log('✓ Corporate Design uses canonical Foundation colors and typography tokens');

assert.match(source, /DNS_SHARED_PRINT_LOGO_URL/, 'Print logo must use released Shared Data asset');
assert.match(source, /downloadOfficialLogo\(activeLogo\.downloadUrl, activeLogo\.fileName\)/, 'Logo download must use the real asset URL');
assert.doesNotMatch(source, /handleDownloadLogo|HD 300DPI|14\.8 MB|Official Logos & Vector Formats/, 'No invented download result, file size, vector or DPI claims');
console.log('✓ Corporate brand downloads reference only the official released PNGs');
