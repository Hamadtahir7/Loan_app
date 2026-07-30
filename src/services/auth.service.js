const bcrypt = require('bcryptjs');
const { User } = require('../database/models');
const generateToken     = require('../utils/generate-token.util');
const sanitizeUser      = require('../utils/sanitize-user.util');
const ConflictError     = require('../errors/conflict.error');
const UnauthorizedError = require('../errors/unauthorized.error');

class AuthService {

  async signup(data) {
    const { username, email, password } = data;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = generateToken(user);

    return {
      user: sanitizeUser(user),
      token
    };
  }

  async login(data) {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateToken(user);

    return {
      user: sanitizeUser(user),
      token
    };
  }
}

module.exports = new AuthService();