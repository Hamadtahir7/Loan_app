const express = require('express');
const router = express.Router();
const loanRoutes = require('./loan.route');

router.use('/loan', loanRoutes);

module.exports = router;