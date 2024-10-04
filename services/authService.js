const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/userRepository');

class AuthService {
  async login(phone_number, password) {
    const user = await UserRepository.findByPhone(phone_number);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    await UserRepository.updateLoginStatus(user.id, true);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Response
    const responseUser = {
      id: user.id,
      phone_number: user.phone_number,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      is_login: user.is_login
    };

    return { token, user: responseUser };
  }

  async logout(user) {
    console.log("user :", user);
    await UserRepository.updateLoginStatus(user.id, false);
    return { message: 'Logout successful' };
  }

  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await UserRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  }
}

module.exports = new AuthService();
