<?php

/** Error reporting */
error_reporting(E_ALL);
/** Include path **/
ini_set('include_path', ini_get('include_path').';../Classes/');
ini_set('memory_limit', '2048M');
/** PHPExcel */
include 'PHPExcel/Classes/PHPExcel.php'; //OJO AQUI pon las deacuerdo a tus librerias
include 'PHPExcel/Classes/PHPExcel/Writer/Excel2007.php';//OJO AQUI pon las deacuerdo a tus librerias
require_once 'PHPMailer/PHPMailerAutoload.php';//OJO AQUI pon las deacuerdo a tus librerias

$objPHPExcel = new PHPExcel();

// Set properties EXCEL
$objPHPExcel->getProperties()->setCreator("ICS");
$objPHPExcel->getProperties()->setLastModifiedBy("ICS");
$objPHPExcel->getProperties()->setTitle("Office 2007 XLSX Document");
$objPHPExcel->getProperties()->setSubject("Office 2007 XLSX Document");
$objPHPExcel->getProperties()->setDescription("Report Callmex for  ICS");

$objPHPExcel->setActiveSheetIndex(0);
$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Producto');
$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'NumeroA');
$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Numero\'s B');
$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Minutos');
$objPHPExcel->getActiveSheet()->SetCellValue('E1', ' % ');
$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Minutos Totales');
$objPHPExcel->getActiveSheet()->getStyle("A1:F1")->getFont()->setBold(true);


/*********Datos para conexion a BD MYSQL ****************************/
  $host="localhost";
  $port=3306;
  $user="root";//api_user
  $password="e2va5hcy7jiC"; //apiuser13$
  $dbname="callmex";
  $conn = new mysqli($host, $user, $password, $dbname);
  if ($conn->connect_error) {
      die("Connection failed: ".$conn->connect_error);
      return 0;
  }else{

  }


  $sql_numbers_A = "SELECT cid numero, SUM( sessiontime )/60 total_minutes FROM callmex.cc_callerid inner join cc_call on cc_call.src = cc_callerid.cid  group by cid order by cid desc";
  $sql_numbers_B = "SELECT cid numeroA,calledstation numeroB,  SUM( sessiontime )/60 total_minutes, description FROM callmex.cc_callerid inner join cc_call on cc_call.src = cc_callerid.cid left join cc_card on cc_card.id = cc_callerid.id_cc_card left join cc_card_seria on cc_card_seria.id = cc_card.id_seria group by cid, calledstation order by cid desc";


  $result_numbers_A = $conn->query($sql_numbers_A);
  $result_numbers_B = $conn->query($sql_numbers_B);

  $numerosB = Array();
  $i=0;
  while($row = $result_numbers_B->fetch_assoc()){
     $numerosB[$i++] =  array('numA' =>$row['numeroA'] , 'numB' =>$row['numeroB'], 'minutes'=>$row['total_minutes'], 'description'=>$row['description'] );
  }

  $numerosA = Array();
  $i=0;
  while($row = $result_numbers_A->fetch_assoc()){
     $numerosA[$i++] =  array('numA' =>$row['numero'] , 'total' =>$row['total_minutes']);
  }

  $fila_excel = 2;
  for ($j=0; $j <count($numerosA) ; $j++) {

    if (round($numerosA[$j]['total'])>0) {
      $objPHPExcel->setActiveSheetIndex(0);
      $objPHPExcel->getActiveSheet()->SetCellValue('A'.$fila_excel, "Producto   $ x.x");
      $objPHPExcel->getActiveSheet()->SetCellValue('B'.$fila_excel, $numerosA[$j]['numA']);
      $objPHPExcel->getActiveSheet()->SetCellValue('C'.$fila_excel, "");
      $objPHPExcel->getActiveSheet()->SetCellValue('D'.$fila_excel, "");
      $objPHPExcel->getActiveSheet()->SetCellValue('E'.$fila_excel, "100");
      $objPHPExcel->getActiveSheet()->SetCellValue('F'.$fila_excel, round($numerosA[$j]['total']));
      $objPHPExcel->getActiveSheet()->getStyle('A'.$fila_excel.':F'.$fila_excel)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
      $objPHPExcel->getActiveSheet()->getStyle("A".$fila_excel.":F".$fila_excel)->getFill()->applyFromArray(array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'startcolor' => array(
                 'rgb' => "808080"
            )
        ));
        $fila_aux = $fila_excel;
        $fila_excel++;
        for ($i=0; $i <count($numerosB) ; $i++) {
           if($numerosB[$i]['numA']==$numerosA[$j]['numA'] && round($numerosB[$i]['minutes']) >0){
             $objPHPExcel->setActiveSheetIndex(0);
             $objPHPExcel->getActiveSheet()->SetCellValue('A'.$fila_excel, "");
             $objPHPExcel->getActiveSheet()->SetCellValue('A'.$fila_aux, $numerosB[$i]['description']);
             $objPHPExcel->getActiveSheet()->SetCellValue('B'.$fila_excel, "");
             $objPHPExcel->getActiveSheet()->SetCellValue('C'.$fila_excel, $numerosB[$i]['numB']);
             $objPHPExcel->getActiveSheet()->SetCellValue('D'.$fila_excel, round($numerosB[$i]['minutes']));
             $objPHPExcel->getActiveSheet()->SetCellValue('E'.$fila_excel, "".(round(($numerosB[$i]['minutes']*100)/( $numerosA[$j]['total']) ))."%" );
             $objPHPExcel->getActiveSheet()->SetCellValue('F'.$fila_excel, "");
             $objPHPExcel->getActiveSheet()->getStyle('A'.$fila_excel.':F'.$fila_excel)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
             $objPHPExcel->getActiveSheet()->getStyle("A".$fila_excel.":F".$fila_excel)->getFill()->applyFromArray(array(
                  'type' => PHPExcel_Style_Fill::FILL_SOLID,
                  'startcolor' => array(
                       'rgb' => "C0C0C0"
                  )
              ));
             $fila_excel++;
             if($numerosB[$i+1]['numA']!=$numerosA[$j]['numA']){
               break;
             }
           }else{

           }
        }
    }

  }


  $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
  $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
  $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
  $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
  $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
  $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);

  $objPHPExcel->getActiveSheet()->setTitle('Number A related with numbers B');
  $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
  $objWriter->save('Numbers_A_with_B.xlsx');


  $conn->close();

  ?>
