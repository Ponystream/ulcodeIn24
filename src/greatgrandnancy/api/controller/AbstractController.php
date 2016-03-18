<?php
/**
 * Created by PhpStorm.
 * User: michael
 * Date: 10/12/15
 * Time: 15:01
 */

namespace greatgrandnancy\api\controller;


abstract class AbstractController
{
    protected $request, $response, $app;
    public function __construct($req, $res, $app)
    {
        $this->request = $req;
        $this->response = $res;
        $this->app = $app;
    }

    public function Status($resp, $status)
    {
        return $resp->withStatus($status);
    }

    public function jsonHeader($resp, $content, $header)
    {
        return $resp->withHeader($content, $header);
    }

    public function Write($resp, $write)
    {
        return $resp->write($write);
    }
}