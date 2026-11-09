# Legal drafts: Preview review only

The legal documents are **unapproved working drafts**, imported from
`Xpert_Agency_Paginas_Legales_Preview.zip`. No legal or factual validation is
implied by integrating this package. Placeholders must remain visible.

## Access and languages

- Review `/en/legal-statements`, `/es/legal-statements`, `/de/legal-statements`
  and the corresponding `/privacy-policy` URLs on a Vercel **Preview** deployment.
- All three locales show the supplied Spanish source. English and German banners
  explicitly identify missing approved translations; the document article has
  `lang="es"` for assistive technology.
- Routes render at request time and return 404 outside Preview or local
  development. An explicit Vercel production environment always denies access.
- `LEGAL_PAGES_APPROVED` remains false. Changing that marker alone does not
  enable production access; approval and publication require a separate change.
- Both routes use `noindex, nofollow, noarchive`. No legal URLs are added to the
  footer, navigation or sitemap, and draft metadata does not advertise production
  canonical URLs. Preview hosting access protection is not changed.

## Content and integration

`src/content/legalDraft.ts` contains the six Legal Statements sections, ten
Privacy Policy sections and localized draft warnings. The source is preserved
without inventing entity details, retention periods, legal bases or translations.
The shared `LegalDraftPage` uses the existing public layout and surface tokens.
No CMS, Supabase, contact form, consent settings or analytics changes are included.

Pre-existing local placeholder routes and tests were copied byte-for-byte into
the ignored `.local-archive/legal-before-integration/` before adaptation. Unused
placeholder components, styles and `src/lib/legal.ts` remain untouched and are
not part of this delivery.

## Checks

```sh
node --test tests/*.test.mjs
node node_modules/typescript/bin/tsc --noEmit
npm run lint
npm run build
```

The installed tools are used directly because the local pnpm version-switch
previously failed registry signature/network verification. Do not disable that
verification or change the lockfile to work around it.

For local review of a production build, start it with `VERCEL_ENV=preview`; omit
that value or set it to `production` to test 404 behavior. Check all six URLs,
the visible warning and placeholders, section navigation and mobile overflow.

## Future approval

Business and legal review must confirm all unresolved facts and all three
language versions before any separately authorized production-enabling change.
Do not merge, link publicly, or promote this Preview as an approved policy.
