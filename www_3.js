const http = require('http');
//moodul päringu parsimiseks
const url = require('url');
//moodul failitee haldamiseks
const path = require('path');
//moodul failitee haldamiseks
//const fs = require('fs');
const fs = require('fs').promise;
const dateET = require('./src/dateTimeET');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Polina Rättel, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Polina Rättel, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageBanner = '<img src ="pic/veebiprogrammeerimine_2026_TA.png" alt="">';
	;
const pageFoot = '\n</body>\n</html>';


http.createServer(async function(req, res){
	//parsin url-i
	console.log('Päring: ' + req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	
	//hakkame erinevaid lehti jaotama -> routes (marsruudid)
	
    if(currentURL.pathname === '/'){
    res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBanner);
	res.write(pageBody);
	res.write('\n\t<p>Täna on ' + dateET.day() + ', ' + dateET.fullDate(1) + ',kell oli lehe avamise hetkel: ' + dateET.fullTime() +'.</p>');
	res.write('\n\t<ul>');
	res.write('\n\t<li><a href="/vanasõna">Tänane vanasõna</a></li>');
	res.write('\n\t<ul>');
	res.write(pageFoot);
	//res.write('Veeb läkski käima!');
	return res.end();
    }
	else if (currentURL.pathname === '/vanasõnad'){
    res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write('/t<h1>Eesti vanasõnad</h1>\n\t<p>Siin näed tänase päeva vanasõna.</p>\n\t<hr>');
	res.write('\n\t<p><a href="/">Tagasi avalehele</a></p>');
	res.write(pageFoot);
	return res.end();
	}
    else if(currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png'){
    //teeme pildi tegeliku asukoha programmile kättesaadavaks
     let pickPath = path.join(__dirname, 'pic');  
	 try {
		 const data = await fs.readFile(picPath);
	 res.writeHead(200, {"Content-type": "image/jpeg"});
	 res.end(data);
	 } catch (err){
	 res.writeHead(404, "Content-type": "text/plain; charset=utf8"});
	 return res.end('Pilti ei leitud');
	 }
	}
	
	else {
	res.end('Viga 404, ei leia sellist lehte!');
	}
}).listen(5124);