'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instructions.belongsTo(models.Item, { foreignKey: 'itemId', hooks: true, otherKey: 'id' })
      // Instructions.hasMany(models.Additions, { foreignKey: 'additionId', hooks: true, otherKey: 'id' })
    }
  }
  Instructions.init({
    itemId: {
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.STRING
    },
    milk: {
      type: DataTypes.STRING
    },
    temperature: {
      type: DataTypes.STRING
    },
    shot: {
      type: DataTypes.STRING
    },
    // additionId: {
    //   type: DataTypes.INTEGER,
    // },
    custom: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Instructions',
  });
  return Instructions;
};
