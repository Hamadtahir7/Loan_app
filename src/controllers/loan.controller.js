const service = require('../services/loan.service');
const ValidationError = require('../errors/validation.error');
const asyncHandler = require('../middlewares/async_handler.middlewear');

class LoanController {
    getAllLoans = asyncHandler(async (req, res) => {
        const loans = await service.getAllLoans();
        res.json(loans);
    });

    createLoan = asyncHandler(async (req, res) => {
        const loan = await service.createLoan(req.body);
        res.status(201).json(loan);
    });
    getLoanById = asyncHandler(async (req, res) => {
        const loan = await service.getLoanById(req.params.id);
        res.json(loan);
    }); 
        

    updateLoan = asyncHandler(async (req, res, next) => {
        const loan = await service.updateLoan(req.params.id, req.body);
        res.json(loan);
    });

    deleteLoan = asyncHandler(async (req, res, next) => {
        await service.deleteLoan(req.params.id);
        res.status(204).end();
    });
}
module.exports = new LoanController();