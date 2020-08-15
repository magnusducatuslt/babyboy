import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    return await queryInterface.createTable("users", {
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
      data: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    return await queryInterface.dropTable("users");
  },
};
