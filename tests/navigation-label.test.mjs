import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeNavLabels } from '../src/lib/navigationLabels.ts';

test('English About navigation label is expanded without changing other locales or links', () => {
  const items = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
  ];

  assert.deepEqual(normalizeNavLabels(items, 'en'), [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
  ]);
  assert.deepEqual(normalizeNavLabels(items, 'es'), items);
  assert.deepEqual(normalizeNavLabels(items, 'de'), items);
});

test('English About label normalization is safe for editor-managed navigation', () => {
  const items = [{ href: '/about', label: 'Nosotros' }];
  assert.deepEqual(normalizeNavLabels(items, 'en'), [{ href: '/about', label: 'About Us' }]);
});
