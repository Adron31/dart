<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// от кого письмо
$mail->setFrom('andreida@andreidanyliuk.s79.r53.com.ua', 'User contact form');
// кому письмо
$mail->addAddress('andreidanyliuk@gmail.com');
// тема письма
$mail->Subject = 'Contacts New User';

// тело письма
$body = '<h1>New user contacts</h1>';

if(trim(!empty($_POST['first-name']))){
   $body.='<p><strong>First Name: </strong>'.$_POST['first-name'].'</p>';
}

if(trim(!empty($_POST['last-name']))){
   $body.='<p><strong>Last Name: </strong>'.$_POST['last-name'].'</p>';
}

if(trim(!empty($_POST['email']))){
   $body.='<p><strong>Email: </strong>'.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['tel']))){
   $body.='<p><strong>Telephone: </strong>'.$_POST['tel'].'</p>';
}

if(trim(!empty($_POST['massege']))){
   $body.='<p><strong>Massege: </strong>'.$_POST['massege'].'</p>';
}

$mail->Body = $body;

// отправляем
if(!$mail->send()){
   $message = 'Ошибка';
}else{
   $message = 'Data Sent!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
