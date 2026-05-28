<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'horarios/' . $_GET['id'] : 'horarios';

require __DIR__ . '/index.php';
