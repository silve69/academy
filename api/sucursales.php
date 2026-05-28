<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'sucursales/' . $_GET['id'] : 'sucursales';

require __DIR__ . '/index.php';
