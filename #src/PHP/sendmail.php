<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('en', 'phpmailer/language/');
$mail->IsHTML(true);

// от кого письмо
$mail->setFrom('andreida@andreidanyliuk.s79.r53.com.ua', 'User Contact Form');
// кому письмо
$mail->addAddress('dandrom31@gmail.com');
// тема письма
$mail->Subject = 'Contacts New User';

// тело письма
$body = '<h1>New user contacts</h1>';

if(trim(!empty($_POST['user_first_name']))){
   $body.='<p><strong>First Name: </strong>'.$_POST['user_first_name'].'</p>';
}

if(trim(!empty($_POST['user_last_name']))){
   $body.='<p><strong>Last Name: </strong>'.$_POST['user_last_name'].'</p>';
}

if(trim(!empty($_POST['user_email']))){
   $body.='<p><strong>Email: </strong>'.$_POST['user_email'].'</p>';
}

if(trim(!empty($_POST['user_telephone']))){
   $body.='<p><strong>Telephone: </strong>'.$_POST['user_telephone'].'</p>';
}

if(trim(!empty($_POST['user_massege']))){
   $body.='<p><strong>Massege: </strong>'.$_POST['user_massege'].'</p>';
}

$mail->Body = $body;

// отправляем
if(!$mail->send()){
   $message = 'Error';
}else{
   $message = 'Data Sent!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
