<?php
require "msg/auth/fb/config.php";
require "msg/auth/fb/functions.php";

$path = URL_AUTH . "?" . "client_id=" . CLIENT_ID . "&redirect_uri=" . urlencode(REDIRECT) . "&response_type=code";

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tic Tac Toe</title>
    <style>
        #frame {
            position: absolute;
            top: 3%;
            left: 36%;
            width: 22%;
            height: 30%;
            border: 3px solid black;
        }

        #lbEnter {
            top: 2%;
            left: 45%;
            position: absolute;
        }

        #pass_msg {

            left: 41%;
            top: 7%;
            position: absolute;

        }

        #txt_login {
            width: 200px;
            top: 11%;
            left: 40%;
            position: absolute;
            border: 2px solid black;
        }

        #txt_pass {
            width: 200px;
            top: 16%;
            left: 40%;
            position: absolute;
            border: 2px solid black;
        }

        #btn_auth {
            width: 205px;
            top: 21%;
            left: 40%;
            position: absolute;
            border: 2px solid black;
        }

        #btn_auth_fb {
            top: 25%;
            left: 40%;
            position: absolute;
        }

        #link {
            font-size: 18px;
            top: 28%;
            left: 37%;
            position: absolute;
        }

        #btn_auth {

        }

    </style>
    <script type="text/javascript" src="msg/command/command.js"></script>

</head>
<body>
<section id="cont">
    <div id="form1">
        <form method="post" name="login">
            <div id="frame"></div>
            <div id="lbEnter"><h3>Вход</h3></div>
            <input type="text" id="txt_login" placeholder="Ваше имя" required/><br/>
            <input type="password" id="txt_pass" placeholder="Пароль" required/><br/>
            <div id="pass_msg"></div>
            <input type="button" id="btn_auth" value="Войти" onclick="Auth(txt_login.value, txt_pass.value)"/>
            <a id="btn_auth_fb" href="<?= $path; ?>">Войти через ФБ</a>
            <div id="link"><a id="link_reg" href="register.html">Первый раз на сайте?</a> <a id="link_pwd"
                                                                                             href="forgot_pass.html">Забыли
                    пароль?</a></div>


        </form>
    </div>
</section>

</body>
</html>

