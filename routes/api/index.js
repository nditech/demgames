const router = require('express').Router()
const questionRoutes = require('./questions')

router.use('/questions', questionRoutes)

module.exports = router