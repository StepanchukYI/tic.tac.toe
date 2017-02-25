<?php
include_once("../dbconfig.php");

$login = $_REQUEST['login'];
$password = $_REQUEST['password'];
$email = $_REQUEST['email'];

$sql_query = "SELECT login FROM clients WHERE login='" . $login . "'";

$result_set = mysqli_query($h, $sql_query);

$row = mysqli_fetch_row($result_set);

if ($row[0] != $login)
{
    $sql_query = "SELECT email FROM clients WHERE email='" . $email . "'";

    $result_set = mysqli_query($h, $sql_query);

    $row = mysqli_fetch_row($result_set);

    if ($row[0] != $email)
    {
        $sql_query = "INSERT INTO clients(login,password,email) VALUES('$login', '$password', '$email')";

        mysqli_query($h, $sql_query);

        echo "User created";
    }
    else
    {
        echo "Email already using";
    }
}
else
{
    echo "Login already using";
}

