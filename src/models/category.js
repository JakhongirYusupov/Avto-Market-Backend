import { sequelize, DataTypes } from "../utils/pg.js";

export const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});
