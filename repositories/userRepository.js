const User = require('../models/user');

class UserRepository {
  async findByPhone(phone_number) {
    return await User.findOne({
      where: { phone_number }
    });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async updateLoginStatus(userId, isLogin) {
    return await User.update(
      { is_login: isLogin },
      { where: { id: userId } }
    );
  }
}

module.exports = new UserRepository();
