<?php
include_once ("../dbconfig.php");

$login = $_REQUEST['login'];

$sql_query = "DELETE FROM online WHERE login='" . $login . "'";

mysqli_query($h, $sql_query);

echo "Logout";