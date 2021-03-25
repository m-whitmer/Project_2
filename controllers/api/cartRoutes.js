const router = require('express').Router();
const { Category, Product, Cart, CartItem, User } = require('../../models');


router.get('/', async(req, res) => {
    if (!req.session.logged_in) res.status(400).json({ message: "Please log in" })

    try {
        let cart = await Cart.findOne({
            include: [{ model: Product, through: CartItem }, { model: User }],
            exclude: ['password'],
            where: {
                user_id: req.session.user_id
            }
        })

        res.status(200).json(cart)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;