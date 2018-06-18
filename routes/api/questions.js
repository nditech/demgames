const router = require('express').Router();
const questionController = require('../../controllers/questionController');

// Matches with "/api/questions"
router.route('/')
.get(questionController.findAll)
// .post(questionController.createMultiple)

// Matches with "/api/articles/:id"
// router
// .route('/:id')
// .get(articleController.findById)
// .put(articleController.update)
// .delete(articleController.remove);

module.exports = router