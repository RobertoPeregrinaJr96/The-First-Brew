'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstructionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Many To Many

      // Instructions
      InstructionItem.belongsTo(models.Instruction, { foreignKey: 'instructionId', hooks: true, otherKey: 'id'})
      // Additions
      InstructionItem.belongsTo(models.Addition, { foreignKey: 'additionId', hooks: true, otherKey: 'id'  })
    }
  }
  InstructionItem.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    instructionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Instruction',
        key: 'id'
      }
    },
    additionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Addition',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'InstructionItem',
  });
  return InstructionItem;
};
