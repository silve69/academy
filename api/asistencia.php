<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'asistencia/' . $_GET['id'] : 'asistencia';

require __DIR__ . '/index.php';
