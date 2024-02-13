"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InstructionModifier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Many To Many

      // Instructions
      InstructionModifier.belongsTo(models.Instruction, {
        foreignKey: "instructionId",
        hooks: true,
        otherKey: "id",
      });
      // Additions
      InstructionModifier.belongsTo(models.Addition, {
        foreignKey: "additionId",
        hooks: true,
        otherKey: "id",
      });
    }
  }
  InstructionModifier.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      instructionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Instruction",
          key: "id",
        },
      },
      additionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Addition",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "InstructionModifier",
    }
  );
  return InstructionModifier;
};
