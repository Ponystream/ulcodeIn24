<?php

require_once '../vendor/autoload.php';
use photolocate\api\controller as Controller;

photolocate\app\App::DbConf('../src/photolocate/utils/config.ini');

$app = new \Slim\App();


$c = $app->getContainer();
$c['errorHandler'] = function ($c) {
	return function ($request, $response, $exception) use ($c) {
		$data = [
			'code' => $exception->getCode(),
			'message' => $exception->getMessage(),
			'file' => $exception->getFile(),
			'line' => $exception->getLine(),
			'trace' => explode("\n", $exception->getTraceAsString()),
		];

		return $c->get('response')->withStatus(500)
			->withHeader('Content-Type', 'application/json')
			->write(json_encode($data));
	};
};

$app->group('/', function () use ($app) {

	///////////// Retourne la liste des photos /////////////
	$app->get('', function ($req, $res) use ($app) {
		return "ça marche";
	})->setName('index');
});


// On lance slim, et voila !
$app->run();