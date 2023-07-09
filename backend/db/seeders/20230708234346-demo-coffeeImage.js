'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const images = [
  {
    coffeeId: 1,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/expresso.jpg",
  },
  {
    coffeeId: 2,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/cappuccino.jpg",
  },
  {
    coffeeId: 3,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/americano.jpg",
  },
  {
    coffeeId: 4,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/latte.jpg",
  },
  {
    coffeeId: 5,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/mocha.jpg",
  },
  {
    coffeeId: 6,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/Macchiato.jpg",
  },
  {
    coffeeId: 7,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/flat_white.jpg",
  },
  {
    coffeeId: 8,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/affogato.jpg",
  },
  {
    coffeeId: 9,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/turkish_coffee.jpg",
  },
  {
    coffeeId: 10,
    img: "https://freeawsbucket.s3.us-west-1.amazonaws.com/CoffeeImg/irish_coffee.jpg",
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
