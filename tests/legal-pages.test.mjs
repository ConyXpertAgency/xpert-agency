import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('both legal routes retain noindex and share a fail-closed draft component', () => {
  for (const route of ['legal-statements', 'privacy-policy']) {
    const page = readFileSync(`src/app/[locale]/(public)/${route}/page.tsx`, 'utf8');
    assert.match(page, /<LegalDraftPage/);
    assert.match(page, /index: false/);
  }
  const component = readFileSync('src/components/legal/LegalDraftPage.tsx', 'utf8');
  assert.match(component, /if \(!isLegalPreviewAllowed\(\)\) notFound\(\)/);
});

test('public footer hides incomplete legal documents while retaining the existing cookie control', () => {
  const footer = readFileSync('src/components/ui/PublicFooter.tsx', 'utf8');
  assert.doesNotMatch(footer, /legal-statements|privacy-policy|legalCopy/);
  assert.match(footer, /<CookieSettingsLink label=\{copy.cookieSettings\} \/>/);
});
