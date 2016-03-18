<?php

require_once '../vendor/autoload.php';

use greatgrandnancy\api\controller as Controller;

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

// Database conf
greatgrandnancy\app\App::DbConf('../src/greatgrandnancy/utils/config.ini');

$app->group('/commerce', function () use ($app) {

    ///////////// Retourne la liste des photos /////////////
    $app->get('', function ($req, $res) use ($app) {
        $controller = new Controller\CommerceController($req, $res, $app);
        return $controller->getAllCommerce($req->getQueryParams());
    })->setName('index');
});

// On lance slim, et voila !
$app->run();