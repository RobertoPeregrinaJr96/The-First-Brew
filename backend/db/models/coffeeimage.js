'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoffeeImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CoffeeImage.belongsTo(models.Coffee, { foreignKey: 'coffeeId', hooks: true, otherKey: 'id' })
    }
  }
  CoffeeImage.init({
    coffeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,

    },
  }, {
    sequelize,
    modelName: 'CoffeeImage',
  });
  return CoffeeImage;
};
