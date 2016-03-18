<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

// Les use ici si besoin

use greatgrandnancy\common\model\User;

class Test
{
	
	public static function helloUser($app,$username)
	{
		$ajout = false;
		$user = User::find($username);

		if ( !isset($user) ) {
			$user = new User();
			$user->name = $username;
			$user->save();
			$ajout = true;
		}	

		$app->render('user.html.twig',array(
			'ajout' => $ajout,
			'name' => $user->name
		));
	}

	public static function helloMathis($app)
	{
		$ajout = false;
		$username = 'mathis';
		$user = User::find($username);

		// Si $user n'est pas set, c'est qu'il n'y a rien et on ajoute donc en base !
		if ( !isset($user) ) {
			$user = new User();
			$user->name = $username;
			$user->save();
			$ajout = true;
		}	

		$app->render('user.html.twig',array(
			'ajout' => $ajout,
			'autre' => 'ahah !',
			'name' => $user->name
		));
	}
}