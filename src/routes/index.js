const express = require('express');
const router = express.Router();
const loanRoutes = require('./loan.route');
const authRoutes = require('./auth.route');

router.use('/auth', authRoutes);
router.use('/loan', loanRoutes);

module.exports = router;