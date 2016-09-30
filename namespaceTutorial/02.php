<?php

namespace Stark;			// Must be the first line of your code

include('models/Eddard.php');
include('models/another.php');

$eddard = new \Eddard();	// Original Eddard Class
$eddard->output();
echo '<br /><br />';

$eddard = new Eddard();		// Namespace Class
$eddard->output();

?>