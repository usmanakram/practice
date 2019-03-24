<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;

// It's extending our own custom model
class Post extends Model
{
    // Allowed fields to update
    protected $fillable = ['title', 'body'];

    // Restricted fields to update
    // protected $guarded = ['user_id'];
    
	// Not guarding anything
    // protected $guarded = [];

    public function comments()
    {
    	return $this->hasMany(Comment::class);
    }

    public function addComment($body)
    {
		// There are two ways to save comment against post

		// 1. 
		/*Comment::create([
			'body' => $body,
			'post_id' => $this->id
		]);*/

		// 2. 
		// $this->comments()->create(['body' => $body]);
		$this->comments()->create(compact('body'));
    }
}
