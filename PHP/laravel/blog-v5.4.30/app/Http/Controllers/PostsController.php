<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Post;
use Carbon\Carbon;

class PostsController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth')->except(['index', 'show']);
	}

    public function index()
    {
    	// $posts = Post::latest()->get();

    	// Moved into model
    	/*$posts = Post::latest();

    	if ($month = request('month')) {
    		$posts->whereMonth('created_at', Carbon::parse($month)->month);
    	}

    	if ($year = request('year')) {
    		$posts->whereYear('created_at', $year);
    	}

    	$posts = $posts->get();*/

    	$posts = Post::latest()
    		->filter(request(['month', 'year']))
    		->get();

    	// Moved into Post model
    	/*$archives = Post::selectRaw('year(created_at) year, monthname(created_at) month, count(*) published')
    		->groupBy('year', 'month')
    		->orderByRaw('min(created_at) desc')
    		->get()
    		->toArray();*/

    	// Moved into service provider
    	// return view('posts.index', compact('posts', 'archives'));
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

		// Post::create(request(['title', 'body']));
		
		/**
		 * Now we need to add user_id as well
		 * There are 2 different ways
		 */

		// First method
		/*Post::create([
			'title' => request('title'),
			'body' => request('body'),
			// 'user_id' => auth()->user()->id
			'user_id' => auth()->id()
		]);*/

		// Second method
		auth()->user()->publish(
			new Post(request(['title', 'body']))
		);

    	return redirect('/posts');
    }
}