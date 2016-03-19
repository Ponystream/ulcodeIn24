<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class Pauvrete extends Model
{
	protected $table = 'pauvrete';
	protected $primaryKey = 'CODGEO';
	public $timestamps = false;
}