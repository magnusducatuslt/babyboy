import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface User extends Model {
  readonly id: string;
  readonly uuid: string;

  telegramId: string;
  passport: string;
  wallet: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UserModel = ModelType<User>;

export const User = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    uuid: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
    },
    telegramId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    wallet: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    passport: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  };

  const model = dbService.define("users", attributes) as UserModel;

  return model;
};
