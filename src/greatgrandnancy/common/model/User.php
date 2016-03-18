<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class User extends Model 
{
	protected $table = 'user';
	protected $primaryKey = 'name';
	public $timestamps = false;
}