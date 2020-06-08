<?php
require_once __DIR__ . '/TaxCalculator2019.php';

function getCalculator()
{
	return new TaxCalculator2019();
}

function castCalculator(TaxCalculator $calculator)
{
	return $calculator;
}

// TaxCalculator $calculator = new TaxCalculator2019();

$calculator = castCalculator( getCalculator() );
echo get_class($calculator) . '<br />';

echo $calculator->calculateTax();

?>