'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instruction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instruction.hasMany(models.InstructionItem, { foreignKey: 'instructionId', hooks: true, otherKey: 'id', onDelete: 'CASCADE' })
      // Many to Many
      Instruction.belongsToMany(models.Addition, { through: models.InstructionItem, foreignKey: 'instructionId', hooks: true, otherKey: 'id' })
      // One to Many
      Instruction.belongsTo(models.Item, { foreignKey: 'itemId', hooks: true, otherKey: 'id' })
    }
  }
  Instruction.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Item',
        key: 'id'
      }
    },
    custom: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Instruction',
  });
  return Instruction;
};
5
