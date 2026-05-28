<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'disciplinas/' . $_GET['id'] : 'disciplinas';

require __DIR__ . '/index.php';
