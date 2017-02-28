<?php
require "config.php";
require "functions.php";

if ($_GET['code']) {
    $result = get_token($_GET['code']);

    if ($result) {
        print_r(get_data($result));
    }

} else {
    exit('Error');
}