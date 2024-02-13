'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Association for
      // One to Many
      OrderItem.hasMany(models.Instruction, { foreignKey: 'orderItemId', hooks: true, otherKey: 'id', onDelete: 'CASCADE' })

      // Many to Many

      // Shopping cart
      OrderItem.belongsTo(models.ShoppingCart, { foreignKey: 'cartId', hooks: true, otherKey: 'id' })
      // Coffee
      OrderItem.belongsTo(models.Coffee, { foreignKey: 'coffeeId', hooks: true, otherKey: 'id' })
    }
  }
  OrderItem.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coffeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instructionId: {
      type: DataTypes.INTEGER,
      allowNull: true,

    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};
