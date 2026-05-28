<?php

$_GET['endpoint'] = isset($_GET['action']) ? 'auth/' . $_GET['action'] : 'auth/me';

require __DIR__ . '/index.php';
