<?php


	/** Error reporting */
	error_reporting(E_ALL);

	/** Include path **/
	ini_set('include_path', ini_get('include_path').';../Classes/');

	/** PHPExcel */
	include 'PHPExcel/Classes/PHPExcel.php';

	/** PHPExcel_Writer_Excel2007 */
	include 'PHPExcel/Classes/PHPExcel/Writer/Excel2007.php';
	require_once 'PHPMailer/PHPMailerAutoload.php';

	// Create new PHPExcel object
	echo date('H:i:s') . " Create new PHPExcel object\n";
	$objPHPExcel = new PHPExcel();

	// Set properties
	echo date('H:i:s') . " Set properties\n";
	$objPHPExcel->getProperties()->setCreator("ICS");
	$objPHPExcel->getProperties()->setLastModifiedBy("ICS");
	$objPHPExcel->getProperties()->setTitle("Office 2007 XLSX Document");
	$objPHPExcel->getProperties()->setSubject("Office 2007 XLSX Test Document");
	$objPHPExcel->getProperties()->setDescription("Report User Callmex for Dollarphone");

	/****************************************************************************/

    $host="69.195.197.14";
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

		$fecha = getdate();
		$mes = $fecha['mon'];
	  $dia = $fecha['mday'];

		$newdate = strtotime ( '-1 day' , strtotime ( '2016-'.$mes.'-'.$dia ) ) ;
		$mes = date ( 'm' , $newdate );
		$dia_antes = date ( 'j' , $newdate );
		$año = date ( 'Y' , $newdate );


		$sql_login = "SELECT  DATE_FORMAT(firstusedate, '%m/%d/%Y') Date,username PIN,id_seria Batch_Id,serial Sequence,description Description,substring(description, 22) Face_Value FROM cc_card INNER JOIN cc_card_seria ON cc_card_seria.id = cc_card.id_seria Where cc_card_seria.id>17 AND cc_card_seria.id<24 AND firstusedate <> '0000-00-00 00:00:00' AND firstusedate > '".$año."-".$mes."-".$dia_antes." 00:00:00' AND firstusedate < '".$año."-".$mes."-".$dia_antes." 23:59:59' order by id_seria, serial  asc;";
    $result_login=$conn->query($sql_login);



		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Date');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Batch');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Batch Id');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Sequence');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Pin');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Value');
		$objPHPExcel->getActiveSheet()->getStyle("A1:F1")->getFont()->setBold(true);

		$fila = 2;
		while($row=$result_login->fetch_assoc()){

			$objPHPExcel->setActiveSheetIndex(0);
			$objPHPExcel->getActiveSheet()->SetCellValue('A'.$fila, $row['Date']);
			$objPHPExcel->getActiveSheet()->SetCellValue('B'.$fila, $row['Description']);
			$objPHPExcel->getActiveSheet()->SetCellValue('C'.$fila, $row['Batch_Id']);
			$objPHPExcel->getActiveSheet()->SetCellValue('D'.$fila, $row['Sequence']);
			$objPHPExcel->getActiveSheet()->SetCellValue('E'.$fila, $row['PIN']);
			$objPHPExcel->getActiveSheet()->SetCellValue('F'.$fila, $row['Face_Value']);
			$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':F'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);

			$fila++;

		}
		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);


		// Rename sheet
		echo date('H:i:s') . " Rename sheet\n";
		$objPHPExcel->getActiveSheet()->setTitle('Report Usage');



		// Save Excel 2007 file
		echo date('H:i:s') . " Write to Excel2007 format\n";
		$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
		$objWriter->save('Callmex_Reporte_Usage.xlsx');

		// Echo done
		echo date('H:i:s') . " Done writing file.\r\n";
		$conn->close();

	    $mail = new PHPMailer;

	    //$mail->SMTPDebug = 3;                               // Enable verbose debug output

	    $mail->isSMTP();                                      // Set mailer to use SMTP
	    $mail->Host = 'smtp.office365.com';  // Specify main and backup SMTP servers
	    $mail->SMTPAuth = true;                               // Enable SMTP authentication
	    $mail->Username = 'noreply@directo.com';              // SMTP username
	    $mail->Password = 'q^+vR8!EXV';                           // SMTP password
	    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	    $mail->Port = 587;                                    // TCP port to connect to
	    $mail->CharSet = 'UTF-8';

	    $mail->From = 'noreply@directo.com';
	    $mail->FromName = 'Conciliacion de Facturación';
	    $mail->addAddress('aaron.luna@directo.com', 'Aaron Luna');     // Add a recipient
	    // $mail->addAddress('valeria.villafranca@directo.com', 'Valeria Villafranca');               // Name is optional
	    // $mail->addAddress('rodrigo.andrade@directo.com', 'Rodrigo Andrade');               // Name is optional
	    // $mail->addAddress('elisha@dollarphone.com', 'Elisha Hisiger');               // Name is optional
	    // $mail->addAddress('ihamilton@dollarphone.com', 'Irijah Hamilton');               // Name is optional
	    // $mail->addAddress('jfischer@dollarphone.com', 'Joel Fischer');               // Name is optional
	    // $mail->addAddress('activations@dollarphone.com', 'activations dollarphone');               // Name is optional
	    // $mail->addAddress('francisco.carbia@directo.com', 'Francisco Carbia');
	    // $mail->addReplyTo('no-replay@example.com', 'Information');
	    // $mail->addCC('activations@directo.com');
	    // $mail->addCC('aal@dollarphone.com');
	    // $mail->addCC('activations@directo.com');
	    // $mail->addCC('areschke@dollarphone.com');


	    $mail->addAttachment('Callmex_Reporte_Usage.xlsx');         // Add attachments

	    $mail->isHTML(true);                                  // Set email format to HTML


	    $mail->Subject = 'DPE Callmex Usage '.$mes.'-'.$dia_antes.'-'.$año;
	    $mail->Body    = 'Dear client please find attached your usage report for '.$mes.'-'.$dia_antes.'-'.$año.' </br> </br>  Thanks in advance </br> </br> Please don’t reply this message, for further assistance send an email to: activations@directo.com';
	    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	    $log = $mail->send();
	    if(!$log) {
	    echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $mail->ErrorInfo;
	    } else {
	    echo 'Message has been sent';

	    }

	/****************************************************************************/




?>
