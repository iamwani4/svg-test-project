import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Client from "./Client";
import User from "./User";

class Order extends Model {
  public id!: number;
  public clientId!: number;
  public userId!: number;
  public totalAmount!: number;
  public cashAmount!: number;
  public cardAmount!: number;
  public status!: string;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cashAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    cardAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  { sequelize, modelName: "Order" }
);

Order.belongsTo(Client);
Order.belongsTo(User);

export default Order;
