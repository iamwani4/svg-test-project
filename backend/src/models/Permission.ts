import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Permission extends Model {
  public id!: number;
  public userId!: number;
  public action!: string;
  public resource!: string;
  public allowed!: boolean;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    indexes: [{ unique: true, fields: ["userId", "action", "resource"] }],
  }
);

export default Permission;
