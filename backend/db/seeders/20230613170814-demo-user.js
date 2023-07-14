
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
    profileImageUrl: 'https://freeawsbucket.s3.us-west-1.amazonaws.com/user_seeders/pexels-demo1-.jpg',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'jane',
    lastName: 'Doe',
    phoneNumber: 2222222,
    username: 'FakeUser1',
    email: 'user1@user.io',
    profileImageUrl: 'https://freeawsbucket.s3.us-west-1.amazonaws.com/user_seeders/pexels-demo2-.jpg',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Charlotte',
    lastName: 'Wondering',
    phoneNumber: 3333333,
    username: 'FakeUser2',
    email: 'user2@user.io',
    profileImageUrl: 'https://freeawsbucket.s3.us-west-1.amazonaws.com/user_seeders/pexels-demo3.jpg',
    hashedPassword: bcrypt.hashSync('password')
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
