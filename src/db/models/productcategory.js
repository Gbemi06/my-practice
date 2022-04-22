import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const ProductCategory = sequelize.define(
  "productcategories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

export default ProductCategory;
