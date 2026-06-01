<?php

final class Database
{
    private ?PDO $connection = null;
    private ?string $error = null;

    public function __construct(private readonly array $config)
    {
    }

    public function getConnection(): ?PDO
    {
        if ($this->connection instanceof PDO) {
            return $this->connection;
        }

        $db = $this->config['database'] ?? [];
        $host = $db['host'] ?? '127.0.0.1';
        $port = (int) ($db['port'] ?? 3306);
        $name = $db['name'] ?? 'academy';
        $charset = $db['charset'] ?? 'utf8mb4';
        $user = $db['user'] ?? 'root';
        $password = $db['password'] ?? '';

        $dsn = "mysql:host={$host};port={$port};dbname={$name};charset={$charset}";

        try {
            $this->connection = new PDO($dsn, $user, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (Throwable $exception) {
            $this->error = $exception->getMessage();
            $this->connection = null;
        }

        return $this->connection;
    }

    public function isConnected(): bool
    {
        return $this->getConnection() instanceof PDO;
    }

    public function getError(): ?string
    {
        return $this->error;
    }
}
