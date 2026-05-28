# SportIk Database

Bloque MySQL para el MVP de SportIk.

## Archivos

- `schema.sql`: crea tablas, relaciones, indices y vistas de reporte.
- `seed.sql`: carga datos demo para basket, volley, futbol, alumnos, pagos, asistencias y mensajes.
- `drop_all.sql`: limpia tablas y vistas en orden seguro si phpMyAdmin bloquea un borrado manual por llaves foraneas.

## Uso local

```bash
mysql -u USER -p -e "CREATE DATABASE IF NOT EXISTS sportik CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u USER -p sportik < database/drop_all.sql
mysql -u USER -p sportik < database/schema.sql
mysql -u USER -p sportik < database/seed.sql
```

En phpMyAdmin, evita borrar a mano solo tablas padre como `roles`, `sports`, `students` o `users`. Primero ejecuta `drop_all.sql`, despues `schema.sql` y al final `seed.sql`.

## Decisiones principales

- La tabla de grupos se llama `sport_groups` para evitar conflictos con palabras reservadas de MySQL.
- `students` y `tutors` estan separados porque un tutor puede estar asociado a mas de un alumno.
- `classes` representa sesiones concretas; `schedules` representa horarios recurrentes.
- `attendance` tiene una restriccion unica por clase y alumno.
- `payments` guarda adeudos y pagos por alumno, periodo y concepto.
- Las vistas `v_group_roster`, `v_student_balance` y `v_attendance_summary` apoyan reportes basicos sin obligar al backend a componer todo desde cero.
