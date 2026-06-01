<?php

final class SampleData
{
    public static function all(): array
    {
        $today = date('Y-m-d');

        return [
            'alumnos' => [
                ['id' => 1, 'nombre' => 'Sofia Martinez', 'edad' => 12, 'telefono_tutor' => '555-0101', 'email_tutor' => 'sofia.tutor@example.com', 'estado' => 'activo', 'grupo_id' => 1, 'fecha_inscripcion' => '2026-01-15'],
                ['id' => 2, 'nombre' => 'Diego Rivera', 'edad' => 10, 'telefono_tutor' => '555-0102', 'email_tutor' => 'diego.tutor@example.com', 'estado' => 'activo', 'grupo_id' => 2, 'fecha_inscripcion' => '2026-02-03'],
                ['id' => 3, 'nombre' => 'Valeria Lopez', 'edad' => 14, 'telefono_tutor' => '555-0103', 'email_tutor' => 'valeria.tutor@example.com', 'estado' => 'pausado', 'grupo_id' => 1, 'fecha_inscripcion' => '2025-11-20'],
            ],
            'grupos' => [
                ['id' => 1, 'nombre' => 'Futbol Infantil A', 'disciplina' => 'Futbol', 'nivel' => 'Inicial', 'entrenador' => 'Carlos Perez', 'capacidad' => 20, 'activos' => 14],
                ['id' => 2, 'nombre' => 'Basquet Mini', 'disciplina' => 'Basquetbol', 'nivel' => 'Intermedio', 'entrenador' => 'Ana Gomez', 'capacidad' => 16, 'activos' => 11],
            ],
            'horarios' => [
                ['id' => 1, 'grupo_id' => 1, 'grupo' => 'Futbol Infantil A', 'dia' => 'Lunes', 'hora_inicio' => '16:00', 'hora_fin' => '17:30', 'lugar' => 'Cancha 1'],
                ['id' => 2, 'grupo_id' => 1, 'grupo' => 'Futbol Infantil A', 'dia' => 'Miercoles', 'hora_inicio' => '16:00', 'hora_fin' => '17:30', 'lugar' => 'Cancha 1'],
                ['id' => 3, 'grupo_id' => 2, 'grupo' => 'Basquet Mini', 'dia' => 'Martes', 'hora_inicio' => '18:00', 'hora_fin' => '19:15', 'lugar' => 'Domo'],
            ],
            'asistencia' => [
                ['id' => 1, 'alumno_id' => 1, 'alumno' => 'Sofia Martinez', 'grupo_id' => 1, 'fecha' => $today, 'estado' => 'presente', 'observaciones' => ''],
                ['id' => 2, 'alumno_id' => 2, 'alumno' => 'Diego Rivera', 'grupo_id' => 2, 'fecha' => $today, 'estado' => 'presente', 'observaciones' => ''],
                ['id' => 3, 'alumno_id' => 3, 'alumno' => 'Valeria Lopez', 'grupo_id' => 1, 'fecha' => $today, 'estado' => 'ausente', 'observaciones' => 'Aviso previo'],
            ],
            'pagos' => [
                ['id' => 1, 'alumno_id' => 1, 'alumno' => 'Sofia Martinez', 'concepto' => 'Mensualidad mayo', 'monto' => 650.00, 'fecha_vencimiento' => '2026-05-10', 'fecha_pago' => '2026-05-08', 'estado' => 'pagado'],
                ['id' => 2, 'alumno_id' => 2, 'alumno' => 'Diego Rivera', 'concepto' => 'Mensualidad mayo', 'monto' => 650.00, 'fecha_vencimiento' => '2026-05-10', 'fecha_pago' => null, 'estado' => 'pendiente'],
                ['id' => 3, 'alumno_id' => 3, 'alumno' => 'Valeria Lopez', 'concepto' => 'Uniforme', 'monto' => 480.00, 'fecha_vencimiento' => '2026-05-20', 'fecha_pago' => null, 'estado' => 'vencido'],
            ],
            'comunicacion' => [
                ['id' => 1, 'titulo' => 'Recordatorio de hidratacion', 'mensaje' => 'Traer botella de agua a todos los entrenamientos.', 'canal' => 'whatsapp', 'grupo_id' => null, 'enviado_a' => 'todos', 'fecha_envio' => '2026-05-27 09:00:00', 'estado' => 'enviado'],
                ['id' => 2, 'titulo' => 'Cambio de cancha', 'mensaje' => 'El grupo Futbol Infantil A entrenara en Cancha 2 esta semana.', 'canal' => 'email', 'grupo_id' => 1, 'enviado_a' => 'grupo', 'fecha_envio' => '2026-05-26 18:30:00', 'estado' => 'enviado'],
            ],
            'deportes' => [
                ['id' => 1, 'nombre' => 'Basket', 'descripcion' => 'Fundamentos y juego por equipos', 'estado' => 'activo'],
                ['id' => 2, 'nombre' => 'Volley', 'descripcion' => 'Recepcion, saque y rotacion', 'estado' => 'activo'],
                ['id' => 3, 'nombre' => 'Futbol', 'descripcion' => 'Tecnica y juego reducido', 'estado' => 'activo'],
            ],
            'disciplinas' => [
                ['id' => 1, 'deporte_id' => 1, 'deporte' => 'Basket', 'nombre' => 'Mini basket', 'estado' => 'activo'],
                ['id' => 2, 'deporte_id' => 2, 'deporte' => 'Volley', 'nombre' => 'Volley juvenil', 'estado' => 'activo'],
                ['id' => 3, 'deporte_id' => 3, 'deporte' => 'Futbol', 'nombre' => 'Futbol formativo', 'estado' => 'activo'],
            ],
            'cortes' => [
                ['id' => 1, 'sucursal' => 'Academy Centro', 'abierto_por' => 'Ivan Caja', 'apertura' => '2026-05-27 08:30:00', 'cierre' => '2026-05-27 20:15:00', 'esperado' => 1910.00, 'contado' => 1910.00, 'estado' => 'cerrado'],
                ['id' => 2, 'sucursal' => 'Academy Centro', 'abierto_por' => 'Ivan Caja', 'apertura' => '2026-05-28 08:30:00', 'cierre' => null, 'esperado' => 1480.00, 'contado' => null, 'estado' => 'abierto'],
            ],
            'gastos' => [
                ['id' => 1, 'sucursal' => 'Academy Centro', 'concepto' => 'Balones de entrenamiento', 'monto' => 320.00, 'fecha' => '2026-05-27', 'metodo' => 'Efectivo', 'estado' => 'registrado'],
                ['id' => 2, 'sucursal' => 'Academy Centro', 'concepto' => 'Agua para torneo', 'monto' => 180.00, 'fecha' => '2026-05-28', 'metodo' => 'Efectivo', 'estado' => 'registrado'],
            ],
            'entrenadores' => [
                ['id' => 1, 'nombre' => 'Laura Medina', 'deporte' => 'Basket', 'telefono' => '555-100-0002', 'email' => 'laura.coach@academy-admin.com', 'certificacion' => 'Entrenadora nivel 1', 'estado' => 'activo'],
                ['id' => 2, 'nombre' => 'Carlos Vega', 'deporte' => 'Futbol', 'telefono' => '555-100-0003', 'email' => 'carlos.coach@academy-admin.com', 'certificacion' => 'Preparador fisico infantil', 'estado' => 'activo'],
            ],
            'evaluaciones' => [
                ['id' => 1, 'alumno' => 'Sofia Martinez', 'grupo' => 'Basquet Mini', 'entrenador' => 'Laura Medina', 'fecha_evaluacion' => '2026-05-24', 'puntaje_general' => 85.25, 'observaciones' => 'Muy buena disposicion'],
                ['id' => 2, 'alumno' => 'Diego Rivera', 'grupo' => 'Futbol Infantil A', 'entrenador' => 'Carlos Vega', 'fecha_evaluacion' => '2026-05-24', 'puntaje_general' => 82.50, 'observaciones' => 'Velocidad destacada'],
            ],
            'eventos' => [
                ['id' => 1, 'nombre' => 'Clinica de tiro', 'deporte' => 'Basket', 'inicio' => '2026-06-08 10:00:00', 'lugar' => 'Cancha 1', 'capacidad' => 20, 'precio' => 150.00, 'estado' => 'programado'],
                ['id' => 2, 'nombre' => 'Amistoso U13', 'deporte' => 'Futbol', 'inicio' => '2026-06-14 09:00:00', 'lugar' => 'Campo A', 'capacidad' => 24, 'precio' => 0.00, 'estado' => 'programado'],
            ],
            'torneos' => [
                ['id' => 1, 'nombre' => 'Copa Academy Verano', 'deporte' => 'Futbol', 'fecha_inicio' => '2026-07-06', 'categoria' => 'U13', 'precio' => 350.00, 'estado' => 'abierto', 'inscritos' => 2],
                ['id' => 2, 'nombre' => '3x3 Basket Kids', 'deporte' => 'Basket', 'fecha_inicio' => '2026-06-22', 'categoria' => 'U12', 'precio' => 250.00, 'estado' => 'planeado', 'inscritos' => 1],
            ],
            'productos' => [
                ['id' => 1, 'sku' => 'UNI-BASK-12', 'nombre' => 'Uniforme basket U12', 'categoria' => 'Uniformes', 'precio_venta' => 480.00, 'existencia' => 12, 'stock_minimo' => 5, 'estado' => 'activo'],
                ['id' => 2, 'sku' => 'BAL-FUT-5', 'nombre' => 'Balon futbol #5', 'categoria' => 'Equipo', 'precio_venta' => 390.00, 'existencia' => 7, 'stock_minimo' => 4, 'estado' => 'activo'],
                ['id' => 3, 'sku' => 'BOT-SIK-750', 'nombre' => 'Termo Academy 750ml', 'categoria' => 'Accesorios', 'precio_venta' => 180.00, 'existencia' => 18, 'stock_minimo' => 6, 'estado' => 'activo'],
            ],
            'inventario' => [
                ['id' => 1, 'producto' => 'Uniforme basket U12', 'tipo_movimiento' => 'in', 'cantidad' => 20, 'referencia' => 'COMP-1001'],
                ['id' => 2, 'producto' => 'Uniforme basket U12', 'tipo_movimiento' => 'out', 'cantidad' => 8, 'referencia' => 'VENTA-0001'],
            ],
            'ventas' => [
                ['id' => 1, 'alumno' => 'Sofia Martinez', 'metodo' => 'Efectivo', 'fecha' => '2026-05-27 16:30:00', 'total' => 480.00, 'estado' => 'pagado', 'referencia' => 'VENTA-0001'],
                ['id' => 2, 'alumno' => 'Valeria Lopez', 'metodo' => 'Tarjeta', 'fecha' => '2026-05-27 18:10:00', 'total' => 570.00, 'estado' => 'pagado', 'referencia' => 'VENTA-0002'],
            ],
            'stock' => [
                ['id' => 2, 'sku' => 'BAL-FUT-5', 'nombre' => 'Balon futbol #5', 'categoria' => 'Equipo', 'existencia' => 7, 'stock_minimo' => 4, 'estado_stock' => 'ok'],
                ['id' => 1, 'sku' => 'UNI-BASK-12', 'nombre' => 'Uniforme basket U12', 'categoria' => 'Uniformes', 'existencia' => 12, 'stock_minimo' => 5, 'estado_stock' => 'ok'],
            ],
            'roles' => [
                ['id' => 1, 'nombre' => 'admin', 'descripcion' => 'Acceso completo'],
                ['id' => 2, 'nombre' => 'coach', 'descripcion' => 'Gestiona clases'],
                ['id' => 3, 'nombre' => 'staff', 'descripcion' => 'Operacion diaria'],
            ],
            'usuarios' => [
                ['id' => 1, 'nombre' => 'Admin Academy', 'email' => 'admin@academy-admin.com', 'rol' => 'admin', 'sucursal' => 'Academy Centro', 'estado' => 'activo'],
                ['id' => 2, 'nombre' => 'Laura Medina', 'email' => 'laura.coach@academy-admin.com', 'rol' => 'coach', 'sucursal' => 'Academy Centro', 'estado' => 'activo'],
            ],
            'sucursales' => [
                ['id' => 1, 'nombre' => 'Academy Centro', 'codigo' => 'CENTRO', 'direccion' => 'Av. Principal 100', 'telefono' => '555-100-0100', 'estado' => 'activo'],
                ['id' => 2, 'nombre' => 'Academy Norte', 'codigo' => 'NORTE', 'direccion' => 'Av. Norte 220', 'telefono' => '555-100-0200', 'estado' => 'activo'],
            ],
            'canchas' => [
                ['id' => 1, 'nombre' => 'Cancha 1', 'sucursal' => 'Academy Centro', 'deporte' => 'Basket', 'capacidad' => 24, 'estado' => 'activo'],
                ['id' => 2, 'nombre' => 'Cancha 2', 'sucursal' => 'Academy Centro', 'deporte' => 'Volley', 'capacidad' => 24, 'estado' => 'activo'],
                ['id' => 3, 'nombre' => 'Campo A', 'sucursal' => 'Academy Centro', 'deporte' => 'Futbol', 'capacidad' => 30, 'estado' => 'activo'],
            ],
            'metodos' => [
                ['id' => 1, 'nombre' => 'Efectivo', 'codigo' => 'cash', 'estado' => 'activo'],
                ['id' => 2, 'nombre' => 'Tarjeta', 'codigo' => 'card', 'estado' => 'activo'],
                ['id' => 3, 'nombre' => 'Transferencia', 'codigo' => 'transfer', 'estado' => 'activo'],
            ],
            'conceptos' => [
                ['id' => 1, 'nombre' => 'Mensualidad', 'codigo' => 'monthly_fee', 'monto_default' => 750.00, 'estado' => 'activo'],
                ['id' => 2, 'nombre' => 'Inscripcion', 'codigo' => 'registration', 'monto_default' => 300.00, 'estado' => 'activo'],
                ['id' => 3, 'nombre' => 'Uniforme', 'codigo' => 'uniform', 'monto_default' => 480.00, 'estado' => 'activo'],
            ],
            'plantillas' => [
                ['id' => 1, 'nombre' => 'Recordatorio de pago', 'canal' => 'whatsapp', 'titulo' => null, 'mensaje' => 'Hola {{tutor_name}}, te recordamos el pago pendiente.', 'estado' => 'activo'],
                ['id' => 2, 'nombre' => 'Clase cancelada', 'canal' => 'whatsapp', 'titulo' => null, 'mensaje' => 'La clase de {{group_name}} fue cancelada.', 'estado' => 'activo'],
            ],
            'academia' => [
                ['id' => 1, 'clave' => 'academia_nombre', 'valor' => 'AcademyAdmin', 'grupo' => 'academia', 'descripcion' => 'Nombre publico'],
                ['id' => 2, 'clave' => 'moneda', 'valor' => 'MXN', 'grupo' => 'finanzas', 'descripcion' => 'Moneda operativa'],
            ],
        ];
    }

    public static function dashboard(array $data): array
    {
        $alumnosActivos = array_values(array_filter($data['alumnos'], fn ($row) => ($row['estado'] ?? '') === 'activo'));
        $pagosPendientes = array_values(array_filter($data['pagos'], fn ($row) => in_array($row['estado'] ?? '', ['pendiente', 'vencido'], true)));
        $presentes = array_values(array_filter($data['asistencia'], fn ($row) => ($row['estado'] ?? '') === 'presente'));
        $stockBajo = array_values(array_filter($data['stock'] ?? [], fn ($row) => ($row['estado_stock'] ?? '') === 'bajo'));
        $cortesAbiertos = array_values(array_filter($data['cortes'] ?? [], fn ($row) => ($row['estado'] ?? '') === 'abierto'));

        return [
            'resumen' => [
                'alumnos_activos' => count($alumnosActivos),
                'grupos_activos' => count($data['grupos']),
                'pagos_pendientes' => count($pagosPendientes),
                'asistencia_hoy' => count($data['asistencia']) > 0 ? round((count($presentes) / count($data['asistencia'])) * 100, 1) : 0,
                'stock_bajo' => count($stockBajo),
                'cortes_abiertos' => count($cortesAbiertos),
            ],
            'proximos_horarios' => array_slice($data['horarios'], 0, 5),
            'pagos_recientes' => array_slice($data['pagos'], 0, 5),
            'avisos' => array_slice($data['comunicacion'], 0, 3),
            'eventos' => array_slice($data['eventos'] ?? [], 0, 3),
            'stock' => array_slice($data['stock'] ?? [], 0, 5),
        ];
    }

    public static function reportes(array $data): array
    {
        $totalPagado = array_reduce($data['pagos'], fn (float $carry, array $row): float => ($row['estado'] ?? '') === 'pagado' ? $carry + (float) ($row['monto'] ?? 0) : $carry, 0.0);
        $totalPendiente = array_reduce($data['pagos'], fn (float $carry, array $row): float => in_array($row['estado'] ?? '', ['pendiente', 'vencido'], true) ? $carry + (float) ($row['monto'] ?? 0) : $carry, 0.0);
        $ventas = array_reduce($data['ventas'] ?? [], fn (float $carry, array $row): float => $carry + (float) ($row['total'] ?? 0), 0.0);
        $gastos = array_reduce($data['gastos'] ?? [], fn (float $carry, array $row): float => $carry + (float) ($row['monto'] ?? 0), 0.0);

        return [
            'finanzas' => [
                'cobrado' => $totalPagado,
                'pendiente' => $totalPendiente,
                'ventas' => $ventas,
                'gastos' => $gastos,
                'pagos_vencidos' => count(array_filter($data['pagos'], fn ($row) => ($row['estado'] ?? '') === 'vencido')),
            ],
            'academia' => [
                'alumnos_total' => count($data['alumnos']),
                'alumnos_activos' => count(array_filter($data['alumnos'], fn ($row) => ($row['estado'] ?? '') === 'activo')),
                'grupos_total' => count($data['grupos']),
                'entrenadores_activos' => count(array_filter($data['entrenadores'] ?? [], fn ($row) => ($row['estado'] ?? '') === 'activo')),
            ],
            'asistencia' => [
                'registros' => count($data['asistencia']),
                'presentes' => count(array_filter($data['asistencia'], fn ($row) => ($row['estado'] ?? '') === 'presente')),
                'ausentes' => count(array_filter($data['asistencia'], fn ($row) => ($row['estado'] ?? '') === 'ausente')),
            ],
            'inventario' => [
                'productos' => count($data['productos'] ?? []),
                'stock_bajo' => count(array_filter($data['stock'] ?? [], fn ($row) => ($row['estado_stock'] ?? '') === 'bajo')),
            ],
        ];
    }
}
