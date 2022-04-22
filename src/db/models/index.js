import Product from "./product.js";
import Review from "./review.js";
import Category from "./category.js";
import User from "./user.js";
import ProductCategory from "./productcategory.js";

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Category.belongsToMany(Product, { through: ProductCategory });
Product.belongsToMany(Category, { through: ProductCategory });

export default { Review, Product, Category, User, ProductCategory };
