<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class Enseignement extends Model
{
	protected $table = 'enseignement_premier_degree';
	protected $primaryKey = 'CODGEO';
	public $timestamps = false;
}