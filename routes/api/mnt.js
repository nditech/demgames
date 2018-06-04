const router = require('express').Router();
const articleController = require('../../controllers/mntController');

// Matches with "/api/mnt"
router
.route('/')
.get(articleController.findAll)

module.exports = router;