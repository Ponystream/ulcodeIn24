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

$app->group('/commerces', function () use ($app) {

    ///////////// Retourne la liste des photos /////////////
    $app->get('', function ($req, $res) use ($app) {
        $controller = new Controller\CommerceController($req, $res, $app);
        return $controller->getAllCommerce($req->getQueryParams());
    })->setName('getCommercesByCity');

    $app->get('/{id}', function ($req, $res, $args) use ($app) {
        $id = $args['id'];
        $controller = new Controller\CommerceController($req, $res, $app);
        return $controller->getCommerceById($id);
    })->setName('getCommerceById');

});

$app->group('/salaires', function () use ($app) {

    ///////////// Retourne la liste des photos /////////////
    $app->get('', function ($req, $res) use ($app) {
        $controller = new Controller\SalaireController($req, $res, $app);
        return $controller->getAllSalaries($req->getQueryParams());
    })->setName('getSalariesByCity');

    $app->get('/{id}', function ($req, $res, $args) use ($app) {
        $id = $args['id'];
        $controller = new Controller\SalaireController($req, $res, $app);
        return $controller->getSalariesById($id);
    })->setName('getSalariesById');
});

$app->group('/equipements', function () use ($app) {

    ///////////// Retourne la liste des photos /////////////
    $app->get('', function ($req, $res) use ($app) {
        $controller = new Controller\EquipementsServicesController($req, $res, $app);
        return $controller->getAllEquipment($req->getQueryParams());
    })->setName('getEquipmentsByCity');

    $app->get('/{id}', function ($req, $res, $args) use ($app) {
        $id = $args['id'];
        $controller = new Controller\EquipementsServicesController($req, $res, $app);
        return $controller->getEquipmentById($id);
    })->setName('getEquipmentById');
});


$app->group('/communes', function () use ($app) {

    ///////////// Retourne la liste des photos /////////////
    $app->get('', function ($req, $res) use ($app) {
        $controller = new Controller\CommunesController($req, $res, $app);
        return $controller->getAllCommunes($req->getQueryParams());
    })->setName('allCommunes');

    ///////////// Retourne la liste des photos /////////////
    $app->get('/{id}', function ($req, $res, $args) use ($app) {

        $id = $args['id'];
        $controller = new Controller\CommunesController($req, $res, $app);
        return $controller->getCommuneById($id);
    })->setName('communeById');
});

// On lance slim, et voila !
$app->run();