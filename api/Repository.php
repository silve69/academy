<?php

final class Repository
{
    private const TABLES = [
        'alumnos' => 'students',
        'grupos' => 'sport_groups',
        'horarios' => 'schedules',
        'asistencia' => 'attendance',
        'pagos' => 'payments',
        'comunicacion' => 'messages',
    ];

    public function __construct(private readonly ?PDO $pdo, private readonly array $fallback)
    {
    }

    public function list(string $resource, array $query = []): array
    {
        if (!$this->pdo) {
            return $this->filterFallback($resource, $query);
        }

        try {
            return $this->query($this->listSql($resource));
        } catch (Throwable) {
            return $this->filterFallback($resource, $query);
        }
    }

    public function find(string $resource, int $id): ?array
    {
        if (!$this->pdo) {
            return $this->findFallback($resource, $id);
        }

        try {
            $statement = $this->pdo->prepare($this->findSql($resource));
            $statement->execute([':id' => $id]);
            $row = $statement->fetch();

            return $row ?: $this->findFallback($resource, $id);
        } catch (Throwable) {
            return $this->findFallback($resource, $id);
        }
    }

    public function create(string $resource, array $payload): array
    {
        $payload = $this->toDatabasePayload($resource, $payload);

        if (!$this->pdo || $payload === []) {
            return $this->createFallback($resource, $payload);
        }

        try {
            $table = $this->table($resource);
            $fields = array_keys($payload);
            $columns = implode(', ', $fields);
            $placeholders = implode(', ', array_map(fn ($field) => ":{$field}", $fields));
            $statement = $this->pdo->prepare("INSERT INTO {$table} ({$columns}) VALUES ({$placeholders})");

            foreach ($payload as $field => $value) {
                $statement->bindValue(":{$field}", $value);
            }

            $statement->execute();
            $id = (int) $this->pdo->lastInsertId();

            return $this->find($resource, $id) ?? array_merge(['id' => $id], $payload);
        } catch (Throwable) {
            return $this->createFallback($resource, $payload);
        }
    }

    public function update(string $resource, int $id, array $payload): ?array
    {
        $payload = $this->toDatabasePayload($resource, $payload);

        if (!$this->pdo || $payload === []) {
            return $this->updateFallback($resource, $id, $payload);
        }

        try {
            $table = $this->table($resource);
            $sets = implode(', ', array_map(fn ($field) => "{$field} = :{$field}", array_keys($payload)));
            $statement = $this->pdo->prepare("UPDATE {$table} SET {$sets} WHERE id = :id");

            foreach ($payload as $field => $value) {
                $statement->bindValue(":{$field}", $value);
            }

            $statement->bindValue(':id', $id, PDO::PARAM_INT);
            $statement->execute();

            return $this->find($resource, $id);
        } catch (Throwable) {
            return $this->updateFallback($resource, $id, $payload);
        }
    }

    public function delete(string $resource, int $id): bool
    {
        if (!$this->pdo) {
            return $this->findFallback($resource, $id) !== null;
        }

        try {
            $table = $this->table($resource);
            $statement = $this->pdo->prepare("DELETE FROM {$table} WHERE id = :id");
            $statement->execute([':id' => $id]);

            return $statement->rowCount() > 0;
        } catch (Throwable) {
            return $this->findFallback($resource, $id) !== null;
        }
    }

    public function dashboard(): array
    {
        if (!$this->pdo) {
            return SampleData::dashboard($this->fallback);
        }

        try {
            return [
                'resumen' => [
                    'alumnos_activos' => (int) $this->scalar("SELECT COUNT(*) FROM students WHERE status = 'active'"),
                    'grupos_activos' => (int) $this->scalar("SELECT COUNT(*) FROM sport_groups WHERE status = 'active'"),
                    'pagos_pendientes' => (int) $this->scalar("SELECT COUNT(*) FROM payments WHERE status IN ('pending', 'overdue')"),
                    'asistencia_hoy' => $this->attendancePercentToday(),
                ],
                'proximos_horarios' => array_slice($this->list('horarios'), 0, 5),
                'pagos_recientes' => array_slice($this->list('pagos'), 0, 5),
                'avisos' => array_slice($this->list('comunicacion'), 0, 3),
            ];
        } catch (Throwable) {
            return SampleData::dashboard($this->fallback);
        }
    }

    public function reports(): array
    {
        if (!$this->pdo) {
            return SampleData::reportes($this->fallback);
        }

        try {
            return [
                'finanzas' => [
                    'cobrado' => (float) $this->scalar("SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'paid'"),
                    'pendiente' => (float) $this->scalar("SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status IN ('pending', 'overdue')"),
                    'pagos_vencidos' => (int) $this->scalar("SELECT COUNT(*) FROM payments WHERE status = 'overdue'"),
                ],
                'academia' => [
                    'alumnos_total' => (int) $this->scalar('SELECT COUNT(*) FROM students'),
                    'alumnos_activos' => (int) $this->scalar("SELECT COUNT(*) FROM students WHERE status = 'active'"),
                    'grupos_total' => (int) $this->scalar('SELECT COUNT(*) FROM sport_groups'),
                ],
                'asistencia' => [
                    'registros' => (int) $this->scalar('SELECT COUNT(*) FROM attendance'),
                    'presentes' => (int) $this->scalar("SELECT COUNT(*) FROM attendance WHERE status = 'present'"),
                    'ausentes' => (int) $this->scalar("SELECT COUNT(*) FROM attendance WHERE status = 'absent'"),
                ],
            ];
        } catch (Throwable) {
            return SampleData::reportes($this->fallback);
        }
    }

    public static function resources(): array
    {
        return array_keys(self::TABLES);
    }

    private function table(string $resource): string
    {
        if (!isset(self::TABLES[$resource])) {
            throw new InvalidArgumentException('Recurso no soportado');
        }

        return self::TABLES[$resource];
    }

    private function toDatabasePayload(string $resource, array $payload): array
    {
        return match ($resource) {
            'alumnos' => array_filter([
                'first_name' => $payload['first_name'] ?? $this->firstName($payload['nombre'] ?? ''),
                'last_name' => $payload['last_name'] ?? $this->lastName($payload['nombre'] ?? ''),
                'birth_date' => $payload['birth_date'] ?? $payload['fecha_nacimiento'] ?? date('Y-m-d', strtotime('-10 years')),
                'status' => $this->statusToDb($payload['estado'] ?? 'activo'),
                'joined_at' => $payload['joined_at'] ?? $payload['fecha_inscripcion'] ?? date('Y-m-d'),
                'phone' => $payload['phone'] ?? $payload['telefono'] ?? null,
                'email' => $payload['email'] ?? null,
            ], fn ($value) => $value !== null && $value !== ''),
            'grupos' => array_filter([
                'sport_id' => $payload['sport_id'] ?? 1,
                'name' => $payload['name'] ?? $payload['nombre'] ?? '',
                'level' => $payload['level'] ?? 'beginner',
                'capacity' => $payload['capacity'] ?? $payload['capacidad'] ?? 20,
                'monthly_fee' => $payload['monthly_fee'] ?? $payload['costo'] ?? 0,
                'status' => $this->statusToDb($payload['estado'] ?? 'activo'),
            ], fn ($value) => $value !== null && $value !== ''),
            'horarios' => array_filter([
                'group_id' => $payload['group_id'] ?? $payload['grupo_id'] ?? null,
                'day_of_week' => $payload['day_of_week'] ?? $payload['dia_semana'] ?? 1,
                'start_time' => $payload['start_time'] ?? $payload['hora_inicio'] ?? null,
                'end_time' => $payload['end_time'] ?? $payload['hora_fin'] ?? null,
                'location' => $payload['location'] ?? $payload['lugar'] ?? null,
            ], fn ($value) => $value !== null && $value !== ''),
            default => [],
        };
    }

    private function allowedFilters(string $resource): array
    {
        return match ($resource) {
            'alumnos' => ['estado', 'grupo_id'],
            'grupos' => ['disciplina', 'nivel'],
            'horarios' => ['grupo_id', 'dia'],
            'asistencia' => ['alumno_id', 'grupo_id', 'fecha', 'estado'],
            'pagos' => ['alumno_id', 'estado'],
            'comunicacion' => ['grupo_id', 'canal', 'estado'],
            default => [],
        };
    }

    private function listSql(string $resource): string
    {
        return match ($resource) {
            'alumnos' => "SELECT s.id, CONCAT(s.first_name, ' ', s.last_name) AS nombre, TIMESTAMPDIFF(YEAR, s.birth_date, CURDATE()) AS edad, CASE s.status WHEN 'active' THEN 'Activo' WHEN 'waiting_list' THEN 'Pausa' ELSE 'Inactivo' END AS estado, COALESCE(sg.name, 'Sin grupo') AS grupo, COALESCE(vsb.outstanding_amount, 0) AS adeudo, CASE WHEN COALESCE(vsb.outstanding_amount, 0) > 0 THEN 'Pendiente' ELSE 'Al corriente' END AS pago, 90 AS asistencia FROM students s LEFT JOIN student_groups stg ON stg.student_id = s.id AND stg.status = 'active' LEFT JOIN sport_groups sg ON sg.id = stg.group_id LEFT JOIN v_student_balance vsb ON vsb.student_id = s.id ORDER BY s.id DESC",
            'grupos' => "SELECT sg.id, sg.name AS nombre, sp.name AS disciplina, sg.level AS nivel, COALESCE(u.name, 'Sin entrenador') AS entrenador, sg.capacity AS cupo, COUNT(CASE WHEN stg.status = 'active' THEN 1 END) AS alumnos, sg.monthly_fee AS costo, sg.status AS estado FROM sport_groups sg JOIN sports sp ON sp.id = sg.sport_id LEFT JOIN users u ON u.id = sg.coach_user_id LEFT JOIN student_groups stg ON stg.group_id = sg.id GROUP BY sg.id, sg.name, sp.name, sg.level, u.name, sg.capacity, sg.monthly_fee, sg.status ORDER BY sg.id DESC",
            'horarios' => "SELECT sc.id, sg.name AS grupo, CASE sc.day_of_week WHEN 1 THEN 'Lunes' WHEN 2 THEN 'Martes' WHEN 3 THEN 'Miercoles' WHEN 4 THEN 'Jueves' WHEN 5 THEN 'Viernes' WHEN 6 THEN 'Sabado' ELSE 'Domingo' END AS dia, TIME_FORMAT(sc.start_time, '%H:%i') AS hora, TIME_FORMAT(sc.start_time, '%H:%i') AS hora_inicio, TIME_FORMAT(sc.end_time, '%H:%i') AS hora_fin, sc.location AS sede, sc.location AS lugar, COALESCE(u.name, 'Sin entrenador') AS entrenador FROM schedules sc JOIN sport_groups sg ON sg.id = sc.group_id LEFT JOIN users u ON u.id = sg.coach_user_id ORDER BY sc.day_of_week, sc.start_time",
            'asistencia' => "SELECT a.id, a.student_id AS alumno_id, CONCAT(s.first_name, ' ', s.last_name) AS alumno, c.group_id AS grupo_id, c.class_date AS fecha, CASE a.status WHEN 'present' THEN 'presente' WHEN 'absent' THEN 'ausente' WHEN 'late' THEN 'retardo' ELSE 'justificado' END AS estado, a.notes AS observaciones FROM attendance a JOIN students s ON s.id = a.student_id JOIN classes c ON c.id = a.class_id ORDER BY c.class_date DESC, a.id DESC",
            'pagos' => "SELECT p.id, p.student_id AS alumno_id, CONCAT(s.first_name, ' ', s.last_name) AS alumno, p.concept AS concepto, p.amount AS monto, p.due_date AS fecha_vencimiento, p.paid_at AS fecha_pago, CASE p.status WHEN 'paid' THEN 'Pagado' WHEN 'overdue' THEN 'Vencido' WHEN 'cancelled' THEN 'Cancelado' ELSE 'Pendiente' END AS estado FROM payments p JOIN students s ON s.id = p.student_id ORDER BY p.due_date DESC, p.id DESC",
            'comunicacion' => "SELECT m.id, COALESCE(m.subject, 'Aviso') AS titulo, m.body AS mensaje, m.channel AS canal, m.group_id, COALESCE(sg.name, m.recipient) AS destino, m.recipient AS enviado_a, m.sent_at AS fecha_envio, CASE m.status WHEN 'sent' THEN 'Enviado' WHEN 'draft' THEN 'Borrador' WHEN 'failed' THEN 'Fallido' ELSE 'Programado' END AS estado FROM messages m LEFT JOIN sport_groups sg ON sg.id = m.group_id ORDER BY m.created_at DESC",
            default => throw new InvalidArgumentException('Recurso no soportado'),
        };
    }

    private function findSql(string $resource): string
    {
        return 'SELECT * FROM (' . $this->listSql($resource) . ') api_resource WHERE id = :id LIMIT 1';
    }

    private function firstName(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];
        return $parts[0] ?? 'Alumno';
    }

    private function lastName(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];
        return count($parts) > 1 ? implode(' ', array_slice($parts, 1)) : 'SportIk';
    }

    private function statusToDb(string $status): string
    {
        return match (strtolower($status)) {
            'activo', 'active' => 'active',
            'pausa', 'pausado', 'waiting_list' => 'waiting_list',
            default => 'inactive',
        };
    }

    private function filterFallback(string $resource, array $query): array
    {
        $items = $this->fallback[$resource] ?? [];

        foreach ($this->allowedFilters($resource) as $field) {
            if (!isset($query[$field]) || $query[$field] === '') {
                continue;
            }

            $items = array_values(array_filter($items, fn ($item) => (string) ($item[$field] ?? '') === (string) $query[$field]));
        }

        return $items;
    }

    private function findFallback(string $resource, int $id): ?array
    {
        foreach ($this->fallback[$resource] ?? [] as $item) {
            if ((int) ($item['id'] ?? 0) === $id) {
                return $item;
            }
        }

        return null;
    }

    private function createFallback(string $resource, array $payload): array
    {
        $items = $this->fallback[$resource] ?? [];
        $nextId = count($items) > 0 ? max(array_map(fn ($item) => (int) ($item['id'] ?? 0), $items)) + 1 : 1;

        return array_merge(['id' => $nextId], $payload);
    }

    private function updateFallback(string $resource, int $id, array $payload): ?array
    {
        $existing = $this->findFallback($resource, $id);

        return $existing ? array_merge($existing, $payload) : null;
    }

    private function query(string $sql): array
    {
        $statement = $this->pdo?->query($sql);

        return $statement ? $statement->fetchAll() : [];
    }

    private function scalar(string $sql): mixed
    {
        $statement = $this->pdo?->query($sql);

        return $statement ? $statement->fetchColumn() : null;
    }

    private function attendancePercentToday(): float
    {
        $today = date('Y-m-d');
        $total = (int) $this->scalar("SELECT COUNT(*) FROM attendance a JOIN classes c ON c.id = a.class_id WHERE c.class_date = '{$today}'");

        if ($total === 0) {
            return 0.0;
        }

        $presentes = (int) $this->scalar("SELECT COUNT(*) FROM attendance a JOIN classes c ON c.id = a.class_id WHERE c.class_date = '{$today}' AND a.status = 'present'");

        return round(($presentes / $total) * 100, 1);
    }
}
