<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'caja/' . $_GET['id'] : 'caja';

require __DIR__ . '/index.php';
