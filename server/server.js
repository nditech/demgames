const gameData = require('../data/Module/moduleData.json');
const express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');
// models
const models = require('./models');
const players = models.Players;
const questions = models.Questions;
const games = models.Games;
const choices = models.Choices;
// JWT
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

var bodyParser = require('body-parser');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: 'https://pankaj-hashedin.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'https://pankaj-hashedin.auth0.com/api/v2/',
  issuer: 'https://pankaj-hashedin.auth0.com/',
  algorithms: ['RS256']
});

// app.use(checkJwt);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));
app.use(function (req, res, next) {
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

// @route   POST /updateplayer
// @desc    Post player updates
app.post('/updateplayer', (req, res) => {

  // var data=req.body;
  // console.log(data);

  // const d= new moment(data.dateOfBirth);
  // const s=d.format('YYYY-MM-DD');

  // const sqlUpdateStatement='update Players set dateofbirth="'+s+'", firstname="'+req.body.given_name+'", middlename="'+req.body.middle_name+'", lastname="'+req.body.family_name+'", username="'+req.body.username+
  // '", gender="'+req.body.gender+'", country="'+req.body.country+'", city="'+req.body.city+'", program="'+req.body.program+'" where id = "'+req.body.player_id+'"';

  // console.log(sqlUpdateStatement);

  // connectionMysql.query(sqlUpdateStatement, function (err, result, fields) {
  //       if (err) throw err;
  //       console.log(sqlUpdateStatement);
  //       console.log("Number of rows affected : " + result.affectedRows);
  //       console.log("Number of records affected with warning : " + result.warningCount);
  //       console.log("Message from MySQL Server : " + result.message); 
  //       res.send(JSON.stringify(data));              
  // });


});

// @route   GET /users
// @desc    Get players list from db
app.get('/users', (req, res) => {
  console.log("GET /users ----api")
  players.findAll().then(result => {
    res.send(JSON.stringify(result));
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
});


//Get specific player profile from mysql db
app.post('/selectPlayerProfile', (req, res) => {

  // const snd=req.body;    
  // if(snd.email===null)
  //   res.send(300);
  // else if(snd.email==='null')
  //   res.send(300);
  // else if(snd.email==='')
  //   res.send(300)
  // else
  // {
  //     console.log(snd); 
  //     console.log(snd.email);
  //     console.log(snd.username);
  //     console.log(snd.given_name);
  //     console.log(snd.family_name);
  //     console.log(snd.gender);

  //     if((snd.given_name===null)||(snd.given_name==='undefined'))
  //         snd.given_name='';

  //     if((snd.family_name===null)||(snd.family_name==='undefined'))
  //         snd.family_name='';

  //     if((snd.username===null)||(snd.username==='undefined'))
  //         snd.username='';

  //     if((snd.gender===null)||(snd.gender==='undefined'))
  //         snd.gender='';

  //     const sqlS="select * from Plays inner join Players on Plays.player_id=Players.id where Players.email='"+snd.email+"'";              
  //     console.log(sqlS);      
  //     connectionMysql.query(sqlS,(err, data, fields)=>
  //     {
  //         if(err){ 
  //           console.log("Not Successful access");        
  //           console.log(err);
  //         }
  //         else
  //         {
  //           //console.log("Now successful");

  //           if(data.length>0)
  //           {  
  //             console.log('Yes data is found');
  //             console.log(data[0].id);
  //             console.log(data[0].email);
  //             console.log(data[0]);
  //             res.send( JSON.stringify(data));
  //           }
  //           else
  //           {
  //             console.log("Executed but not found reply")

  //             const d= new moment(data.dateOfBirth);
  //             const s=d.format('YYYY-MM-DD');

  //             const sqlInsertStatement="insert into Players (`firstname`,`lastname`, `username`, `gender`, `dateofbirth`, `country`, `city`, `program`, `email`) values ('"+snd.given_name+"','"+snd.family_name+"','"+snd.username+"','"+snd.gender+"','"+s+"','','','','"+snd.email+"')";

  //             console.log(sqlInsertStatement);

  //             connectionMysql.query(sqlInsertStatement, function (err, result, fields) {

  //                 if (err) throw err;
  //                 console.log(snd.email);
  //                 console.log(result.insertId);
  //                 console.log("Number of rows affected : " + result.affectedRows);
  //                 console.log("Number of records affected with warning : " + result.warningCount);
  //                 console.log("Message from MySQL Server : " + result.message);   

  //                 const sqlS="select * from Plays where player_id ='"+result.insertId+"'";  

  //                 connectionMysql.query(sqlS,(err, datanew, fields)=>
  //                 {
  //                   if(err)
  //                   { 
  //                       console.log("Not Successful access");        
  //                   }
  //                   else
  //                   {    
  //                       console.log( JSON.stringify(datanew));                 
  //                       const comb=Object.assign(snd, datanew[0]);
  //                       console.log(comb)
  //                       res.send( JSON.stringify(comb));            
  //                   }
  //                 });

  //             })
  //           }

  //         }
  //       })
  // }

});

// @route   POST /registerplayer
// @desc    Create a new player
app.post(   
  '/registerplayer',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('userName', 'Username is required').isLength({ min: 3 })
  ],

  async (req, res) => {

    console.log('POST /registerplayer  -------api');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, middleName, lastName, userName, email, dateOfBirth, gender, country, city, program } = req.body;

    try {
      let user = await players.findOne({ where: { username: userName } });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      await players.create({
        firstname: firstName,
        middlename: middleName,
        lastname: lastName,
        username: userName,
        email: email,
        dateofbirth: dateOfBirth,
        gender: gender,
        country: country,
        city: city,
        program: program
      });

      res.send('Player Registered');

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

// @route   POST /registergame
// @desc    Create a new game
app.post('/registergame', async (req, res) => {

  console.log('POST /registergame  -------api');

    const { caption, gamedescription, gametype} = req.body;

    try {
      
      await games.create({
        caption: caption,
        gamedescription: gamedescription,
        gametype: gametype
      });

      res.send({message:'game successfully added'});


    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Server Error'});
    }
});

// @route   GET /listchoices
// @desc    Get list of all choices from db
app.get('/listchoices', (req, res) => {

  console.log("GET /listchoices ")
  choices.findAll().then(result => {
    res.send(JSON.stringify(result));
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
  // res.set('Content-Type', 'application/json');     
  //    connectionMysql.query('select * from Choices',(err, data, fields)=>{
  //      if(err){ 
  //        console.log("Not Successful access to games");
  //      }else{
  //        console.log(JSON.stringify(data));
  //        res.send(JSON.stringify(data));
  //      }     
  //  })
})

// @route   GET /listgames
// @desc    Get list of all games from db
app.get('/listgames', (req, res) => {
  console.log("GET /listgames -----api")
  games.findAll().then(result => {
    res.send(JSON.stringify(result));
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
});

// @route   POST /addchoice
// @desc    Post choices on db
app.post('/addchoice', async (req, res) => {

  console.log('POST /addchoice  -------api');

    const { choicedescription, choicestatement, isanswer, questionid, weight} = req.body;

    try {
      
      await choices.create({
        choicedescription: choicedescription,
        choicestatement: choicestatement,
        answer: isanswer,
        questionid: questionid,
        weight: weight
      });

      res.send({message:'choice successfully added'});


    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Server Error'});
    }

  //   var data=req.body;
  //   console.log(data);

  //   var data={
  //           questionid: req.body.questions[0].id,
  //           choicedescription: req.body.choicedescription,
  //           answer: req.body.isanswer,
  //           choicestatement: req.body.choicestatement,
  //           weight:req.body.weight 
  //   }

  //   console.log(data);
  //   /*
  //   const sqlS="select * from Choices where id ='"+data.id+"'";                    
  //   connectionMysql.query(sqlS,(err, datanew, fields)=>
  //   {
  //         if(err)
  //         { 
  //               console.log("Not Successful access");        
  //         }
  //         else
  //         {    
  //           if(datanew.length<1)
  //           {
  //  */ 
  //               const sqlInsertStatement='insert into Choices SET ?';
  //               connectionMysql.query(sqlInsertStatement, [data], function (err, result, fields) {
  //               if (err) throw err;
  //                 console.log(data);
  //                 console.log("Number of rows affected : " + result.affectedRows);
  //                 console.log("Number of records affected with warning : " + result.warningCount);
  //                 console.log("Message from MySQL Server : " + result.message);              
  //                 res.send({message:'The choice detail is successfully added'});
  //               }); 
  //  /*         }
  //           else
  //           {
  //               res.send({message:'This choice id already exists'})
  //           }                
  //         }
  //   });
  //   */                     
});

// @route   POST /addquestion
// @desc    Add a new question to db
app.post('/addquestion',
  [
    check('question_statement', 'Question statement is required').not().isEmpty()
  ],

  async (req, res) => {
  
    console.log('POST /addquestion -- api')
    var data=req.body;
    console.log(data);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {difficulty_level, explanation, gameid, gametype, isitmedia, question_statement, weight} = req.body;

    try {
      
      await questions.create({
        game_id: gameid,
        difficulty_level: difficulty_level,
        question_statement: question_statement,
        weight: weight,
        explanation: explanation,
        isitmedia: isitmedia 
      });
      
      res.send({message:'question successfully added'});

  } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Server Error'});
  }               
});

// @route   GET /listquestions
// @desc    Get list of all questions from db

app.get('/listquestions', (req, res) => {
  console.log("GET /listquestions ")
  questions.findAll().then(result => {
    res.send(JSON.stringify(result));
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
});

// @route   POST /deleteplayer
// @desc    Delete existing player from db
app.post('/deleteplayer', (req, res) => {
  // var data=req.body;
  // console.log(data);

  // if((data.email===null)||(data.username===null)||(data.id===null))
  //     res.sendStatus(JSON.stringify({message:"Missing email or id or username"}));
  // else if((data.email==='undefined')||(data.username==='undefined')||(data.id==='undefined'))
  //     res.sendStatus(JSON.stringify({message:"Missing email or id or username"}));
  // else if((data.email==='')||(data.username==='')||(data.id===''))
  //     res.sendStatus(JSON.stringify({message:"Missing email or id or username"}));
  // else
  // {
  //         const sqlDeleteStatement='Delete from Players where id="'+req.body.player_id+'" or email="'+req.body.email+'"';

  //         console.log(sqlDeleteStatement);

  //         connectionMysql.query(sqlDeleteStatement, function (err, result, fields) {
  //               if (err) throw err;
  //               console.log(sqlDeleteStatement);
  //               console.log("Number of rows affected : " + result.affectedRows);
  //               console.log("Number of records affected with warning : " + result.warningCount);
  //               console.log("Message from MySQL Server : " + result.message);
  //               res.status(200).send({message:'The player is now deleted successfully'});               
  //         });
  // }
});

// @route   POST /deletechoice
// @desc    Delete choice from db
app.post('/deletechoice', (req, res) => {
  // var data=req.body;
  // console.log(data);
  // const sqlDeleteStatement='Delete from Choices where id="'+req.body.id+'"';
  // connectionMysql.query(sqlDeleteStatement, function (err, result, fields) {
  //       if (err) throw err;
  //       console.log(sqlDeleteStatement);
  //       console.log("Number of rows affected : " + result.affectedRows);
  //       console.log("Number of records affected with warning : " + result.warningCount);
  //       console.log("Message from MySQL Server : " + result.message); 
  //       res.status(200).send({message:'The choice is now deleted successfully'});              
  // });      
});

// @route   POST /deletequestion
// @desc    Delete question from db
app.post('/deletequestion', (req, res) => {
  // var data=req.body;
  // console.log(data);
  // const sqlDeleteStatement='Delete from Questions where id="'+req.body.id+'"';
  // connectionMysql.query(sqlDeleteStatement, function (err, result, fields) {
  //       if (err) throw err;
  //       console.log(sqlDeleteStatement);
  //       console.log("Number of rows affected : " + result.affectedRows);
  //       console.log("Number of records affected with warning : " + result.warningCount);
  //       console.log("Message from MySQL Server : " + result.message); 
  //       res.status(200).send({message:'The question is now deleted successfully'});              
  // });      
});

// @route   POST /selectProfileforDel
// @desc    Delete a specific players profile
app.post('/selectProfileforDel', (req, res) => {

  // const snd=req.body;    
  // if(snd.email===null)
  //   res.sendStatus(300);
  // else if(snd.email==='null')
  //   res.sendStatus(300);
  // else if(snd.email==='')
  //   res.sendStatus(300)
  // else
  // {
  //     console.log(snd); 
  //     console.log(snd.email);
  //     console.log(snd.username);
  //     console.log(snd.given_name);
  //     console.log(snd.family_name);
  //     console.log(snd.gender);

  //     if((snd.given_name===null)||(snd.given_name==='undefined'))
  //         snd.given_name='';

  //     if((snd.family_name===null)||(snd.family_name==='undefined'))
  //         snd.family_name='';

  //     if((snd.username===null)||(snd.username==='undefined'))
  //         snd.username='';

  //     if((snd.gender===null)||(snd.gender==='undefined'))
  //         snd.gender='';

  //     const sqlS="select * from Players where email='"+snd.email+"' or id='"+snd.player_id+"' or username='"+snd.username+"'";              
  //     console.log(sqlS);      
  //     connectionMysql.query(sqlS,(err, data, fields)=>
  //     {
  //         if(err){ 
  //             console.log("Not Successful access");        
  //             console.log(err);
  //         }
  //         else
  //         {
  //           //console.log("Now successful");
  //             if(data.length>0)
  //             {  
  //                 console.log('Yes data is found');
  //                 console.log(data[0].id);
  //                 console.log(data[0].email);
  //                 console.log(data[0]);
  //                 res.send( JSON.stringify(data));
  //             }
  //             else
  //             {
  //                 console.log("Email not found")
  //                 res.send(JSON.stringify({message:"Not found"}));                        
  //             }
  //         }
  //     })    
  // }
});

// @route   GET /selectGameforDel
// @desc    Get specific game from db
app.post('/selectGameforDel', (req, res) => {

  // const snd=req.body;    
  // if(snd.questionid===null)
  //   res.sendStatus(300);
  // else if(snd.questionid==='null')
  //   res.sendStatus(300);
  // else if(snd.questionid==='')
  //   res.sendStatus(300)
  // else
  // {
  //     console.log(snd); 

  //     const sqlS="select * from Games where id='"+snd.id+"'";              
  //     console.log(sqlS);      
  //     connectionMysql.query(sqlS,(err, data, fields)=>
  //     {
  //         if(err){ 
  //             console.log("Not Successful access");        
  //             console.log(err);
  //         }
  //         else
  //         {
  //           //console.log("Now successful");
  //             if(data.length>0)
  //             {  
  //                 console.log('Yes data is found');
  //                 console.log(data[0].id);
  //                 console.log(data[0].email);
  //                 console.log(data[0]);
  //                 res.status(200).send( JSON.stringify(data));
  //             }
  //             else
  //             {
  //                 console.log(data);
  //                 console.log("Id given is not found")
  //                 res.status(200).send(JSON.stringify({message:"Not found"}));                        
  //             }
  //         }
  //     })    
  // }
});


// @route   POST /selectChoiceforDel
// @desc    Get specific choice from db
app.post('/selectChoiceforDel', (req, res) => {

  // const snd=req.body;    
  // if(snd.questionid===null)
  //   res.sendStatus(300);
  // else if(snd.questionid==='null')
  //   res.sendStatus(300);
  // else if(snd.questionid==='')
  //   res.sendStatus(300)
  // else
  // {
  //     console.log(snd); 

  //     const sqlS="select * from Choices where id='"+snd.id+"'";              
  //     console.log(sqlS);      
  //     connectionMysql.query(sqlS,(err, data, fields)=>
  //     {
  //         if(err){ 
  //             console.log("Not Successful access");        
  //             console.log(err);
  //         }
  //         else
  //         {
  //           //console.log("Now successful");
  //             if(data.length>0)
  //             {  
  //                 console.log('Yes data is found');
  //                 console.log(data[0].id);
  //                 console.log(data[0].email);
  //                 console.log(data[0]);
  //                 res.send( JSON.stringify(data));
  //             }
  //             else
  //             {
  //                 console.log(data);
  //                 console.log("Id given is not found")
  //                 res.send(JSON.stringify({message:"Not found"}));                        
  //             }
  //         }
  //     })    
  // }
});

// @route   POST /registerplayer
// @desc    Get specific question from db
app.post('/selectQuestionforDel', (req, res) => {

  // const snd=req.body;    
  // if(snd.questionid===null)
  //   res.sendStatus(300);
  // else if(snd.questionid==='null')
  //   res.sendStatus(300);
  // else if(snd.questionid==='')
  //   res.sendStatus(300)
  // else
  // {
  //     console.log(snd); 

  //     const sqlS="select * from Questions where id='"+snd.id+"'";              
  //     console.log(sqlS);      
  //     connectionMysql.query(sqlS,(err, data, fields)=>
  //     {
  //         if(err){ 
  //             console.log("Not Successful access");        
  //             console.log(err);
  //         }
  //         else
  //         {
  //           //console.log("Now successful");
  //             if(data.length>0)
  //             {  
  //                 console.log('Yes data is found');
  //                 console.log(data[0].id);
  //                 console.log(data[0].email);
  //                 console.log(data[0]);
  //                 res.send( JSON.stringify(data));
  //             }
  //             else
  //             {
  //                 console.log(data);
  //                 console.log("Id given is not found")
  //                 res.send(JSON.stringify({message:"Not found"}));                        
  //             }
  //         }
  //     })    
  // }
});

// @route   POST /updateGame
// @desc    Update games
app.post('/updateGame', (req, res) => {
  //  console.log(req.body);
  //  const sqlUpdateStatement='update Games set caption="'+req.body.caption+'", gamedescription="'+req.body.gamedescription+'", gametype="'+req.body.gametype+'" where id = "'+req.body.id+'"';

  //          console.log(sqlUpdateStatement);
  //          connectionMysql.query(sqlUpdateStatement, function (err, result, fields) {
  //             if (err) throw err;
  //             console.log(sqlUpdateStatement);
  //             console.log("Number of rows affected : " + result.affectedRows);
  //             console.log("Number of records affected with warning : " + result.warningCount);
  //             console.log("Message from MySQL Server : " + result.message); 
  //             res.status(200).send({message:'updated successfully'});              
  //            }); 
})

// @route   POST /updatechoice
// @desc    Update game choice
app.post('/updatechoice', (req, res) => {
  // console.log(req.body);
  // const sqlUpdateStatement='update Choices set questionid="'+req.body.questionid+'", choicestatement="'+req.body.choicestatement+'", choicedescription="'+req.body.choicedescription+'", weight="'+req.body.weight+'", answer="'+req.body.weight+'" where id = "'+req.body.id+'"';

  //         console.log(sqlUpdateStatement);
  //         connectionMysql.query(sqlUpdateStatement, function (err, result, fields) {
  //            if (err) throw err;
  //            console.log(sqlUpdateStatement);
  //            console.log("Number of rows affected : " + result.affectedRows);
  //            console.log("Number of records affected with warning : " + result.warningCount);
  //            console.log("Message from MySQL Server : " + result.message); 
  //            res.status(200).send({message:'updated successfully'});              
  //           }); 
})

app.listen(9000, () => console.log('listening'));