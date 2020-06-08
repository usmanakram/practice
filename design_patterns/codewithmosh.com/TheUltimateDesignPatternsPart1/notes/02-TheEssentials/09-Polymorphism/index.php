<?php

require_once __DIR__ . '/TextBox.php';
require_once __DIR__ . '/CheckBox.php';

function drawUIControl(UIControl $control)
{
	$control->draw();
}

drawUIControl(new TextBox());
drawUIControl(new CheckBox());

?>