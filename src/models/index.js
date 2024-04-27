const User = require("./User")
const Category = require("./Category")
const Product = require('./Product')
const Cart = require("./Cart")
const Purchase = require("./Purchase")

//Product -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart ->userId
Cart.belongsTo(User)
User.hasMany(Cart)

//Cart -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase -> UserId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase -> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)