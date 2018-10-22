const router = require('express').Router();
const questionController = require('../../controllers/questionController');

// Matches with "/api/questions"
router.route('/')
.get(questionController.findAll)
.post(questionController.create);

// Matches /api/questions/es
router.route('/es')
.get(questionController.findAllSpanishQuestions);

// Matches with "/api/questions/:id"
router
.route('/:id')
.get(questionController.findById)
.put(questionController.update)
.delete(questionController.remove);

module.exports = router;