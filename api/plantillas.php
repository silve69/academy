<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'plantillas/' . $_GET['id'] : 'plantillas';

require __DIR__ . '/index.php';
