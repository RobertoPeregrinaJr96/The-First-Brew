'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkout.belongsTo(models.ShoppingCart, { foreignKey: 'cartId', hooks: true, otherKey: 'id', onDelete: 'CASCADE' })
      Checkout.belongsToMany(models.User, { through: models.Analytics, foreignKey: 'purchase_historyId', hooks: true, otherKey: 'id' })

    }
  }
  Checkout.init({
    cartId: DataTypes.INTEGER,
    total_cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};
