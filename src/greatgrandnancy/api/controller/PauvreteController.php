<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

use greatgrandnancy\common\model\Pauvrete;

class PauvreteController extends AbstractController
{
    public function getAllPauvrete($data)
    {
        $router = $this->app->getContainer()->get('router');

        if (isset($data['ville'])) {
            $ville = [];
            // parser $data['villes']
            $parsed = urldecode($data['ville']);
            $explode = explode(';', $parsed);
            // foreach sur le resultat
            $poverty = Pauvrete::select('*');

            foreach ($explode as $e) {
                $poverty->orWhere('LIBGEO', '=', $e);
            }
            $query = $poverty->get();

            if (empty($query[0])) {

                $res = ['codeErreur' => 404,
                    'messageErreur' => "La ressource demandée n'a pas été trouvée",
                    'ressourceDemandee' => $router->pathFor('getPovertyByCity', []) . '?ville=' . $data['ville']];
                $encoded = json_encode($res);

                //Ecriture du header
                $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
                $response = $this->Status($response, 404);
                $response = $this->Write($response, $encoded);

                return $response;
            }

            foreach ($query as $q) {
                $res[] = ['loisir' => $q, 'links' => ['self' => ['href' => $router->pathFor('getPovertyById', ['id' => $q->CODGEO])]]];
            }

            $tab = ['pauvrete' => $res, 'links' => []];
            $encoded = json_encode($tab);

            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 200);
            $response = $this->Write($response, $encoded);

            return $response;
        }
    }

    public function getPauvreteById($id)
    {
        $router = $this->app->getContainer()->get('router');

        $poverty = Pauvrete::find($id);

        if (empty($poverty)) {

            $res = ['codeErreur' => 404,
                'messageErreur' => "La ressource demandée n'a pas été trouvée",
                'ressourceDemandee' => $router->pathFor('getPovertyById', ['id' => $id])];
            $encoded = json_encode($res);

            //Ecriture du header
            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 404);
            $response = $this->Write($response, $encoded);

            return $response;
        }

        $res = ['pauvrete' => $poverty, 'Links' => []];

        $encoded = json_encode($res);

        $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
        $response = $this->Status($response, 200);
        $response = $this->Write($response, $encoded);

        return $response;
    }

}