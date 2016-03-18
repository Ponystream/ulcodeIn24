<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class EquipementParticuliers extends Model
{
	protected $table = 'equipement_particuliers';
	protected $primaryKey = 'CODGEO';
	public $timestamps = false;
}