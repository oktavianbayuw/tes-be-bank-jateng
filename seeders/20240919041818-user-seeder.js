'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Roles";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const adminRole = roles.find(role => role.name === 'Admin');
    const userRole = roles.find(role => role.name === 'User');

    if (!adminRole || !userRole) {
      throw new Error('Role Admin atau User tidak ditemukan dalam tabel Roles');
    }

    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        password: hashedPassword,
        role_id: adminRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user@example.com',
        password: hashedPassword,
        role_id: userRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
