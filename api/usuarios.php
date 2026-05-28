<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'usuarios/' . $_GET['id'] : 'usuarios';

require __DIR__ . '/index.php';
