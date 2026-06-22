'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('loans', [
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        applicant_name: 'John Doe',
        loan_amount: 50000.00,
        tenure_months: 24,
        purpose: 'Home Improvement',
        status: 'APPROVED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
        applicant_name: 'Jane Smith',
        loan_amount: 75000.00,
        tenure_months: 36,
        purpose: 'Education',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('loans', null, {});
  }
};
