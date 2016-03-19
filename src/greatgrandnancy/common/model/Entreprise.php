<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
	protected $table = 'entreprises';
	protected $primaryKey = 'CODGEO';
	public $timestamps = false;
}