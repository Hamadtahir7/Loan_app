const service = require('../services/loan.service');
const asyncHandler = require('../middlewares/async_handler.middlewear');

class LoanController {

  getAllLoans = asyncHandler(async (req, res) => {
    const loans = await service.getAllLoans(req.user.userId, req.user.role);
    res.json(loans);
  });

  createLoan = asyncHandler(async (req, res) => {
    if (req.user.role === 'admin') {
      return res.status(403).json({ message: 'Admins cannot create loan applications' });
    }
    const loan = await service.createLoan(req.body, req.user.userId);
    res.status(201).json(loan);
  });

  getLoanById = asyncHandler(async (req, res) => {
    const loan = await service.getLoanById(req.params.id, req.user.userId, req.user.role);
    res.json(loan);
  });

  updateLoan = asyncHandler(async (req, res) => {
    if (req.user.role === 'admin') {
      return res.status(403).json({ message: 'Admins use the status endpoint' });
    }
    const loan = await service.updateLoan(req.params.id, req.body, req.user.userId);
    res.json(loan);
  });

  updateLoanStatus = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update loan status' });
    }
    const { status } = req.body;
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Status must be APPROVED or REJECTED' });
    }
    const loan = await service.updateLoanStatus(req.params.id, status);
    res.json(loan);
  });

  deleteLoan = asyncHandler(async (req, res) => {
    await service.deleteLoan(req.params.id, req.user.userId);
    res.status(204).end();
  });
}

module.exports = new LoanController();