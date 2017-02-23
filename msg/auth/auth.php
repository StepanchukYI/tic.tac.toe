<?php
include_once ("../dbconfig.php");

$login = $_REQUEST['login'];
$password = $_REQUEST['password'];

$sql_query = "SELECT login, password FROM clients WHERE login='" . $login . "'";

$result_set = mysqli_query($h, $sql_query);

$row = mysqli_fetch_row($result_set);

if ($row[1] == $password)
{
    $sql_query = "INSERT INTO online(login) VALUES('$login')";

    $result_set = mysqli_query($h, $sql_query);

    echo "OK";
}
else
{
    echo "FailedPass";
}