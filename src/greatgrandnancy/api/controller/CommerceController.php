<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

use \greatgrandnancy\common\model\CommerceDetail;

class CommerceController extends AbstractController
{
    public function getAllCommerce($data)
    {
        $router = $this->app->getContainer()->get('router');

        if (isset($data['ville'])) {
            $ville = [];
            // parser $data['villes']
            $parsed = urldecode($data['ville']);
            $explode = explode(';', $parsed);
            // foreach sur le resultat
            $commerce = CommerceDetail::select('*');

            foreach ($explode as $e) {
                $commerce->orWhere('LIBGEO', '=', $e);
            }

            $query = $commerce->get();

            if (empty($query[0])) {

                $res = ['codeErreur' => 404,
                    'messageErreur' => "La ressource demandée n'a pas été trouvée",
                    'ressourceDemandee' => $router->pathFor('getCommercesByCity', []) . '?ville=' . $data['ville']];
                $encoded = json_encode($res);

                //Ecriture du header
                $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
                $response = $this->Status($response, 404);
                $response = $this->Write($response, $encoded);

                return $response;
            }

            foreach ($query as $q) {
                $res[] = ['commerce' => $q];
//                    'links' => ['self' => ['href' => $router->pathFor('annonce', ['id' => $q->id]),
//                    'annonceur' => $router->pathFor('annonceur', ['id' => $a->id])]]];
            }

            $tab = ['commerces' => $res];
            $encoded = json_encode($tab);

            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 200);
            $response = $this->Write($response, $encoded);

            return $response;
        }
    }
}