<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

use \greatgrandnancy\common\model\CommerceDetail;
use greatgrandnancy\common\model\Salaire;

class SalaireController extends AbstractController
{
    public function getAllSalaries($data)
    {
        $router = $this->app->getContainer()->get('router');

        if (isset($data['ville'])) {
            $ville = [];
            // parser $data['villes']
            $parsed = urldecode($data['ville']);
            $explode = explode(';', $parsed);
            // foreach sur le resultat
            $salaries = Salaire::select('*');

            foreach ($explode as $e) {
                $salaries->orWhere('LIBGEO', '=', $e);
            }
            $query = $salaries->get();

            if (empty($query[0])) {

                $res = ['codeErreur' => 404,
                    'messageErreur' => "La ressource demandée n'a pas été trouvée",
                    'ressourceDemandee' => $router->pathFor('getSalairesByCity', []) . '?ville=' . $data['ville']];
                $encoded = json_encode($res);

                //Ecriture du header
                $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
                $response = $this->Status($response, 404);
                $response = $this->Write($response, $encoded);

                return $response;
            }

            foreach ($query as $q) {
                $res[] = ['salaire' => $q, 'links' => ['self' => ['href' => $router->pathFor('getSalaireById', ['id' => $q->CODGEO])]]];
            }

            $tab = ['salaires' => $res, 'links' => []];
            $encoded = json_encode($tab);

            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 200);
            $response = $this->Write($response, $encoded);

            return $response;
        }
    }

    public function getSalariesById($id)
    {
        $router = $this->app->getContainer()->get('router');

        $salaries = Salaire::find($id);

        $res = ['salaires' => $salaries, 'Links' => []];

        $encoded = json_encode($res);

        $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
        $response = $this->Status($response, 200);
        $response = $this->Write($response, $encoded);

        return $response;
    }

}