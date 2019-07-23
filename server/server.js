const gameData = require('../data/Module/moduleData.json');
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const mysql = require('mysql');
const connectionMysql =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Assword2121#',
    database:'DemgamesDb',
    multipleStatements: true
});

connectionMysql.connect(function(err){
    if(err){
      console.error('error connection*******'+err.stack);
      return;
    }
    console.log('connected as id '+connectionMysql.threadId);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "Application/JSON");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/api/game', (req, res) => {
	if (!gameData) res.status(404).send('No data found');
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.json({ gameData });
});

//Post player updates on mysql db
app.post('/updateplayer', (req, res) => {
    var data=req.body;
    console.log(data);
    const d= new moment('2019-04-30T20:13:00.000Z');
    const s=d.format('YYYY-MM-DD');
    
    const sqlUpdateStatement='update players set dateofbirth="'+s+'", firstname="'+req.body.given_name+'", middlename="'+req.body.middle_name+'", lastname="'+req.body.family_name+'", username="'+req.body.username+
    '", gender="'+req.body.gender+'", country="'+req.body.country+'", city="'+req.body.city+'", program="'+req.body.program+'" where id = "'+req.body.player_id+'"';
   
    console.log(sqlUpdateStatement);
    connectionMysql.query(sqlUpdateStatement, function (err, result, fields) {
          if (err) throw err;
          console.log(sqlUpdateStatement);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message); 
          res.send(JSON.stringify(200));              
    });      
});

  //Get players from mysql db
app.get('/users',(req,res)=>{
    connectionMysql.query('select * from Players',(err, data, fields)=>{
      if(err){ 
        console.log("Not Successful access");
      }else{
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(data));
      }    
    }) 
});

app.listen(9000, () => console.log('listening'));
