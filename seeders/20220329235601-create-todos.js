'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let todos = [];

    for (let i = 0; i < 50; i++) {
      todos.push({
        content: faker.hacker.phrase(),
        is_completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('SeqTodos', todos)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // the below is very destructive, and runs after the table is create and then destroys the whole table
    // the command line is npx sequelize-cli db:seed:undo
    // return queryInterface.bulkDelete('SeqTodos', null, {});
  }
};
