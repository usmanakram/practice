<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\User;

class RegistrationController extends Controller
{
    public function create()
    {
    	return view('registration.create');
    }

    public function store()
    {
    	// Validate the form
    	$this->validate(request(), [
    		'name' => 'required',
    		'email' => 'required|email',
    		'password' => 'required|confirmed'
    	]);

    	// Create & save the user
    	$user = User::create(request(['name', 'email', 'password']));

    	/**
    	 * Requested data can be accessed in multiple ways
    	 * 1. \Request::input
    	 * 2. request()->input
    	 * There are a lot other ways as well.
    	 */

    	
    	// Sign him/her in
    	
    	/**
    	 * There are a number of ways to login user
    	 * \Auth::login();
    	 * auth();
    	 */

    	auth()->login($user);

    	// Redirect to the home page
    	// return redirect('/');
    	return redirect()->home();
    }
}
