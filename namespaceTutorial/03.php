<?php

namespace Stark;

include('models/Eddard.php');
include('models/another.php');
include('models/another2.php');

$eddard = new \Eddard();
$eddard->output();
echo '<br /><br />';


$eddard = new Eddard();
$eddard->output();
echo '<br /><br />';


// Use another namespace class(Class Edmure{} ,namespace Tully;) from within the ‘Stark’ framework
$edmure = new \Tully\Edmure();
$edmure->output();

?>