<?php
include_once ("../dbconfig.php");

$clientLogin = $_REQUEST['login'];

$sql_query = "SELECT login FROM clients WHERE xo_online = 'true'";

$result_set = mysqli_query($h, $sql_query);

if (mysqli_num_rows($result_set) > 0) {
    $row = mysqli_fetch_all($result_set);

    for ($i = 0; $i < count($row); $i++) {

        if ($row[$i] != $clientLogin) {

            echo json_encode($row);

        }

    }
}
//else
//{
//    echo "";
//}
