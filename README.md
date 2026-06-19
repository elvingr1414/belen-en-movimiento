# Belén en Movimiento - MVP Web 1.0

Versión preparada para GitHub + Supabase + Vercel.

## Incluye
- Dashboard
- Contactos
- Agrupaciones
- Membresías
- Catálogos
- Usuarios y roles base
- PostgreSQL para Supabase

## Roles
- SUPER_ADMIN
- ADMIN_AGRUPACION
- OPERADOR
- CONSULTA

## Publicación
1. Subir esta carpeta a GitHub.
2. Crear proyecto en Supabase.
3. Copiar `DATABASE_URL`.
4. Importar el repositorio en Vercel.
5. Agregar `DATABASE_URL` como variable de entorno.
6. Deploy.

## Comandos
```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```
