const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async(req, res) => {
    try {
        let products = await Product.findAll({ include: [{ model: Category }] });
        res.status(200).json(products)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        let { id } = req.params;
        let product = await Product.findByPk(id, {
            include: [{ model: Category }],
            where: {
                id
            }
        })

        if (!product) res.status(400).send('No product with that id');
        else res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/', async(req, res) => {
    try {
        let { body } = req;
        let product = await Product.create(body);

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/search', async(req, res) => {});

router.delete('/:id', async(req, res) => {
    try {
        let { id } = req.params;
        let result = await Product.destroy({
            where: {
                id
            }
        })
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.put('/:id', async(req, res) => {
    try {
        let { id } = req.params;
        let { body } = req;
        let product = await Product.update(body, {
            where: {
                id
            }
        });

        res.status(200).send(product)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;