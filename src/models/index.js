import { Cars } from "./cars.js";
import { Category } from "./category.js";
import { Korzina } from "./korzina.js";
import { Users } from "./users.js";

Category.hasMany(Cars, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Cars.belongsTo(Category);

Users.hasMany(Korzina, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Korzina.belongsTo(Users);

export { Users, Cars, Category, Korzina };
