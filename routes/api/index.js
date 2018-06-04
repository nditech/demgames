const router = require('express').Router();
const articleRoutes = require('./articles');
const mntRoutes = require('./mnt');

// Medical News Today routes
router.use('/articles', articleRoutes);

router.use('/mnt', mntRoutes);

module.exports = router;