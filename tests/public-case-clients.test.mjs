import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import Module, { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { publicCaseClients } from '../src/lib/publicCaseClients.ts';

const require = createRequire(import.meta.url);
const reviewNotes = {
  en: 'REVIEW: verify whether this is separate from Landmark Case Study',
  es: 'REVIEW: verificar si es una experiencia separada del Case Study Landmark',
  de: 'REVIEW: prüfen, ob dies getrennt vom Case Study Landmark ist',
};

const editorialClients = [
  { id: 'hermes-cosmoper', name: 'Hermes Cosmoper', notes: {
    en: 'REVIEW: verify exact name', es: 'REVIEW: verificar nombre exacto', de: 'REVIEW: genauen Namen prüfen',
  } },
  { id: 'hilti', name: 'HILTI', notes: {
    en: 'REVIEW: first handwritten location "L?" is ambiguous',
    es: 'REVIEW: la primera ubicación manuscrita "L?" es ambigua',
    de: 'REVIEW: erste handschriftliche Location "L?" ist unklar',
  } },
  { id: 'heineken', name: 'Heineken', notes: {
    en: 'REVIEW: verify Southeast Asia locations belong to Heineken entry',
    es: 'REVIEW: verificar que las ubicaciones de Southeast Asia pertenecen a Heineken',
    de: 'REVIEW: prüfen, ob die Southeast-Asia-Standorte zum Heineken-Eintrag gehören',
  } },
  { id: 'schmid-fashion', name: 'Schmid Fashion', notes: {
    en: 'REVIEW: verify whether this is separate from Schuh Schmid Case Study',
    es: 'REVIEW: verificar si es una experiencia separada del Case Study Schuh Schmid',
    de: 'REVIEW: prüfen, ob dies getrennt vom Case Study Schuh Schmid ist',
  } },
  { id: 'popeci-machines', name: 'POPECI Machines', notes: {
    en: 'REVIEW: verify exact name', es: 'REVIEW: verificar nombre exacto', de: 'REVIEW: genauen Namen prüfen',
  } },
  { id: 'osram-light', name: 'OSRAM Light', notes: {
    en: 'REVIEW: handwritten location "SB" is ambiguous',
    es: 'REVIEW: la ubicación manuscrita "SB" es ambigua',
    de: 'REVIEW: handschriftliche Location "SB" ist unklar',
  } },
];

test('the 18 identified editorial notes are filtered only in their client context without losing commercial fields', () => {
  for (const lang of ['en', 'es', 'de']) {
    const items = editorialClients.map(({ id, name, notes }) => ({
      id, name, note: notes[lang], locations: ['Approved location'], industry: 'Approved industry',
      description: 'Approved description.', image: '/approved-logo.webp',
    }));
    const before = JSON.stringify(items);
    assert.deepEqual(publicCaseClients(items), items.map((item) => ({ ...item, note: undefined })));
    assert.equal(JSON.stringify(items), before);
    const legitimate = items.map((item) => ({ ...item, note: 'REVIEW: <strong>Annual logistics assessment</strong> delivered.' }));
    assert.deepEqual(publicCaseClients(legitimate), legitimate);
    const unrelated = items.map((item, index) => ({ ...item, id: `unrelated-client-${index}` }));
    assert.deepEqual(publicCaseClients(unrelated), unrelated);
  }
});

test('known Landmark review notes are omitted without mutating CMS records or legitimate notes', () => {
  for (const note of Object.values(reviewNotes)) {
    const items = [
      { id: 'landmark-fashion', name: 'Landmark Fashion', country: 'United Arab Emirates', industry: 'Fashion', note },
      { id: 'other-client', name: 'Other client', note: 'Annual review and distribution improvement.' },
      { id: 'no-note', name: 'No note' },
    ];
    const before = JSON.stringify(items);
    assert.deepEqual(publicCaseClients(items), [{ ...items[0], note: undefined }, items[1], items[2]]);
    assert.equal(JSON.stringify(items), before);
    assert.equal(publicCaseClients([{ ...items[0], note: `  ${note}  ` }])[0].note, undefined);
  }
  const legitimate = [{ id: 'landmark-fashion', name: 'Landmark Fashion', note: 'Fashion logistics integration and distribution.' }];
  assert.deepEqual(publicCaseClients(legitimate), legitimate);
});

test('public Cases page excludes review copy before serializing client props and preserves case studies', async () => {
  for (const [lang, note] of Object.entries(reviewNotes)) {
    const filename = fileURLToPath(new URL('../src/app/[locale]/(public)/cases/page.tsx', import.meta.url));
    const page = new Module(filename);
    page.filename = filename;
    page.require = (id) => {
      if (id === 'next/root-params') return { locale: async () => lang };
      if (id === '@/lib/publicCaseClients') return { publicCaseClients };
      if (id === '@/lib/data') return {
        getCasesPage: async () => ({ header: { badge: 'Cases', title: 'Cases', text: 'Approved commercial description.' } }),
        getCasesClients: async () => ({ items: [
          { id: 'landmark-fashion', name: 'Landmark Fashion', note },
          ...editorialClients.map(({ id, name, notes }) => ({ id, name, note: notes[lang] })),
          { id: 'other-client', name: 'Other client', note: 'REVIEW: Approved public client performance assessment.' },
        ] }),
        getCasesStudies: async () => ({ items: [
          { id: 'featured', featured: true, title: 'Landmark Fashion', project: 'Approved fashion logistics project.', results: [] },
          { id: 'other-study', featured: false, title: 'Other case study' },
        ] }),
      };
      if (id.endsWith('.module.css')) return { __esModule: true, default: {} };
      if (id === '@/lib/sectionBg') return { sectionBgClass: () => '', sectionBgStyle: () => ({}) };
      if (id === '@/lib/site') return {};
      if (id === '@/lib/supabase/icons') return { getIcon: () => null };
      if (id.endsWith('/RichText')) return { __esModule: true, default: ({ children }) => children };
      if (id.endsWith('/ClientExperienceList') || id.endsWith('/CaseStudyList')) {
        // Model the client boundary: any unfiltered note would be exposed in the serialized props.
        return { __esModule: true, default: ({ items }) => React.createElement('pre', null, JSON.stringify(items)) };
      }
      if (id.endsWith('/CardContent')) return { __esModule: true, default: ({ title, description }) => React.createElement('article', null, title, description) };
      if (id.endsWith('/PictureSvg')) return { __esModule: true, default: () => null };
      return require(id);
    };
    page._compile(ts.transpileModule(readFileSync(filename, 'utf8'), {
      compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS },
    }).outputText, filename);
    const html = renderToStaticMarkup(await page.exports.default());
    assert.ok(!html.includes(note), lang);
    for (const expected of ['Landmark Fashion', 'Approved commercial description.', 'Approved fashion logistics project.', 'REVIEW: Approved public client performance assessment.', 'Other case study']) {
      assert.ok(html.includes(expected), `${lang}: ${expected}`);
    }
    for (const { name, notes } of editorialClients) {
      assert.ok(html.includes(name), `${lang}: ${name}`);
      assert.ok(!html.includes(notes[lang]), `${lang}: ${name} note`);
    }
  }
});
