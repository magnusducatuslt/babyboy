import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Candidate extends Model {
  readonly id: string;
  readonly uuid: string;

  name: string;
  address: string;
  img: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type CandidateModel = ModelType<Candidate>;

export const Candidate = (dbService: Sequelize) => {
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
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    img: {
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

  const model = dbService.define("candidates", attributes) as CandidateModel;

  return model;
};
