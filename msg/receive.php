<?php
include_once ("dbconfig.php");

$receiver = $_REQUEST['receiver'];

$sql_query = "SELECT sender,header,body FROM messages_xo WHERE receiver = '" . $receiver . "'";
$result_set = mysqli_query($h, $sql_query);

if(mysqli_num_rows($result_set) > 0)
{
    while($row = mysqli_fetch_row($result_set))
    {
        echo json_encode($row);
    }

    $sql_query = "DELETE FROM messages_xo WHERE receiver = '" . $receiver . "'";
    mysqli_query($h, $sql_query);
}
else
{
    echo 0;
}

//echo json_encode($result_set, JSON_UNESCAPED_UNICODE);