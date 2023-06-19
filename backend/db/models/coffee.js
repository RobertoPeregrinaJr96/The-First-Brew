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
      Coffee.hasMany(models.Review, { foreignKey: "coffeeId", hooks: true, otherKey: 'id' })
    }
  }
  Coffee.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,

    },
    description: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'Coffee',
  });
  return Coffee;
};
