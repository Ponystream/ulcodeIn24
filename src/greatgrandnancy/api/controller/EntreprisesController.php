<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\api\controller;

use greatgrandnancy\common\model\Entreprise;

Class EntreprisesController extends AbstractController
{
    public function getAllCompanies($data)
    {
        $router = $this->app->getContainer()->get('router');

        if (isset($data['ville'])) {
            $ville = [];
            // parser $data['villes']
            $parsed = urldecode($data['ville']);
            $explode = explode(';', $parsed);
            // foreach sur le resultat
            $company = Entreprise::select('*');

            foreach ($explode as $e) {
                $company->orWhere('LIBGEO', '=', $e);
            }
            $query = $company->get();

            if (empty($query[0])) {

                $res = ['codeErreur' => 404,
                    'messageErreur' => "La ressource demandée n'a pas été trouvée",
                    'ressourceDemandee' => $router->pathFor('getCompaniesByCity', []) . '?ville=' . $data['ville']];
                $encoded = json_encode($res);

                //Ecriture du header
                $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
                $response = $this->Status($response, 404);
                $response = $this->Write($response, $encoded);

                return $response;
            }

            foreach ($query as $q) {
                $res[] = ['entreprise' => $q, 'links' => ['self' => ['href' => $router->pathFor('getCompaniesById', ['id' => $q->CODGEO])]]];
            }

            $tab = ['entreprises' => $res, 'links' => []];
            $encoded = json_encode($tab);

            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 200);
            $response = $this->Write($response, $encoded);

            return $response;
        }
    }

    public function getCompaniesById($id)
    {
        $router = $this->app->getContainer()->get('router');

        $company = Entreprise::find($id);

        if (empty($company)) {

            $res = ['codeErreur' => 404,
                'messageErreur' => "La ressource demandée n'a pas été trouvée",
                'ressourceDemandee' => $router->pathFor('getCompaniesById', ['id' => $id])];
            $encoded = json_encode($res);

            //Ecriture du header
            $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
            $response = $this->Status($response, 404);
            $response = $this->Write($response, $encoded);

            return $response;
        }

        $res = ['companies' => $company, 'Links' => []];

        $encoded = json_encode($res);

        $response = $this->jsonHeader($this->response, 'Content-Type', 'application/json');
        $response = $this->Status($response, 200);
        $response = $this->Write($response, $encoded);

        return $response;
    }

}