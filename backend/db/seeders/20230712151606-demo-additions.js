'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const addons = [
  // 1
  {
    name: 'Small',
    price: 0.20
  },
  {
    name: 'Medium',
    price: 0.20
  },
  {
    name: 'large',
    price: 0.20
  },
  // 5
  {
    name: 'Extra Large',
    price: 0.20
  },
  {
    name: 'Gallon',
    price: 0.20
  },
  {
    name: 'Office (3 Gallons)',
    price: 0.20
  }, {
    name: 'No Creamer',
    price: 0
  },
  {
    name: 'Heavy Cream',
    price: 0.20
  },
  {
    name: 'Vanilla Sweet Cream',
    price: 0.20
  },
  //10
  {
    name: 'Nonfat Milk',
    price: 0.20
  },
  {
    name: '2% Milk',
    price: 0.20
  },
  {
    name: 'Whole Mlik',
    price: 0.20
  },
  {
    name: 'Breve (Half & Half)',
    price: 0.20
  },
  {
    name: 'Almond',
    price: 0.20
  },
  {
    name: 'Coconut',
    price: 0.20
  },
  {
    name: 'Oatmilk',
    price: 0.20
  },
  {
    name: 'Soy',
    price: 0.20
  },
  {
    name: 'Warm',
    price: 0.20
  },
  {
    name: 'Iced',
    price: 0.20
  },
  {
    name: 'Cold',
    price: 0.20
  },
  {
    name: 'Hot',
    price: 0.20
  },
  {
    name: 'Very Hot',
    price: 0.20
  },
  {
    name: 'Steamed',
    price: 0.20
  }, {
    name: 'No Espresso shot',
    price: 0
  },
  {
    name: 'Signature Espresso Roast',
    price: 0.20
  },
  {
    name: 'Blond Espresso Roast',
    price: 0.20
  },
  {
    name: 'Decaf Espresso Roast',
    price: 0.20
  },
  {
    name: '1/3 Decaf Espresso Roast',
    price: 0.20
  },
  {
    name: '1/2 Decaf Espresso Roast',
    price: 0.20
  },
  {
    name: '2/3 Decaf Espresso Roast',
    price: 0.20
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
    options.tableName = 'Additions';
    return queryInterface.bulkInsert(options, addons, {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Additions';
    return queryInterface.bulkDelete(options, addons, {});
  }
};
