Configuración de OAuth para Vercel y Supabase

Resumen

Este proyecto utiliza Supabase para autenticar mediante OAuth (Google/GitHub). Localmente funciona porque se usa `window.location.origin` para construir los `redirectTo` y `emailRedirectTo`. En Vercel (o cualquier entorno server) `window` no existe, por lo que debes configurar una variable de entorno pública que represente la URL de tu sitio.

Pasos requeridos

1) Variables de entorno en Vercel

En el dashboard de tu proyecto en Vercel, agrega las siguientes variables (env: Production, Preview, Development según prefieras):

- NEXT_PUBLIC_SUPABASE_URL = https://<tu-project-ref>.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY = <tu-anon-key>
- NEXT_PUBLIC_SITE_URL = https://<tu-dominio-vercel>.vercel.app

Asegúrate de copiar exactamente la URL que Vercel asignó (por ejemplo: https://mi-proyecto-gustavo.vercel.app). Esta variable se usa para construir las URLs de redirección OAuth en producción.

2) Configurar Redirect URLs en Supabase

En el panel de Supabase, ve a Authentication -> Settings -> URL Redirects y en OAuth Providers (Google/GitHub) asegúrate de que las siguientes URLs estén registradas:

- https://<tu-dominio-vercel>.vercel.app/auth/callback
- https://<tu-dominio-vercel>.vercel.app/auth/callback?next=/projects

También, si usas reset password/email redirects, añade:

- https://<tu-dominio-vercel>.vercel.app/auth/reset-password

3) Revisar la ruta de callback en el proyecto

El proyecto incluye `app/auth/callback/route.ts` que intercambia el `code` por la sesión usando `supabase.auth.exchangeCodeForSession` y luego redirige al parámetro `next`.

4) Notas sobre seguridad

- Nunca subas tus claves privadas (service_role) a variables públicas. Sólo guarda `NEXT_PUBLIC_SUPABASE_ANON_KEY` y la URL pública en variables públicas. La `SERVICE_ROLE` debe guardarse sólo si la necesitas en el servidor y marcada como "Secret".

5) Pruebas

- Después de desplegar en Vercel y configurar las variables, intenta iniciar sesión con Google/GitHub.
- Si ves un error sobre redirect URI mismatch, regresa a las settings de OAuth en Supabase y añade exactamente la URL mostrada en el error (incluye protocolo y path).

Solución de problemas

- Si las redirecciones siguen sin funcionar, habilita logs en Supabase o mira la consola del navegador para ver la URL de redirección que el cliente está usando (esto te dirá qué `NEXT_PUBLIC_SITE_URL` se esperaba).
- Revisa que la variable `NEXT_PUBLIC_SITE_URL` esté disponible en Production (a veces sólo se configuran en Preview).

Si quieres, puedo crear un chequeo rápido en el servidor que imprima la `NEXT_PUBLIC_SITE_URL` en la página de diagnóstico para confirmarla en Vercel (temporal y debe removerse luego).