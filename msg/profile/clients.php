<?php
include_once ("../dbconfig.php");

$clientLogin = $_REQUEST['login'];

$sql_query = "SELECT login FROM clients WHERE login<>'" . $clientLogin . "' AND xo_online = 'true'";

$result_set = mysqli_query($h, $sql_query);

if (mysqli_num_rows($result_set) > 0) {
    while ($row = mysqli_fetch_all($result_set)) {
        echo json_encode($row);
    }
}
