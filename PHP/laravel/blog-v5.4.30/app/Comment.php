<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;

// It's extending our own custom model
class Comment extends Model
{
	public function post()
	{
		return $this->belongsTo(Post::class);
	}
}
