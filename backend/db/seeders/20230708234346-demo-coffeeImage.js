'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const images = [
  {
    coffeeId: 1,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_espresso.jpg",
  },
  {
    coffeeId: 2,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_Cappuccino.jpg",
  },
  {
    coffeeId: 3,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_americano.jpg",
  },
  {
    coffeeId: 4,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_Latte1.jpg",
  },
  {
    coffeeId: 5,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_Mocha.jpg",
  },
  {
    coffeeId: 6,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_Macchiato.jpg",
  },
  {
    coffeeId: 7,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4K_flatwhite1.jpg",
  },
  {
    coffeeId: 8,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_Affogato.jpg",
  },
  {
    coffeeId: 9,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_Turkish+Coffee.jpg",
  },
  {
    coffeeId: 10,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/4k_Irish+Coffee.jpg",
  }
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
    options.tableName = 'CoffeeImages';
    return queryInterface.bulkInsert(options, images, {})

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'CoffeeImages';
    return queryInterface.bulkDelete(options, images, {})

  }
};
