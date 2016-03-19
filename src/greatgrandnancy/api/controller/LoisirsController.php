<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

use greatgrandnancy\common\model\Loisirs;

class LoisirsController extends AbstractController
{
    public function getAllLoisirs($data)
    {
        $router = $this->app->getContainer()->get('router');

        if (isset($data['ville'])) {
            $ville = [];
            // parser $data['villes']
            $parsed = urldecode($data['ville']);
            $explode = explode(';', $parsed);
            // foreach sur le resultat
            $loisirs = Loisirs::select('*');

            foreach ($explode as $e) {
                $loisirs->orWhere('LIBGEO', '=', $e);
            }
            $query = $loisirs->get();

            if (empty($query[0])) {

                $res = ['codeErreur' => 404,
                    'messageErreur' => "La ressource demandée n'a pas été trouvée",
                    'ressourceDemandee' => $router->pathFor('getLoisirsByCity', []) . '?ville=' . $data['ville']];
                $encoded = json_encode($res);

                //Ecriture du header
                $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
                $response = $this->Status($response, 404);
                $response = $this->Write($response, $encoded);

                return $response;
            }

            foreach ($query as $q) {
                $res[] = ['loisir' => $q, 'links' => ['self' => ['href' => $router->pathFor('getLoisirsById', ['id' => $q->CODGEO])]]];
            }

            $tab = ['loisirs' => $res, 'links' => []];
            $encoded = json_encode($tab);

            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 200);
            $response = $this->Write($response, $encoded);

            return $response;
        }
    }

    public function getLoisirsById($id)
    {
        $router = $this->app->getContainer()->get('router');

        $loisirs = Loisirs::find($id);

        if (empty($loisirs)) {

            $res = ['codeErreur' => 404,
                'messageErreur' => "La ressource demandée n'a pas été trouvée",
                'ressourceDemandee' => $router->pathFor('getLoisirsById', ['id' => $id])];
            $encoded = json_encode($res);

            //Ecriture du header
            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 404);
            $response = $this->Write($response, $encoded);

            return $response;
        }

        $res = ['loisirs' => $loisirs, 'Links' => []];

        $encoded = json_encode($res);

        $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
        $response = $this->Status($response, 200);
        $response = $this->Write($response, $encoded);

        return $response;
    }

}