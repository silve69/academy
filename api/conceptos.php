<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'conceptos/' . $_GET['id'] : 'conceptos';

require __DIR__ . '/index.php';
