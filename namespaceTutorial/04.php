<?php

namespace Stark;

include('models/another.php');
include('models/another2.php');

$eddard = new Eddard();
$eddard->output();
echo '<br /><br />';


// It is not compulsory for "use" to be first statement.
use Tully\Edmure;

$edmure = new Edmure();
$edmure->output();

?>