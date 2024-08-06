import { DataTypes, Model } from "sequelize";

export class Product extends Model { }

Product.init(
  {
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    p_name: {
      type: DataTypes.STRING,
    },
    p_price: {
      type: DataTypes.INTEGER
    },
    p_amount: {
      type: DataTypes.INTEGER
    },
  },
  { sequelize, tableName: "Products" }
);

