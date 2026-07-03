'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('Senha@123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@duitflow.com',
        password: passwordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Regular User',
        email: 'user@duitflow.com',
        password: passwordHash,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: [
        'admin@duitflow.com',
        'user@duitflow.com',
      ],
    });
  },
};