'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const items = [
  {
    productId: 1,
    instructionId: null
  },
  {
    productId: 1,
    instructionId: null
  },
  {
    productId: 1,
    instructionId: null
  },
  {
    productId: 1,
    instructionId: null
  },
  {
    productId: 1,
    instructionId: null
  },
  {
    productId: 1,
    instructionId: null
  },
  {
    productId: 1,
    instructionId: null
  },
  {
    productId: 1,
    instructionId: null
  },
]

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
    options.tableName = 'Items';
    return queryInterface.bulkInsert(options, items, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Items';
    return queryInterface.bulkDelete(options, items, {})
  }
};
