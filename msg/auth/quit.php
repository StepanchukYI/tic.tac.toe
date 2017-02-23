<?php
include_once ("../dbconfig.php");

$clientLogin = $_REQUEST['login'];

$sql_query="DELETE FROM online WHERE login='" . $clientName . "'";

mysqli_query($h, $sql_query);

echo $clientName;