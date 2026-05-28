<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'roles/' . $_GET['id'] : 'roles';

require __DIR__ . '/index.php';
