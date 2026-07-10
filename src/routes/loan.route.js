const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan.controller');
const validate = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const { createLoanSchema, updateLoanSchema } = require('../schemas/loan.schemas');

router.use(authMiddleware);

router.get('/',          loanController.getAllLoans);
router.post('/',         validate(createLoanSchema), loanController.createLoan);
router.get('/:id',       loanController.getLoanById);
router.put('/:id',       validate(updateLoanSchema), loanController.updateLoan);
router.patch('/:id/status', loanController.updateLoanStatus);
router.delete('/:id',    loanController.deleteLoan);

module.exports = router;