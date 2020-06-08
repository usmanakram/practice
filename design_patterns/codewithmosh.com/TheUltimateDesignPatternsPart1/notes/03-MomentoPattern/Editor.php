<?php

require_once __DIR__ . '/EditorState.php';

class Editor
{
	private $content;
	// private $prevContents = [];
	// private $title;
	// private $prevTitles = [];

	public function createState()
	{
		return new EditorState($this->content);
	}

	public function restore(EditorState $state)
	{
		$this->content = $state->getContent();
	}

	public function getContent()
	{
		return $this->content;
	}

	public function setContent(String $content)
	{
		$this->content = $content;
	}
}

?>