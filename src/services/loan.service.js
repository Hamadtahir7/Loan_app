const { Loan } = require('../database/models');
const NotFoundError = require('../errors/not-found.error');
const ValidationError = require('../errors/validation.error');

class LoanService{
    async getAllLoans(){
        try {
            const loans = await Loan.findAll();
            return loans;
        } catch (error) {
            throw error;
        }
    }

    async createLoan(data){
        try {
            const loan = await Loan.create(data);
            return loan;
        } catch (error) {
            throw new ValidationError(error.message);
        }
    }

    async getLoanById(id){
        const loan = await Loan.findByPk(id);
        if (!loan) {
            throw new NotFoundError(`Loan with id ${id} not found`);
        }
        return loan;
    }

    async updateLoan(id, data){
        const loan = await this.getLoanById(id);
        try {
            await loan.update(data);
            return loan;
        } catch (error) {
            throw new ValidationError(error.message);
        }
    }

    async deleteLoan(id){
        const loan = await this.getLoanById(id);
        await loan.destroy();
    }   
}

module.exports = new LoanService();