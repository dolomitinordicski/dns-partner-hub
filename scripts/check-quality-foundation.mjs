import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/components/QualityCriteriaSection.tsx', import.meta.url), 'utf8');
assert.match(source, /DNS_PARTNER_QUALITY_CRITERIA.*@dolomitinordicski\/dns-shared-data\/partner-quality-criteria/s, 'Use canonical Shared Data criteria');
assert.match(source, /DNS_PARTNER_QUALITY_SOURCE\.url/, 'Provide original official source');
assert.doesNotMatch(source, /\bQUALITY_CRITERIA\.map\b|\bcheckedMandatoryCount\b|\bisEligible\b/, 'Remove local six-criterion certification simulation');
assert.doesNotMatch(source, /\bformSubmitted\b|setFormSubmitted/, 'Do not simulate application submissions');
assert.match(source, /onSubmit=\{openEmailDraft\}/, 'Use an explicit user email draft instead of a fictitious backend');
assert.doesNotMatch(source, /#[0-9A-Fa-f]{6}\b/, 'Foundation tokens own all branded colors');
console.log('✓ Quality criteria are canonical; no fake certification or submission; Foundation colors are used');
