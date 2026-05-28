<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'torneos/' . $_GET['id'] : 'torneos';

require __DIR__ . '/index.php';
