<?php

declare(strict_types=1);

$baseConfig = require __DIR__ . '/config.php';
$localConfigPath = __DIR__ . '/config.local.php';

if (is_file($localConfigPath)) {
    $localConfig = require $localConfigPath;
    $baseConfig = array_replace_recursive($baseConfig, is_array($localConfig) ? $localConfig : []);
}

date_default_timezone_set($baseConfig['app']['timezone'] ?? 'America/Mexico_City');

require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/SampleData.php';
require_once __DIR__ . '/Repository.php';

function applyCors(array $config): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    $allowedOrigins = $config['cors']['allowed_origins'] ?? ['*'];
    $allowOrigin = in_array('*', $allowedOrigins, true) || in_array($origin, $allowedOrigins, true) ? $origin : $allowedOrigins[0];

    header('Access-Control-Allow-Origin: ' . $allowOrigin);
    header('Access-Control-Allow-Methods: ' . implode(', ', $config['cors']['allowed_methods'] ?? ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']));
    header('Access-Control-Allow-Headers: ' . implode(', ', $config['cors']['allowed_headers'] ?? ['Content-Type', 'Authorization']));
    header('Access-Control-Max-Age: 86400');

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function readJsonBody(): array
{
    $raw = file_get_contents('php://input');

    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $payload = json_decode($raw, true);

    if (json_last_error() !== JSON_ERROR_NONE || !is_array($payload)) {
        Response::error('JSON invalido', 422, ['error' => json_last_error_msg()]);
    }

    return $payload;
}

function routeSegments(): array
{
    if (isset($_GET['endpoint'])) {
        $endpoint = trim((string) $_GET['endpoint'], '/');

        return $endpoint === '' ? [] : array_values(array_filter(explode('/', $endpoint)));
    }

    $path = $_SERVER['PATH_INFO'] ?? '';

    if ($path === '') {
        $uriPath = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '';
        $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
        $scriptDir = rtrim(str_replace('\\', '/', dirname($scriptName)), '/');
        $uriPath = str_replace('\\', '/', $uriPath);

        if ($scriptName !== '' && str_starts_with($uriPath, $scriptName)) {
            $path = substr($uriPath, strlen($scriptName));
        } elseif ($scriptDir !== '' && str_starts_with($uriPath, $scriptDir)) {
            $path = substr($uriPath, strlen($scriptDir));
        } else {
            $path = $uriPath;
        }
    }

    $path = trim((string) $path, '/');

    return $path === '' ? [] : array_values(array_filter(explode('/', $path)));
}

applyCors($baseConfig);

return $baseConfig;
