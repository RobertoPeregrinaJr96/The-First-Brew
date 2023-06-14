'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const coffee = [
  {
    name: "Espresso",
    price: 2.50
  },
  {
    name: "Cappuccino",
    price: 3.50
  },
  {
    name: "Americano",
    price: 2.75
  },
  {
    name: "Latte",
    price: 4.00
  },
  {
    name: "Mocha",
    price: 4.25
  },
  {
    name: "Macchiato",
    price: 3.75
  },
  {
    name: "Flat White",
    price: 4.50
  },
  {
    name: "Affogato",
    price: 5.00
  },
  {
    name: "Turkish Coffee",
    price: 3.25
  },
  {
    name: "Irish Coffee",
    price: 5.50
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
    options.tableName = 'Coffees';
    return queryInterface.bulkInsert(options, coffee, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Coffees';
    return queryInterface.bulkDelete(options, coffee, {})
  }
};
