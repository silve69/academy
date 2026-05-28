<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'grupos/' . $_GET['id'] : 'grupos';

require __DIR__ . '/index.php';
