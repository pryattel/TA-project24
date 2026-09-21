const http = require('http');
const dateTimeET = require('./dateTimeET');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Polina Rättel, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Polina Rättel, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const dateTimeInfo = 
    '<p>Nädalapäev: ' + dateTimeET.fullWeekday() + '</p>' +
    '<p>Kuupäev: ' + dateTimeET.fullDate(1) + '</p>' +
    '<p>Leht avati kell: ' + dateTimeET.fullTime() + '</p>'
	;
const pageFoot = '\n</body>\n</html>';


http.createServer(function(req, res){
    res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBody);
	res.write(dateTimeInfo);
	res.write(pageFoot);
	//res.write('Veeb läkski käima!');
return res.end();	
}).listen(5124);