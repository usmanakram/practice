<?php

use App\Task;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return view('welcome');
    /*return view('welcome', [
    	'name' => 'World',
    	'age' => 25
    ]);*/

    // return view('welcome')->with('name', 'World');

    /*$name = 'Usman';
    $age = 31;
    return view('welcome', compact('name', 'age'));*/

    
    /*$tasks = [
    	'Go to the store',
    	'Finnish my screencast',
    	'Clean the house'
    ];*/
    
    // It's called Laravel query builder
    $tasks = DB::table('tasks')->get();
    return view('welcome', compact('tasks'));
});

/*Route::get('/tasks', function () {
	// It's called Laravel query builder
	$tasks = DB::table('tasks')->latest()->get();

	// Eloquent class
	// $tasks = Task::all();
	// $tasks = Task::where('completed', 1)->get();
	
	// Called static method
	// $tasks = Task::incomplete();
	
	// Query scopes Method
	// $tasks = Task::incomplete()->get();
	// $tasks = Task::incomplete()->where('id', '>', 1)->get();


	return view('tasks.index', compact('tasks'));
});*/
Route::get('/tasks', 'TasksController@index');

// In laravel, it's "{id}" called wild card
/*Route::get('/tasks/{task}', function ($id) {
	// dd($id); // Die & Dump. It's a helper function

	$task = DB::table('tasks')->find($id);
	// $task = Task::find($id);
	return view('tasks.show', compact('task'));
});*/
Route::get('/tasks/{task}', 'TasksController@show');

Route::get('/posts', 'PostsController@index')->name('home');
Route::get('/posts/create', 'PostsController@create');
Route::post('/posts', 'PostsController@store');
Route::get('/posts/{post}', 'PostsController@show');

Route::post('/posts/{post}/comments', 'CommentsController@store');


Route::get('/register', 'RegistrationController@create');
Route::post('/register', 'RegistrationController@store');

Route::get('/login', 'SessionsController@create');
Route::post('/login', 'SessionsController@store');

Route::get('/logout', 'SessionsController@destroy');