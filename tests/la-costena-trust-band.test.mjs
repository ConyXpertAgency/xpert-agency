import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(path, mocks) {
  const file = new URL(path, import.meta.url);
  const mod = new Module(file.pathname);
  mod.require = (id) => Object.hasOwn(mocks, id) ? mocks[id] : require(id);
  mod._compile(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText, file.pathname);
  return mod.exports;
}

test("Both localized banners link to the featured case anchor", () => {
  const { default: feature } = load("../src/components/home/LaCostenaFeature.tsx", {
    "next/image": { default() {} },
    "next/link": { default() {} },
    "@/styles/Home/LaCostenaFeature.module.css": { default: {} },
  });
  for (const lang of ["en", "es", "de"]) {
    const link = (variant) => feature({ lang, variant }).props.children[0].props.children[3].props.href;
    assert.equal(link("home"), `/${lang}/cases#la-costena`);
    assert.equal(link("cases"), "#la-costena");
  }
});

for (const custom of [false, true]) {
  test(`Home excludes La Costena from ${custom ? "configured CMS" : "fallback"} logos`, async () => {
    const locales = ["en", "es", "de"];
    const { getTrustBandLogos } = load("../src/lib/industryLogos.ts", {
      "@/lib/data": { getCasesStudies: async () => ({ items: [{ logo: "/logos/la-costena.jpg" }, { logo: "/logos/other.svg" }] }) },
    });
    for (const lang of locales) {
      const { default: home } = load("../src/app/[locale]/(public)/page.tsx", {
        "next/root-params": { locale: async () => lang },
        "@/lib/data": {
          ...Object.fromEntries(["Hero", "Partners", "GlobalReach", "Roles", "FinalCta", "FillingBanner"].map((key) => ["getHome" + key, async () => ({})])),
          getHomeTrustBand: async () => ({ show_logos: true, logos: custom ? [" /logos/la-costena.jpg ", "/logos/other.svg"] : [] }),
        },
        "@/lib/industryLogos": { getTrustBandLogos },
        "@/components/home": { First() {}, Four() {}, HomeFinalCta() {}, Second() {}, Third() {} },
        "@/components/home/TrustBand": { default() {} },
        "@/components/home/LaCostenaFeature": { default() {} },
        "@/components/home/HomeFillingPackagingBanner": { default() {} },
        "@/lib/site": {},
        "@/lib/expertiseGroups": {},
      });
      const band = (await home()).props.children[2];
      assert.ok(band.props.logos.includes("/logos/other.svg"), JSON.stringify(band.props));
      assert.ok(!band.props.logos.some((path) => /la-costena/i.test(path)), lang);
    }
  });
}
