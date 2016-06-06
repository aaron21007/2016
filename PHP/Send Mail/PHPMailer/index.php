<?php
    require_once $_SERVER['DOCUMENT_ROOT'].'/PHPMailer-master/PHPMailerAutoload.php';

    $mail = new PHPMailer;

    //$mail->SMTPDebug = 3;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.mandrillapp.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'aaron.luna@directo.com';                 // SMTP username
    $mail->Password = 'rqnDg8D5xOqJhjSs-1eKKA';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->setFrom('aaron@example.com', 'Mailer');
    $mail->addAddress('aaron.luna@directo.com', 'Aaron Luna');     // Add a recipient
    $mail->addAddress('valeria.villafranca@directo.com', 'Valeria Villafranca');               // Name is optional
    $mail->addReplyTo('no-replay@example.com', 'Information');
    $mail->addCC('activations@directo.com');
    //$mail->addBCC('bcc@example.com');

    $mail->addAttachment('/home/aaron/Documentos/Cosas/m_tia.pdf', 'Report_Use.pdf');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'DPE Callmex Usage 02-22-16';
    $mail->Body    = 'Dear client please find attached your usage report for 02-22-16 </br> Thanks in advance';
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
    echo 'Message has been sent';
    }
?>
