<?php

require_once __DIR__ . '/MailService.php';

$mail = new MailService();
$mail->sendEmail();

?>