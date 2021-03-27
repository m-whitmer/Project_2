const { Product } = require('../models');

const productData = [{
        product_name: 'Simple Tennis Shoes',
        price: 44.99,
        stock: 14,
        category_id: 1,
    },
    {
        product_name: 'Everyday Sneakers',
        price: 35.0,
        stock: 25,
        category_id: 2,
    },
    {
        product_name: 'Fancy Running Shoes',
        price: 62.99,
        stock: 12,
        category_id: 3,
    },
    {
        product_name: "Micheal Jordan's Shoes for the Ground",
        price: 72.99,
        stock: 50,
        category_id: 4,
    },
    {
        product_name: "Super Spikey Stilletos",
        price: 89.99,
        stock: 22,
        category_id: 5,
    },
    {
        product_name: "Ughs",
        price: 59.99,
        stock: 30,
        category_id: 6,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;