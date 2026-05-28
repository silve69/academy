<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'productos/' . $_GET['id'] : 'productos';

require __DIR__ . '/index.php';
