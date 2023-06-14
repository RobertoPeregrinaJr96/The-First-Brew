'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const cart = [
  {
    userId: 1,
    itemId: 1,
    quantity: 1,
  },
  {
    userId: 2,
    itemId: 1,
    quantity: 1,
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
    options.tableName = 'ShoppingCarts'
    return queryInterface.bulkInsert(options, cart, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
    *
    * Example:
    * await queryInterface.bulkDelete('People', null, {});
    */
    options.tableName = 'ShoppingCarts'
    return queryInterface.bulkDelete(options, cart, {})
  }
};
