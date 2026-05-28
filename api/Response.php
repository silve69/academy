<?php

final class Response
{
    public static function json(bool $success, mixed $data = null, string $message = '', int $status = 200, array $meta = []): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');

        echo json_encode([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'meta' => $meta,
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function ok(mixed $data = null, string $message = 'OK', array $meta = []): void
    {
        self::json(true, $data, $message, 200, $meta);
    }

    public static function created(mixed $data = null, string $message = 'Creado', array $meta = []): void
    {
        self::json(true, $data, $message, 201, $meta);
    }

    public static function error(string $message, int $status = 400, mixed $data = null, array $meta = []): void
    {
        self::json(false, $data, $message, $status, $meta);
    }
}
