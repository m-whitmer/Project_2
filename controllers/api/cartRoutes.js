const router = require('express').Router();
const { Category, Product, Cart, CartItem, User } = require('../../models');


router.get('/', async(req, res) => {
    if (!req.session.logged_in) {

        res.status(400).json({ message: "Please log in" })
        return;
    }


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

router.post('/', async(req, res) => {
    if (!req.session.logged_in) {

        res.status(400).json({ message: "Please log in" })
        return;
    }

    let { id, quantity } = req.body;
    let fetchedCart;
    try {
        fetchedCart = await Cart.findOne({
            include: [{ model: Product, through: CartItem }, { model: User }],
            exclude: ['password'],
            where: {
                user_id: req.session.user_id
            }
        })

        let products = await fetchedCart.getProducts({
            where: {
                id
            }
        })

        let product;
        if (products.length > 0) {
            product = products[0]
        }

        let newQty;
        if (product) {
            let oldQty = product.cartItem.dataValues.quantity;
            newQty = oldQty + quantity;

            return await fetchedCart.addProduct(product, { through: { quantity: newQty } });
        } else {
            newQty = quantity;

            let newProduct = await Product.findByPk(id);

            return await fetchedCart.addProduct(newProduct, { through: { quantity: newQty } });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.delete('/::id', async(req, res) => {
    if (!req.session.logged_in) {

        res.status(400).json({ message: "Please log in" })
        return;
    }

    let id = parseInt(req.params.id);
    let fetchedCart;
    try {
        fetchedCart = await Cart.findOne({
            include: [{ model: Product, through: CartItem }, { model: User }],
            exclude: ['password'],
            where: {
                user_id: req.session.user_id
            }
        })

        let products = await fetchedCart.getProducts({
            where: {
                id
            }
        })

        let product = products[0];

        return await product.cartItem.destroy();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.put('/', async(req, res) => {
    if (!req.session.logged_in) {

        res.status(400).json({ message: "Please log in" })
        return;
    }

    let { id, quantity } = req.body;
    let fetchedCart;
    try {
        fetchedCart = await Cart.findOne({
            include: [{ model: Product, through: CartItem }, { model: User }],
            exclude: ['password'],
            where: {
                user_id: req.session.user_id
            }
        })

        let products = await fetchedCart.getProducts({
            where: {
                id
            }
        })

        let product;
        if (products.length > 0) {
            product = products[0]
        }

        return await fetchedCart.addProduct(product, { through: { quantity } });

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;