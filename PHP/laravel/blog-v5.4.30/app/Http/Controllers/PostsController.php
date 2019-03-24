<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostsController extends Controller
{
    public function index()
    {
    	$posts = Post::latest()->get();
    	return view('posts.index', compact('posts'));
    }

    public function show(Post $post)
    {
    	return view('posts.show', compact('post'));
    }

    public function create()
    {
    	return view('posts.create');
    }

    public function store($value='')
    {
    	// dd(request()->all());
    	// dd(request('title'));
    	// dd(request(['title', 'body']));

    	$this->validate(request(), [
    		'title' => 'required',
    		'body' => 'required'
    	]);

    	// We have multiple ways to insert data
    	/*$post = new Post;
    	$post->title = request('title');
    	$post->body = request('body');
    	$post->save();*/

    	// For following two methods, we need to set $fillable or $guarded property in relevant/parent of relevant model
    	/*Post::create([
    		'title' => request('title'),
    		'body' => request('body')
    	]);*/

		Post::create(request(['title', 'body']));

    	return redirect('/posts');
    }
}