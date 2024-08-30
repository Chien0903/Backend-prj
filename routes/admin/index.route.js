const dashboardRoutes = require("./dashboard.route.js");
const systemConfig = require("../../config/system.js")
const productRoutes = require("./product.route.js")
const productCategoryRoutes = require("./products-category.route.js")
module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN + "/products", productRoutes);
    app.use(PATH_ADMIN + "/products-category", productCategoryRoutes);
}