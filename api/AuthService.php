<?php

final class Auth
{
    public function __construct(private readonly ?PDO $pdo)
    {
    }

    public function login(string $email, string $password): ?array
    {
        $email = strtolower(trim($email));

        if (!$this->pdo) {
            return $this->fallbackLogin($email, $password);
        }

        $statement = $this->pdo->prepare(
            "SELECT u.id, u.name, u.email, u.password_hash, u.status, r.name AS role, b.name AS branch
             FROM users u
             JOIN roles r ON r.id = u.role_id
             LEFT JOIN branches b ON b.id = u.branch_id
             WHERE LOWER(u.email) = :email
             LIMIT 1"
        );
        $statement->execute([':email' => $email]);
        $user = $statement->fetch();

        if (!$user || ($user['status'] ?? '') !== 'active' || !password_verify($password, (string) $user['password_hash'])) {
            return null;
        }

        $this->pdo->prepare('UPDATE users SET last_login_at = NOW() WHERE id = :id')->execute([':id' => $user['id']]);

        return $this->openSession([
            'id' => (int) $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'],
            'branch' => $user['branch'] ?? null,
            'permissions' => $this->permissionsForRole((string) $user['role']),
        ]);
    }

    public function currentUser(): ?array
    {
        return $_SESSION['user'] ?? null;
    }

    public function logout(): void
    {
        $_SESSION = [];

        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', (bool) $params['secure'], (bool) $params['httponly']);
        }

        session_destroy();
    }

    public function can(?array $user, string $module, string $action = 'view'): bool
    {
        if (!$user) {
            return false;
        }

        $module = $this->permissionModule($module);
        $permissions = $user['permissions'] ?? [];

        if (isset($permissions['*'])) {
            return (bool) ($permissions['*'][$action] ?? true);
        }

        return (bool) ($permissions[$module][$action] ?? false);
    }

    private function permissionModule(string $module): string
    {
        return match ($module) {
            'horarios' => 'calendario',
            'cortes', 'gastos' => 'caja',
            'productos', 'stock', 'ventas' => 'inventario',
            'disciplinas' => 'deportes',
            'torneos' => 'eventos',
            'usuarios', 'roles', 'sucursales', 'canchas', 'metodos', 'conceptos', 'plantillas', 'academia' => 'configuracion',
            default => $module,
        };
    }

    private function openSession(array $user): array
    {
        session_regenerate_id(true);
        $_SESSION['user'] = $user;

        return $user;
    }

    private function permissionsForRole(string $role): array
    {
        if (!$this->pdo) {
            return $this->fallbackPermissions($role);
        }

        $statement = $this->pdo->prepare(
            "SELECT rp.module, rp.can_view, rp.can_create, rp.can_update, rp.can_delete
             FROM role_permissions rp
             JOIN roles r ON r.id = rp.role_id
             WHERE r.name = :role"
        );
        $statement->execute([':role' => $role]);
        $rows = $statement->fetchAll();

        if (!$rows && $role === 'admin') {
            return ['*' => ['view' => true, 'create' => true, 'update' => true, 'delete' => true]];
        }

        $permissions = [];
        foreach ($rows as $row) {
            $permissions[$row['module']] = [
                'view' => (bool) $row['can_view'],
                'create' => (bool) $row['can_create'],
                'update' => (bool) $row['can_update'],
                'delete' => (bool) $row['can_delete'],
            ];
        }

        return $permissions;
    }

    private function fallbackLogin(string $email, string $password): ?array
    {
        $users = [
            'admin@sportik.test' => ['password' => 'admin123', 'name' => 'Admin SportIk', 'role' => 'admin'],
            'laura.coach@sportik.test' => ['password' => 'coach123', 'name' => 'Laura Medina', 'role' => 'coach'],
            'marta.staff@sportik.test' => ['password' => 'staff123', 'name' => 'Marta Rios', 'role' => 'staff'],
            'caja@sportik.test' => ['password' => 'caja123', 'name' => 'Ivan Caja', 'role' => 'caja'],
        ];

        $user = $users[$email] ?? null;
        if (!$user || $user['password'] !== $password) {
            return null;
        }

        return $this->openSession([
            'id' => 0,
            'name' => $user['name'],
            'email' => $email,
            'role' => $user['role'],
            'branch' => 'Demo',
            'permissions' => $this->fallbackPermissions($user['role']),
        ]);
    }

    private function fallbackPermissions(string $role): array
    {
        if ($role === 'admin') {
            return ['*' => ['view' => true, 'create' => true, 'update' => true, 'delete' => true]];
        }

        $sets = [
            'coach' => ['dashboard', 'alumnos', 'grupos', 'deportes', 'calendario', 'asistencia', 'entrenadores', 'evaluaciones', 'eventos', 'comunicacion', 'reportes'],
            'staff' => ['dashboard', 'alumnos', 'grupos', 'deportes', 'calendario', 'asistencia', 'pagos', 'comunicacion', 'eventos', 'reportes'],
            'caja' => ['dashboard', 'pagos', 'caja', 'inventario', 'reportes'],
        ];

        $permissions = [];
        foreach ($sets[$role] ?? ['dashboard'] as $module) {
            $permissions[$module] = ['view' => true, 'create' => true, 'update' => true, 'delete' => false];
        }

        return $permissions;
    }
}
