import { sequelize, DataTypes } from "../utils/pg.js";

export const Korzina = sequelize.define("korzina", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cars: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
});
