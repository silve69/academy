<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'stock/' . $_GET['id'] : 'stock';

require __DIR__ . '/index.php';
