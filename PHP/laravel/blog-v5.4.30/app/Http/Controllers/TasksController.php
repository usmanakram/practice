<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Task;

class TasksController extends Controller
{
    public function index($value='')
    {
    	$tasks = Task::all();
    	// $tasks = \DB::table('tasks')->latest()->get();

    	// $tasks = Task::incomplete()->where('id', '>=', 2)->get();

    	return view('tasks.index', compact('tasks'));
    }

    public function show($id)
    {
    	// $task = \DB::table('tasks')->find($id);
		$task = Task::find($id);
		return view('tasks.show', compact('task'));
    }

    /**
     * It's called route model buinding
     * Note: Parameter ($task) name should be same as wildcard. i.e. {task}
     * Note: Parameter should be primary key of database table
     */
    /*public function show(Task $task)	
    {
		return view('tasks.show', compact('task'));
    }*/
}
