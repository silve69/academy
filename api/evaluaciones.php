<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'evaluaciones/' . $_GET['id'] : 'evaluaciones';

require __DIR__ . '/index.php';
