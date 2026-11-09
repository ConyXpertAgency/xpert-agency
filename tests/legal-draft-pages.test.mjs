import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import Module, { createRequire } from 'node:module';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const read = (path) => readFileSync(path, 'utf8');
function load(path, mocks = {}) {
  const component = new Module(path);
  component.filename = path;
  component.require = (id) => id in mocks ? mocks[id] : require(id);
  component._compile(ts.transpileModule(read(path), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS },
  }).outputText, path);
  return component.exports;
}
function environment(vercel, node, run) {
  const old = { VERCEL_ENV: process.env.VERCEL_ENV, NODE_ENV: process.env.NODE_ENV };
  try {
    for (const [key, value] of Object.entries({ VERCEL_ENV: vercel, NODE_ENV: node })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    return run();
  } finally {
    for (const [key, value] of Object.entries(old)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
}
const notFound = () => { throw new Error('NEXT_NOT_FOUND'); };

test('draft rendering is allowed only in Preview or local development; production fails closed', () => {
  const content = load('src/content/legalDraft.ts');
  const Page = load('src/components/legal/LegalDraftPage.tsx', {
    '@/content/legalDraft': content,
    'next/navigation': { notFound },
    'next/link': { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) },
    '@/styles/legal/LegalDraftPage.module.css': { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) },
  }).default;
  assert.equal(content.LEGAL_PAGES_APPROVED, false);
  for (const [vercel, node, allowed] of [
    ['preview', 'production', true], [undefined, 'development', true],
    ['production', 'production', false], ['production', 'development', false],
    [undefined, 'production', false], [undefined, 'test', false], ['other', 'development', false],
  ]) {
    environment(vercel, node, () => {
      assert.equal(content.isLegalPreviewAllowed(), allowed);
      for (const kind of ['legal-statements', 'privacy-policy']) {
        for (const lang of ['en', 'es', 'de']) {
          const render = () => renderToStaticMarkup(React.createElement(Page, { lang, kind }));
          if (!allowed) { assert.throws(render, /NEXT_NOT_FOUND/); continue; }
          const html = render();
          const copy = content.LEGAL_REVIEW_COPY[lang];
          assert.ok(html.includes(copy.draft));
          assert.ok(html.includes(copy.spanishOnly));
          assert.match(html, /\[CONFIRMAR|\[RAZÓN SOCIAL/);
          assert.match(html, /lang="es"/);
          assert.equal((html.match(/<h2/g) ?? []).length, kind === 'legal-statements' ? 6 : 10);
          assert.match(html, new RegExp(`href="/${lang}/${kind === 'legal-statements' ? 'privacy-policy' : 'legal-statements'}"`));
        }
      }
    });
  }
});

test('both localized routes use request-time rendering and noindex without production canonical links', async () => {
  for (const kind of ['legal-statements', 'privacy-policy']) {
    const path = `src/app/[locale]/(public)/${kind}/page.tsx`;
    const source = read(path);
    assert.match(source, /await connection\(\)/);
    assert.doesNotMatch(source, /pageMetadata/);
    for (const lang of ['en', 'es', 'de']) {
      const route = load(path, {
        'next/root-params': { locale: async () => lang },
        'next/server': { connection: async () => {} },
        '@/lib/site': { isValidLocale: (value) => ['en', 'es', 'de'].includes(value) },
        '@/components/legal/LegalDraftPage': { __esModule: true, default: () => null },
      });
      const metadata = route.metadata ?? await route.generateMetadata();
      assert.deepEqual(metadata.robots, { index: false, follow: false, noarchive: true });
      assert.match(metadata.title, /draft/);
      const page = await route.default();
      assert.equal(page.props.lang, lang);
      assert.equal(page.props.kind, kind);
    }
  }
});

test('drafts remain absent from public footer and sitemap', () => {
  for (const path of ['src/components/ui/PublicFooter.tsx', 'src/app/sitemap.ts']) {
    assert.doesNotMatch(read(path), /legal-statements|privacy-policy|legalDraft/);
  }
});
