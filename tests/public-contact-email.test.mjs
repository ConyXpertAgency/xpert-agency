import assert from 'node:assert/strict';
import test from 'node:test';
import { publicContactEmail } from '../src/lib/site.ts';

test('the withdrawn personal Outlook address cannot be published from CMS settings', () => {
  assert.equal(publicContactEmail('elmar.beckord@outlook.de'), undefined);
  assert.equal(publicContactEmail('  ELMAR.BECKORD@OUTLOOK.DE  '), undefined);
});

test('other configured addresses retain existing behavior', () => {
  assert.equal(publicContactEmail('  team@example.com  '), 'team@example.com');
  assert.equal(publicContactEmail(''), undefined);
});
