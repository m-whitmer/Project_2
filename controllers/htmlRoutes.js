const router = require('express').Router();
const path = require('path');

router.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
});

router.get('/item/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/item.html'));
});

router.get('/cart', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/cart.html'));
});

router.get('/login', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});



module.exports = router;