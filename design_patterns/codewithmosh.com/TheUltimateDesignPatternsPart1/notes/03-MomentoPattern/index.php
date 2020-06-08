<?php

require_once __DIR__ . '/Editor.php';
require_once __DIR__ . '/History.php';

$editor = new Editor();
$history = new History();

$editor->setContent('a');

$history->push($editor->createState());
$editor->setContent('b');

$history->push($editor->createState());
$editor->setContent('c');

$editor->restore($history->pop());
$editor->restore($history->pop());

echo $editor->getContent();

?>