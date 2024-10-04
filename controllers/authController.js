const { validationResult } = require('express-validator');
const AuthService = require('../services/authService');
const UserRepository = require('../repositories/userRepository');

class AuthController {
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { phone_number, password } = req.body;
      const result = await AuthService.login(phone_number, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const isUniquePhone = await UserRepository.findByPhone(req.body.phone_number);
      if (isUniquePhone) {
        return res.status(400).json({ message: 'Phone number already exists' });
      }

      const userData = req.body;
      const newUser = await AuthService.register(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      const { user } = req;
      console.log("user :", user);
      await AuthService.logout(user);
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.log("eror :", error);
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
