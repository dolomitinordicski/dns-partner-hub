import { readFileSync } from 'node:fs';

const canonicalConsumers = [
  'src/components/WidgetCreator.tsx',
  'src/components/widget-creator/WidgetControls.tsx',
  'src/components/widget-creator/reportingAreas.ts',
  'src/components/RegionsSection.tsx',
];

let failed = false;
for (const path of canonicalConsumers) {
  const source = readFileSync(path, 'utf8');
  const forbidden = [
    /\bNORDIC_REGIONS\b/,
    /from\s*['"][^'"]*portalData['"]/,
  ];
  // portalData imports are forbidden only in area-selection models and RegionsSection;
  // WidgetCreator modules should import other shared assets via their own contracts.
  for (const pattern of forbidden) {
    if (pattern.test(source)) {
      console.error(`Legacy regional dependency in ${path}: ${pattern}`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log('Canonical area consumers do not import legacy portalData / NORDIC_REGIONS.');
