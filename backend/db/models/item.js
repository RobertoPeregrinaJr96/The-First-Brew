'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Association for
      Item.belongsTo(models.ShoppingCart, { foreignKey: 'cartId', hooks: true, otherKey: 'id' })
      Item.belongsTo(models.Coffee, { foreignKey: 'coffeeId', hooks: true, otherKey: 'id' })

    }
  }
  Item.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cartId: {
      type: DataTypes.INTEGER
    },
    coffeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    instructionId: {
      type: DataTypes.INTEGER,
      allowNull: true,

    },
    quantity: {
      type: DataTypes.INTEGER
    },

  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
