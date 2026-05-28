<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'inventario/' . $_GET['id'] : 'inventario';

require __DIR__ . '/index.php';
