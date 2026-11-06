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
          { id: 'other-client', name: 'Other client', note: 'Approved public client note.' },
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
    assert.ok(!html.includes('REVIEW:'), lang);
    for (const expected of ['Landmark Fashion', 'Approved commercial description.', 'Approved fashion logistics project.', 'Approved public client note.', 'Other case study']) {
      assert.ok(html.includes(expected), `${lang}: ${expected}`);
    }
  }
});
