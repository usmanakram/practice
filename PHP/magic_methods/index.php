<?php

class ParentClass
{
	public function walk()
	{
		return 'walking';
	}
}

class ChildClass extends ParentClass
{
	// protected $color;
	// private $color;

	/**
	 * Whenever we read a property which is inaccessible (protected or private) or does not exist, 
	 * this magic function "__get()" is called and property name is passed as first argument.
	 */
	// __get() is utilized for reading data from inaccessible (protected or private) or non-existing properties.
	public function __get($arg1)
	{
		echo '__get method called. $arg1 is ' . json_encode($arg1) . '<br />';
	}

	/**
	 * Whenever we update a property which is inaccessible (protected or private) or does not exist, 
	 * this magic function "__set()" is called and property name is passed as first argument  & value as second argument.
	 */
	// __set() is run when writing data to inaccessible (protected or private) or non-existing properties.
	public function __set($arg1, $arg2)
	{
		echo '__set method called. $arg1 is ' . json_encode($arg1) . ' and $arg2 is ' . json_encode($arg2) . '<br />';
	}

	/**
	 * Whenever we call (in an object context) a method which does not exist,
	 * this magic function "__call()" is called and called method name is passed as first argument & 
	 * argument passed to called method are passed as second argument in the form of array.
	 */
	// __call() is triggered when invoking inaccessible methods in an object context.
	public function __call($arg1, $arg2)
	{
		echo '__call method called. $arg1 is ' . json_encode($arg1) . ' and $arg2 is ' . json_encode($arg2) . '<br />';
	}

	/**
	 * Whenever we call (in a static context) a method which does not exist,
	 * this magic function "__callStatic()" is called and static method name is passed as first argument & 
	 * argument passed to static method are passed as second argument in the form of array.
	 */
	// __callStatic() is triggered when invoking inaccessible methods in a static context.
	public static function __callStatic($arg1, $arg2)
	{
		echo '__callStatic method called. $arg1 is ' . json_encode($arg1) . ' and $arg2 is ' . json_encode($arg2) . '<br />';
	}

	public function crawl()
	{
		return 'crawling';
	}
}



$obj = new ChildClass;

$res = $obj->color;
$obj->color = 'blue';
$res = $obj->color;

$obj->eat('good', 'to', 'see', 'you');
ChildClass::swim('good', 'to', 'see', 'you');


echo '<pre>';
print_r($res);
echo '</pre>';

?>