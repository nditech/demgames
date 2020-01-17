const _ = require("underscore");
const gameData = require("../data/Module/moduleData.json");
// const gameData = require('../data/Module/tempData.json');
const express = require("express");
const app = express();
const multer = require("multer");
const url = require("url");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function(re, file, cb) {
    cb(null, "./Imagedata/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const blobUtil = require("blob-util");

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
const jwtAuthz = require("express-jwt-authz");
const jwtDecode = require("jwt-decode");

const db = require("./models/index");

var bodyParser = require("body-parser");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: `https://demgamestest.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "https://demgamestest.auth0.com/api/v2/",
  issuer: `https://demgamestest.auth0.com/`,
  algorithms: ["RS256"]
});

const checkScopes = jwtAuthz(["write:db"]);

function verifyToken(req, res, next) {
  const bearedHeader = req.headers["authorization"];
  const bearer = bearedHeader.split(" ");
  const bearerToken = bearer[1];
  let decoded = jwtDecode(bearerToken);

  if (decoded["http://demGames.net/roles"][0] === "admin") {
    console.log("admin role called...");
  } else {
    console.log("user is called.");
    return res.status(404).send("user not authorize");
  }

  next();
}

function restrictGamesList(tempBearedHeader) {
  try {
    const bearedHeader = tempBearedHeader;
    const bearer = bearedHeader.split(" ");
    const bearerToken = bearer[1];
    let decoded = jwtDecode(bearerToken);

    if (decoded["http://demGames.net/roles"][0] === "admin") {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return true;
    console.log("error while restricting games");
  }
}

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

app.get("/api/api/game", async (req, res) => {
  if (!gameData) res.status(404).send("No data found");
  console.log("GET /api/game -----api");
  try {
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

    return res.json({ gameData });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

app.get("/api/api/v2/game/:cohort", async (req, res) => {
  console.log("GET=   api/v2/game -----api----------------");

  let cohort_name = req.params.cohort;
  console.log(cohort_name);
  let temp_cohort;
  let linkedGames;
  let linkedGamesId = [];

  if (cohort_name !== undefined && cohort_name !== "default") {
    temp_cohort = await cohort.findOne({
      where: {
        name: cohort_name
      },
      raw: true
    });

    linkedGames = await cohort_game.findAll({
      where: {
        cohort_id: temp_cohort.id
      },
      raw: true
    });

    for (var temp_linkedGames of linkedGames) {
      linkedGamesId.push(temp_linkedGames.game_id);
    }
  } else if (restrictGamesList(req.headers["authorization"])) {
    temp_cohort = await cohort.findOne({
      where: {
        name: "default"
      },
      raw: true
    });

    linkedGames = await cohort_game.findAll({
      where: {
        cohort_id: temp_cohort.id
      },
      raw: true
    });

    for (var temp_linkedGames of linkedGames) {
      linkedGamesId.push(temp_linkedGames.game_id);
    }
  }

  try {
    let gameData = [];
    let allGames;
    // first find all games
    if (linkedGamesId.length >= 1) {
      allGames = await games.findAll({
        where: {
          id: linkedGamesId
        },
        raw: true
      });
    } else {
      allGames = await games.findAll({ raw: true });
    }

    for (const [index, eachGame] of allGames.entries()) {
      let modifiedGame = {};
      modifiedGame.id = index + 1;
      modifiedGame.game_id = eachGame.id;
      modifiedGame.name = eachGame.caption;
      modifiedGame.type = eachGame.gametype;
      modifiedGame.style = eachGame.style === null ? "blue" : eachGame.style;
      modifiedGame.levels = [];

      if (temp_cohort) {
        modifiedGame.cohort_id = parseInt(temp_cohort.id);
      }

      let maxLevel = await questions.findAll({
        where: { game_id: eachGame.id },
        raw: true,
        attributes: [
          db.sequelize.fn("max", db.sequelize.col("difficulty_level"))
        ]
      });

      var length = maxLevel[0]["max(`difficulty_level`)"];

      for (var i = 0; i < length; i++) {
        level = {};
        level.id = i + 1;
        level.current_score = 0;
        level.total_score = 10; // no of questions
        level.desc = eachGame.gamedescription;
        level.linked_level = i;
        level.questions = [];

        let allQuestions = await questions.findAll({
          where: { game_id: eachGame.id, difficulty_level: i + 1 },
          raw: true
        });

        let newScore = allQuestions.length;

        if (newScore !== 0) {
          level.total_score = newScore * 10;
          level.par_score = eachGame.par_score;
        }

        var incrementHack = 1;

        for (const [questionIndex, tempQuestion] of allQuestions.entries()) {
          let modifiedQuestion = {};
          modifiedQuestion.id = questionIndex + 1;
          modifiedQuestion.question = tempQuestion.question_statement;

          let options = await choices.findAll({
            where: { questionid: tempQuestion.id },
            raw: true
          });

          modifiedQuestion.options = [];
          modifiedQuestion.weight = [];

          if (eachGame.gametype === "scenario") {
            modifiedQuestion.score = 10;
            modifiedQuestion.correct_answer = [];
          } else {
            modifiedQuestion.correct_answer = [];
          }

          for (const [i, value] of options.entries()) {
            if (eachGame.gametype === "scenario") {
              let linked_option = {};
              linked_option.option = value.choicestatement;
              linked_option.linked_question = value.linked_question
                ? value.linked_question - tempQuestion.id + incrementHack
                : null;
              modifiedQuestion.options.push(linked_option);
            } else {
              modifiedQuestion.options.push(value.choicestatement);
              if (value.answer == 1) {
                modifiedQuestion.correct_answer.push(i);
                modifiedQuestion.weight = value.weight;
              }
            }
          }

          incrementHack = incrementHack + incrementHack;
          level.questions.push(modifiedQuestion);
        }
        modifiedGame.levels.push(level);
      }
      gameData.push(modifiedGame);
    }

    return res.json({ gameData });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

app.get(
  "/api/listcohort_game",
  // checkJwt,
  verifyToken,
  (req, res) => {
    console.log("GET /listcohort_game -----api ---called");
    cohort_game
      .findAll()
      .then(result => {
        return res.send(JSON.stringify(result));
        // console.log(result);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Server Error");
      });
  }
);

app.get(
  "/api/listcohort_question",
  // checkJwt,
  (req, res) => {
    console.log("GET /listcohort_question -----api ---called");
    cohort_question
      .findAll()
      .then(result => {
        return res.send(JSON.stringify(result));
      })
      .catch(err => {
        console.error(error.message);
        return res.status(500).send("Server Error");
      });
  }
);

app.post(
  "/api/linkcohort_game",
  [
    check("game_id", "question id is required").isNumeric(),
    check("cohort_id", "cohort id is required").isNumeric()
  ],
  checkJwt,
  verifyToken,
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
      return res.send("cohort to game linked");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

app.post(
  "/api/linkcohort_question",
  [
    check("question_id", "question id is required").isNumeric(),
    check("cohort_id", "cohort id is required").isNumeric()
  ],
  checkJwt,
  verifyToken,
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
      return res.send("cohort to question linked");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route   GET /users
// @desc    Get players list from db
app.get("/api/users", checkJwt, verifyToken, (req, res) => {
  console.log("GET /users ----api");
  players
    .findAll()
    .then(result => {
      return res.status(200).send(JSON.stringify(result));
    })
    .catch(err => {
      console.log("server error");
      return res.status(500).send({ message: "error occured" });
    });
});

app.post(
  "/api/registerplayer",
  [
    check("firstName", "First Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check("userName", "Username is required").isLength({ min: 3 })
  ],
  checkJwt,
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

      return res.send("Player Registered");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

app.post(
  "/api/registergame",
  [
    check("caption", "Caption is required")
      .not()
      .isEmpty(),
    check("gamedescription", "Game Description is required")
      .not()
      .isEmpty(),
    check("gametype", "game type is required")
      .not()
      .isEmpty(),
    check("style", "style is required")
      .not()
      .isEmpty(),
    check("par_score", "par_score is required")
      .not()
      .isEmpty(),
    check("cohort_id", "cohort_id is required")
      .not()
      .isEmpty()
  ],
  checkJwt,
  verifyToken,
  async (req, res) => {
    console.log("POST /registergame  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      caption,
      gamedescription,
      gametype,
      cohort_id,
      style,
      par_score
    } = req.body;
    try {
      let newGame = await games.create({
        caption: caption,
        gamedescription: gamedescription,
        gametype: gametype,
        style: style,
        par_score: par_score
      });

      if (newGame) {
        let newCohortGameLink = await cohort_game.create({
          game_id: newGame.id,
          cohort_id: cohort_id
        });
      }

      return res.send({ message: "game successfully added" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

app.get("/api/listchoices", checkJwt, verifyToken, (req, res) => {
  console.log("GET /listchoices ");
  choices
    .findAll()
    .then(result => {
      return res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
});

app.get(
  "/api/listgames",
  // checkJwt,
  // verifyToken,
  async (req, res) => {
    console.log("GET /listgames -----api");
    games
      .findAll({
        include: [
          {
            model: cohort_game
          }
        ]
      })
      .then(async result => {
        let returnData = JSON.parse(JSON.stringify(result));

        for (var ob of returnData) {
          console.log(ob);
          let temp_cohort_id = ob.Cohort_Game.cohort_id;

          if (temp_cohort_id === null) {
            ob.Cohort_Game.name = "default";
          } else {
            let current_cohort = await cohort.findOne({
              where: { id: ob.Cohort_Game.cohort_id }
            });
            ob.Cohort_Game.name = current_cohort.name;
          }
        }

        return res.send(JSON.stringify(returnData));
      })
      .catch(err => {
        console.log("error below");
        console.log(err);
      });
  }
);

app.post("/api/addchoice", checkJwt, verifyToken, async (req, res) => {
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

    return res.send({ message: "choice successfully added" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Server Error" });
  }
});

app.get("/api/listquestions/:gameid", checkJwt, verifyToken, (req, res) => {
  console.log("GET /listquestions/:gameid ");
  if (!req.params.gameid) {
    return res.status(404).json({ msg: "Game Id not found" });
  }
  questions
    .findAll({
      where: { game_id: req.params.gameid }
    })
    .then(result => {
      return res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/choices/:questionid", checkJwt, verifyToken, (req, res) => {
  console.log("GET /choices/:questionid ");
  if (!req.params.questionid) {
    return res.status(404).json({ msg: "Game Id not found" });
  }
  choices
    .findAll({
      where: { questionid: req.params.questionid }
    })
    .then(result => {
      return res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
});

app.get(
  "/api/choiceLinkingQuestion/:questionid",
  checkJwt,
  verifyToken,
  (req, res) => {
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
      })
      .catch(err => {
        console.log(err);
      });
  }
);

app.post("/api/questions/:id", checkJwt, verifyToken, async (req, res) => {
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
    return res.status(500).send("Server Error");
  }
});

app.post(
  "/api/addquestion",
  [
    check("game", "Game name is required")
      .not()
      .isEmpty(),
    check("level", "Game level is required")
      .not()
      .isEmpty(),
    check("question", "question is required")
      .not()
      .isEmpty() /*,
    check("first_weight", "first_weight is required")
    .isNumeric(),
    check("second_weight", "second_weight is required")
    .isNumeric()*/
  ],
  checkJwt,
  verifyToken,
  async (req, res) => {
    console.log("POST /api/addquestion ");
    const data = req.body.data;

    /*if(isNaN(parseInt(data.first_weight))){
      console.log("First weight is not a number");
      return res.status(500).send("First weight is not a number");
    }

    if(isNaN(parseInt(data.second_weight))){
      console.log("Second weight is not a number");
      return res.status(500).send("Second weight is not a number");
    }*/

    console.log(JSON.stringify(data));

    const errors = validationResult(req.body.data);
    console.log(JSON.stringify(errors));
    if (!errors.isEmpty()) {
      console.log("ERROR IN INCOMING DATA");
      return res.status(500).json({ errors: errors.array() });
    }

    try {
      if ("previous_question_choice" in data) {
        const question = await questions.create({
          game_id: data.game_id,
          difficulty_level: data.level,
          question_statement: data.question,
          weight: data.weight,
          second_weight: data.second_weight,
          //explanation: "",
          isitmedia: 0
        });

        console.log("inside previous question");
        if (data.previous_question_choice) {
          const updateChoice = await choices.update(
            { linked_question: question.id },
            {
              where: { id: data.previous_question_choice }
            }
          );
          console.log("updated linked questions", updateChoice);
        }
        data.options.map(async choice => {
          await choices.create({
            choicedescription: "",
            choicestatement: choice.value,
            answer: 0,
            questionid: question.id,
            weight:
              choice.option === "A"
                ? data.weight
                  ? data.weight
                  : 0
                : data.second_weight
                ? data.second_weight
                : 0
          });
        });
        console.log("updated opitons --------------------");
      } else {
        const question = await questions.create({
          game_id: data.game_id,
          difficulty_level: data.level,
          question_statement: data.question,
          weight: data.weight,
          explanation: "explanation",
          isitmedia: 0
        });
        // Add choices
        console.log("inside else", data);
        data.options.map(async choice => {
          let isAnswer =
            choice.option.toString() === data.answers.toString() ? 1 : 0;
          await choices.create({
            choicedescription: "",
            choicestatement: choice.value,
            answer: isAnswer,
            questionid: question.id,
            weight: isAnswer === 1 ? data.weight : 0
          });
        });
      }

      return res.json({ msg: "Question Added Successfully" });
    } catch (err) {
      console.error(err);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Question not found" });
      }
      return res.status(500).send("Server Error");
    }
  }
);

app.post("/api/updatequestion", checkJwt, verifyToken, async (req, res) => {
  const data = req.body.data;
  const id = req.body.id;

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

    return res.json({ msg: "Question Updated" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Question not found" });
    }
    return res.status(500).send("Server Error");
  }
});

app.get(
  "/api/listCohort",
  checkJwt,
  // verifyToken,
  (req, res) => {
    console.log("GET /listCohort -----api ---called");
    cohort
      .findAll()
      .then(result => {
        const list = JSON.stringify(result);
        return res.send(JSON.stringify(result));
      })

      .catch(err => {
        console.log(err);
        return res.status(500).send("Server Error");
      });
  }
);

app.get("/api/listcohort_game", checkJwt, verifyToken, (req, res) => {
  console.log("GET /listcohort_game -----api ---called");
  cohort_game
    .findAll()
    .then(result => {
      return res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send("Server Error");
    });
});

app.get("/api/listcohort_question", checkJwt, verifyToken, (req, res) => {
  console.log("GET /listcohort_question -----api ---called");
  cohort_question
    .findAll()
    .then(result => {
      return res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.error(error.message);
      return res.status(500).send("Server Error");
    });
});

app.post(
  "/api/linkcohort_game",
  [
    check("game_id", "question id is required").isNumeric(),
    check("cohort_id", "cohort id is required").isNumeric()
  ],
  checkJwt,
  verifyToken,
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
      return res.send("cohort to game linked");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

app.post(
  "/api/linkcohort_question",
  [
    check("question_id", "question id is required").isNumeric(),
    check("cohort_id", "cohort id is required").isNumeric()
  ],
  checkJwt,
  verifyToken,
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
      return res.send("cohort to question linked");
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

app.post(
  "/api/duplicatGame",
  [check("game_id", "Game id is required").isNumeric()],
  checkJwt,
  verifyToken,
  async (req, res) => {
    console.log("POST /duplicatGame -- api");
    var data = req.body;
    console.log(data);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { game_id } = req.body;
    const { cohort_id } = req.body;

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

      let choiceList = await choices.findAll({
        where: { questionid: questionIdList },
        raw: true
      });

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
            gametype: originalGame.gametype,
            style: originalGame.style,
            par_score: originalGame.par_score
          },
          { transaction },
          { raw: true }
        );

        console.log("newGame created successfully ---VVV  \n\n\n");

        // step 2 - create questions and choices from old question

        for (const temp of questionList) {
          let newQuestion = await questions.create(
            {
              game_id: newGame.id,
              difficulty_level: temp.difficulty_level,
              question_statement: temp.question_statement,
              weight: temp.weight,
              second_weight: second_weight,
              explanation: temp.explanation,
              isitmedia: temp.isitmedia
            },
            { transaction }
          );

          console.log("\n\n\n  New Question created successfully ---");

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

          let newInsertedChoices = await choices.bulkCreate(
            oldchoices,
            { transaction },
            { raw: true }
          );
          console.log("\n\n\n New Inserted choices after bulkCreate --- ");
        }

        await transaction.commit();

        await cohort_game.create({
          game_id: newGame.id,
          cohort_id: cohort_id
        });

        console.log("game duplicated successfully");
        return res.status(200).send(JSON.stringify(newGame));
      } catch (err) {
        // Rollback transaction only if the transaction object is defined
        if (transaction) await transaction.rollback();

        console.error(err.message);
        return res.status(500).send("Server Error while finding game");
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error while finding game");
    }
  }
);

app.get(
  "/api/list_leaderBoard",
  checkJwt,
  // verifyToken,
  (req, res) => {
    console.log("GET /list_leaderBoard -----api ---called");

    plays
      .findAll({
        attributes: [
          [db.sequelize.literal("COALESCE(SUM(score), 0)"), "score"]
        ],
        include: [
          {
            model: players
          }
        ],
        group: ["player_id"]
      })
      .then(result => {
        var myOrderedArray = _.sortBy(result, o => parseInt(o.score));
        var sortedArray = JSON.parse(JSON.stringify(myOrderedArray.reverse()));
        let mm = sortedArray.map((item, index) => {
          item.rank = index + 1;
          return item;
        });
        return res.status(200).send(JSON.stringify(mm));
      })
      .catch(err => {
        console.error(err.message);
        return res.status(500).send("Server Error");
      });
  }
);

app.get(
  "/api/list_cohort_leaderBoard/:cohort_id",
  checkJwt,
  // verifyToken,
  (req, res) => {
    console.log("GET /list_cohort_leaderBoard -----api ---called");
    let cohort_id = req.params.cohort_id;
    if (!cohort_id) {
      cohort_id = 1;
    }
    plays
      .findAll({
        where: { cohort_id: cohort_id },
        attributes: [
          [db.sequelize.literal("COALESCE(SUM(score), 0)"), "score"]
        ],
        include: [
          {
            model: players
          }
        ],
        group: ["player_id"]
      })
      .then(result => {
        var myOrderedArray = _.sortBy(result, o => parseInt(o.score));
        var sortedArray = JSON.parse(JSON.stringify(myOrderedArray.reverse()));
        let arrayWithRanking = sortedArray.map((item, index) => {
          item.rank = index + 1;
          return item;
        });

        return res.status(200).send(JSON.stringify(arrayWithRanking));
      })
      .catch(err => {
        console.error(err.message);
        return res.status(500).send("Server Error");
      });
  }
);

app.get("/api/user/findOne/:email", checkJwt, async (req, res) => {
  console.log("GET /user/findOne/   -----api ---called" + req.params.email);
  let email = req.params.email;

  if (!email) {
    return res.status(400).send("email not found on request");
  }
  let player = await players.findOne({ where: { email: email }, raw: true });
  if (player) {
    return res.status(200).send(player);
  } else {
    return res.status(200).send({ message: "not found" });
  }
});

app.post(
  "/api/Updategame",
  [
    check("id", "First Name is required").isNumeric(),
    check("caption", "Caption is required")
      .not()
      .isEmpty(),
    check("gamedescription", "gamedescription is required")
      .not()
      .isEmpty(),
    check("style", "style is required")
      .not()
      .isEmpty(),
    check("par_score", "par_score is required").isNumeric()
  ],
  checkJwt,
  verifyToken,
  async (req, res) => {
    console.log("POST /Updategame  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("updating \n" + JSON.stringify(req.body));
    const { id, caption, gamedescription, style, par_score } = req.body;
    console.log(req.body);
    try {
      let updatedGame = await games.update(
        {
          caption: caption,
          gamedescription: gamedescription,
          style: style,
          par_score: par_score
        },
        { where: { id: id }, raw: true }
      );

      if (updatedGame != null) {
        return res.status(200).send({ message: "game updated successfully" });
      }

      return res.status(500).send({ message: "Server Error" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

app.post(
  "/api/updatePlay",
  [
    check("player_email", "Player email is required")
      .not()
      .isEmpty(),
    check("game_id", "game id is required").isNumeric(),
    check("score", "score is required").isNumeric()
  ],
  async (req, res) => {
    console.log("POST /updatePlay  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { player_email, game_id, cohort_id, score } = req.body;

    let user = await players.findOne({ where: { email: player_email } });

    let default_cohort_id = 1;

    if (cohort_id) {
      default_cohort_id = cohort_id;
    }

    try {
      let newPlay = await plays.create({
        player_id: user.id,
        game_id: game_id,
        cohort_id: default_cohort_id,
        score: score,
        total: 0,
        program_rank: 0,
        total_rank: 0,
        playstartdate: new Date()
      });

      return res
        .status(200)
        .send({ message: "new play created for :" + user.email });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

app.post(
  "/api/DeleteGame",
  [check("game_id", "game id is required").isNumeric()],
  checkJwt,
  verifyToken,
  async (req, res) => {
    console.log("POST /DeleteGame  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("updating ");
    const { game_id } = req.body;

    if (game_id) {
      let cohort_game_link = await cohort_game.destroy({
        where: { game_id: game_id }
      });
    }

    try {
      let deletedGame = await games.destroy({
        where: { id: game_id },
        raw: true
      });

      console.log("deleted game below --- ");

      return res.send({ message: "game deleted successfully" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

app.post(
  "/api/AddCohort",
  upload.single("file"),
  [
    check("name", "cohort name is required")
      .not()
      .isEmpty()
  ],
  checkJwt,
  verifyToken,
  async (req, res) => {
    console.log("POST /AddCohort  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    const logo = req.file;

    console.log(
      logo.path + " " + logo.originalname + " " + logo.type + " " + logo.size
    );
    console.log(name);

    try {
      let oldCohort = await cohort.findOne({
        where: { name: name }
      });
      if (oldCohort) {
        return res
          .status(404)
          .send({ message: "cohort with the same name exist" });
      }

      let addedCohort = await cohort.create({
        name: name,
        logo: "Imagedata/" + req.file.originalname
      });

      return res.status(200).send({ message: "cohort added successfully" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

app.post(
  "/api/DeleteCohort",
  [check("cohort_id", "name id is required").isNumeric()],
  checkJwt,
  verifyToken,
  async (req, res) => {
    console.log("POST /DeleteCohort  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cohort_id } = req.body;

    try {
      let deletedCohort = await cohort.destroy({
        where: {
          id: cohort_id
        }
      });

      return res.status(200).send({ message: "cohort deleted successfully" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

app.get(
  "/api/level_by_game/:gameid",
  // checkJwt,
  // verifyToken,
  async (req, res) => {
    console.log("GET /level_by_game/:gameid ");
    if (!req.params.gameid) {
      return res.status(404).json({ msg: "Game Id not found" });
    }

    const game_id = req.params.gameid;

    let currentGame = await games.findOne({
      where: {
        id: game_id
      }
    });

    if (!currentGame) {
      return res.status(404).json({ msg: "Game not found" });
    }

    let maxLevel = await questions.findAll({
      where: { game_id: game_id },
      raw: true,
      attributes: [db.sequelize.fn("max", db.sequelize.col("difficulty_level"))]
    });

    // var levels = [];
    var length = maxLevel[0]["max(`difficulty_level`)"];

    return res.status(200).send({
      game: currentGame,
      length: length
    });
  }
);

app.get(
  "/api/initial_scenario_question/:gameid/:levelid",
  // checkJwt,
  // verifyToken,
  async (req, res) => {
    console.log("GET /initial_scenario_question/:gameid/:levelid ");
    if (!req.params.gameid) {
      return res.status(404).json({ msg: "Game Id not found" });
    } else if (!req.params.levelid) {
      return res.status(404).json({ msg: "level Id not found" });
    }

    let initialQuestion = await questions.findOne({
      where: {
        game_id: req.params.gameid,
        difficulty_level: req.params.levelid
      },
      raw: true
    });

    if (!initialQuestion) {
      return res.status(404).send({ message: "not found" });
    }

    let options = await choices.findAll({
      where: { questionid: initialQuestion.id },
      raw: true
    });

    initialQuestion.options = options;

    return res.status(200).send(initialQuestion);
  }
);

app.get(
  "/api/scenario_question/:questionId",
  // checkJwt,
  // verifyToken,
  async (req, res) => {
    console.log("GET /scenario_question /:questionId ");
    if (!req.params.questionId) {
      return res.status(404).json({ msg: "questionId not found" });
    }

    let newQuestion = await questions.findOne({
      where: {
        id: req.params.questionId
      },
      raw: true
    });

    if (!newQuestion) {
      return res.status(404).send({ message: "not found" });
    }

    let options = await choices.findAll({
      where: { questionid: newQuestion.id },
      raw: true
    });

    newQuestion.options = options;
    return res.status(200).send(newQuestion);
  }
);

app.post("/api/updatecohort", checkJwt, verifyToken, async (req, res) => {
  console.log("POST /updatecohort  -------api");

  const { id, name } = req.body;

  try {
    let updatedGame = await cohort.update(
      { name: name },
      { where: { id: id } }
    );

    return res.send({ message: "cohort updated successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Server Error" });
  }
});

app.get("/api/user/get_profile/:email", async (req, res) => {
  console.log(
    "GET /user/get_profile/:email  -----api ---called" + req.params.email
  );
  let email = req.params.email;

  if (!email) {
    return res.status(400).send("email not found on request");
  }
  let player = await players.findOne({ where: { email: email }, raw: true });

  if (player) {
    let allPlays = await plays.findAll({
      where: { player_id: player.id },
      include: [
        {
          model: cohort
        },
        {
          model: games
        }
      ],
      raw: true
    });

    const myOrderedArray = _.sortBy(allPlays, o => parseInt(o.score));

    return res.status(200).send(JSON.stringify(myOrderedArray));
  } else {
    return res.status(500).send({ message: "not found" });
  }
});

app.get(
  "/api/get_cohort_rank/:email/:cohort_id",
  // checkJwt,
  // verifyToken,
  async (req, res) => {
    console.log("GET /get_cohort_rank -----api ---called");
    // if (!req.params.email) {
    //   return res.status(404).json({ msg: "email not found" });
    // }
    let player = await players.findOne({
      where: { email: req.params.email },
      raw: true
    });

    if (player) {
      plays
        .findAll({
          where: { cohort_id: parseInt(req.params.cohort_id) },
          attributes: [
            [db.sequelize.literal("COALESCE(SUM(score), 0)"), "score"]
          ],
          include: [
            {
              model: players
            }
          ],
          group: ["player_id"]
        })
        .then(result => {
          var myOrderedArray = _.sortBy(result, o => parseInt(o.score));

          var sortedArray = JSON.parse(
            JSON.stringify(myOrderedArray.reverse())
          );

          let cohort_rank = sortedArray.findIndex(
            x => x.Player.email === req.params.email
          );
          cohort_rank = cohort_rank + 1;
          console.log("cohort_rank == " + cohort_rank);
          let global_rank = 0;

          plays
            .findAll({
              attributes: [
                [db.sequelize.literal("COALESCE(SUM(score), 0)"), "score"]
              ],
              include: [
                {
                  model: players
                }
              ],
              group: ["player_id"]
            })
            .then(data => {
              console.log("global rank ---------");

              var reverseSortedGlobalRank = _.sortBy(data, ob =>
                parseInt(ob.score)
              );

              var sortedGlobalRank = reverseSortedGlobalRank.reverse();

              global_rank = sortedGlobalRank.findIndex(
                playerOb => playerOb.Player.email === req.params.email
              );
              global_rank = global_rank + 1;
              console.log("global_rank == " + global_rank);
              console.log("cohort_rank == " + cohort_rank);

              return res.status(200).send({
                cohort_rank: cohort_rank,
                global_rank: global_rank
              });
            })
            .catch(error => {
              return res.status(500).send(error.message);
            });
        })
        .catch(err => {
          console.error();
          return res.status(500).send(err.message);
        });
    } else {
      return res.status(500).send({ message: "not found" });
    }
  }
);

app.post("/api/updateUser", checkJwt, verifyToken, async (req, res) => {
  console.log("POST /api/updateUser  -------api");

  const {
    id,
    program,
    gender,
    country,
    lastname,
    firstname,
    username
  } = req.body;
  console.log(JSON.stringify(req.body));
  try {
    let updatedUser = await players.update(
      {
        program: program,
        gender: gender,
        country: country,
        lastname: lastname,
        firstname: firstname,
        username: username
      },
      { where: { id: id } }
    );

    if (updatedUser) {
      return res.status(200).send({ message: "cohort updated successfully" });
    } else {
      return res.status(500).send({ message: "Server Error" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Server Error" });
  }
});

app.post(
  "/api/DeleteUser",
  [check("id", "user id is required").isNumeric()],
  checkJwt,
  verifyToken,
  async (req, res) => {
    console.log("POST /DeleteUser  -------api");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    try {
      let deletedPlayer = await players.destroy({
        where: {
          id: id
        }
      });

      if (deletedPlayer) {
        return res.status(200).send({ message: "player deleted successfully" });
      } else {
        return res.status(500).send({ message: "Server Error" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

app.listen(9000, "127.0.0.1", () => console.log("listening"));
