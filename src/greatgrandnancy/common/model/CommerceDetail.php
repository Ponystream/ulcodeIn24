<?php

// Model super classique

namespace greatgrandnancy\common\model;

use Illuminate\Database\Eloquent\Model;

class CommerceDetail extends Model
{
	protected $table = 'commerce_detail';
	protected $primaryKey = 'CODGEO';
	public $timestamps = false;
}