---
name: xpert-maintenance
description: Retomar cambios locales y preparar publicaciones de Xpert Agency; usar solo dentro de este proyecto.
---

# Mantenimiento de Xpert Agency

Consultar docs/PROJECT.md para contexto y remotos. Revisar el estado de Git antes de editar para preservar trabajo local. La copia antigua en el directorio del usuario no es la carpeta activa.

Elegir las skills disponibles según la integración afectada. Para Next.js leer la guía relevante en node_modules/next/dist/docs, como indica AGENTS.md. El contenido de páginas proviene de Supabase y puede diferir de los fallbacks del código. No modificar datos remotos como efecto de una revisión local.

Para cambios de interfaz comprobar escritorio y móvil, EN/ES/DE, imágenes sin errores, navegación y movimiento reducido cuando corresponda. Las páginas /rbe y /filling-packaging solo se sirven en EN. No enviar formularios reales durante QA.

Antes de un commit ejecutar pnpm lint, pnpm exec tsc --noEmit y pnpm build. Separar referencias, scripts temporales y notas de otros clientes de los archivos publicables. Archivar sin borrar originales útiles. Nunca incluir .env*, env.download ni secretos en Git.

Subir solo cuando la petición lo autorice. origin pertenece a ederartmo y cony a ConyXpertAgency. Revisar divergencia de ambos remotos y el mecanismo de despliegue antes de asumir que un push publica. Confirmar el resultado del despliegue y el sitio real; si solo se verifica GitHub, reportar publicación pendiente.
