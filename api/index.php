<?php

$config = require __DIR__ . '/bootstrap.php';

$database = new Database($config);
$pdo = $database->getConnection();
$sampleData = SampleData::all();
$repository = new Repository($pdo, $sampleData);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$segments = routeSegments();
$resource = $segments[0] ?? '';
$id = isset($segments[1]) && ctype_digit($segments[1]) ? (int) $segments[1] : null;

if ($id === null && isset($_GET['id']) && ctype_digit((string) $_GET['id'])) {
    $id = (int) $_GET['id'];
}
$usingFallback = !$pdo;
$meta = [
    'source' => $usingFallback ? 'sample' : 'mysql',
    'available_resources' => array_merge(['dashboard', 'reportes'], Repository::resources()),
];

if ($resource === '') {
    Response::ok([
        'name' => $config['app']['name'] ?? 'SportIk API',
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
    ], 'SportIk API lista', $meta);
}

if ($resource === 'dashboard') {
    if ($method !== 'GET') {
        Response::error('Metodo no permitido', 405, null, $meta);
    }

    Response::ok($repository->dashboard(), 'Dashboard obtenido', $meta);
}

if (in_array($resource, ['reportes', 'reports'], true)) {
    if ($method !== 'GET') {
        Response::error('Metodo no permitido', 405, null, $meta);
    }

    Response::ok($repository->reports(), 'Reportes obtenidos', $meta);
}

if (!in_array($resource, Repository::resources(), true)) {
    Response::error('Endpoint no encontrado', 404, ['resource' => $resource], $meta);
}

match ($method) {
    'GET' => handleGet($repository, $resource, $id, $meta),
    'POST' => handlePost($repository, $resource, $meta),
    'PUT', 'PATCH' => handleUpdate($repository, $resource, $id, $meta),
    'DELETE' => handleDelete($repository, $resource, $id, $meta),
    default => Response::error('Metodo no permitido', 405, null, $meta),
};

function handleGet(Repository $repository, string $resource, ?int $id, array $meta): void
{
    if ($id !== null) {
        $item = $repository->find($resource, $id);

        if (!$item) {
            Response::error('Registro no encontrado', 404, ['id' => $id], $meta);
        }

        Response::ok($item, 'Registro obtenido', $meta);
    }

    Response::ok($repository->list($resource, $_GET), 'Listado obtenido', $meta);
}

function handlePost(Repository $repository, string $resource, array $meta): void
{
    $payload = readJsonBody();

    if ($payload === []) {
        Response::error('No se recibieron datos para crear', 422, null, $meta);
    }

    Response::created($repository->create($resource, $payload), 'Registro creado', $meta);
}

function handleUpdate(Repository $repository, string $resource, ?int $id, array $meta): void
{
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

function handleDelete(Repository $repository, string $resource, ?int $id, array $meta): void
{
    if ($id === null) {
        Response::error('Falta id del registro', 422, null, $meta);
    }

    $deleted = $repository->delete($resource, $id);

    if (!$deleted) {
        Response::error('Registro no encontrado', 404, ['id' => $id], $meta);
    }

    Response::ok(['id' => $id], 'Registro eliminado', $meta);
}
