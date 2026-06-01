<?php

return [
    'app' => [
        'name' => 'AcademyAdmin API',
        'environment' => 'development',
        'timezone' => 'America/Mexico_City',
        'debug' => true,
    ],
    'cors' => [
        'allowed_origins' => ['*'],
        'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
    ],
    'database' => [
        'host' => '127.0.0.1',
        'port' => 3306,
        'name' => 'academy',
        'user' => 'root',
        'password' => '',
        'charset' => 'utf8mb4',
    ],
];
