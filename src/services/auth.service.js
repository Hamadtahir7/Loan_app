const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

class AuthService {

  async signup(data) {
    const { username, email, password } = data;

    // Check if email already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error('Email already registered');
      error.status = 409;
      throw error;
    }

    // Hash the password — never store plain text
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate token immediately so user is logged in after signup
    const token = this._generateToken(user);

    return {
      user: this._sanitizeUser(user),
      token
    };
  }

  async login(data) {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    // Compare submitted password against stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    const token = this._generateToken(user);

    return {
      user: this._sanitizeUser(user),
      token
    };
  }

  _generateToken(user) {
    return jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  // Never send password hash to the client
  _sanitizeUser(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
  }
}

module.exports = new AuthService();