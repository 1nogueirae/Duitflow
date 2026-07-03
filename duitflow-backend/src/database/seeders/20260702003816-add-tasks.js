'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Task 1',
        description: 'Task 1 description.',
        status: 'done',
        dueDate: '2026-07-10',
        dueTime: '18:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 2',
        description: 'Task 2 description.',
        status: 'in_progress',
        dueDate: '2026-07-12',
        dueTime: '20:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 3',
        description: 'Task 3 description.',
        status: 'pending',
        dueDate: null,
        dueTime: null,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};