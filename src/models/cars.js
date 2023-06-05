import { sequelize, DataTypes } from "../utils/pg.js";

export const Cars = sequelize.define("cars", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tanirovka: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  motor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  year: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  distance: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  gearbook: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  narxi: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  three_model: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  tashqi_rasm: {
    type: DataTypes.ARRAY(DataTypes.STRING(500)),
    allowNull: false,
  },
  ichki_rasm: {
    type: DataTypes.ARRAY(DataTypes.STRING(500)),
    allowNull: false,
  },
  info: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});
