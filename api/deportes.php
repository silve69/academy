<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'deportes/' . $_GET['id'] : 'deportes';

require __DIR__ . '/index.php';
