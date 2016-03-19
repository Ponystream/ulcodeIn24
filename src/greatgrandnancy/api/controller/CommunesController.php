<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

use greatgrandnancy\common\model\Communes;

class CommunesController extends AbstractController
{
    public function getAllCommunes()
    {
        $router = $this->app->getContainer()->get('router');

        $communes = Communes::all();

        foreach ($communes as $commune) {
            $res[] = ['commune' => $commune, 'links' => ['self' => ['href' => $router->pathFor('communeById', ['id' => $commune->id])]]];
        }

        $tab = array('communes' => $res, 'Links' => []);
        $encoded = json_encode($tab);

        $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
        $response = $this->Status($response, 200);
        $response = $this->Write($response, $encoded);

        return $response;
    }

    public function getCommuneById($id)
    {
        $router = $this->app->getContainer()->get('router');

        $communes = Communes::find($id);


        $res = ['communes' => $communes, 'Links' => []];

        $encoded = json_encode($res);

        $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
        $response = $this->Status($response, 200);
        $response = $this->Write($response, $encoded);

        return $response;
    }
}