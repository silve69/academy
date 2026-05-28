<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'eventos/' . $_GET['id'] : 'eventos';

require __DIR__ . '/index.php';
