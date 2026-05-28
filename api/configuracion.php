<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'configuracion/' . $_GET['id'] : 'configuracion';

require __DIR__ . '/index.php';
