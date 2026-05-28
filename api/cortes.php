<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'cortes/' . $_GET['id'] : 'cortes';

require __DIR__ . '/index.php';
