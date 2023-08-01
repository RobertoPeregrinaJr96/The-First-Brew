'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Instructions
      Addition.belongsToMany(models.Instruction, { through: models.InstructionItem, foreignKey: 'additionId', hooks: true, otherKey: 'id' })
    }
  }
  Addition.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Addition',
  });
  return Addition;
};
