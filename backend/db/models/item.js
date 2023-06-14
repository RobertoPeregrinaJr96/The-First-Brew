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
      Item.belongsTo(models.ShoppingCart, { foreignKey: 'itemId', hooks: true })
      Item.belongsTo(models.Coffee, { foreignKey: 'productId', hooks: true })

    }
  }
  Item.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,

    },
    instructionId: {
      type: DataTypes.INTEGER,

    },

  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
