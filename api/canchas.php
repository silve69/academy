<?php

$_GET['endpoint'] = isset($_GET['id']) ? 'canchas/' . $_GET['id'] : 'canchas';

require __DIR__ . '/index.php';
