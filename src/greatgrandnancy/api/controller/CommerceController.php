<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

use \greatgrandnancy\common\model\CommerceDetail;

class CommerceController extends AbstractController
{
    public function getAllCommerce($data) {
        $router = $this->app->getContainer()->get('router');
//        $ville = ['Art-sur-Meurthe', 'Dommartemont', 'Laneuveville-devant-Nancy', 'Saulxures', 'Pulnoy', 'Seichamps', 'Essey-les-Nancy', 'Tomblaine', 'Jarville', 'Nancy', 'Fléville-devant-Nancy']

        if(isset($data['ville'])){
            $ville = [];
            // parser $data['villes']
            $parsed = urldecode($data['ville']);
            $explode = explode(';', $parsed);
            // foreach sur le resultat
            $commerce = CommerceDetail::select('*');

            foreach($explode as $e) {
                $commerce->orWhere('LIBGEO', '=', $e);

            }

            $query = $commerce->get();

            foreach ($query as $q) {
                $res[] = ['ville' => $q];
//                    'links' => ['self' => ['href' => $router->pathFor('annonce', ['id' => $q->id]),
//                    'annonceur' => $router->pathFor('annonceur', ['id' => $a->id])]]];
            }

            $tab = ['villes' => $res];
            $encoded = json_encode($tab);

            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 200);
            $response = $this->Write($response, $encoded);

            return $response;
        }
    }
}