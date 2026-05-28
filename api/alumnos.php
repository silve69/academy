<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'alumnos/' . $_GET['id'] : 'alumnos';

require __DIR__ . '/index.php';
