const { Loan, User } = require('../database/models');
const NotFoundError = require('../errors/not-found.error');
const ValidationError = require('../errors/validation.error');

class LoanService {

  async getAllLoans(userId, role) {
    // Admin sees everything, user sees only their own
    const where = role === 'admin' ? {} : { user_id: userId };

    return await Loan.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: role === 'admin' ? [{
        model: User,
        as: 'user',
        attributes: ['username', 'email']
      }] : []
    });
  }

  async createLoan(data, userId) {
    return await Loan.create({
      ...data,
      user_id: userId
    });
  }

  async getLoanById(id, userId, role) {
    const where = role === 'admin' ? { id } : { id, user_id: userId };
    const loan = await Loan.findOne({ where });
    if (!loan) throw new NotFoundError(`Loan with id ${id} not found`);
    return loan;
  }

  async updateLoan(id, data, userId) {
    // Users can only update their own PENDING loans
    const loan = await Loan.findOne({
      where: { id, user_id: userId, status: 'PENDING' }
    });
    if (!loan) {
      throw new NotFoundError('Loan not found or cannot be edited');
    }
    const allowedFields = ['applicant_name', 'loan_amount', 'tenure_months', 'purpose'];
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
    try {
      await loan.update(filteredData);
      return loan;
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }

  async updateLoanStatus(id, status) {
    // Admin only — approve or reject
    const loan = await Loan.findByPk(id);
    if (!loan) throw new NotFoundError(`Loan with id ${id} not found`);
    await loan.update({ status });
    return loan;
  }

  async deleteLoan(id, userId) {
    const loan = await this.getLoanById(id, userId, 'user');
    await loan.destroy();
  }
}

module.exports = new LoanService();