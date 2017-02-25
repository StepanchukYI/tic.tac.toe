var glClientName;
var t;
var glOpponentName;
var glTurn;
var glInGame;
var glFaction;

/*function logs() {
    var dateString = "";
    var newDate = new Date();
    dateString += (newDate.getMonth() + 1) + "-";
    dateString += newDate.getDate() + "-";
    dateString += newDate.getFullYear();
    b="C:\\" + dateString + ".txt";
    alert(b);
    var fso, f1;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    f1 = fso.CreateTextFile(b, true);
    alert("Создан файл с именем:" + b);
    //f1.WriteLine("Testing 1, 2, 3.");
}*/
function Auth(login, password){

    glClientName = login;
    if (localStorage.getItem('key') == undefined) {
        localStorage.setItem('key', glClientName);
    }
    localStorage.setItem('key', glClientName);
    var r = new XMLHttpRequest();
    r.open("GET", "msg/auth/auth.php?login=" + login + "&password=" + password , true);
    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            var ans = r.responseText;
            //logs();
            Auth_Valid(ans);
        }
    };

    r.send(null);
}
function Auth_Valid(ans) {

    if (ans == "OK") {

        if (localStorage.getItem('key') == undefined) {
            localStorage.setItem('key', glClientName);
        }

        document.location.href = 'client.html';

        if (localStorage.getItem('key')) {
            glClientName = localStorage.getItem('key');
        }
    }
    if (ans == "FailedPass") {
        t = document.getElementById("pass_msg");
        t.innerHTML = "Failed pass";
    }
    if (ans == "User online") {

        if (localStorage.getItem('key') == undefined) {
            localStorage.setItem('key', glClientName);
        }

        document.location.href = 'client.html';

        if (localStorage.getItem('key')) {
            alert(localStorage.getItem('key'));
        }
    }

}

function Reg(login, email, fname, lname, password1, password2) {

    if(password1 == password2)
    {
        var r = new XMLHttpRequest();
        r.open("GET", "msg/reg/reg.php?login="+login+"&password="+password1+"&fname="+fname+"&lname="+lname+"&email="+email, true);
        r.onreadystatechange = function () {
            if (r.readyState == 4) {
            //document.getElementById("result").innerHTML += r.responseText;
            //console.log(r.responseText);

            var anser = r.responseText;
            Reg_Valid(anser);
            }
        };

        r.send(null);
    }
    else{
        t = document.getElementById("msg_password");
        t.innerHTML="Wrong password!";
    }
}
function Reg_Valid(anser){

    if(anser == "User created")
    {
        document.location.href = 'index.html';
    }

    if(anser == "Login already using")
    {
        t = document.getElementById("msg_login");
        t.innerHTML="Login already using!";
    }
    if(anser == "Email already using")
    {
        t = document.getElementById("msg_email");
        t.innerHTML="Email already using!";
    }

}

function GetClients() {
    if (localStorage.getItem('key')) {
        glClientName = localStorage.getItem('key');
    }
    var r = new XMLHttpRequest();
    t = document.getElementById("clients");
    r.open("GET", "msg/profile/clients.php?login=" + glClientName, true);

    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            //console.log(r.responseText);
            t.innerHTML = r.responseText;
        }
    };

    r.send(null);
    //console.log("updating list of clients");
}
function ToClients() {

    document.location.href = 'client.html';
}

function Quit(){
    localStorage.getItem("Login");
    var r = new XMLHttpRequest();
    r.open("GET", "msg/auth/quit.php?login=" + glClientName, true);

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
    }
    document.location.href = 'index.html';
}

function Receive() {

    var r = new XMLHttpRequest();
    r.open("GET", "msg/receive.php?receiver=" + glClientName, true);

    r.onreadystatechange = function () {
        //console.log(r.readyState);
        if (r.readyState == 4 && r.responseText != 0) {

            //console.log(r.responseText);
            var json = JSON.parse(r.responseText);

            var sender = json[0];
            var header = json[1];
            var body = json[2];

            //console.log(sender + " " + header + " " + body);
            //console.log("parsing done");

            switch (header) {
                case "invite":

                    if (confirm(sender + " wants to play with You...")) {

                        //console.log(sender + " is lucky today...");

                        Approve(sender);

                        if (localStorage.getItem('key')) {
                            glClientName = localStorage.getItem('key');
                        }

                        glInGame = true;
                        glTurn = false;
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

                        //alert(glInGame + " " + glTurn + " " + glFaction + " " + glOpponentName);

                    }

                    break;

                case "approval":

                    alert(sender + " wants to play with You too...");


                    if (localStorage.getItem('key')) {
                        glClientName = localStorage.getItem('key');
                    }


                    glInGame = true;
                    glTurn = true;
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

                    //alert(glInGame + " " + glTurn + " " + glFaction + " " + glOpponentName);

                    break;

                case "game":

                    alert("4")
                    WaitTurn(body);

                    break;
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


function MakeTurn(sqrId) {

    glInGame = localStorage.getItem('glInGame');
    glTurn = localStorage.getItem('glTurn');
    glFaction = localStorage.getItem('glFaction');
    glOpponentName = localStorage.getItem('glOpponentName');

    if (glInGame && glTurn) {
        var sqr = document.getElementById(sqrId);

        if (sqr.value == '     ') {
            sqr.value = glFaction;
            moveCount++;
            glTurn = false;
            vari();
            check();

            var r = new XMLHttpRequest();
            r.open("GET", "msg/send.php?sender=" + glClientName + "&receiver=" + glOpponentName + "&header=game" + "&body=" + sqrId, true);

            r.onreadystatechange = function () {

                if (r.readyState == 4) {
                    r.responseText;
                    //console.log(r.responseText);
                }
            };

            r.send(null);
        }
    }
}
function WaitTurn(sqrId){

    var sqr = document.getElementById(sqrId);

    if (glFaction == " X ")
        sqr.value = " O ";
    else
        sqr.value = " X ";

    moveCount++;
    glTurn = true;
    vari();
    check();
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

function vari()
{
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
function check()
{
    if(sqr1 == " X " && sqr2 == " X " && sqr3 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else if(sqr4 == " X " && sqr5 == " X " && sqr6 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else if(sqr7 == " X " && sqr8 == " X " && sqr9 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else if(sqr1 == " X " && sqr5 == " X " && sqr9 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else if(sqr1 == " X " && sqr4 == " X " && sqr7 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else if(sqr2 == " X " && sqr5 == " X " && sqr8 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else if(sqr3 == " X " && sqr6 == " X " && sqr9 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else if(sqr1 == " X " && sqr5 == " X " && sqr9 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else if(sqr3 == " X " && sqr5 == " X " && sqr7 == " X ")
    {
        alert("You Win!");
        reset();
    }
    else
    {
        //winCheck()
        check2();
        drawCheck();
    }
}
function check2()
{
    vari();
    drawCheck();
    if(sqr1 == " O " && sqr2 == " O " && sqr3 == " O ")
    {
        alert("You Lose!");
        reset()
    }
    else if(sqr4 == " O " && sqr5 == " O " && sqr6 == " O ")
    {
        alert("You Lose!");
        reset()
    }
    else if(sqr7 == " O " && sqr8 == " O " && sqr9 == " O ")
    {
        alert("You Lose!");
        reset()
    }
    else if(sqr1 == " O " && sqr5 == " O " && sqr9 == " O ")
    {
        alert("You Lose!");
        reset()
    }
    else if(sqr1 == " O " && sqr4 == " O " && sqr7 == " O ")
    {
        alert("You Lose!");
        reset()
    }
    else if(sqr2 == " O " && sqr5 == " O " && sqr8 == " O ")
    {
        alert("You Lose!");
        reset()
    }
    else if(sqr3 == " O " && sqr6 == " O " && sqr9 == " O ")
    {
        alert("You Lose!");
        reset()
    }
    else if(sqr1 == " O " && sqr5 == " O " && sqr9 == " O ")
    {
        alert("You Lose!");
        reset()
    }
    else if(sqr3 == " O " && sqr5 == " O " && sqr7 == " O ")
    {
        alert("You Lose!");
        reset()
    }
}
function player1Check()
{
    if(sqr1 == " X " && sqr2 == " X " && sqr3 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else if(sqr4 == " X " && sqr5 == " X " && sqr6 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else if(sqr7 == " X " && sqr8 == " X " && sqr9 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else if(sqr1 == " X " && sqr5 == " X " && sqr9 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else if(sqr1 == " X " && sqr4 == " X " && sqr7 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else if(sqr2 == " X " && sqr5 == " X " && sqr8 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else if(sqr3 == " X " && sqr6 == " X " && sqr9 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else if(sqr1 == " X " && sqr5 == " X " && sqr9 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else if(sqr3 == " X " && sqr5 == " X " && sqr7 == " X ")
    {
        alert("Player 1 wins!");
        reset();
    }
    else
    {
        player2Check();
        drawCheck();
    }
}
function player2Check()
{
    vari();
    drawCheck();
    if(sqr1 == " O " && sqr2 == " O " && sqr3 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
    else if(sqr4 == " O " && sqr5 == " O " && sqr6 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
    else if(sqr7 == " O " && sqr8 == " O " && sqr9 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
    else if(sqr1 == " O " && sqr5 == " O " && sqr9 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
    else if(sqr1 == " O " && sqr4 == " O " && sqr7 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
    else if(sqr2 == " O " && sqr5 == " O " && sqr8 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
    else if(sqr3 == " O " && sqr6 == " O " && sqr9 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
    else if(sqr1 == " O " && sqr5 == " O " && sqr9 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
    else if(sqr3 == " O " && sqr5 == " O " && sqr7 == " O ")
    {
        alert("Player 2 wins!");
        reset();
    }
}
function drawCheck()
{
    vari();
    //moveCount = sqr1T + sqr2T + sqr3T + sqr4T + sqr5T + sqr6T + sqr7T + sqr8T + sqr9T
    if(moveCount == 9)
    {
        reset();
        alert("Draw");
    }
}
function winCheck()
{
    check2();
    if(sqr1 == " O " && sqr2 == " O " && sqr3T == 0 && turn == 1)
    {
        document.tic.sqr3.value = " O ";
        sqr3T = 1;
        turn = 0;
    }
    else if(sqr2 == " O " && sqr3 == " O " && sqr1T == 0 && turn == 1)
    {
        document.tic.sqr1.value = " O ";
        sqr1T = 1;
        turn = 0;
    }
    else if(sqr4 == " O " && sqr5 == " O " && sqr6T == 0 && turn == 1)
    {
        document.tic.sqr6.value = " O ";
        sqr6T = 1;
        turn = 0;
    }
    else if(sqr5 == " O " && sqr6 == " O " && sqr4T == 0 && turn == 1)
    {
        document.tic.sqr4.value = " O ";
        sqr4T = 1;
        turn = 0;
    }
    else if(sqr7 == " O " && sqr8 == " O " && sqr9T == 0 && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        sqr9T = 1;
        turn = 0;
    }
    else if(sqr8 == " O " && sqr9 == " O " && sqr7T == 0 && turn == 1)
    {
        document.tic.sqr7.value = " O ";
        sqr7T = 1;
        turn = 0;
    }
    else if(sqr1 == " O " && sqr5 == " O " && sqr9T == 0 && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        sqr9T = 1;
        turn = 0;
    }
    else if(sqr5 == " O " && sqr9 == " O " && sqr1T == 0 && turn == 1)
    {
        document.tic.sqr1.value = " O ";
        sqr1T = 1;
        turn = 0;
    }
    else if(sqr3 == " O " && sqr5 == " O " && sqr7T == 0 && turn == 1)
    {
        document.tic.sqr7.value = " O ";
        sqr7T = 1;
        turn = 0;
    }
    else if(sqr7 == " O " && sqr5 == " O " && sqr3T == 0 && turn == 1)
    {
        document.tic.sqr3.value = " O ";
        sqr3T = 1;
        turn = 0;
    }
    else if(sqr1 == " O " && sqr3 == " O " && sqr2T == 0 && turn == 1)
    {
        document.tic.sqr2.value = " O ";
        sqr2T = 1;
        turn = 0;
    }
    else if(sqr4 == " O " && sqr6 == " O " && sqr5T == 0 && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        sqr5T = 1;
        turn = 0;
    }
    else if(sqr7 == " O " && sqr9 == " O " && sqr8T == 0 && turn == 1)
    {
        document.tic.sqr8.value = " O ";
        sqr8T = 1;
        turn = 0;
    }
    else if(sqr1 == " O " && sqr7 == " O " && sqr4T == 0 && turn == 1)
    {
        document.tic.sqr4.value = " O ";
        sqr4T = 1;
        turn = 0;
    }
    else if(sqr2 == " O " && sqr8 == " O " && sqr5T == 0 && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        sqr5T = 1;
        turn = 0;
    }
    else if(sqr3 == " O " && sqr9 == " O " && sqr6T == 0 && turn == 1)
    {
        document.tic.sqr6.value = " O ";
        sqr6T = 1;
        turn = 0;
    }
    else if(sqr1 == " O " && sqr5 == " O " && sqr9T == 0 && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        sqr9T = 1;
        turn = 0;
    }
    else if(sqr4 == " O " && sqr7 == " O " && sqr1T == 0 && turn == 1)
    {
        document.tic.sqr1.value = " O ";
        sqr1T = 1;
        turn = 0;
    }
    else if(sqr5 == " O " && sqr8 == " O " && sqr2T == 0 && turn == 1)
    {
        document.tic.sqr2.value = " O ";
        sqr2T = 1;
        turn = 0;
    }
    else if(sqr6 == " O " && sqr9 == " O " && sqr3T == 0 && turn == 1)
    {
        document.tic.sqr3.value = " O ";
        sqr3T = 1;
        turn = 0;
    }
    else if(sqr1 == " O " && sqr4 == " O " && sqr7T == 0 && turn == 1)
    {
        document.tic.sqr7.value = " O ";
        sqr7T = 1;
        turn = 0;
    }
    else if(sqr2 == " O " && sqr5 == " O " && sqr8T == 0 && turn == 1)
    {
        document.tic.sqr8.value = " O ";
        sqr8T = 1;
        turn = 0;
    }
    else if(sqr3 == " O " && sqr6 == " O " && sqr9T == 0 && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        sqr9T = 1;
        turn = 0;
    }
    else if(sqr1 == " O " && sqr9 == " O " && sqr5T == 0 && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        sqr5T = 1;
        turn = 0;
    }
    else if(sqr3 == " O " && sqr7 == " O " && sqr5T == 0 && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        sqr5T = 1;
        turn = 0;
    }
    else
    {
        computer();
    }
    check2();
}
function computer()
{
    check2();
    if(sqr1 == " X " && sqr2 == " X " && sqr3T == 0 && turn == 1)
    {
        document.tic.sqr3.value = " O ";
        sqr3T = 1;
        turn = 0;
    }
    else if(sqr2 == " X " && sqr3 == " X " && sqr1T == 0 && turn == 1)
    {
        document.tic.sqr1.value = " O ";
        sqr1T = 1;
        turn = 0;
    }
    else if(sqr4 == " X " && sqr5 == " X " && sqr6T == 0 && turn == 1)
    {
        document.tic.sqr6.value = " O ";
        sqr6T = 1;
        turn = 0;
    }
    else if(sqr5 == " X " && sqr6 == " X " && sqr4T == 0 && turn == 1)
    {
        document.tic.sqr4.value = " O ";
        sqr4T = 1;
        turn = 0;
    }
    else if(sqr7 == " X " && sqr8 == " X " && sqr9T == 0 && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        sqr9T = 1;
        turn = 0;
    }
    else if(sqr8 == " X " && sqr9 == " X " && sqr7T == 0 && turn == 1)
    {
        document.tic.sqr7.value = " O ";
        sqr7T = 1;
        turn = 0;
    }
    else if(sqr1 == " X " && sqr5 == " X " && sqr9T == 0 && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        sqr9T = 1;
        turn = 0;
    }
    else if(sqr5 == " X " && sqr9 == " X " && sqr1T == 0 && turn == 1)
    {
        document.tic.sqr1.value = " O ";
        sqr1T = 1;
        turn = 0;
    }
    else if(sqr3 == " X " && sqr5 == " X " && sqr7T == 0 && turn == 1)
    {
        document.tic.sqr7.value = " O ";
        sqr7T = 1;
        turn = 0;
    }
    else if(sqr7 == " X " && sqr5 == " X " && sqr3T == 0 && turn == 1)
    {
        document.tic.sqr3.value = " O ";
        sqr3T = 1;
        turn = 0;
    }
    else if(sqr1 == " X " && sqr3 == " X " && sqr2T == 0 && turn == 1)
    {
        document.tic.sqr2.value = " O ";
        sqr2T = 1;
        turn = 0;
    }
    else if(sqr4 == " X " && sqr6 == " X " && sqr5T == 0 && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        sqr5T = 1;
        turn = 0;
    }
    else if(sqr7 == " X " && sqr9 == " X " && sqr8T == 0 && turn == 1)
    {
        document.tic.sqr8.value = " O ";
        sqr8T = 1;
        turn = 0;
    }
    else if(sqr1 == " X " && sqr7 == " X " && sqr4T == 0 && turn == 1)
    {
        document.tic.sqr4.value = " O ";
        sqr4T = 1;
        turn = 0;
    }
    else if(sqr2 == " X " && sqr8 == " X " && sqr5T == 0 && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        sqr5T = 1;
        turn = 0;
    }
    else if(sqr3 == " X " && sqr9 == " X " && sqr6T == 0 && turn == 1)
    {
        document.tic.sqr6.value = " O ";
        sqr6T = 1;
        turn = 0;
    }
    else if(sqr1 == " X " && sqr5 == " X " && sqr9T == 0 && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        sqr9T = 1;
        turn = 0;
    }
    else if(sqr4 == " X " && sqr7 == " X " && sqr1T == 0 && turn == 1)
    {
        document.tic.sqr1.value = " O ";
        sqr1T = 1;
        turn = 0;
    }
    else if(sqr5 == " X " && sqr8 == " X " && sqr2T == 0 && turn == 1)
    {
        document.tic.sqr2.value = " O ";
        sqr2T = 1;
        turn = 0;
    }
    else if(sqr6 == " X " && sqr9 == " X " && sqr3T == 0 && turn == 1)
    {
        document.tic.sqr3.value = " O ";
        sqr3T = 1;
        turn = 0;
    }
    else if(sqr1 == " X " && sqr4 == " X " && sqr7T == 0 && turn == 1)
    {
        document.tic.sqr7.value = " O ";
        sqr7T = 1;
        turn = 0;
    }
    else if(sqr2 == " X " && sqr5 == " X " && sqr8T == 0 && turn == 1)
    {
        document.tic.sqr8.value = " O ";
        sqr8T = 1;
        turn = 0;
    }
    else if(sqr3 == " X " && sqr6 == " X " && sqr9T == 0 && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        sqr9T = 1;
        turn = 0;
    }
    else if(sqr1 == " X " && sqr9 == " X " && sqr5T == 0 && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        sqr5T = 1;
        turn = 0;
    }
    else if(sqr3 == " X " && sqr7 == " X " && sqr5T == 0 && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        sqr5T = 1;
        turn = 0;
    }
    else
    {
        AI();
    }
    check2()
}
function AI()
{
    vari();
    if(document.tic.sqr5.value == "     " && turn == 1)
    {
        document.tic.sqr5.value = " O ";
        turn = 0;
        sqr5T = 1
    }
    else if(document.tic.sqr1.value == "     " && turn == 1)
    {
        document.tic.sqr1.value = " O ";
        turn = 0;
        sqr1T = 1
    }
    else if(document.tic.sqr9.value == "     " && turn == 1)
    {
        document.tic.sqr9.value = " O ";
        turn = 0;
        sqr9T = 1
    }
    else if(document.tic.sqr6.value == "     " && turn == 1)
    {
        document.tic.sqr6.value = " O ";
        turn = 0;
        sqr6T = 1
    }
    else if(document.tic.sqr2.value == "     " && turn == 1)
    {
        document.tic.sqr2.value = " O ";
        turn = 0;
        sqr2T = 1
    }
    else if(document.tic.sqr8.value == "     " && turn == 1)
    {
        document.tic.sqr8.value = " O ";
        turn = 0;
        sqr8T = 1
    }
    else if(document.tic.sqr3.value == "     " && turn == 1)
    {
        document.tic.sqr3.value = " O ";
        turn = 0;
        sqr3T = 1
    }
    else if(document.tic.sqr7.value == "     " && turn == 1)
    {
        document.tic.sqr7.value = " O ";
        turn = 0;
        sqr7T = 1
    }
    else if(document.tic.sqr4.value == "     " && turn == 1)
    {
        document.tic.sqr4.value = " O ";
        turn = 0;
        sqr4T = 1
    }
    check2();
}
function reset()
{
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

    glInGame = false;
}
function resetter()
{
    reset();
}