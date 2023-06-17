'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        type: Sequelize.INTEGER,
        reference: {
          model: "ShoppingCarts",
          key: 'id'
        },
        allowNull: false,
      },
      coffeeId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Items',
          key: 'id'
        },
        allowNull: false,
      },
      instructionId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Instructions',
          key: 'id'
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Items";
    await queryInterface.dropTable('Items');
  }
};
