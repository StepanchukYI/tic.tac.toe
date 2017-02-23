<?php
include_once ("../dbconfig.php");

$clientLogin = $_REQUEST['login'];

$sql_query = "SELECT login FROM online WHERE login<>'" . $clientLogin . "'";
$result_set = mysqli_query($h, $sql_query);

if(mysqli_num_rows($result_set) > 0)
{
    while($row = mysqli_fetch_row($result_set))
    {
        echo "<tr><td>" . $row[0] . "</td>" . '<td><input type="button" value="Invite" onclick=Invite("'.$row[0].'")></td>';
    }
}
else
{
    echo "<tr><td>No data found!</td></tr>";
}
