<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace controller;

// Les use ici si besoin


class Accueil
{
	
	public static function helloWorld($app)
	{
		$app->render('helloWorld.html.twig',array());
	}
}