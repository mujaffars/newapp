var serverHost = 'http://shivtraderssangli.com/getdata.aspx';
var recordUpdateHost = 'http://shivtraderssangli.com/getdata.aspx';

//var serverHost = 'http://localhost:56927/wwwroot/getdata.aspx';
//http://vas.mobilogi.com/api.php?username=stipls&password=pass12345&route=1&sender=STIPLS&mobile[]=9503426967&message[]=TEST SMS';

//serverHost = 'https://hello-world-mujaffar.c9users.io/hello-world.php';

var screenHeight = parseInt($(window).height());
var screenWidth = parseInt($(window).width());
if (screenWidth > screenHeight) {
    screenWidth = screenHeight;
}
var fontSize = parseInt(eval(eval(screenWidth * 5) / 100));
var recordFontSize = parseInt(eval(eval(screenWidth * 4) / 100));
var logedIn = false;