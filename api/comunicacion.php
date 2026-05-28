<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'comunicacion/' . $_GET['id'] : 'comunicacion';

require __DIR__ . '/index.php';
