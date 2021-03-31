const router = require('express').Router();
const { Category, Product, Cart, CartItem, User, Order, OrderItem } = require('../../models');

router.post("/", async(req, res) => {
    if (!req.session.logged_in) {

        res.status(400).json({ message: "Please log in" })
        return;
    }

    let fetchedCart;
    try {
        fetchedCart = await Cart.findOne({
            include: [{ model: Product, through: CartItem }, { model: User }],
            exclude: ['password'],
            where: {
                user_id: req.session.user_id
            }
        })

        let products = await fetchedCart.getProducts();

        let user = await User.findByPk(req.session.user_id);

        let newOrder = await user.createOrder();

        console.log(newOrder);

        let orderProducts = products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
        })

        console.log(orderProducts);

        let result = await newOrder.addProducts(orderProducts);

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;