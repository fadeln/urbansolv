import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const GeoFeature = sequelize.define(
  "GeoFeature",
  {
    properties: {
      type: DataTypes.JSONB,
    },
    geom: {
      type: DataTypes.GEOMETRY("GEOMETRYZ", 4326),
    },
  },
  {
    tableName: "GeoFeatures",
    timestamps: true,
  }
);

export default GeoFeature;
