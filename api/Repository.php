<?php

final class Repository
{
    private const TABLES = [
        'alumnos' => 'alumnos',
        'grupos' => 'grupos',
        'horarios' => 'horarios',
        'asistencia' => 'asistencia',
        'pagos' => 'pagos',
        'comunicacion' => 'comunicacion',
    ];

    private const WRITABLE_FIELDS = [
        'alumnos' => ['nombre', 'edad', 'telefono_tutor', 'email_tutor', 'estado', 'grupo_id', 'fecha_inscripcion'],
        'grupos' => ['nombre', 'disciplina', 'nivel', 'entrenador', 'capacidad', 'activos'],
        'horarios' => ['grupo_id', 'dia', 'hora_inicio', 'hora_fin', 'lugar'],
        'asistencia' => ['alumno_id', 'grupo_id', 'fecha', 'estado', 'observaciones'],
        'pagos' => ['alumno_id', 'concepto', 'monto', 'fecha_vencimiento', 'fecha_pago', 'estado'],
        'comunicacion' => ['titulo', 'mensaje', 'canal', 'grupo_id', 'enviado_a', 'fecha_envio', 'estado'],
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
            $table = $this->table($resource);
            $sql = "SELECT * FROM {$table}";
            $params = [];
            $where = [];

            foreach ($this->allowedFilters($resource) as $field) {
                if (isset($query[$field]) && $query[$field] !== '') {
                    $where[] = "{$field} = :{$field}";
                    $params[":{$field}"] = $query[$field];
                }
            }

            if ($where) {
                $sql .= ' WHERE ' . implode(' AND ', $where);
            }

            $sql .= ' ORDER BY id DESC';
            $statement = $this->pdo->prepare($sql);
            $statement->execute($params);

            return $statement->fetchAll();
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
            $table = $this->table($resource);
            $statement = $this->pdo->prepare("SELECT * FROM {$table} WHERE id = :id LIMIT 1");
            $statement->execute([':id' => $id]);
            $row = $statement->fetch();

            return $row ?: $this->findFallback($resource, $id);
        } catch (Throwable) {
            return $this->findFallback($resource, $id);
        }
    }

    public function create(string $resource, array $payload): array
    {
        $payload = $this->onlyWritable($resource, $payload);

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
        $payload = $this->onlyWritable($resource, $payload);

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
                    'alumnos_activos' => (int) $this->scalar("SELECT COUNT(*) FROM alumnos WHERE estado = 'activo'"),
                    'grupos_activos' => (int) $this->scalar('SELECT COUNT(*) FROM grupos'),
                    'pagos_pendientes' => (int) $this->scalar("SELECT COUNT(*) FROM pagos WHERE estado IN ('pendiente', 'vencido')"),
                    'asistencia_hoy' => $this->attendancePercentToday(),
                ],
                'proximos_horarios' => $this->query('SELECT * FROM horarios ORDER BY id DESC LIMIT 5'),
                'pagos_recientes' => $this->query('SELECT * FROM pagos ORDER BY id DESC LIMIT 5'),
                'avisos' => $this->query('SELECT * FROM comunicacion ORDER BY id DESC LIMIT 3'),
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
                    'cobrado' => (float) $this->scalar("SELECT COALESCE(SUM(monto), 0) FROM pagos WHERE estado = 'pagado'"),
                    'pendiente' => (float) $this->scalar("SELECT COALESCE(SUM(monto), 0) FROM pagos WHERE estado IN ('pendiente', 'vencido')"),
                    'pagos_vencidos' => (int) $this->scalar("SELECT COUNT(*) FROM pagos WHERE estado = 'vencido'"),
                ],
                'academia' => [
                    'alumnos_total' => (int) $this->scalar('SELECT COUNT(*) FROM alumnos'),
                    'alumnos_activos' => (int) $this->scalar("SELECT COUNT(*) FROM alumnos WHERE estado = 'activo'"),
                    'grupos_total' => (int) $this->scalar('SELECT COUNT(*) FROM grupos'),
                ],
                'asistencia' => [
                    'registros' => (int) $this->scalar('SELECT COUNT(*) FROM asistencia'),
                    'presentes' => (int) $this->scalar("SELECT COUNT(*) FROM asistencia WHERE estado = 'presente'"),
                    'ausentes' => (int) $this->scalar("SELECT COUNT(*) FROM asistencia WHERE estado = 'ausente'"),
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

    private function onlyWritable(string $resource, array $payload): array
    {
        $allowed = self::WRITABLE_FIELDS[$resource] ?? [];

        return array_intersect_key($payload, array_flip($allowed));
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
        $total = (int) $this->scalar("SELECT COUNT(*) FROM asistencia WHERE fecha = '{$today}'");

        if ($total === 0) {
            return 0.0;
        }

        $presentes = (int) $this->scalar("SELECT COUNT(*) FROM asistencia WHERE fecha = '{$today}' AND estado = 'presente'");

        return round(($presentes / $total) * 100, 1);
    }
}
