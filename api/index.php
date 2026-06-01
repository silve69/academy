<?php

$config = require __DIR__ . '/bootstrap.php';

$database = new Database($config);
$pdo = $database->getConnection();
$sampleData = SampleData::all();
$repository = new Repository($pdo, $sampleData);
$auth = new Auth($pdo);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$segments = routeSegments();
$resource = $segments[0] ?? '';
$id = isset($segments[1]) && ctype_digit($segments[1]) ? (int) $segments[1] : null;

if ($id === null && isset($_GET['id']) && ctype_digit((string) $_GET['id'])) {
    $id = (int) $_GET['id'];
}
$usingFallback = !$pdo;
$currentUser = $auth->currentUser();
$meta = [
    'source' => $usingFallback ? 'sample' : 'mysql',
    'available_resources' => array_merge(['dashboard', 'reportes'], Repository::resources()),
    'user' => $currentUser ? [
        'name' => $currentUser['name'] ?? '',
        'role' => $currentUser['role'] ?? '',
    ] : null,
];

if ($resource === 'auth') {
    handleAuth($auth, $method, $segments[1] ?? 'me', $meta);
}

if (!$currentUser) {
    Response::error('Sesion requerida', 401, ['login' => 'api/auth.php?action=login'], $meta);
}

if ($resource === '') {
    Response::ok([
        'name' => $config['app']['name'] ?? 'AcademyAdmin API',
        'endpoints' => [
            'GET /api/dashboard',
            'GET /api/reportes',
            'GET /api/{recurso}',
            'GET /api/{recurso}/{id}',
            'POST /api/{recurso}',
            'PUT /api/{recurso}/{id}',
            'DELETE /api/{recurso}/{id}',
        ],
        'recursos' => Repository::resources(),
    ], 'AcademyAdmin API lista', $meta);
}

if ($resource === 'dashboard') {
    if ($method !== 'GET') {
        Response::error('Metodo no permitido', 405, null, $meta);
    }
    ensurePermission($auth, $currentUser, 'dashboard', 'view', $meta);

    Response::ok($repository->dashboard(), 'Dashboard obtenido', $meta);
}

if (in_array($resource, ['reportes', 'reports'], true)) {
    if ($method !== 'GET') {
        Response::error('Metodo no permitido', 405, null, $meta);
    }
    ensurePermission($auth, $currentUser, 'reportes', 'view', $meta);

    Response::ok($repository->reports(), 'Reportes obtenidos', $meta);
}

if (!in_array($resource, Repository::resources(), true)) {
    Response::error('Endpoint no encontrado', 404, ['resource' => $resource], $meta);
}

match ($method) {
    'GET' => handleGet($repository, $auth, $currentUser, $resource, $id, $meta),
    'POST' => handlePost($repository, $auth, $currentUser, $resource, $meta),
    'PUT', 'PATCH' => handleUpdate($repository, $auth, $currentUser, $resource, $id, $meta),
    'DELETE' => handleDelete($repository, $auth, $currentUser, $resource, $id, $meta),
    default => Response::error('Metodo no permitido', 405, null, $meta),
};

function handleAuth(Auth $auth, string $method, string $action, array $meta): void
{
    if ($action === 'login') {
        if ($method !== 'POST') {
            Response::error('Metodo no permitido', 405, null, $meta);
        }

        $payload = readJsonBody();
        $user = $auth->login((string) ($payload['email'] ?? ''), (string) ($payload['password'] ?? ''));

        if (!$user) {
            Response::error('Credenciales invalidas', 401, null, $meta);
        }

        Response::ok($user, 'Sesion iniciada', array_merge($meta, ['user' => ['name' => $user['name'], 'role' => $user['role']]]));
    }

    if ($action === 'logout') {
        if ($method !== 'POST') {
            Response::error('Metodo no permitido', 405, null, $meta);
        }

        $auth->logout();
        Response::ok(['logged_out' => true], 'Sesion cerrada', $meta);
    }

    if ($action === 'me') {
        $user = $auth->currentUser();

        if (!$user) {
            Response::error('Sesion requerida', 401, null, $meta);
        }

        Response::ok($user, 'Sesion activa', array_merge($meta, ['user' => ['name' => $user['name'], 'role' => $user['role']]]));
    }

    Response::error('Accion de autenticacion no encontrada', 404, ['action' => $action], $meta);
}

function ensurePermission(Auth $auth, ?array $user, string $resource, string $action, array $meta): void
{
    if (!$auth->can($user, $resource, $action)) {
        Response::error('Acceso denegado', 403, ['resource' => $resource, 'action' => $action], $meta);
    }
}

function handleGet(Repository $repository, Auth $auth, ?array $user, string $resource, ?int $id, array $meta): void
{
    ensurePermission($auth, $user, $resource, 'view', $meta);

    if ($id !== null) {
        $item = $repository->find($resource, $id);

        if (!$item) {
            Response::error('Registro no encontrado', 404, ['id' => $id], $meta);
        }

        Response::ok($item, 'Registro obtenido', $meta);
    }

    Response::ok($repository->list($resource, $_GET), 'Listado obtenido', $meta);
}

function handlePost(Repository $repository, Auth $auth, ?array $user, string $resource, array $meta): void
{
    ensurePermission($auth, $user, $resource, 'create', $meta);
    $payload = readJsonBody();

    if ($payload === []) {
        Response::error('No se recibieron datos para crear', 422, null, $meta);
    }

    Response::created($repository->create($resource, $payload), 'Registro creado', $meta);
}

function handleUpdate(Repository $repository, Auth $auth, ?array $user, string $resource, ?int $id, array $meta): void
{
    ensurePermission($auth, $user, $resource, 'update', $meta);

    if ($id === null) {
        Response::error('Falta id del registro', 422, null, $meta);
    }

    $payload = readJsonBody();

    if ($payload === []) {
        Response::error('No se recibieron datos para actualizar', 422, null, $meta);
    }

    $item = $repository->update($resource, $id, $payload);

    if (!$item) {
        Response::error('Registro no encontrado', 404, ['id' => $id], $meta);
    }

    Response::ok($item, 'Registro actualizado', $meta);
}

function handleDelete(Repository $repository, Auth $auth, ?array $user, string $resource, ?int $id, array $meta): void
{
    ensurePermission($auth, $user, $resource, 'delete', $meta);

    if ($id === null) {
        Response::error('Falta id del registro', 422, null, $meta);
    }

    $deleted = $repository->delete($resource, $id);

    if (!$deleted) {
        Response::error('Registro no encontrado', 404, ['id' => $id], $meta);
    }

    Response::ok(['id' => $id], 'Registro eliminado', $meta);
}
