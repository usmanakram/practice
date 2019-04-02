<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

// It's extending our own custom model
class Post extends Model
{
    // Allowed fields to update
    protected $fillable = ['title', 'body', 'user_id'];

    // Restricted fields to update
    // protected $guarded = ['user_id'];
    
	// Not guarding anything
    // protected $guarded = [];

    public function comments()
    {
    	return $this->hasMany(Comment::class);
    }

    public function user()
	{
		return $this->belongsTo(User::class);
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

    public function scopeFilter($query, $filters)
    {
		if ($month = $filters['month']) {
			$query->whereMonth('created_at', Carbon::parse($month)->month);
		}

		if ($year = $filters['year']) {
			$query->whereYear('created_at', $year);
		}
    }

    public static function archives()
    {
		return static::selectRaw('year(created_at) year, monthname(created_at) month, count(*) published')
			->groupBy('year', 'month')
			->orderByRaw('min(created_at) desc')
			->get()
			->toArray();
    }
}
