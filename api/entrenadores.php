<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'entrenadores/' . $_GET['id'] : 'entrenadores';

require __DIR__ . '/index.php';
