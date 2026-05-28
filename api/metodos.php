<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'metodos/' . $_GET['id'] : 'metodos';

require __DIR__ . '/index.php';
