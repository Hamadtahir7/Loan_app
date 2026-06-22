const service = require('../services/loan.service');
const ValidationError = require('../errors/validation.error');

class LoanController {
    async getAllLoans(req, res, next) {
        try {
            const loans = await service.getAllLoans();
            res.json(loans);
        } catch (error) {
            next(error);
        }
    }

    async createLoan(req, res, next) {
        try {
            const loan = await service.createLoan(req.body);
            res.status(201).json(loan);
        } catch (error) {
            next(new ValidationError(error.message));
        }
    }

    async getLoanById(req, res, next) {
        try {
            const loan = await service.getLoanById(req.params.id);
            res.json(loan);
        } catch (error) {
            next(error);
        }
    }

    async updateLoan(req, res, next) {
        try {
            const loan = await service.updateLoan(req.params.id, req.body);
            res.json(loan);
        }   catch (error) { 
            next(new ValidationError(error.message));
        }
    }

    async deleteLoan(req, res, next) {
        try {
            await service.deleteLoan(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new LoanController();