var glClientName;
var t;
var glOpponentName;
var glTurn;
var glInGame;
var glFaction;
var clpass;

/*function logs() {
    var dateString = "";
    var newDate = new Date();
    dateString += (newDate.getMonth() + 1) + "-";
    dateString += newDate.getDate() + "-";
    dateString += newDate.getFullYear();
 b="log\" + dateString + ".txt";
    alert(b);
    var fso, f1;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    f1 = fso.CreateTextFile(b, true);
    alert("Создан файл с именем:" + b);
    //f1.WriteLine("Testing 1, 2, 3.");
}*/
function Auth(login, password){

    var r = new XMLHttpRequest();
    r.open("GET", "msg/auth/auth.php?login=" + login + "&password=" + password + "&from=xo", true);
    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            var ans = r.responseText;
            //logs();
            Auth_Valid(ans);
        }
    };
    glInGame = "false";
    localStorage.setItem('glInGame', glInGame);
    r.send(null);
}
function Auth_Valid(ans) {
    t = document.getElementById("pass_msg");
    switch (ans) {
        case "OK":
            document.location.href = 'client.html';
            break;
        case "User already online":
            t.innerHTML = ans;
            localStorage.setItem('glInGame', glInGame);
            localStorage.setItem('glOpponentName', "");
            break;
        case "Failed password":
            t.innerHTML = ans;
            localStorage.setItem('glInGame', glInGame);
            localStorage.setItem('glOpponentName', "");
            break;
        case "Failed login":
            t.innerHTML = ans;
            localStorage.setItem('glInGame', glInGame);
            localStorage.setItem('glOpponentName', "");
            break;
    }
}
function Reg(login, email, password1, password2) {

        var r = new XMLHttpRequest();
    r.open("GET", "msg/reg/reg.php?login=" + login + "&password1=" + password1 + "&password2=" + password2 + "&email=" + email, true);

        r.onreadystatechange = function () {
            if (r.readyState == 4) {
            //document.getElementById("result").innerHTML += r.responseText;
            //console.log(r.responseText);
            var anser = r.responseText;
            Reg_Valid(anser);
                console.log(anser);
            }
        };

        r.send(null);
}
function Reg_Valid(anser){

    t = document.getElementById("msg_regist");
    switch (anser) {
        case "User created":
            document.location.href = 'index.php';
            break;
        case "Email already using":
            t.innerHTML = anser;
            break;
        case "Login already using":
            t.innerHTML = anser;
            break;
        case "Passwords are different":
            t.innerHTML = anser;
            break;
        case "Incorrect email":
            t.innerHTML = anser;
            break;
        case "Incorrect login":
            t.innerHTML = anser;
            break;
        case "Incorrect password":
            t.innerHTML = anser;
            break;
    }
}

function getCookie(name) {
    var r = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    if (r) return r[2];
    else return "";
}

function GetClients() {

    glClientName = getCookie('xo_auth_log');
    //console.log(glClientName);
    var m = document.getElementById("lbLoginL");
    m.innerHTML = glClientName;

    var r = new XMLHttpRequest();
    t = document.getElementById("clients");

    r.open("GET", "msg/profile/clients.php?login=" + glClientName, true);

    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            if (r.responseText != "") {
                console.log(r.responseText);
                var json = JSON.parse(r.responseText);
                console.log(json);

                var ih = "";
                for (i = 0; i < json.length; i++) {
                    ih += "<tr><td>" + json[i] + "</td>" + '<td><input type="button" ' + 'value="Invite" onclick=Invite("' + json[i] + '")></td>';
                }
                t.innerHTML = ih;
            }
            else {
                t.innerHTML = "No users found";
            }

            var m = document.getElementById("lbLoginL");
            m.innerHTML = glClientName;
        }
    };

    r.send(null);
    //console.log("updating list of clients");
}
function ToClients() {

    document.location.href = 'client.html';

}

function Quit() {

    var r = new XMLHttpRequest();

    r.open("GET", "msg/auth/quit.php?login=" + glClientName + "&from=xo", true);

    glInGame = "false";
    localStorage.setItem('glInGame', glInGame);
    localStorage.setItem('glOpponentName', "");
    localStorage.setItem('key', "");

    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            var anss = r.responseText;
            Quit_Valid(anss);
            //console.log(r.responseText);
        }
    };
    r.send(null);
}
function Quit_Valid(anss) {

    if (anss == "Logout") {

        document.location.href = 'index.php';
    }
}

function Receive() {

    var r = new XMLHttpRequest();
    r.open("GET", "msg/receive.php?receiver=" + glClientName, true);

    r.onreadystatechange = function () {
        //console.log(r.readyState);
        if (r.readyState == 4 && r.responseText != 0) {

            //console.log(r.responseText);
            var json = JSON.parse(r.responseText);

            console.log(json);
            for (var i = 0; i < json.length; i++) {
                var sender = json[i].sender;
                var header = json[i].header;
                var body = json[i].body;

                console.log(sender + " " + header + " " + body);
                //console.log("parsing done");

                switch (header) {
                    case "invite":
                        glInGame = localStorage.getItem('glInGame');
                        if (glInGame == "false") {
                            if (confirm(sender + " wants to play with You...")) {

                                //console.log(sender + " is lucky today...");

                                Approve(sender);


                                glClientName = getCookie('xo_auth_log');

                                glInGame = "true";
                                glTurn = "false";
                                glFaction = " O ";
                                glOpponentName = sender;

                                localStorage.setItem('glInGame', glInGame);
                                localStorage.setItem('glTurn', glTurn);
                                localStorage.setItem('glFaction', glFaction);
                                localStorage.setItem('glOpponentName', glOpponentName);

                                document.location.href = 'game.html';

                                glInGame = localStorage.getItem('glInGame');
                                glTurn = localStorage.getItem('glTurn');
                                glFaction = localStorage.getItem('glFaction');
                                glOpponentName = localStorage.getItem('glOpponentName');
                                glClientName = getCookie('xo_auth_log');

                                //alert(glInGame + " " + glTurn + " " + glFaction + " " + glOpponentName);

                            }
                            else {
                                Deny(sender);
                            }
                        }
                        else {
                            Deny(sender);
                        }

                        break;
                    case "denial":

                        alert(sender + " doesn`t want to play with You");

                        break;

                    case "approval":

                        alert(sender + " wants to play with You too...");


                        glClientName = getCookie('xo_auth_log');


                        glInGame = "true";
                        glTurn = "true";
                        glFaction = " X ";
                        glOpponentName = sender;

                        localStorage.setItem('glInGame', glInGame);
                        localStorage.setItem('glTurn', glTurn);
                        localStorage.setItem('glFaction', glFaction);
                        localStorage.setItem('glOpponentName', glOpponentName);

                        document.location.href = 'game.html';

                        glInGame = localStorage.getItem('glInGame');
                        glTurn = localStorage.getItem('glTurn');
                        glFaction = localStorage.getItem('glFaction');
                        glOpponentName = localStorage.getItem('glOpponentName');
                        glClientName = getCookie('xo_auth_log');

                        //alert(glInGame + " " + glTurn + " " + glFaction + " " + glOpponentName);

                        break;

                    case "game":

                        WaitTurn(body);

                        break;
                }
            }
        }
    };

    r.send(null);
    //console.log("receiving new messages");
}
function Invite(opponentName) {
    var r = new XMLHttpRequest();

    r.open("GET", "msg/send.php?sender=" + glClientName + "&receiver=" + opponentName + "&header=invite" + "&body=you received invitation", true);

    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            //console.log(r.responseText);
        }
    };
    r.send(null);
}
function Approve(opponentName) {

    var r = new XMLHttpRequest();

    r.open("GET", "msg/send.php?sender=" + glClientName + "&receiver=" + opponentName + "&header=approval" + "&body=you received approval", true);

    r.onreadystatechange = function () {

        //console.log(r.responseText);
    };

    r.send(null);
}
function Deny(opponentName) {

    var r = new XMLHttpRequest();

    r.open("GET", "msg/send.php?sender=" + glClientName + "&receiver=" + opponentName + "&header=denial" + "&body=you received denial", true);

    r.onreadystatechange = function () {

        //console.log(r.responseText);
    };

    r.send(null);
}

function MakeTurn(sqrId) {

    glInGame = localStorage.getItem('glInGame');
    glTurn = localStorage.getItem('glTurn');
    glFaction = localStorage.getItem('glFaction');
    glOpponentName = localStorage.getItem('glOpponentName');
    glClientName = getCookie('xo_auth_log');

    if (glInGame == "true" && glTurn == "true") {
        var sqr = document.getElementById(sqrId);

        if (sqr.value == '     ') {
            sqr.value = glFaction;
            moveCount++;
            glTurn = "false";
            vari();


            localStorage.setItem('glInGame', glInGame);
            localStorage.setItem('glTurn', glTurn);
            localStorage.setItem('glFaction', glFaction);
            localStorage.setItem('glOpponentName', glOpponentName);


            var r = new XMLHttpRequest();
            r.open("GET", "msg/send.php?sender=" + glClientName + "&receiver=" + glOpponentName + "&header=game" + "&body=" + sqrId, true);

            r.onreadystatechange = function () {
                if (r.readyState == 4) {
                    check();
                    //r.responseText;
                    //console.log(r.responseText);
                }
            };

            r.send(null);
        }
    }
}
function WaitTurn(sqrId){

    glInGame = localStorage.getItem('glInGame');
    glFaction = localStorage.getItem('glFaction');
    glOpponentName = localStorage.getItem('glOpponentName');
    glClientName = getCookie('xo_auth_log');

    var sqr = document.getElementById(sqrId);

    if (glFaction == " X ")
        sqr.value = " O ";
    else
        sqr.value = " X ";

    moveCount++;
    glTurn = "true";
    vari();
    check();
    localStorage.setItem('glInGame', glInGame);
    localStorage.setItem('glTurn', glTurn);
    localStorage.setItem('glFaction', glFaction);
    localStorage.setItem('glOpponentName', glOpponentName);


    console.log(glInGame + " " + glTurn + " " + glFaction + " " + glOpponentName + " " + glClientName);
}

function Mail(email) {
    var btn = document.getElementById('btn_recover');
    btn.disable = true;
    var r = new XMLHttpRequest();
    r.open("GET", "msg/command/mail2.php?email=" + email, true);
        
    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            var ase = r.responseText;
            Mail_valid(ase);
            //logs();
        }
    };
    r.send(null);

}
function Mail_valid(ase) {
    if (ase == "send") {
        document.location.href = 'index.php';
    }
    else {
        alert("incorrect email");
        btn.disable = false;
    }

}




///////////////////////////////////////////////////////////////////////////
//женщинам, детям и людям со слабой психикой не стоит смотреть код дальше//
///////////////////////////////////////////////////////////////////////////

var sqr1;
var sqr2;
var sqr3;
var sqr4;
var sqr5;
var sqr6;
var sqr7;
var sqr8;
var sqr9;

var moveCount = 0;
var turn = 0;

function vari() {
    sqr1 = document.tic.sqr1.value;
    sqr2 = document.tic.sqr2.value;
    sqr3 = document.tic.sqr3.value;
    sqr4 = document.tic.sqr4.value;
    sqr5 = document.tic.sqr5.value;
    sqr6 = document.tic.sqr6.value;
    sqr7 = document.tic.sqr7.value;
    sqr8 = document.tic.sqr8.value;
    sqr9 = document.tic.sqr9.value;
}
function check() {

    if (sqr1 == glFaction && sqr2 == glFaction && sqr3 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else if (sqr4 == glFaction && sqr5 == glFaction && sqr6 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else if (sqr7 == glFaction && sqr8 == glFaction && sqr9 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else if (sqr1 == glFaction && sqr5 == glFaction && sqr9 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else if (sqr1 == glFaction && sqr4 == glFaction && sqr7 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else if (sqr2 == glFaction && sqr5 == glFaction && sqr8 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else if (sqr3 == glFaction && sqr6 == glFaction && sqr9 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else if (sqr1 == glFaction && sqr5 == glFaction && sqr9 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else if (sqr3 == glFaction && sqr5 == glFaction && sqr7 == glFaction)
    {
        alert("You Win!");
        reset();
    }
    else
    {
        check2();
        drawCheck();
    }
}
function check2() {
    var opFaction;
    if (glFaction == " X ") {
        opFaction = " O ";
    }
    else {
        opFaction = " X ";
    }
    if (sqr1 == opFaction && sqr2 == opFaction && sqr3 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
    else if (sqr4 == opFaction && sqr5 == opFaction && sqr6 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
    else if (sqr7 == opFaction && sqr8 == opFaction && sqr9 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
    else if (sqr1 == opFaction && sqr5 == opFaction && sqr9 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
    else if (sqr1 == opFaction && sqr4 == opFaction && sqr7 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
    else if (sqr2 == opFaction && sqr5 == opFaction && sqr8 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
    else if (sqr3 == opFaction && sqr6 == opFaction && sqr9 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
    else if (sqr1 == opFaction && sqr5 == opFaction && sqr9 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
    else if (sqr3 == opFaction && sqr5 == opFaction && sqr7 == opFaction)
    {
        alert("You Lose!");
        reset()
    }
}
function drawCheck() {
    vari();
    if(moveCount == 9)
    {
        alert("Draw");
        reset();
    }
}
function reset() {
    document.tic.sqr1.value = "     ";
    document.tic.sqr2.value = "     ";
    document.tic.sqr3.value = "     ";
    document.tic.sqr4.value = "     ";
    document.tic.sqr5.value = "     ";
    document.tic.sqr6.value = "     ";
    document.tic.sqr7.value = "     ";
    document.tic.sqr8.value = "     ";
    document.tic.sqr9.value = "     ";
    sqr1T = 0;
    sqr2T = 0;
    sqr3T = 0;
    sqr4T = 0;
    sqr5T = 0;
    sqr6T = 0;
    sqr7T = 0;
    sqr8T = 0;
    sqr9T = 0;
    vari();
    turn = 0;
    moveCount = 0;

    glInGame = "false";

    localStorage.setItem('glInGame', glInGame);
    ToClients();
}