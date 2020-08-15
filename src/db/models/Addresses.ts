import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Address extends Model {
  readonly id: string;
  readonly uuid: string;

  address: string;
  tx: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type AddressModel = ModelType<Address>;

export const Address = (dbService: Sequelize) => {
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
    address: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    tx: {
      type: DataTypes.STRING(250),
      defaultValue: "waiting",
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

  const model = dbService.define("addresses", attributes) as AddressModel;

  return model;
};
