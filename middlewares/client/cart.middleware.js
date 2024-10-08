const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
    if(!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();
        const expriesCookie = 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart.id, {
           expires: new Date(Date.now() + expriesCookie) 
        });
    } else {
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });
        const totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0)
        cart.totalQuantity = totalQuantity;
        res.locals.miniCart = cart;
    }
    next();
}