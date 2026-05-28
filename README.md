# SportIk MVP

Aplicacion web movil-first para administrar una academia deportiva.

## Modulos MVP

- Dashboard
- Alumnos
- Grupos
- Horarios
- Asistencia
- Pagos
- Comunicacion
- Reportes basicos

## Stack

- Frontend: HTML, CSS y JavaScript
- Backend: PHP con PDO
- Base de datos: MySQL

## Instalacion rapida

1. Copia el proyecto en `http://localhost/projects/sportik`.
2. Crea la base de datos con `database/schema.sql`.
3. Carga datos de ejemplo con `database/seed.sql`.
4. Ajusta credenciales en `api/config.php` o crea `api/config.local.php`.
5. Abre `http://localhost/projects/sportik`.

Si MySQL no esta configurado todavia, la API y el frontend usan datos de ejemplo para poder revisar el MVP.

## Endpoints MVP

- `api/dashboard.php`
- `api/alumnos.php`
- `api/grupos.php`
- `api/horarios.php`
- `api/asistencia.php`
- `api/pagos.php`
- `api/comunicacion.php`
- `api/reportes.php`

La interfaz consulta estos endpoints y normaliza respuestas de MySQL o datos demo.
