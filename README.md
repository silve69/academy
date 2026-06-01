# AcademyAdmin

Aplicacion web movil-first para administrar una academia deportiva.

Dominio previsto: `academy-admin.com`.

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

- Frontend: ExtJS 6.6 classic sobre JavaScript
- Backend: PHP con PDO y endpoints REST
- Base de datos: MySQL

## Arquitectura ExtJS

La interfaz principal usa una estructura modular inspirada en PodiAdmin y GreatFitness, pero preparada para una segunda etapa movil:

- `app.json`: configuracion Sencha Cmd con toolkit classic y `theme-triton`.
- `workspace.json`: apunta al SDK compartido `../ext-7.6.0`.
- `app.js`: arranque de la aplicacion ExtJS.
- `app/Application.js`: sesion, login y bootstrap general.
- `app/util/Api.js`: cliente central para la API PHP.
- `app/util/Device.js`: deteccion de dispositivo por capacidades reales del navegador.
- `app/store/`: stores ExtJS para recursos REST.
- `app/view/`: vistas, controllers y modulos de UI.
- `assets/css/ext-app.css`: estilos propios de AcademyAdmin.

La deteccion movil no depende solo de resolucion de pantalla. `Academy.util.Device` combina `Ext.os`, soporte touch, pointer coarse y user agent como respaldo.

Para regenerar el tema Triton:

```bash
sencha app build development
```

El CSS generado se carga desde `build/development/Academy/resources/Academy-all.css`.

## Instalacion rapida

1. Copia el proyecto en `http://localhost/projects/academy`.
2. Si ya existe una instalacion previa y phpMyAdmin marca error de llaves foraneas, limpia con `database/drop_all.sql`.
3. Crea la base de datos con `database/schema.sql`.
4. Carga datos de ejemplo con `database/seed.sql`.
5. Ajusta credenciales en `api/config.php` o crea `api/config.local.php`.
6. Abre `http://localhost/projects/academy`.

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

## Accesos demo

- Administrador: `admin@academy-admin.com` / `admin123`
- Entrenador: `laura.coach@academy-admin.com` / `coach123`
- Staff: `marta.staff@academy-admin.com` / `staff123`
- Caja: `caja@academy-admin.com` / `caja123`

Los permisos se cargan desde `role_permissions` y el frontend oculta los modulos no permitidos para cada perfil.
