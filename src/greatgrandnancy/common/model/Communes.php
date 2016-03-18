<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class Communes extends Model
{
	protected $table = 'communes';
	protected $primaryKey = 'id';
	public $timestamps = false;
}