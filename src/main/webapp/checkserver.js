/* express + mysql + select
 */    
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//express 모듈에 보조 장치 장착한다.
app.use(bodyParser.json()); // JSON 형식으로 넘오온 데이터 처리 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('static'));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'java89',
  password : '1111',
  database : 'stampidle'
});

connection.connect();

app.get('/bitcamp_stampidle/admin/auth/checkId.do', function(req, resp){
	resp.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	});
	connection.query(
	  'select count(*) as count from cmemb where id=?', [req.query.id],
	  function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
		  if (err) {
			  console.log(err);
			  resp.end('서버 실행중 오류 발생!');
			  return;
		  }
		  resp.end(JSON.stringify(rows[0].count));
	  });
});


app.get('/bitcamp_stampidle/admin/auth/checkPhone.do', function(req, resp){
	resp.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	});
	connection.query(
	  'select count(*) as count from cmemb where ctel=?', [req.query.phone],
	  function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
		  if (err) {
			  console.log(err);
			  resp.end('서버 실행중 오류 발생!');
			  return;
		  }
		  resp.end(JSON.stringify(rows[0].count));
	  });
});


app.get('/bitcamp_stampidle/admin/auth/checkCRN.do', function(req, resp){
	resp.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	});
	connection.query(
	  'select count(*) as count from cmemb where crn=?', [req.query.crn],
	  function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
		  if (err) {
			  console.log(err);
			  resp.end('서버 실행중 오류 발생!');
			  return;
		  }
		  resp.end(JSON.stringify(rows[0].count));
	  });
});



app.get('/bitcamp_stampidle/cstmr_m/auth/checkTel.do', function(req, resp){
	resp.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	});
	connection.query(
	  'select count(*) as count from memb where tel=?', [req.query.tel],
	  function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
		  if (err) {
			  console.log(err);
			  resp.end('서버 실행중 오류 발생!');
			  return;
		  }
		  resp.end(JSON.stringify(rows[0].count));
	  });
});






app.get('/bitcamp_stampidle/cstmr_m/auth/checkName.do', function(req, resp){
	resp.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	});
	connection.query(
	  'select count(*) as count from memb where name=?', [req.query.name],
	  function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
		  if (err) {
			  console.log(err);
			  resp.end('서버 실행중 오류 발생!');
			  return;
		  }
		  resp.end(JSON.stringify(rows[0].count));
	  });
});


app.get('/bitcamp_stampidle/cstmr_m/auth/checkTel.do', function(req, resp){
	resp.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	});
	connection.query(
	  'select count(*) as count from memb where tel=?', [req.query.tel],
	  function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
		  if (err) {
			  console.log(err);
			  resp.end('서버 실행중 오류 발생!');
			  return;
		  }
		  resp.end(JSON.stringify(rows[0].count));
	  });
});


app.get('/bitcamp_stampidle/cstmr_m/auth/checkEmail.do', function(req, resp){
	resp.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	});
	connection.query(
	  'select count(*) as count from memb where email=?', [req.query.email],
	  function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
		  if (err) {
			  console.log(err);
			  resp.end('서버 실행중 오류 발생!');
			  return;
		  }
		  resp.end(JSON.stringify(rows[0].count));
	  });
});


app.get('/bitcamp-stampidle/admin/auth/sendverify.do', function(req, resp){
	resp.writeHead(200, {
		'Content-Type': 'text/html;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	});
	
	generateCode(req.query.tel);
	
	connection.query(
	  'insert into veri(verify, tel) values(?, ?)', [code, req.query.tel],
	  function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
		if (err) {
			console.log(err);
			resp.end('서버 실행중 오류 발생!');
			return;
		}
		
		//GET
		var request = require('request');
		// 헤더 부분
		var headers = {
		    'User-Agent':       'Super Agent/0.0.1',
		    'Content-Type':     'application/x-www-form-urlencoded'
		}
		// 요청 세부 내용
		var options = {
		    url: 'http://b.bitcamp.com:8080/bitcamp-stampidle/admin/verifyCodeSms.json',
		    method: 'GET',
		    headers: headers,
		    qs: {'tel': req.query.tel, 'text': code}
		}
		// 요청 시작 받은값은 body
		request(options, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    	console.log("1")
		    	resp.end(JSON.stringify('success'));
		    }
		    console.log("2")
		})
		
		
	  }
	);
});

app.listen(8888, function() {
	console.log('노드 서버 실행중...');
});



var code = "";

function generateCode(tel) {
	code += Math.floor(Math.random() * 10000) + 1;
	code += tel.substr(tel.length - 5, 3);
}