<?php
include_once ("../dbconfig.php");

$login = $_REQUEST['login'];
$from = $_REQUEST['from'];

if ($from == "xo") {
    $sql_query = "UPDATE clients SET xo_online = 'false' WHERE login='" . $login . "'";

} else if ($from == "chat") {
    $sql_query = "UPDATE clients SET chat_online = 'false' WHERE login='" . $login . "'";
}

mysqli_query($h, $sql_query);

echo "Logout";