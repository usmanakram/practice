<?php

namespace Stark;

include('models/another.php');
include('models/another2.php');

$eddard = new Eddard();
$eddard->output();
echo '<br /><br />';


// We can give our imported classes little nicknames.
use Tully\Edmure as edm;

// Now class can be instantiated as "new edm()" and no more accessible as "new Edmure()" or "new \Tully\Edmure()".
$edmure = new edm();
$edmure->output();

?>