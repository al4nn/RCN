<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/vendor/phpmailer/src/Exception.php';
require 'PHPMailer/vendor/phpmailer/src/PHPMailer.php';
require 'PHPMailer/vendor/phpmailer/src/SMTP.php';

require 'PHPMailer/vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura os dados do formulário
    $nome = $_POST["name"];
    $email = $_POST["email"];
    $telefone = $_POST["phone"];
    $mensagem = $_POST["message"];
    $midia = $_POST['midia'];

    // Configurações do servidor SMTP
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host         = 'smtp.titan.email';                           //Set the SMTP server to send through
    $mail->SMTPAuth     = true;                                         //Enable SMTP authentication
    $mail->Username     = 'no-reply@rcnvisual.com.br';                  //SMTP username
    $mail->Password     = '<yC-*7C3pvVF{GE';                            //SMTP password
    $mail->SMTPSecure   = PHPMailer::ENCRYPTION_SMTPS;                  //Enable implicit TLS encryption
    $mail->Port         = 465;                                          //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    // Configurações do e-mail
    $mail->setFrom('no-reply@rcnvisual.com.br', 'RCN Visual');
    $mail->addAddress('contato@rcnvisual.com.br', 'RCN Visual');
    $mail->addReplyTo($email, $nome);
    $mail->isHTML(true);
    $mail->Subject = '[' . strtoupper($nome) . '] Novo Contato do SITE!';
    $mail->Body    = 'Nome: ' . $nome . '<br>Email: ' . $email . '<br>Mensagem: ' . $mensagem;

    // Envia o e-mail e verifica se houve algum erro
    if (!$mail->send()) {
        echo 'Erro ao enviar o e-mail: ' . $mail->ErrorInfo;
    } else {
        echo 'E-mail enviado com sucesso!';
    }
} else {
    echo 'Método não permitido';
}
