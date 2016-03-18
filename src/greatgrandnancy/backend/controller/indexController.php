<?php

// Le namespace pour etre importe tout seul pas l'autoloader
namespace greatgrandnancy\backend\controller;
require_once 'Classes/PHPExcel/IOFactory.php';

use \greatgrandnancy\common\model\User;
use Upload\File;
use Upload\Storage\FileSystem;

class indexController
{
    public static function parse($request)
    {
        $data = $request->getBody();
        var_dump($data);

        $storage = new FileSystem('../src/greatgrandnancy/backend/files');
        $file = new File('file', $storage);
        // Renommage du fichier
//        $new_filename = uniqid();
//        $file->setName($new_filename);

        //Type pris en compte pour la validation du fichier
//        $file->addValidations(array(
//            new Mimetype(array('image/png', 'image/gif', 'image/jpeg'))
//        ));

        // Try de l'upload
        try {
            // Success!
            $file->upload();
        }catch (\Exception $e){
            return $e->getMessage();
        }

        $inputFileType = 'Excel5';
        $inputFileName = $data['file'];

//        $objReader = \PHPExcel_IOFactory::createReader($inputFileType);
        //$objReader->setInputEncoding('UTF-8');
//        $objPHPExcelReader = $objReader->load($inputFileName);
//
//        $loadedSheetNames = $objPHPExcelReader->getSheetNames();
//
//        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcelReader, 'CSV');
//
//        foreach($loadedSheetNames as $sheetIndex => $loadedSheetName) {
//            $objWriter->setSheetIndex($sheetIndex);
//            $objWriter->save('../files/'.$loadedSheetName.'.csv');
//        }
    }
}