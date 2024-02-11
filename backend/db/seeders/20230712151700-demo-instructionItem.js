'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */

const instructionItems = [
  {
    instructionId: 1,
    additionId: 2
  }, {
    instructionId: 1,
    additionId: 11
  }, {
    instructionId: 1,
    additionId: 19
  }, {
    instructionId: 1,
    additionId: 25
  }, {
    instructionId: 2,
    additionId: 2
  }, {
    instructionId: 2,
    additionId: 11
  }, {
    instructionId: 2,
    additionId: 19
  }, {
    instructionId: 2,
    additionId: 25
  }, {
    instructionId: 3,
    additionId: 2
  }, {
    instructionId: 3,
    additionId: 11
  }, {
    instructionId: 3,
    additionId: 19
  }, {
    instructionId: 3,
    additionId: 25
  }, {
    instructionId: 4,
    additionId: 2
  }, {
    instructionId: 4,
    additionId: 11
  }, {
    instructionId: 4,
    additionId: 19
  }, {
    instructionId: 4,
    additionId: 25
  }, {
    instructionId: 5,
    additionId: 2
  }, {
    instructionId: 5,
    additionId: 11
  }, {
    instructionId: 5,
    additionId: 19
  }, {
    instructionId: 5,
    additionId: 25
  }, {
    instructionId: 6,
    additionId: 2
  }, {
    instructionId: 6,
    additionId: 11
  }, {
    instructionId: 6,
    additionId: 19
  }, {
    instructionId: 6,
    additionId: 25
  }, {
    instructionId: 7,
    additionId: 2
  }, {
    instructionId: 7,
    additionId: 11
  }, {
    instructionId: 7,
    additionId: 19
  }, {
    instructionId: 7,
    additionId: 25
  }, {
    instructionId: 8,
    additionId: 2
  }, {
    instructionId: 8,
    additionId: 11
  }, {
    instructionId: 8,
    additionId: 19
  }, {
    instructionId: 8,
    additionId: 25
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
    options.tableName = 'InstructionItems';
    return queryInterface.bulkInsert(options, instructionItems, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'InstructionItems';
    return queryInterface.bulkDelete(options, instructionItems, {})
  }
};
