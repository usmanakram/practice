<?php

class EditorState
{
	// private final $content;
	private $content;
	
	function __construct(String $content)
	{
		$this->content = $content;
	}

	public function getContent()
	{
		return $this->content;
	}
}

?>