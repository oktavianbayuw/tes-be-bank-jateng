const express = require('express');
const { check } = require('express-validator');
const AuthController = require('../controllers/authController');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

router.post('/register', [
  check('name').notEmpty().withMessage('Name is required'),
  check('phone_number').isMobilePhone().withMessage('Invalid phone number'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], AuthController.register);

router.post('/login', [
  check('phone_number').notEmpty().withMessage('Phone number is required'),
  check('password').notEmpty().withMessage('Password is required'),
], AuthController.login);

router.post('/logout', authenticateJWT, AuthController.logout);

module.exports = router;
