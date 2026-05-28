# SportIk Database

Bloque MySQL y API PHP para el MVP de SportIk.

## Archivos

- `schema.sql`: crea tablas, relaciones, indices y vistas de reporte.
- `seed.sql`: carga datos demo para academia, caja, entrenadores, evaluaciones, eventos, torneos, inventario, ventas y configuracion.
- `drop_all.sql`: limpia tablas y vistas en orden seguro si phpMyAdmin bloquea un borrado manual por llaves foraneas.
- `api/`: endpoints PHP en espanol con fallback a `SampleData` si MySQL no esta disponible.

## Uso local

```bash
mysql -u USER -p -e "CREATE DATABASE IF NOT EXISTS sportik CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u USER -p sportik < database/drop_all.sql
mysql -u USER -p sportik < database/schema.sql
mysql -u USER -p sportik < database/seed.sql
```

En phpMyAdmin, evita borrar a mano solo tablas padre como `roles`, `sports`, `students` o `users`. Primero ejecuta `drop_all.sql`, despues `schema.sql` y al final `seed.sql`.

## Endpoints

Todos los recursos soportan `GET /api/{recurso}`, `GET /api/{recurso}/{id}`, `POST`, `PUT/PATCH` y `DELETE` cuando la tabla base lo permite. Tambien existen archivos directos como `api/deportes.php?id=1`.

Recursos principales: `alumnos`, `grupos`, `horarios`, `asistencia`, `pagos`, `comunicacion`, `deportes`, `disciplinas`, `cortes`, `gastos`, `entrenadores`, `evaluaciones`, `eventos`, `torneos`, `productos`, `inventario`, `ventas`, `stock`, `roles`, `usuarios`, `sucursales`, `canchas`, `metodos`, `conceptos`, `plantillas` y `academia`.

## Perfiles y accesos

- `roles` define perfiles administrativos.
- `role_permissions` define permisos por modulo: ver, crear, actualizar y eliminar.
- `users.password_hash` usa `password_hash()` de PHP.
- Acceso demo administrador: `admin@sportik.test` / `admin123`.

## Decisiones principales

- La tabla de grupos sigue siendo `sport_groups` para evitar conflictos con palabras reservadas de MySQL.
- `sports` conserva el catalogo principal y `disciplines` permite variantes por deporte sin romper grupos existentes.
- Caja se modela con `cash_cuts` y `expenses`; ventas de productos usan `sales` y `sale_items`.
- Inventario mantiene `products.stock_quantity` para consultas rapidas y `inventory_movements` para trazabilidad.
- Configuracion se separa en catalogos (`roles`, `users`, `branches`, `courts`, `payment_methods`, `payment_concepts`, `message_templates`) y valores flexibles en `academy_settings`.
- La API usa `Repository` como capa unica MySQL/fallback para que los endpoints nuevos mantengan el mismo contrato JSON.
