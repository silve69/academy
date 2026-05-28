<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'gastos/' . $_GET['id'] : 'gastos';

require __DIR__ . '/index.php';
