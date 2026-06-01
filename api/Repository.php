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
        'deportes' => 'sports',
        'disciplinas' => 'disciplines',
        'caja' => 'cash_cuts',
        'cortes' => 'cash_cuts',
        'gastos' => 'expenses',
        'entrenadores' => 'coaches',
        'evaluaciones' => 'sport_evaluations',
        'eventos' => 'events',
        'torneos' => 'tournaments',
        'productos' => 'products',
        'inventario' => 'inventory_movements',
        'ventas' => 'sales',
        'stock' => 'products',
        'roles' => 'roles',
        'usuarios' => 'users',
        'sucursales' => 'branches',
        'canchas' => 'courts',
        'metodos' => 'payment_methods',
        'conceptos' => 'payment_concepts',
        'plantillas' => 'message_templates',
        'configuracion' => 'academy_settings',
        'academia' => 'academy_settings',
    ];

    private const WRITABLE_COLUMNS = [
        'students' => ['first_name', 'last_name', 'birth_date', 'gender', 'phone', 'email', 'address', 'medical_notes', 'status', 'joined_at'],
        'sport_groups' => ['sport_id', 'coach_user_id', 'coach_id', 'branch_id', 'court_id', 'name', 'level', 'min_age', 'max_age', 'capacity', 'monthly_fee', 'status'],
        'schedules' => ['group_id', 'day_of_week', 'start_time', 'end_time', 'location', 'court_id', 'status'],
        'attendance' => ['class_id', 'student_id', 'status', 'checked_in_at', 'notes', 'recorded_by'],
        'payments' => ['student_id', 'group_id', 'payment_concept_id', 'payment_method_id', 'period_month', 'concept', 'amount', 'due_date', 'paid_at', 'payment_method', 'status', 'reference', 'notes', 'created_by'],
        'messages' => ['template_id', 'student_id', 'tutor_id', 'group_id', 'channel', 'recipient', 'subject', 'body', 'status', 'sent_at', 'created_by'],
        'sports' => ['name', 'description', 'status'],
        'disciplines' => ['sport_id', 'name', 'description', 'status'],
        'cash_cuts' => ['branch_id', 'opened_by', 'closed_by', 'opened_at', 'closed_at', 'opening_amount', 'cash_sales', 'card_sales', 'transfer_sales', 'expenses_amount', 'expected_amount', 'counted_amount', 'status', 'notes'],
        'expenses' => ['cash_cut_id', 'branch_id', 'concept', 'amount', 'spent_at', 'payment_method_id', 'supplier', 'receipt_number', 'status', 'notes', 'created_by'],
        'coaches' => ['user_id', 'sport_id', 'name', 'phone', 'email', 'certification', 'status', 'hired_at'],
        'sport_evaluations' => ['student_id', 'group_id', 'coach_id', 'evaluated_at', 'physical_score', 'technical_score', 'tactical_score', 'attitude_score', 'overall_score', 'notes', 'next_steps'],
        'events' => ['sport_id', 'branch_id', 'name', 'event_type', 'starts_at', 'ends_at', 'location', 'capacity', 'status', 'fee', 'notes'],
        'tournaments' => ['sport_id', 'branch_id', 'name', 'starts_on', 'ends_on', 'location', 'category', 'status', 'fee', 'notes'],
        'products' => ['sku', 'name', 'category', 'sale_price', 'cost', 'stock_quantity', 'min_stock', 'status'],
        'inventory_movements' => ['product_id', 'movement_type', 'quantity', 'unit_cost', 'reference', 'notes', 'created_by'],
        'sales' => ['student_id', 'cash_cut_id', 'payment_method_id', 'sold_at', 'subtotal', 'discount', 'total', 'status', 'reference', 'created_by'],
        'roles' => ['name', 'description'],
        'users' => ['role_id', 'branch_id', 'name', 'email', 'password_hash', 'phone', 'status', 'last_login_at'],
        'branches' => ['name', 'code', 'address', 'phone', 'status'],
        'courts' => ['branch_id', 'name', 'sport_id', 'capacity', 'status', 'notes'],
        'payment_methods' => ['name', 'code', 'status'],
        'payment_concepts' => ['name', 'code', 'default_amount', 'status'],
        'message_templates' => ['name', 'channel', 'subject', 'body', 'status'],
        'academy_settings' => ['setting_key', 'setting_value', 'setting_group', 'description', 'updated_by'],
    ];

    private const FIELD_ALIASES = [
        'nombre' => 'name',
        'descripcion' => 'description',
        'estado' => 'status',
        'telefono' => 'phone',
        'direccion' => 'address',
        'sucursal_id' => 'branch_id',
        'deporte_id' => 'sport_id',
        'disciplina_id' => 'sport_id',
        'cancha_id' => 'court_id',
        'entrenador_id' => 'coach_id',
        'usuario_id' => 'user_id',
        'rol_id' => 'role_id',
        'grupo_id' => 'group_id',
        'alumno_id' => 'student_id',
        'tutor_id' => 'tutor_id',
        'plantilla_id' => 'template_id',
        'metodo_id' => 'payment_method_id',
        'concepto_id' => 'payment_concept_id',
        'corte_id' => 'cash_cut_id',
        'producto_id' => 'product_id',
        'fecha_nacimiento' => 'birth_date',
        'fecha_inscripcion' => 'joined_at',
        'nivel' => 'level',
        'capacidad' => 'capacity',
        'cupo' => 'capacity',
        'costo' => 'monthly_fee',
        'mensualidad' => 'monthly_fee',
        'dia_semana' => 'day_of_week',
        'hora_inicio' => 'start_time',
        'hora_fin' => 'end_time',
        'lugar' => 'location',
        'clase_id' => 'class_id',
        'observaciones' => 'notes',
        'monto' => 'amount',
        'fecha_vencimiento' => 'due_date',
        'fecha_pago' => 'paid_at',
        'metodo_pago' => 'payment_method',
        'referencia' => 'reference',
        'canal' => 'channel',
        'destinatario' => 'recipient',
        'titulo' => 'subject',
        'mensaje' => 'body',
        'fecha_envio' => 'sent_at',
        'apertura' => 'opened_at',
        'cierre' => 'closed_at',
        'monto_inicial' => 'opening_amount',
        'monto_contado' => 'counted_amount',
        'fecha_gasto' => 'spent_at',
        'proveedor' => 'supplier',
        'folio' => 'receipt_number',
        'certificacion' => 'certification',
        'fecha_contratacion' => 'hired_at',
        'fecha_evaluacion' => 'evaluated_at',
        'puntaje_fisico' => 'physical_score',
        'puntaje_tecnico' => 'technical_score',
        'puntaje_tactico' => 'tactical_score',
        'puntaje_actitud' => 'attitude_score',
        'puntaje_general' => 'overall_score',
        'siguientes_pasos' => 'next_steps',
        'tipo_evento' => 'event_type',
        'inicio' => 'starts_at',
        'fin' => 'ends_at',
        'precio' => 'fee',
        'fecha_inicio' => 'starts_on',
        'fecha_fin' => 'ends_on',
        'categoria' => 'category',
        'precio_venta' => 'sale_price',
        'existencia' => 'stock_quantity',
        'stock_minimo' => 'min_stock',
        'tipo_movimiento' => 'movement_type',
        'cantidad' => 'quantity',
        'costo_unitario' => 'unit_cost',
        'subtotal' => 'subtotal',
        'descuento' => 'discount',
        'total' => 'total',
        'clave' => 'setting_key',
        'valor' => 'setting_value',
        'grupo' => 'setting_group',
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
                    'stock_bajo' => (int) $this->scalar('SELECT COUNT(*) FROM products WHERE stock_quantity <= min_stock'),
                    'cortes_abiertos' => (int) $this->scalar("SELECT COUNT(*) FROM cash_cuts WHERE status = 'open'"),
                ],
                'proximos_horarios' => array_slice($this->list('horarios'), 0, 5),
                'pagos_recientes' => array_slice($this->list('pagos'), 0, 5),
                'avisos' => array_slice($this->list('comunicacion'), 0, 3),
                'eventos' => array_slice($this->list('eventos'), 0, 3),
                'stock' => array_slice($this->list('stock'), 0, 5),
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
                    'ventas' => (float) $this->scalar("SELECT COALESCE(SUM(total), 0) FROM sales WHERE status = 'paid'"),
                    'gastos' => (float) $this->scalar("SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE status = 'registered'"),
                    'pagos_vencidos' => (int) $this->scalar("SELECT COUNT(*) FROM payments WHERE status = 'overdue'"),
                ],
                'academia' => [
                    'alumnos_total' => (int) $this->scalar('SELECT COUNT(*) FROM students'),
                    'alumnos_activos' => (int) $this->scalar("SELECT COUNT(*) FROM students WHERE status = 'active'"),
                    'grupos_total' => (int) $this->scalar('SELECT COUNT(*) FROM sport_groups'),
                    'entrenadores_activos' => (int) $this->scalar("SELECT COUNT(*) FROM coaches WHERE status = 'active'"),
                ],
                'asistencia' => [
                    'registros' => (int) $this->scalar('SELECT COUNT(*) FROM attendance'),
                    'presentes' => (int) $this->scalar("SELECT COUNT(*) FROM attendance WHERE status = 'present'"),
                    'ausentes' => (int) $this->scalar("SELECT COUNT(*) FROM attendance WHERE status = 'absent'"),
                ],
                'inventario' => [
                    'productos' => (int) $this->scalar('SELECT COUNT(*) FROM products'),
                    'stock_bajo' => (int) $this->scalar('SELECT COUNT(*) FROM products WHERE stock_quantity <= min_stock'),
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
        if ($resource === 'alumnos' && isset($payload['nombre']) && !isset($payload['first_name'])) {
            $payload['first_name'] = $this->firstName((string) $payload['nombre']);
            $payload['last_name'] = $this->lastName((string) $payload['nombre']);
        }

        $table = $this->table($resource);
        $allowed = self::WRITABLE_COLUMNS[$table] ?? [];
        $normalized = [];

        foreach ($payload as $field => $value) {
            $column = self::FIELD_ALIASES[$field] ?? $field;

            if ($column === 'status') {
                $value = $this->statusToDb((string) $value);
            }

            if (in_array($column, $allowed, true) && $value !== '') {
                $normalized[$column] = $value;
            }
        }

        if ($resource === 'alumnos') {
            $normalized += [
                'birth_date' => date('Y-m-d', strtotime('-10 years')),
                'status' => 'active',
                'joined_at' => date('Y-m-d'),
            ];
        }

        if ($resource === 'grupos') {
            $normalized += [
                'sport_id' => 1,
                'level' => 'beginner',
                'capacity' => 20,
                'monthly_fee' => 0,
                'status' => 'active',
            ];
        }

        if ($resource === 'horarios') {
            $normalized += [
                'day_of_week' => 1,
                'status' => 'active',
            ];
        }

        return array_filter($normalized, fn ($value) => $value !== null);
    }

    private function allowedFilters(string $resource): array
    {
        return [
            'estado',
            'grupo_id',
            'alumno_id',
            'deporte_id',
            'sucursal_id',
            'fecha',
            'canal',
            'categoria',
        ];
    }

    private function listSql(string $resource): string
    {
        return match ($resource) {
            'alumnos' => "SELECT s.id, CONCAT(s.first_name, ' ', s.last_name) AS nombre, TIMESTAMPDIFF(YEAR, s.birth_date, CURDATE()) AS edad, CASE s.status WHEN 'active' THEN 'Activo' WHEN 'waiting_list' THEN 'Pausa' ELSE 'Inactivo' END AS estado, COALESCE(sg.name, 'Sin grupo') AS grupo, COALESCE(vsb.outstanding_amount, 0) AS adeudo, CASE WHEN COALESCE(vsb.outstanding_amount, 0) > 0 THEN 'Pendiente' ELSE 'Al corriente' END AS pago, 90 AS asistencia FROM students s LEFT JOIN student_groups stg ON stg.student_id = s.id AND stg.status = 'active' LEFT JOIN sport_groups sg ON sg.id = stg.group_id LEFT JOIN v_student_balance vsb ON vsb.student_id = s.id ORDER BY s.id DESC",
            'grupos' => "SELECT sg.id, sg.name AS nombre, sp.name AS disciplina, sg.level AS nivel, COALESCE(c.name, u.name, 'Sin entrenador') AS entrenador, sg.capacity AS cupo, COUNT(CASE WHEN stg.status = 'active' THEN 1 END) AS alumnos, sg.monthly_fee AS costo, sg.status AS estado FROM sport_groups sg JOIN sports sp ON sp.id = sg.sport_id LEFT JOIN coaches c ON c.id = sg.coach_id LEFT JOIN users u ON u.id = sg.coach_user_id LEFT JOIN student_groups stg ON stg.group_id = sg.id GROUP BY sg.id, sg.name, sp.name, sg.level, c.name, u.name, sg.capacity, sg.monthly_fee, sg.status ORDER BY sg.id DESC",
            'horarios' => "SELECT sc.id, sg.name AS grupo, CASE sc.day_of_week WHEN 1 THEN 'Lunes' WHEN 2 THEN 'Martes' WHEN 3 THEN 'Miercoles' WHEN 4 THEN 'Jueves' WHEN 5 THEN 'Viernes' WHEN 6 THEN 'Sabado' ELSE 'Domingo' END AS dia, TIME_FORMAT(sc.start_time, '%H:%i') AS hora, TIME_FORMAT(sc.start_time, '%H:%i') AS hora_inicio, TIME_FORMAT(sc.end_time, '%H:%i') AS hora_fin, COALESCE(co.name, sc.location) AS sede, sc.location AS lugar, COALESCE(c.name, u.name, 'Sin entrenador') AS entrenador FROM schedules sc JOIN sport_groups sg ON sg.id = sc.group_id LEFT JOIN courts co ON co.id = sc.court_id LEFT JOIN coaches c ON c.id = sg.coach_id LEFT JOIN users u ON u.id = sg.coach_user_id ORDER BY sc.day_of_week, sc.start_time",
            'asistencia' => "SELECT a.id, a.student_id AS alumno_id, CONCAT(s.first_name, ' ', s.last_name) AS alumno, c.group_id AS grupo_id, c.class_date AS fecha, CASE a.status WHEN 'present' THEN 'presente' WHEN 'absent' THEN 'ausente' WHEN 'late' THEN 'retardo' ELSE 'justificado' END AS estado, a.notes AS observaciones FROM attendance a JOIN students s ON s.id = a.student_id JOIN classes c ON c.id = a.class_id ORDER BY c.class_date DESC, a.id DESC",
            'pagos' => "SELECT p.id, p.student_id AS alumno_id, CONCAT(s.first_name, ' ', s.last_name) AS alumno, COALESCE(pc.name, p.concept) AS concepto, p.amount AS monto, p.due_date AS fecha_vencimiento, p.paid_at AS fecha_pago, COALESCE(pm.name, p.payment_method) AS metodo, CASE p.status WHEN 'paid' THEN 'Pagado' WHEN 'overdue' THEN 'Vencido' WHEN 'cancelled' THEN 'Cancelado' ELSE 'Pendiente' END AS estado FROM payments p JOIN students s ON s.id = p.student_id LEFT JOIN payment_concepts pc ON pc.id = p.payment_concept_id LEFT JOIN payment_methods pm ON pm.id = p.payment_method_id ORDER BY p.due_date DESC, p.id DESC",
            'comunicacion' => "SELECT m.id, COALESCE(m.subject, 'Aviso') AS titulo, m.body AS mensaje, m.channel AS canal, m.group_id, COALESCE(sg.name, m.recipient) AS destino, m.recipient AS enviado_a, m.sent_at AS fecha_envio, CASE m.status WHEN 'sent' THEN 'Enviado' WHEN 'draft' THEN 'Borrador' WHEN 'failed' THEN 'Fallido' ELSE 'Programado' END AS estado FROM messages m LEFT JOIN sport_groups sg ON sg.id = m.group_id ORDER BY m.created_at DESC",
            'deportes' => "SELECT id, name AS nombre, description AS descripcion, status AS estado, created_at FROM sports ORDER BY name",
            'disciplinas' => "SELECT d.id, d.sport_id AS deporte_id, sp.name AS deporte, d.name AS nombre, d.description AS descripcion, d.status AS estado FROM disciplines d JOIN sports sp ON sp.id = d.sport_id ORDER BY sp.name, d.name",
            'caja' => $this->listSql('cortes'),
            'cortes' => "SELECT cc.id, b.name AS sucursal, u.name AS abierto_por, cc.opened_at AS apertura, cc.closed_at AS cierre, cc.opening_amount AS monto_inicial, cc.expected_amount AS esperado, cc.counted_amount AS contado, cc.status AS estado, cc.notes AS observaciones FROM cash_cuts cc LEFT JOIN branches b ON b.id = cc.branch_id JOIN users u ON u.id = cc.opened_by ORDER BY cc.opened_at DESC",
            'gastos' => "SELECT e.id, b.name AS sucursal, e.concept AS concepto, e.amount AS monto, e.spent_at AS fecha, pm.name AS metodo, e.supplier AS proveedor, e.status AS estado, e.notes AS observaciones FROM expenses e LEFT JOIN branches b ON b.id = e.branch_id LEFT JOIN payment_methods pm ON pm.id = e.payment_method_id ORDER BY e.spent_at DESC, e.id DESC",
            'entrenadores' => "SELECT c.id, c.name AS nombre, sp.name AS deporte, c.phone AS telefono, c.email, c.certification AS certificacion, c.status AS estado, c.hired_at AS fecha_contratacion FROM coaches c LEFT JOIN sports sp ON sp.id = c.sport_id ORDER BY c.name",
            'evaluaciones' => "SELECT ev.id, CONCAT(s.first_name, ' ', s.last_name) AS alumno, sg.name AS grupo, c.name AS entrenador, ev.evaluated_at AS fecha_evaluacion, ev.overall_score AS puntaje_general, ev.notes AS observaciones, ev.next_steps AS siguientes_pasos FROM sport_evaluations ev JOIN students s ON s.id = ev.student_id LEFT JOIN sport_groups sg ON sg.id = ev.group_id LEFT JOIN coaches c ON c.id = ev.coach_id ORDER BY ev.evaluated_at DESC",
            'eventos' => "SELECT e.id, e.name AS nombre, sp.name AS deporte, b.name AS sucursal, e.event_type AS tipo, e.starts_at AS inicio, e.ends_at AS fin, e.location AS lugar, e.capacity AS capacidad, e.fee AS precio, e.status AS estado FROM events e LEFT JOIN sports sp ON sp.id = e.sport_id LEFT JOIN branches b ON b.id = e.branch_id ORDER BY e.starts_at",
            'torneos' => "SELECT t.id, t.name AS nombre, sp.name AS deporte, b.name AS sucursal, t.starts_on AS fecha_inicio, t.ends_on AS fecha_fin, t.location AS lugar, t.category AS categoria, t.fee AS precio, t.status AS estado, COUNT(tr.id) AS inscritos FROM tournaments t JOIN sports sp ON sp.id = t.sport_id LEFT JOIN branches b ON b.id = t.branch_id LEFT JOIN tournament_registrations tr ON tr.tournament_id = t.id GROUP BY t.id, t.name, sp.name, b.name, t.starts_on, t.ends_on, t.location, t.category, t.fee, t.status ORDER BY t.starts_on",
            'productos' => "SELECT id, sku, name AS nombre, category AS categoria, sale_price AS precio_venta, cost AS costo, stock_quantity AS existencia, min_stock AS stock_minimo, status AS estado FROM products ORDER BY name",
            'inventario' => "SELECT im.id, p.name AS producto, im.movement_type AS tipo_movimiento, im.quantity AS cantidad, im.unit_cost AS costo_unitario, im.reference AS referencia, im.notes AS observaciones, im.created_at FROM inventory_movements im JOIN products p ON p.id = im.product_id ORDER BY im.created_at DESC",
            'ventas' => "SELECT s.id, CONCAT(st.first_name, ' ', st.last_name) AS alumno, pm.name AS metodo, s.sold_at AS fecha, s.subtotal, s.discount AS descuento, s.total, s.status AS estado, s.reference AS referencia FROM sales s LEFT JOIN students st ON st.id = s.student_id LEFT JOIN payment_methods pm ON pm.id = s.payment_method_id ORDER BY s.sold_at DESC",
            'stock' => "SELECT product_id AS id, sku, name AS nombre, category AS categoria, stock_quantity AS existencia, min_stock AS stock_minimo, stock_status AS estado_stock FROM v_product_stock ORDER BY stock_quantity ASC",
            'roles' => "SELECT id, name AS nombre, description AS descripcion, created_at FROM roles ORDER BY id",
            'usuarios' => "SELECT u.id, u.name AS nombre, u.email, u.phone AS telefono, r.name AS rol, b.name AS sucursal, u.status AS estado, u.last_login_at AS ultimo_acceso FROM users u JOIN roles r ON r.id = u.role_id LEFT JOIN branches b ON b.id = u.branch_id ORDER BY u.name",
            'sucursales' => "SELECT id, name AS nombre, code AS codigo, address AS direccion, phone AS telefono, status AS estado FROM branches ORDER BY name",
            'canchas' => "SELECT c.id, c.name AS nombre, b.name AS sucursal, sp.name AS deporte, c.capacity AS capacidad, c.status AS estado, c.notes AS observaciones FROM courts c LEFT JOIN branches b ON b.id = c.branch_id LEFT JOIN sports sp ON sp.id = c.sport_id ORDER BY c.name",
            'metodos' => "SELECT id, name AS nombre, code AS codigo, status AS estado FROM payment_methods ORDER BY name",
            'conceptos' => "SELECT id, name AS nombre, code AS codigo, default_amount AS monto_default, status AS estado FROM payment_concepts ORDER BY name",
            'plantillas' => "SELECT id, name AS nombre, channel AS canal, subject AS titulo, body AS mensaje, status AS estado FROM message_templates ORDER BY name",
            'configuracion' => $this->listSql('academia'),
            'academia' => "SELECT id, setting_key AS clave, setting_value AS valor, setting_group AS grupo, description AS descripcion, updated_at FROM academy_settings ORDER BY setting_group, setting_key",
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

        return count($parts) > 1 ? implode(' ', array_slice($parts, 1)) : 'Academy';
    }

    private function statusToDb(string $status): string
    {
        return match (strtolower($status)) {
            'activo', 'activa', 'active' => 'active',
            'inactivo', 'inactiva', 'inactive' => 'inactive',
            'pausa', 'pausado', 'waiting_list' => 'waiting_list',
            'abierto', 'open' => 'open',
            'cerrado', 'closed' => 'closed',
            'cancelado', 'cancelled' => 'cancelled',
            'programado', 'scheduled' => 'scheduled',
            'completado', 'completed' => 'completed',
            'planeado', 'planned' => 'planned',
            'registrado', 'registered' => 'registered',
            'pagado', 'paid' => 'paid',
            'pendiente', 'pending' => 'pending',
            'vencido', 'overdue' => 'overdue',
            default => $status,
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
