'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const items = [
  {
    itemId: 1,
    custom: '1'
  }, {
    itemId: 2,
    custom: '2'
  }, {
    itemId: 3,
    custom: '3'
  }, {
    itemId: 4,
    custom: '4'
  }, {
    itemId: 5,
    custom: '5'
  }, {
    itemId: 6,
    custom: '6'
  }, {
    itemId: 7,
    custom: '7'
  }, {
    itemId: 8,
    custom: '8'
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
    options.tableName = 'Instructions';
    return queryInterface.bulkInsert(options, items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Instructions';
    return queryInterface.bulkDelete(options, items, {});
  }
};
