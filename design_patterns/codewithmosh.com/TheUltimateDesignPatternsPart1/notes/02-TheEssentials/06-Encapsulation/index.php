<?php
require_once __DIR__ . '/Account.php';

$account = new Account();
// $account->balance = -1;

$account->deposit(10);
$account->withdraw(5);
echo $account->getBalance();

?>