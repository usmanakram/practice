<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Post;
use App\Comment;

class CommentsController extends Controller
{
    public function store(Post $post)
    {
    	$this->validate(request(), ['body' => 'required|min:2']);

    	// There are two ways to save comment against post

    	// 1. Long Long way
    	/*Comment::create([
    		'body' => request('body'),
    		'post_id' => $post->id
    	]);*/

    	// 2. calling method of post model class
    	$post->addComment(request('body'));

    	return back();
    }
}
