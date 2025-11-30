import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Client extends Model {
  public id!: number;
  public name!: string;
  public email?: string;
  public phone?: string;
  public address?: string;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
  },
  { sequelize, modelName: "Client" }
);

export default Client;
