<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class Salaires extends Model
{
	protected $table = 'salaire';
	protected $primaryKey = 'CODGEO';
	public $timestamps = false;
}