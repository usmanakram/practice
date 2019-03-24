<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /*public static function incomplete()
    {
    	return static::where('completed', 0)->get();
    }*/

    /**
     * It's called Query scopes Method
     * First parameter ($query) is existing query
     * Second, third, .... paramaterers are custom parameters
     */
    public function scopeIncomplete($query)
    {
    	return $query->where('completed', 0);
    }
}
