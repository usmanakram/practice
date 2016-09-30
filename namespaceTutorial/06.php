<?php

namespace Stark;

include('models/another.php');
include('models/sub-namespace1.php');
include('models/sub-namespace2.php');
include('models/sub-namespace3.php');

$eddard = new Eddard();
$eddard->output();
echo '<br /><br />';


// We can give a sub-namespace a nickname, to use it’s child classes.
use Usman\Blog as Cms;

$post = new Cms\Content\Post;
$page = new Cms\Content\Page;
$tag  = new Cms\Tag;


$post->output();
echo '<br /><br />';

$page->output();
echo '<br /><br />';

$tag->output();
echo '<br /><br />';

?>