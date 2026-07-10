const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { signupSchema, loginSchema } = require('../schemas/auth.schema');

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/login',  validate(loginSchema),  authController.login);

module.exports = router;