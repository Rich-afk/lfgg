const router = require('express').Router();
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
const commentRoutes = require('./commentRoutes');
const languageRoutes = require('./languageRoutes')

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/comments', commentRoutes);
router.use('/language', languageRoutes);

module.exports = router;
