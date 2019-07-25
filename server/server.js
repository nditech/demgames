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
    
    const d= new moment(data.dateofBirth);
    const s=d.format('YYYY-MM-DD');
    
    const sqlUpdateStatement='update Players set dateofbirth="'+s+'", firstname="'+req.body.given_name+'", middlename="'+req.body.middle_name+'", lastname="'+req.body.family_name+'", username="'+req.body.username+
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


//Get specific player profile from mysql db
app.post('/selectPlayerProfile',(req, res)=>{
    
    const snd=req.body;    
    if(snd.email===null)
      res.send(300);
    else if(snd.email==='null')
      res.send(300);
    else if(snd.email==='')
      res.send(300)
    else
    {
        console.log(snd); 
        console.log(snd.email);
        console.log(snd.username);
        console.log(snd.given_name);
        console.log(snd.family_name);
        console.log(snd.gender);

        if((snd.given_name===null)||(snd.given_name==='undefined'))
            snd.given_name='';

        if((snd.family_name===null)||(snd.family_name==='undefined'))
            snd.family_name='';

        if((snd.username===null)||(snd.username==='undefined'))
            snd.username='';
        
        if((snd.gender===null)||(snd.gender==='undefined'))
            snd.gender='';
            
        const sqlS="select * from Plays inner join Players on Plays.player_id=Players.id where Players.email='"+snd.email+"'";              
        console.log(sqlS);      
        connectionMysql.query(sqlS,(err, data, fields)=>
        {
            if(err){ 
              console.log("Not Successful access");        
              console.log(err);
            }
            else
            {
              //console.log("Now successful");
              
              if(data.length>0)
              {  
                console.log('Yes data is found');
                console.log(data[0].id);
                console.log(data[0].email);
                console.log(data[0]);
                res.send( JSON.stringify(data));
              }
              else
              {
                console.log("Executed but not found reply")
                const d= new moment('2019-04-30T20:13:00.000Z');
                const s=d.format('YYYY-MM-DD');
                //console.log(snd);
                  
                const sqlInsertStatement="insert into Players (`firstname`,`lastname`, `username`, `gender`, `dateofbirth`, `country`, `city`, `program`, `email`) values ('"+snd.given_name+"','"+snd.family_name+"','"+snd.username+"','"+snd.gender+"','"+s+"','','','','"+snd.email+"')";
                
                console.log(sqlInsertStatement);
                
                connectionMysql.query(sqlInsertStatement, function (err, result, fields) {
                    
                    if (err) throw err;
                    console.log(snd.email);
                    console.log(result.insertId);
                    console.log("Number of rows affected : " + result.affectedRows);
                    console.log("Number of records affected with warning : " + result.warningCount);
                    console.log("Message from MySQL Server : " + result.message);   
                    
                    const sqlS="select * from Plays where player_id ='"+result.insertId+"'";  
                    
                    connectionMysql.query(sqlS,(err, datanew, fields)=>
                    {
                      if(err)
                      { 
                          console.log("Not Successful access");        
                      }
                      else
                      {    
                          console.log( JSON.stringify(datanew));                 
                          const comb=Object.assign(snd, datanew[0]);
                          console.log(comb)
                          res.send( JSON.stringify(comb));            
                      }
                    });
                              
                })
              }
              
            }
          })
        
    }
});


app.listen(9000, () => console.log('listening'));
