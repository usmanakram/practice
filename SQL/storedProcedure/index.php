<?php

$dbms = 'mysql';

//Replace the below connection parameters to fit your environment
$host = 'localhost'; 
$db = 'stored_procedure';
$user = 'tr';
$pass = 'mypass';
$dsn = "$dbms:host=$host;dbname=$db";

$cn=new PDO($dsn, $user, $pass);

$q=$cn->exec('call avg_sal(@out)');
$res=$cn->query('select @out')->fetchAll();

echo '<pre>';
print_r($res);
echo '</pre>';