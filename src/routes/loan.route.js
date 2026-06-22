const express = require('express');
const loanController = require('../controllers/loan.controller');
const validate = require('../middlewares/validate.middleware');
const { createLoanSchema, updateLoanSchema } = require('../schemas/loan.schemas');

const router = express.Router();

router.get('/', loanController.getAllLoans);
router.post('/', validate(createLoanSchema), loanController.createLoan);
router.get('/:id', loanController.getLoanById);
router.put('/:id', validate(updateLoanSchema), loanController.updateLoan);
router.delete('/:id', loanController.deleteLoan);

module.exports = router;