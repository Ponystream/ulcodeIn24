<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

use \greatgrandnancy\common\model\CommerceDetail;
use greatgrandnancy\common\model\EquipementParticuliers;
use greatgrandnancy\common\model\EquipementsServices;
use greatgrandnancy\common\model\Salaire;

class EquipementsServicesController extends AbstractController
{
    public function getAllEquipment($data) {
        $router = $this->app->getContainer()->get('router');
//        $ville = ['Art-sur-Meurthe', 'Dommartemont', 'Laneuveville-devant-Nancy', 'Saulxures', 'Pulnoy', 'Seichamps', 'Essey-les-Nancy', 'Tomblaine', 'Jarville', 'Nancy', 'Fléville-devant-Nancy']

        if(isset($data['ville'])) {
            $ville = [];
            // parser $data['villes']
            $parsed = urldecode($data['ville']);
            $explode = explode(';', $parsed);
            // foreach sur le resultat
            $equipment = EquipementsServices::select('*');

            foreach ($explode as $e) {
                $equipment->orWhere('LIBGEO', '=', $e);
            }
            $query = $equipment->get();

            foreach ($query as $q) {
                $res[] = ['equipement' => $q, 'links' => ['self' => ['href' => $router->pathFor('getEquipmentById', ['id' => $q->CODGEO])]]];
            }

            $tab = ['equipements' => $res, 'links' => []];
            $encoded = json_encode($tab);

            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 200);
            $response = $this->Write($response, $encoded);

            return $response;
        }
    }

    public function getEquipmentById($id)
    {
        $router = $this->app->getContainer()->get('router');

        $equipment = Salaire::find($id);

        $res = ['equipement' => $equipment, 'Links' => []];

        $encoded = json_encode($res);

        $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
        $response = $this->Status($response, 200);
        $response = $this->Write($response, $encoded);

        return $response;
    }
}