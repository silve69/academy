<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'academia/' . $_GET['id'] : 'academia';

require __DIR__ . '/index.php';
