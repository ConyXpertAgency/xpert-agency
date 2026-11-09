import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import Module, { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);

function renderContact(contacts) {
  const filename = new URL('../src/components/contact/ContactExperience.tsx', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
  const component = new Module(filename);
  component.filename = filename;
  component.require = (id) => {
    if (id.endsWith('Contact.module.css')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) };
    if (id === '@/components/ui/RichText') return { __esModule: true, default: ({ children }) => children };
    if (id === '@/components/ui/PictureSvg' || id === '@/components/contact/ContactForm') return { __esModule: true, default: () => null };
    if (id === '@/lib/supabase/client') return { resolveStorageUrl: () => undefined };
    if (id === '@/lib/supabase/icons') return { getIcon: () => null };
    if (id === '@/lib/site') return { ELMAR_LINKEDIN_URL: 'https://www.linkedin.com/in/elmar-beckord/' };
    if (id === '@/lib/contactSocial') return require('../src/lib/contactSocial.ts');
    return require(id);
  };
  component._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS },
  }).outputText, filename);
  return renderToStaticMarkup(React.createElement(component.exports.default, {
    pageData: { badge: 'Contact', title: 'Contact', subtitle: 'Regional team', features: [], team_section: { title: 'Team' }, form: {} },
    teamsData: { items: [{ id: 'europe', region: 'Europe', contacts }] },
  }));
}

test('rendered social links belong to their contact and exact authorized phone, preserving CMS text', () => {
  const html = renderContact([
    { id: 'elmar-a-beckord', name: 'Elmar A. Beckord', role: 'Partner', countries: ['Germany'], publicEmail: 'elmar@example.test', phones: ['+49 171 8892 788', '+55 52 3431 5953'] },
    { id: 'manuel-josef-schmid', name: 'Manuel Josef Schmid', phones: ['+49 151 42471640'] },
  ]);
  const cards = html.match(/<li class="ContactCard[\s\S]*?<\/li>/g);
  assert.equal(cards.length, 2);
  assert.match(cards[0], /aria-label="LinkedIn: Elmar A\. Beckord"/);
  assert.match(cards[0], /<div class="PhoneRow"><span class="ContactMeta">\+49 171 8892 788<\/span><\/div>/);
  const row = cards[0].match(/<div class="ContactActions">([\s\S]*?)<\/div>/)?.[1];
  assert.ok(row);
  assert.deepEqual([...row.matchAll(/href="([^"]+)"/g)].map((match) => match[1]), [
    'mailto:elmar@example.test', 'https://www.linkedin.com/in/elmar-beckord/', 'https://wa.me/491718892788',
  ]);
  assert.doesNotMatch(row, /<span>LinkedIn<\/span>/);
  assert.match(row, /aria-label="Email: Elmar A\. Beckord"/);
  assert.match(cards[0], /\+55 52 3431 5953/);
  assert.match(cards[0], /Partner/);
  assert.match(cards[0], /Germany/);
  assert.doesNotMatch(cards[0].match(/<button[\s\S]*?<\/button>/)[0], /<a\s/);
  assert.doesNotMatch(cards[1], /wa.me|linkedin.com/);
  assert.match(cards[1], /\+49 151 42471640/);
});

test('contact selection and social links share a card without nested interactive controls', () => {
  const source = readFileSync('src/components/contact/ContactExperience.tsx', 'utf8');
  assert.match(source, /<li key=\{contact.id\} className=\{`\$\{styles.ContactCard\}/);
  assert.match(source, /className=\{styles.ContactSelect\}/);
  assert.match(source, /aria-pressed=\{isActive\}/);
  assert.doesNotMatch(source, /role="listbox"|role="option"/);
  const button = source.slice(source.indexOf('<button'), source.indexOf('</button>'));
  assert.doesNotMatch(button, /<a\s/);
  assert.match(source, /className=\{styles.ContactDetails\}/);
  assert.match(source, /className=\{styles.PhoneRow\}/);
  assert.match(source, /approvedWhatsAppHref\(contact\)/);
  assert.match(source, /className=\{styles.ContactActions\}/);
});

test('only available approved actions render, including Cony and missing approved phones', () => {
  const html = renderContact([
    { id: 'maria-concepcion-lona-romero', name: 'Cony', phones: ['+52 55 3431 5953'] },
    { id: 'elmar-a-beckord', name: 'Elmar', phones: ['+49 999'] },
    { id: 'other', name: 'Other', publicEmail: 'other@example.test', linkedin: 'https://www.linkedin.com/in/configured/' },
  ]);
  const cards = html.match(/<li class="ContactCard[\s\S]*?<\/li>/g);
  assert.match(cards[0], /href="https:\/\/wa.me\/525534315953"/);
  assert.doesNotMatch(cards[0], /mailto:|linkedin.com/);
  assert.doesNotMatch(cards[1], /wa.me/);
  assert.match(cards[2], /href="mailto:other@example.test"/);
  assert.match(cards[2], /href="https:\/\/www.linkedin.com\/in\/configured\/"/);
  assert.doesNotMatch(cards[2], /wa.me/);
});

test('action row stays horizontal with uniform accessible targets', () => {
  const css = readFileSync('src/styles/contact/Contact.module.css', 'utf8');
  const row = css.match(/\.ContactActions\s*\{([^}]+)\}/)[1];
  assert.match(row, /display: flex/);
  assert.match(row, /flex-wrap: nowrap/);
  const link = css.match(/a\.ContactLink\s*\{([^}]+)\}/)[1];
  assert.match(link, /min-width: 44px/);
  assert.match(link, /min-height: 44px/);
});
