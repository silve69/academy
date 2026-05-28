<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'pagos/' . $_GET['id'] : 'pagos';

require __DIR__ . '/index.php';
