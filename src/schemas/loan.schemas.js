const joi = require('joi');

const createLoanSchema = joi.object({
  applicant_name: joi.string().min(3).max(100).required(),
  loan_amount: joi.number().positive().required(),
  tenure_months: joi.number().integer().positive().required(),
  purpose: joi.string().max(255).required(),
  status: joi.string().valid('PENDING').optional()
});

const updateLoanSchema = joi.object({
  applicant_name: joi.string().min(3).max(100),
  loan_amount: joi.number().positive(),
  tenure_months: joi.number().integer().positive(),
  purpose: joi.string().max(255),
  status: joi.string().valid('PENDING', 'APPROVED', 'REJECTED')
}).min(1);

module.exports = { createLoanSchema, updateLoanSchema };
