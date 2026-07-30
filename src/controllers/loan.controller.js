const service      = require('../services/loan.service');
const asyncHandler = require('../middlewares/async_handler.middlewear');
const HTTP_STATUS  = require('../enums/http-status.enum');
const ForbiddenError = require('../errors/forbidden.error');

class LoanController {

  getAllLoans = asyncHandler(async (req, res) => {
    const loans = await service.getAllLoans(req.user.userId, req.user.role);
    res.status(HTTP_STATUS.OK).json(loans);
  });

  createLoan = asyncHandler(async (req, res) => {
    if (req.user.role === 'admin') {
      throw new ForbiddenError('Admins cannot create loan applications');
    }
    const loan = await service.createLoan(req.body, req.user.userId);
    res.status(HTTP_STATUS.CREATED).json(loan);
  });

  getLoanById = asyncHandler(async (req, res) => {
    const loan = await service.getLoanById(
      req.params.id,
      req.user.userId,
      req.user.role
    );
    res.status(HTTP_STATUS.OK).json(loan);
  });

  updateLoan = asyncHandler(async (req, res) => {
    if (req.user.role === 'admin') {
      throw new ForbiddenError('Admins use the status endpoint');
    }
    const loan = await service.updateLoan(
      req.params.id,
      req.body,
      req.user.userId
    );
    res.status(HTTP_STATUS.OK).json(loan);
  });

  updateLoanStatus = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
      throw new ForbiddenError('Only admins can update loan status');
    }
    const { status } = req.body;
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      throw new ValidationError('Status must be APPROVED or REJECTED');
    }
    const loan = await service.updateLoanStatus(req.params.id, status);
    res.status(HTTP_STATUS.OK).json(loan);
  });

  deleteLoan = asyncHandler(async (req, res) => {
    await service.deleteLoan(req.params.id, req.user.userId);
    res.status(HTTP_STATUS.NO_CONTENT).end();
  });
}

module.exports = new LoanController();