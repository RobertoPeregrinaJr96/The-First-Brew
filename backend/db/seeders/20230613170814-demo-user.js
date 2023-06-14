
/** @type {import('sequelize-cli').Migration} */
'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const users = [
  {
    firstName: 'John',
    lastName: 'Smith',
    phoneNumber: 1111111,
    username: 'Demo-lition',
    email: 'demo@user.io',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'jane',
    lastName: 'Doe',
    phoneNumber: 2222222,
    username: 'FakeUser1',
    email: 'user1@user.io',
    hashedPassword: bcrypt.hashSync('password2')
  },
  {
    firstName: 'Pete',
    lastName: 'Wondering',
    phoneNumber: 3333333,
    username: 'FakeUser2',
    email: 'user2@user.io',
    hashedPassword: bcrypt.hashSync('password3')
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, users, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, users, {});
  }
};
