<?php

$email = $_REQUEST['email'];

$sql_query = "SELECT login, password, email FROM clients WHERE email='" . $email . "'";

$result_set = mysqli_query($h, $sql_query);

$row = mysqli_fetch_row($result_set);

if ($email != "" && $email == $row[1]) {
    mail($email, "Your old password", "Hi " . $row[0] . "\nThis is our old password" . $row[2] . "\nLine 3");
    echo "send";
} else {
    echo "nihua ne send";
}