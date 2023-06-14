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
      ShoppingCart.belongsTo(models.User, { foreignKey: 'userId', hooks: true })
      ShoppingCart.hasMany(models.Item, { foreignKey: 'itemId', hooks: true })
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

    },
    itemId: {
      type: DataTypes.INTEGER,

    },
    quantity: {
      type: DataTypes.INTEGER,

    },

  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};