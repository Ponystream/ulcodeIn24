<?php
/**
 * Created by PhpStorm.
 * User: locoman
 * Date: 18/03/16
 * Time: 16:43
 */

require_once 'Classes/PHPExcel/IOFactory.php';

$inputFileType = 'Excel5';
$inputFileName = 'base-cc-etab-2013.xls';

$objReader = PHPExcel_IOFactory::createReader($inputFileType);
//$objReader->setInputEncoding('UTF-8');
$objPHPExcelReader = $objReader->load($inputFileName);

$loadedSheetNames = $objPHPExcelReader->getSheetNames();

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcelReader, 'CSV');

foreach($loadedSheetNames as $sheetIndex => $loadedSheetName) {
    $objWriter->setSheetIndex($sheetIndex);
    $objWriter->save('parsed/'.$loadedSheetName.'.csv');
}

