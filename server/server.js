const gameData = require('../data/Module/moduleData.json');
const levels = require('../data/Module/levels.json');
const modules = require('../data/Module/modules.json');
const questions = require('../data/Module/questions.json');
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));

// const excelToJson = require('excel-as-json').processFile;
// excelToJson('./excel1.xlsx', './row.json', (err, data) => console.log('JSON conversion failure'));

app.get('/api/game', (req, res) => {
	if (!gameData) res.status(404).send('No data found');
	res.json({ gameData });
});

app.get('/api/modules', (req, res) => {
	if (!modules) res.status(404).send('No modules found');
	res.json({ modules });
});

app.get('/api/module/:moduleId/levels', (req, res) => {
	const id = req.params.moduleId;
	const moduleLevels = levels.map((level) => (level.moduleId === parseInt(id) ? level.levels : null));
	if (!moduleLevels) res.status(404).send('No module levels found');
	res.json({ moduleLevels });
});

app.put('/api/module/:moduleId/level/:levelId/update-score', (req, res, err) => {
	const score = levels.find(
		(level) =>
			level.levels[req.params.levelId - 1].id === parseInt(req.params.levelId) &&
			level.moduleId === parseInt(req.params.moduleId)
	);
	if (!score) res.status(404).send('No level score found to update');
	let newScore = score.levels[req.params.levelId - 1].current_score;
	console.log('body score', req.body.score);
	newScore += parseInt(req.body.score);
	console.log('new score after', newScore, levels);

	if (!newScore) res.status(404).send('Didnt get new score to update');

	res.json('score updated with ' + newScore);
});

app.get('/api/module/:moduleId/level/:levelId/questions', (req, res) => {
	const levelId = req.params.levelId;
	const moduleId = req.params.moduleId;

	const levelQuestions = questions.map(
		(question) =>
			question.id === parseInt(moduleId) && question.levels[levelId - 1].id === parseInt(levelId)
				? question.levels[levelId - 1].questions
				: null
	);
	if (!levelQuestions) res.status(404).send('No questions found');

	res.json(levelQuestions);
});

app.listen(9000, () => console.log('listening'));
