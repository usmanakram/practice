<?php

// Tutorial Site: http://daylerees.com/php-namespaces-explained/

include('models/Eddard.php');
include('models/another.php');

$eddard = new Eddard();
$eddard->output();
echo '<br /><br />';

$eddard = new Stark\Eddard();
$eddard->output();


?>