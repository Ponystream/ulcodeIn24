<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class Communes extends Model
{
	protected $table = 'communes';
	protected $primaryKey = 'geodb_oid';
	public $timestamps = false;
}