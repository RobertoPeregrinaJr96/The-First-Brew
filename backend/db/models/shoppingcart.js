'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Association for Coffee
      ShoppingCart.belongsToMany(models.Coffee, { through: models.Item, foreignKey: 'cartId', hooks: true, otherKey: 'id' })
      // Association for User
      ShoppingCart.belongsTo(models.User, { foreignKey: 'userId', hooks: true, otherKey: 'id' })
      // Item
      ShoppingCart.hasMany(models.Item, { foreignKey: 'cartId', hooks: true, otherKey: 'id' })
      // Checkout
      ShoppingCart.hasMany(models.Checkout, { foreignKey: 'cartId', hooks: true, otherKey: 'id', onDelete: 'CASCADE' })
    }
  }
  ShoppingCart.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    }
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};
