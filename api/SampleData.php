<?php

final class SampleData
{
    public static function all(): array
    {
        $today = date('Y-m-d');

        return [
            'alumnos' => [
                [
                    'id' => 1,
                    'nombre' => 'Sofia Martinez',
                    'edad' => 12,
                    'telefono_tutor' => '555-0101',
                    'email_tutor' => 'sofia.tutor@example.com',
                    'estado' => 'activo',
                    'grupo_id' => 1,
                    'fecha_inscripcion' => '2026-01-15',
                ],
                [
                    'id' => 2,
                    'nombre' => 'Diego Rivera',
                    'edad' => 10,
                    'telefono_tutor' => '555-0102',
                    'email_tutor' => 'diego.tutor@example.com',
                    'estado' => 'activo',
                    'grupo_id' => 2,
                    'fecha_inscripcion' => '2026-02-03',
                ],
                [
                    'id' => 3,
                    'nombre' => 'Valeria Lopez',
                    'edad' => 14,
                    'telefono_tutor' => '555-0103',
                    'email_tutor' => 'valeria.tutor@example.com',
                    'estado' => 'pausado',
                    'grupo_id' => 1,
                    'fecha_inscripcion' => '2025-11-20',
                ],
            ],
            'grupos' => [
                [
                    'id' => 1,
                    'nombre' => 'Futbol Infantil A',
                    'disciplina' => 'Futbol',
                    'nivel' => 'Inicial',
                    'entrenador' => 'Carlos Perez',
                    'capacidad' => 20,
                    'activos' => 14,
                ],
                [
                    'id' => 2,
                    'nombre' => 'Basquet Mini',
                    'disciplina' => 'Basquetbol',
                    'nivel' => 'Intermedio',
                    'entrenador' => 'Ana Gomez',
                    'capacidad' => 16,
                    'activos' => 11,
                ],
            ],
            'horarios' => [
                [
                    'id' => 1,
                    'grupo_id' => 1,
                    'grupo' => 'Futbol Infantil A',
                    'dia' => 'Lunes',
                    'hora_inicio' => '16:00',
                    'hora_fin' => '17:30',
                    'lugar' => 'Cancha 1',
                ],
                [
                    'id' => 2,
                    'grupo_id' => 1,
                    'grupo' => 'Futbol Infantil A',
                    'dia' => 'Miercoles',
                    'hora_inicio' => '16:00',
                    'hora_fin' => '17:30',
                    'lugar' => 'Cancha 1',
                ],
                [
                    'id' => 3,
                    'grupo_id' => 2,
                    'grupo' => 'Basquet Mini',
                    'dia' => 'Martes',
                    'hora_inicio' => '18:00',
                    'hora_fin' => '19:15',
                    'lugar' => 'Domo',
                ],
            ],
            'asistencia' => [
                [
                    'id' => 1,
                    'alumno_id' => 1,
                    'alumno' => 'Sofia Martinez',
                    'grupo_id' => 1,
                    'fecha' => $today,
                    'estado' => 'presente',
                    'observaciones' => '',
                ],
                [
                    'id' => 2,
                    'alumno_id' => 2,
                    'alumno' => 'Diego Rivera',
                    'grupo_id' => 2,
                    'fecha' => $today,
                    'estado' => 'presente',
                    'observaciones' => '',
                ],
                [
                    'id' => 3,
                    'alumno_id' => 3,
                    'alumno' => 'Valeria Lopez',
                    'grupo_id' => 1,
                    'fecha' => $today,
                    'estado' => 'ausente',
                    'observaciones' => 'Aviso previo',
                ],
            ],
            'pagos' => [
                [
                    'id' => 1,
                    'alumno_id' => 1,
                    'alumno' => 'Sofia Martinez',
                    'concepto' => 'Mensualidad mayo',
                    'monto' => 650.00,
                    'fecha_vencimiento' => '2026-05-10',
                    'fecha_pago' => '2026-05-08',
                    'estado' => 'pagado',
                ],
                [
                    'id' => 2,
                    'alumno_id' => 2,
                    'alumno' => 'Diego Rivera',
                    'concepto' => 'Mensualidad mayo',
                    'monto' => 650.00,
                    'fecha_vencimiento' => '2026-05-10',
                    'fecha_pago' => null,
                    'estado' => 'pendiente',
                ],
                [
                    'id' => 3,
                    'alumno_id' => 3,
                    'alumno' => 'Valeria Lopez',
                    'concepto' => 'Uniforme',
                    'monto' => 480.00,
                    'fecha_vencimiento' => '2026-05-20',
                    'fecha_pago' => null,
                    'estado' => 'vencido',
                ],
            ],
            'comunicacion' => [
                [
                    'id' => 1,
                    'titulo' => 'Recordatorio de hidratacion',
                    'mensaje' => 'Traer botella de agua a todos los entrenamientos.',
                    'canal' => 'whatsapp',
                    'grupo_id' => null,
                    'enviado_a' => 'todos',
                    'fecha_envio' => '2026-05-27 09:00:00',
                    'estado' => 'enviado',
                ],
                [
                    'id' => 2,
                    'titulo' => 'Cambio de cancha',
                    'mensaje' => 'El grupo Futbol Infantil A entrenara en Cancha 2 esta semana.',
                    'canal' => 'email',
                    'grupo_id' => 1,
                    'enviado_a' => 'grupo',
                    'fecha_envio' => '2026-05-26 18:30:00',
                    'estado' => 'enviado',
                ],
            ],
        ];
    }

    public static function dashboard(array $data): array
    {
        $alumnosActivos = array_values(array_filter($data['alumnos'], fn ($row) => ($row['estado'] ?? '') === 'activo'));
        $pagosPendientes = array_values(array_filter($data['pagos'], fn ($row) => in_array($row['estado'] ?? '', ['pendiente', 'vencido'], true)));
        $presentes = array_values(array_filter($data['asistencia'], fn ($row) => ($row['estado'] ?? '') === 'presente'));

        return [
            'resumen' => [
                'alumnos_activos' => count($alumnosActivos),
                'grupos_activos' => count($data['grupos']),
                'pagos_pendientes' => count($pagosPendientes),
                'asistencia_hoy' => count($data['asistencia']) > 0 ? round((count($presentes) / count($data['asistencia'])) * 100, 1) : 0,
            ],
            'proximos_horarios' => array_slice($data['horarios'], 0, 5),
            'pagos_recientes' => array_slice($data['pagos'], 0, 5),
            'avisos' => array_slice($data['comunicacion'], 0, 3),
        ];
    }

    public static function reportes(array $data): array
    {
        $totalPagado = array_reduce($data['pagos'], function (float $carry, array $row): float {
            return ($row['estado'] ?? '') === 'pagado' ? $carry + (float) ($row['monto'] ?? 0) : $carry;
        }, 0.0);

        $totalPendiente = array_reduce($data['pagos'], function (float $carry, array $row): float {
            return in_array($row['estado'] ?? '', ['pendiente', 'vencido'], true) ? $carry + (float) ($row['monto'] ?? 0) : $carry;
        }, 0.0);

        return [
            'finanzas' => [
                'cobrado' => $totalPagado,
                'pendiente' => $totalPendiente,
                'pagos_vencidos' => count(array_filter($data['pagos'], fn ($row) => ($row['estado'] ?? '') === 'vencido')),
            ],
            'academia' => [
                'alumnos_total' => count($data['alumnos']),
                'alumnos_activos' => count(array_filter($data['alumnos'], fn ($row) => ($row['estado'] ?? '') === 'activo')),
                'grupos_total' => count($data['grupos']),
            ],
            'asistencia' => [
                'registros' => count($data['asistencia']),
                'presentes' => count(array_filter($data['asistencia'], fn ($row) => ($row['estado'] ?? '') === 'presente')),
                'ausentes' => count(array_filter($data['asistencia'], fn ($row) => ($row['estado'] ?? '') === 'ausente')),
            ],
        ];
    }
}
