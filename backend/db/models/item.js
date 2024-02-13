"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association for Shopping Cart
      Item.belongsToMany(models.ShoppingCart, {
        through: models.Item,
        foreignKey: "itemId",
        hooks: true,
        otherKey: "id",
      });
      // Association for Reviews
      Item.hasMany(models.Review, {
        foreignKey: "itemId",
        hooks: true,
        otherKey: "id",
      });
      Item.hasMany(models.ItemImage, {
        foreignKey: "itemId",
        hooks: true,
        otherKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  Item.init(
    {
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
      },
      waitTime: {
        type: DataTypes.Integer,
      },
      itemImage: {
        type: DataTypes.String,
      },
      default: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
