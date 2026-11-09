# Legal drafts Preview integration
Objective: integrate supplied legal drafts without production publication. Branch: feat/legal-drafts-preview, base f27c7f3.
Delivery: single-pr; no PR/merge authorized. Runner: node --test tests/*.test.mjs; installed tsc; npm run lint; npm run build. Forecast: ~500 authored lines supplied by the package.

## Specs
S1. "Verifica el estado de Git y parte del `main` actualizado, que incluye el PR #3."
S2. "Inspecciona el ZIP y sus instrucciones antes de integrar los archivos."
S3. "Crea una rama nueva sin sobrescribir trabajo existente."
S4. "Integra ambas páginas respetando el diseño y arquitectura del sitio."
S5. "Mantén los documentos como borradores legales no aprobados. No los enlaces públicamente ni los publiques en producción."
S6. "Ejecuta pruebas, TypeScript, lint, build y revisión visual."
S7. "Publica únicamente a Preview." "No modifiques Supabase ni otros apartados del sitio sin necesidad." "No hagas merge sin mi autorización."

## Tasks
T1 | S1-S5 | inline | implemented and verified locally | work-unit commit pending; read-only explorer used after mapping budget exceeded.
T2 | S6-S7 | inline plus independent verifier | local checks passed; Preview pending | production/environment guard risk item 5.

## Log
L1. Original user request:
Integra las páginas Legal Statements y Privacy Policy de Xpert Agency.

En la raíz del proyecto está el archivo `Xpert_Agency_Paginas_Legales_Preview.zip`.

1. Verifica el estado de Git y parte del `main` actualizado, que incluye el PR #3.
2. Inspecciona el ZIP y sus instrucciones antes de integrar los archivos.
3. Crea una rama nueva sin sobrescribir trabajo existente.
4. Integra ambas páginas respetando el diseño y arquitectura del sitio.
5. Mantén los documentos como borradores legales no aprobados. No los enlaces públicamente ni los publiques en producción.
6. Ejecuta pruebas, TypeScript, lint, build y revisión visual.
7. Publica únicamente a Preview.

No modifiques Supabase ni otros apartados del sitio sin necesidad.

Al terminar, entrégame el SHA, los archivos modificados, los resultados de las pruebas y el enlace del Preview. No hagas merge sin mi autorización.C:\Users\EderArtMo\Desktop\xpert.agency.
L2. User clarified: "ah no lo puse en escritorio". ZIP found at Desktop/Xpert_Agency_Paginas_Legales_Preview.zip.
L3. Existing untracked route/test files backed up byte-for-byte under .local-archive/legal-before-integration; all other existing untracked files remain untouched. ZIP inspected directly. PR3 merged as f27c7f3. No legal approval inferred.

L4. RED: new legal tests failed twice before implementation; GREEN: five focused legal tests and full 25-test suite passed. TypeScript passed; lint zero errors/five baseline warnings. Independent verifier used fresh temp baseline+candidate, verified ZIP content/warning fidelity, no source mutations or public links. Initial build and local servers failed CMS reads with sandbox EACCES; network-authorized build then passed. Installed Next connection() keeps legal routes dynamic and production guard runs at request time. Approval marker remains false and cannot alone bypass production. No legal content edited beyond original package; Spanish article language marked explicitly.
L5. Local browser checks: all six EN/ES/DE legal routes return 200 in Preview mode at 320/390/768/1440, visible warning and 6/10 sections, no overflow, no footer/navigation legal links. All six return HTTP 404 in production mode. Captures retained ignored under .local-archive/legal-qa. Parent reran five focused tests successfully. Preview publication and native high-risk assessment/consent pending. Existing untracked route/test originals preserved in ignored backup; unused placeholders untouched.
