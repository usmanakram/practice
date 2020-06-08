<?php

class History
{
	private $states = [];

	public function push(EditorState $state)
	{
		// $this->states[] = $state;
		array_push($this->states, $state);
	}

	public function pop()
	{
		// Remove last index of array and return removed index
		return array_pop($this->states);
	}
}

?>