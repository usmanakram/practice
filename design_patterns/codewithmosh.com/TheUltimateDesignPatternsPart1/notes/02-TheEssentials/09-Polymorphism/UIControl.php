<?php

abstract class UIControl
{
	public function enable()
	{
		echo 'Enable<br />';
	}

	public abstract function draw();
}

?>