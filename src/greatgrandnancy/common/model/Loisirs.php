<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class Loisirs extends Model
{
	protected $table = 'loisirs';
	protected $primaryKey = 'CODGEO';
	public $timestamps = false;
}