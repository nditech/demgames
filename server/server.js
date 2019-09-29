const _ = require("underscore");
const gameData = require("../data/Module/moduleData.json");
const express = require("express");
const app = express();
const { check, validationResult } = require("express-validator");
// models
const models = require("./models");
const players = models.Players;
const questions = models.Questions;
const games = models.Games;
const choices = models.Choices;
const cohort_game = models.Cohort_Game;
const cohort_question = models.Cohort_Question;
const cohort = models.Cohorts;
const plays = models.Plays;
// JWT
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const db = require("./models/index");

var bodyParser = require("body-parser");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: "https://pankaj-hashedin.auth0.com/.well-known/jwks.json"
  }),

  // Validate the audience and the issuer.
  audience: "https://pankaj-hashedin.auth0.com/api/v2/",
  issuer: "https://pankaj-hashedin.auth0.com/",
  algorithms: ["RS256"]
});

// app.use(checkJwt);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw({ inflate: true, limit: "100kb", type: "text/xml" }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "Application/JSON");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/api/game", async (req, res) => {
  if (!gameData) res.status(404).send("No data found");

  console.log("GET /api/game -----api");

  try {
    //   const gameData = [];

    //   const gameList = await games.findAll({
    //     include: [
    //       {
    //         model: questions,
    //         include: [
    //           {
    //             model: choices
    //           }
    //         ]
    //       }
    //     ]
    //   });

    //   if (!gameList) {
    //     return res.status(400).send("No data found!");
    //   }

    //   gameList.forEach(async element => {
    //     let gameObj = {};
    //     let questions = element.Questions;
    //     gameObj.id = element.id;
    //     gameObj.name = element.caption;
    //     gameObj.type = element.gametype;
    //     gameObj.style = "blue";

    //     let diffLevelGroup = _.groupBy(questions, function(value) {
    //       return value.difficulty_level;
    //     });

    //     for (let i in diffLevelGroup) {
    //       let quesArr = [];
    //       group.forEach(function(ques) {
    //         // Find the collection of correct answer(s)
    //         let options = ques.Choices;
    //         let answerArr = [];
    //         options.forEach(function(option, index) {
    //           if (option.answer === 1) {
    //             answerArr.push(index);
    //           }
    //         });

    //         quesArr.push({
    //           id: ques.id,
    //           question: ques.question_statement,
    //           options: ques.Choices.map(option => option.choicestatement),
    //           correct_answer: answerArr
    //         });
    //       });
    //     }

    //     console.log("game LIST------START-------> ");
    //     console.log(JSON.stringify(diffLevelGroup));
    //     console.log("game LIST-------------> ");

    //     let data = _.map(diffLevelGroup, function(group, index) {
    //       //     console.log('game LIST------group-------> ');
    //       // console.log(JSON.stringify(group));
    //       // console.log('game LIST-------------> ');

    //       let quesArr = [];
    //       group.forEach(function(ques) {
    //         // Find the collection of correct answer(s)
    //         let options = ques.Choices;
    //         let answerArr = [];
    //         options.forEach(function(option, index) {
    //           if (option.answer === 1) {
    //             answerArr.push(index);
    //           }
    //         });

    //         quesArr.push({
    //           id: ques.id,
    //           question: ques.question_statement,
    //           options: ques.Choices.map(option => option.choicestatement),
    //           correct_answer: answerArr
    //         });
    //       });

    //       // Choices Array

    //       return {
    //         id: parseInt(index),
    //         desc: element.gamedescription,
    //         linked_level: group[0].difficulty_level,
    //         questions: quesArr
    //       };
    //     });

    // //       });

    //     gameData.push(gameObj);
    //   });
    // console.log('game LIST------START-------> ');
    // console.log(JSON.stringify(gameData));
    // console.log('game LIST-------------> ');

    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET");
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    res.json({ gameData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
  // games.findAll().then(result => {
  //   res.send(JSON.stringify(result));
  //   console.log(result);
  // }).catch(err => {
  //   console.log(err);
  // });
});

app.get("/listcohort_game", (req, res) => {
  console.log("GET /listcohort_game -----api ---called");
  cohort_game
    .findAll()
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Server Error");
    });
});

app.get("/listcohort_question", (req, res) => {
  console.log("GET /listcohort_question -----api ---called");
  cohort_question
    .findAll()
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.error(error.message);
      res.status(500).send("Server Error");
    });
});

app.post(
  "/linkcohort_game",
  [
    check("game_id", "question id is required").isNumeric(),
    check("cohort_id", "cohort id is required").isNumeric()
  ],
  async (req, res) => {
    console.log("POST /linkcohort_game -----api ---called");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { game_id, cohort_id } = req.body;

    try {
      let cohortToGame = await cohort_game.findOne({
        where: { game_id: game_id, cohort_id: cohort_id }
      });

      if (cohortToGame) {
        return res
          .status(400)
          .json({ errors: [{ msg: "cohort to game mapping already exists" }] });
      }

      await cohort_game.create({
        game_id: game_id,
        cohort_id: cohort_id
      });
      res.send("cohort to game linked");
      console.log("cohort to game linked successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

app.post(
  "/linkcohort_question",
  [
    check("question_id", "question id is required").isNumeric(),
    check("cohort_id", "cohort id is required").isNumeric()
  ],
  async (req, res) => {
    console.log("POST /linkcohort_question -----api ---called");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question_id, cohort_id } = req.body;
    try {
      let cohortToQuestion = await cohort_question.findOne({
        where: { question_id: question_id, cohort_id: cohort_id }
      });

      if (cohortToQuestion) {
        return res.status(400).json({
          errors: [{ msg: "cohort to question mapping already exists" }]
        });
      }
      await cohort_question.create({
        question_id: question_id,
        cohort_id: cohort_id
      });
      res.send("cohort to question linked");
      console.log("cohort to question linked successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST /updateplayer
// @desc    Post player updates
app.post("/updateplayer", (req, res) => {
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
app.get("/users", (req, res) => {
  console.log("GET /users ----api");
  players
    .findAll()
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//Get specific player profile from mysql db
app.post("/selectPlayerProfile", (req, res) => {
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
  "/registerplayer",
  [
    check("firstName", "First Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check("userName", "Username is required").isLength({ min: 3 })
  ],

  async (req, res) => {
    console.log("POST /registerplayer  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      middleName,
      lastName,
      userName,
      email,
      dateOfBirth,
      gender,
      country,
      city,
      program
    } = req.body;

    try {
      let user = await players.findOne({ where: { email: email } });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
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

      res.send("Player Registered");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST /registergame
// @desc    Create a new game
app.post("/registergame", async (req, res) => {
  console.log("POST /registergame  -------api");

  const { caption, gamedescription, gametype } = req.body;

  try {
    await games.create({
      caption: caption,
      gamedescription: gamedescription,
      gametype: gametype
    });

    res.send({ message: "game successfully added" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Server Error" });
  }
});

// @route   GET /listchoices
// @desc    Get list of all choices from db
app.get("/listchoices", (req, res) => {
  console.log("GET /listchoices ");
  choices
    .findAll()
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
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
});

// @route   GET /listgames
// @desc    Get list of all games from db
app.get("/listgames", (req, res) => {
  console.log("GET /listgames -----api");
  games
    .findAll()
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// @route   POST /addchoice
// @desc    Post choices on db
app.post("/addchoice", async (req, res) => {
  console.log("POST /addchoice  -------api");

  const {
    choicedescription,
    choicestatement,
    isanswer,
    questionid,
    weight
  } = req.body;

  try {
    await choices.create({
      choicedescription: choicedescription,
      choicestatement: choicestatement,
      answer: isanswer,
      questionid: questionid,
      weight: weight
    });

    res.send({ message: "choice successfully added" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Server Error" });
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

// @route   GET /listquestions/:game_id
// @desc    Get list of all questions from db

app.get("/listquestions/:gameid", (req, res) => {
  console.log("GET /listquestions/:gameid ");
  if (!req.params.gameid) {
    return res.status(404).json({ msg: "Game Id not found" });
  }
  questions
    .findAll({
      where: { game_id: req.params.gameid }
    })
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// @route   GET /choices/:questionid
// @desc    Get list of all questions from db

app.get("/choices/:questionid", (req, res) => {
  console.log("GET /choices/:questionid ");
  if (!req.params.questionid) {
    return res.status(404).json({ msg: "Game Id not found" });
  }
  choices
    .findAll({
      where: { questionid: req.params.questionid }
    })
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// @route   GET /choices/:questionid
// @desc    Get the choice linking to a question

app.get("/choiceLinkingQuestion/:questionid", (req, res) => {
  console.log("GET /choices/:questionid ");
  if (!req.params.questionid) {
    return res.status(404).json({ msg: "Game Id not found" });
  }
  choices
    .findAll({
      where: { linked_question: req.params.questionid }
    })
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// @route   DELETE api/questions/:id
// @desc    Delete a question by ID
// @access  Private
app.post("/questions/:id", async (req, res) => {
  try {
    const question = await questions.findByPk(req.params.id);

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

    await questions.destroy({ where: { id: req.params.id } });
    res.json({ msg: "Question removed" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/addquestion
// @desc    Add a new question
// @access  Private
app.post("/addquestion", async (req, res) => {
  const data = req.body.data;

  try {
    const question = await questions.create({
      game_id: data.game_id,
      difficulty_level: data.level,
      question_statement: data.question,
      weight: 0,
      explanation: "explanation",
      isitmedia: 0
    });

    if (data.previous_question_choice) {
      console.log("inside previous question");
      const updateChoice = await choices.update(
        { linked_question: question.id },
        {
          where: { id: data.previous_question_choice }
        }
      );
      console.log("updated linked questions", updateChoice);
      data.options.map(async choice => {
        await choices.create({
          choicedescription: "",
          choicestatement: choice.value,
          answer: 0,
          questionid: question.id,
          weight: 0
        });
      });
      console.log("updated opitons --------------------");
    } else {
      // Add choices
      console.log("inside else");
      data.options.map(async choice => {
        let isAnswer =
          choice.option.toString() === data.answers.toString() ? 1 : 0;
        await choices.create({
          choicedescription: "",
          choicestatement: choice.value,
          answer: isAnswer,
          questionid: question.id,
          weight: 0
        });
      });
    }

    res.json({ msg: "Question Added Successfully" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/updatequestion/
// @desc    Update a question by ID
// @access  Private
app.post("/updatequestion", async (req, res) => {
  const data = req.body.data;
  const id = req.body.id;
  // console.log(data);
  // console.log(id);
  try {
    const question = await questions.findByPk(id);

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

    await questions.update(
      { question_statement: data.question },
      {
        where: { id: id }
      }
    );

    // Update choices
    await choices.destroy({ where: { questionid: id } });
    data.options.map(async choice => {
      let isAnswer = 0;
      if (data.previous_question_choice) {
        isAnswer = 0;
      } else {
        isAnswer = choice.option.toString() === data.answers.toString() ? 1 : 0;
      }

      await choices.create({
        choicedescription: "",
        choicestatement: choice.value,
        answer: isAnswer,
        questionid: id,
        weight: 0
      });
    });

    res.json({ msg: "Question Updated" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST /deleteplayer
// @desc    Delete existing player from db
app.post("/deleteplayer", (req, res) => {
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
app.post("/deletechoice", (req, res) => {
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
app.post("/deletequestion", (req, res) => {
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
app.post("/selectProfileforDel", (req, res) => {
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
app.post("/selectGameforDel", (req, res) => {
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
app.post("/selectChoiceforDel", (req, res) => {
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
app.post("/selectQuestionforDel", (req, res) => {
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

// @route   POST /updatechoice
// @desc    Update game choice
app.post("/updatechoice", (req, res) => {
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
});

app.get("/listCohort", (req, res) => {
  console.log("GET /listCohort -----api ---called");
  cohort
    .findAll()
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Server Error");
    });
});

app.get("/listcohort_game", (req, res) => {
  console.log("GET /listcohort_game -----api ---called");
  cohort_game
    .findAll()
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Server Error");
    });
});

app.get("/listcohort_question", (req, res) => {
  console.log("GET /listcohort_question -----api ---called");
  cohort_question
    .findAll()
    .then(result => {
      res.send(JSON.stringify(result));
      console.log(result);
    })
    .catch(err => {
      console.error(error.message);
      res.status(500).send("Server Error");
    });
});

app.post(
  "/linkcohort_game",
  [
    check("game_id", "question id is required").isNumeric(),
    check("cohort_id", "cohort id is required").isNumeric()
  ],
  async (req, res) => {
    console.log("POST /linkcohort_game -----api ---called");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { game_id, cohort_id } = req.body;

    try {
      let cohortToGame = await cohort_game.findOne({
        where: { game_id: game_id, cohort_id: cohort_id }
      });

      if (cohortToGame) {
        return res
          .status(400)
          .json({ errors: [{ msg: "cohort to game mapping already exists" }] });
      }

      await cohort_game.create({
        game_id: game_id,
        cohort_id: cohort_id
      });
      res.send("cohort to game linked");
      console.log("cohort to game linked successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

app.post(
  "/linkcohort_question",
  [
    check("question_id", "question id is required").isNumeric(),
    check("cohort_id", "cohort id is required").isNumeric()
  ],
  async (req, res) => {
    console.log("POST /linkcohort_question -----api ---called");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question_id, cohort_id } = req.body;
    try {
      let cohortToQuestion = await cohort_question.findOne({
        where: { question_id: question_id, cohort_id: cohort_id }
      });

      if (cohortToQuestion) {
        return res.status(400).json({
          errors: [{ msg: "cohort to question mapping already exists" }]
        });
      }
      await cohort_question.create({
        question_id: question_id,
        cohort_id: cohort_id
      });
      res.send("cohort to question linked");
      console.log("cohort to question linked successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST /duplicatGame
// @desc    Duplicate selected game
app.post(
  "/duplicatGame",
  [check("game_id", "Game id is required").isNumeric()],

  async (req, res) => {
    console.log("POST /duplicatGame -- api");
    var data = req.body;
    console.log(data);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { game_id } = req.body;

    // Find game based on game_id and throw error if not exist
    try {
      let originalGame = await games.findOne({ where: { id: game_id } });

      if (!originalGame) {
        return res
          .status(400)
          .json({ errors: [{ msg: "game doesn't exists" }] });
      }

      // Find all questions based on game_id and throw error if not exist
      let questionList = await questions.findAll({
        where: { game_id: originalGame.id },
        raw: true
      });

      let questionIdList = questionList.map(item => {
        let test = item.id;
        return test;
      });

      console.log(JSON.stringify(questionIdList));

      let choiceList = await choices.findAll({
        where: { questionid: questionIdList },
        raw: true
      });

      console.log(JSON.stringify(choiceList));

      //   res.send('game and questions finded');

      let transaction;

      try {
        // get transaction
        transaction = await db.sequelize.transaction();

        // step 1 - create new game
        let newGame = await games.create(
          {
            caption: originalGame.caption,
            gamedescription: originalGame.gamedescription,
            gametype: originalGame.gametype
          },
          { transaction },
          { raw: true }
        );

        console.log("newGame created successfully ---VVV  \n\n\n");
        console.log(JSON.stringify(newGame));

        // step 2 - create questions and choices from old question

        for (const temp of questionList) {
          let newQuestion = await questions.create(
            {
              game_id: newGame.id,
              difficulty_level: temp.difficulty_level,
              question_statement: temp.question_statement,
              weight: temp.weight,
              explanation: temp.explanation,
              isitmedia: temp.isitmedia
            },
            { transaction }
          );

          console.log("\n\n\n  New Question created successfully ---");
          console.log(JSON.stringify(newQuestion));

          let oldchoices = await choices.findAll({
            where: { questionid: temp.id },
            raw: true
          });

          oldchoices.map(choice => {
            delete choice.id;
            delete choice.QuestionId;
            choice.questionid = newQuestion.id;
          });

          console.log("\n NEW choices for bulkCreate --- ");
          console.log(JSON.stringify(oldchoices));

          let newInsertedChoices = await choices.bulkCreate(
            oldchoices,
            { transaction },
            { raw: true }
          );
          console.log("\n\n\n New Inserted choices after bulkCreate --- ");
          console.log(JSON.stringify(newInsertedChoices));
        }

        await transaction.commit();
        console.log("game duplicated successfully");
        res.status(200).send(JSON.stringify(newGame));
      } catch (err) {
        // Rollback transaction only if the transaction object is defined
        if (transaction) await transaction.rollback();

        console.error(err.message);
        res.status(500).send("Server Error while finding game");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error while finding game");
    }
  }
);

app.get("/list_leaderBoard", (req, res) => {
  console.log("GET /list_leaderBoard -----api ---called");
  plays
    .findAll({
      include: [
        {
          model: players
        }
      ]
    })
    .then(result => {
      console.log;
      res.send(JSON.stringify(result));
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

app.get("/list_cohort_leaderBoard/:cohort_id", (req, res) => {
  console.log("GET /list_cohort_leaderBoard -----api ---called");

  console.log(req.params.cohort_id);

  let cohort_id = req.params.cohort_id;

  if (!cohort_id) {
    cohort_id = 1;
  }

  plays
    .findAll({
      where: { cohort_id: cohort_id },
      include: [
        {
          model: players
        }
      ]
    })
    .then(result => {
      console.log;
      res.send(JSON.stringify(result));
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

app.get("/user/findOne/:email", async (req, res) => {
  console.log("GET /user/findOne/   -----api ---called" + req.params.email);
  let email = req.params.email;

  if (!email) {
    res.status(400).send("email not found on request");
  }
  let player = await players.findOne({ where: { email: email }, raw: true });
  if (player) {
    res.send(player);
  } else {
    res.status(200).send({ message: "not found" });
  }
});

app.post(
  "/Updategame",
  [
    check("id", "First Name is required").isNumeric(),
    check("caption", "Caption is required")
      .not()
      .isEmpty(),
    check("gamedescription", "gamedescription is required")
      .not()
      .isEmpty()
  ],

  async (req, res) => {
    console.log("POST /Updategame  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, caption, gamedescription } = req.body;

    try {
      let updatedGame = await games.update(
        { caption: caption, gamedescription: gamedescription },
        { where: { id: id }, raw: true }
      );

      console.log("updating nowwwwwwwwww");
      console.log(JSON.stringify(updatedGame));

      res.send({ message: "game updated successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: "Server Error" });
    }
  }
);

app.listen(9000, () => console.log("listening"));
