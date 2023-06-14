'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association for Shopping Cart
      Coffee.belongsToMany(models.ShoppingCart, { through: models.Item, foreignKey: "coffeeId", hooks: true, otherKey: 'id' })
      // Association for Reviews
      Coffee.hasMany(models.Review, { foreignKey: "productId", hooks: true, otherKey: 'id' })
    }
  }
  Coffee.init({
    name: {
      type: DataTypes.STRING,

    },
    price: {
      type: DataTypes.FLOAT,

    },

  }, {
    sequelize,
    modelName: 'Coffee',
  });
  return Coffee;
};
