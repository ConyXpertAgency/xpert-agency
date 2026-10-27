import assert from 'node:assert/strict';
import test from 'node:test';
import { isPlainAdminField, readPlainEditable, validateContactTeamsPlainText } from '../src/lib/adminTextPolicy.ts';

test('Contact identity, phone, address, email and role fields are plain text', () => {
  for (const key of ['name', 'role', 'publicEmail']) {
    assert.equal(isPlainAdminField('contact', 'teams', ['items', '0', 'contacts', '0', key]), true);
  }
  for (const key of ['phones', 'addresses', 'countries']) {
    assert.equal(isPlainAdminField('contact', 'teams', ['items', '0', 'contacts', '0', key, '0']), true);
  }
  assert.equal(isPlainAdminField('home', 'hero', ['description']), false);
});

test('Contact save rejects markup and entities in plain fields, including raw JSON editor', () => {
  const base = { title: 'Contact', items: [{ id: 'europe', region: 'Europe', contacts: [{ id: 'elmar', name: 'Elmar', phones: ['+49 123'], addresses: ['Street 1'] }] }] };
  assert.equal(validateContactTeamsPlainText(base), null);
  for (const bad of ['<span>+49 123</span>', '<div>+49 123</div>', '<br>', '&nbsp;', '&amp;', '<img src=x onerror=alert(1)>']) {
    const data = structuredClone(base);
    data.items[0].contacts[0].phones[0] = bad;
    assert.match(validateContactTeamsPlainText(data), /items\[0\]\.contacts\[0\]\.phones\[0\]/);
  }
});

test('Contact validator keeps ordinary ampersands and all unformatted content', () => {
  assert.equal(validateContactTeamsPlainText({ items: [{ region: 'Asia', contacts: [{ name: 'A & B', role: 'Sales & Marketing', publicEmail: 'a@example.com', addresses: ['Road 7'] }] }] }), null);
});

test('plain editable serialization preserves the browser-visible newline', () => {
  const element = { textContent: 'Street 1City', innerText: 'Street 1\nCity' };
  assert.equal(readPlainEditable(element), 'Street 1\nCity');
});
