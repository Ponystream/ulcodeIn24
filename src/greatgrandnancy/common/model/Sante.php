<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class Sante extends Model
{
	protected $table = 'sante';
	protected $primaryKey = 'CODGEO';
	public $timestamps = false;
}