<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'ventas/' . $_GET['id'] : 'ventas';

require __DIR__ . '/index.php';
