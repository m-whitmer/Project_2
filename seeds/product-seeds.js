const { Product } = require('../models');

const productData = [{
        product_name: 'Simple Tennis Shoes',
        price: 44.99,
        stock: 14,
        category_id: 1,
        gender: 'M',
        material: "C",
        image_url: 'https://images.asics.com/is/image/asics/1041A113_102_SR_RT_GLB-1?$sfcc-product$',
        description: 'Simply tennis'
    },
    {
        product_name: 'Everyday Sneakers',
        price: 35.99,
        stock: 25,
        category_id: 2,
        gender: 'K',
        material: "PU",
        image_url: 'https://www.heuritech.com/wp-content/uploads/2019/07/Sneakers-Chanel-Spring-Summer-2018-pre-collection-1030x687.jpg',
        description: 'Take one daily'
    },
    {
        product_name: 'Fancy Running Shoes',
        price: 62.99,
        stock: 12,
        category_id: 3,
        gender: 'F',
        material: "PU",
        image_url: 'https://assets.reebok.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/6c15dd2720594c16a8ecac300080260f_9366/energen-run-mens-running-shoes.jpg',
        description: 'Glamorous Cardio'
    },
    {
        product_name: "Jordan Michael's Shoes for the Ground",
        price: 72.99,
        stock: 50,
        category_id: 4,
        gender: 'M',
        material: "C",
        image_url: 'https://stockx-360.imgix.net/Air-Jordan-1-Retro-High-Dior/Images/Air-Jordan-1-Retro-High-Dior/Lv2/img02.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1607043976',
        description: 'No jumping'
    },
    {
        product_name: "Super Spikey Stilletos",
        price: 89.99,
        stock: 22,
        category_id: 5,
        gender: 'F',
        material: "PU",
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/61hdZwiWQeL._AC_UL1200_.jpg',
        description: 'Also a weapon'
    },
    {
        product_name: "Ughs",
        price: 59.99,
        stock: 30,
        category_id: 6,
        gender: 'F',
        material: "L",
        image_url: 'https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=100311611-847&recipeName=680',
        description: 'Boots for Mondays'
    },
    {
        product_name: "Runmaster 9000",
        price: 99.99,
        stock: 15,
        category_id: 3,
        gender: 'M',
        material: "L",
        image_url: 'https://images.asics.com/is/image/asics/1012A592_002_SR_RT_GLB-1?$sfcc-product$',
        description: 'Statisically insignificant Aerodynamics!'
    },
    {
        product_name: "Rainbow Runners",
        price: 79.99,
        stock: 18,
        category_id: 3,
        gender: 'K',
        material: "PU",
        image_url: 'https://media1.popsugar-assets.com/files/thumbor/JcY_nCCBlYzGiIuK7CRU8CP5SK0/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/01/08/989/n/1922729/17fa95525ff8e03a488a75.93945631_asics/i/ASICS-GT-2000-8-Running-Shoes.jpg',
        description: 'Groovy'
    },
    {
        product_name: "Turqouise Tennis Shoes",
        price: 34.99,
        stock: 13,
        category_id: 1,
        gender: 'F',
        material: "L",
        image_url: 'https://spy.com/wp-content/uploads/2020/05/best-mens-tennis-shoes-of-2020.jpg?w=958&h=599&crop=1',
        description: "The 90's called..."
    },
    {
        product_name: "Pink Tennis Shoes",
        price: 44.99,
        stock: 12,
        category_id: 1,
        gender: 'F',
        material: "PU",
        image_url: 'https://rogansshoes.com/data/default/images/catalog/385/AD_CG6363_PNK1.JPG',
        description: 'Pretty in Pink'
    },
    {
        product_name: "Former Cows",
        price: 56.99,
        stock: 56,
        category_id: 2,
        gender: 'K',
        material: "L",
        image_url: "https://media.gq.com/photos/5faab9533ea09614b438e5b8/master/w_400%2Cc_limit/Nike-SB-x-Ben-%26-Jerry's-Dunk-Low-'Chunky-Dunky'-sneaker.jpg",
        description: 'Wear their skin'
    },
    {
        product_name: "Super Sneakers",
        price: 99.99,
        stock: 5,
        category_id: 2,
        gender: 'K',
        material: "",
        image_url: 'https://media.gq.com/photos/5faab951409bdf9465816b6e/master/w_2000,h_1333,c_limit/Air-Jordan-35-sneaker.jpg',
        description: 'Hi-tech'
    },
    {
        product_name: "Really Red BB Shoes",
        price: 39.99,
        stock: 30,
        category_id: 4,
        gender: 'K',
        material: "",
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/61BWFggBSZL._AC_UX395_.jpg',
        description: 'I see Red'
    },
    {
        product_name: "Graffiti Basketball Shoes",
        price: 55.99,
        stock: 30,
        category_id: 4,
        gender: 'K',
        material: "C",
        image_url: 'https://publish.one37pm.net/wp-content/uploads/2020/10/nike-basketball-mobile.jpg',
        description: "Banksy's newest masterpiece"
    },
    {
        product_name: "Butterfly Heels",
        price: 69.99,
        stock: 30,
        category_id: 5,
        gender: 'F',
        material: "L",
        image_url: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2142,w_2400,x_0,y_258/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/Chiara_Embroidery_Sandal_Black___Multi_SPF19080_1_oymomq.jpg',
        description: 'Freshly tanned'
    },
    {
        product_name: "Twisty Heels",
        price: 79.99,
        stock: 30,
        category_id: 5,
        gender: 'F',
        material: "C",
        image_url: 'https://static.shiekh.com/media/catalog/product/cache/image/2000x2000/e9c3970ab036de70892d86c6d221abfe/2/a/2ae3756f3a0f9d3358d5f1b0a179bb70.jpg',
        description: 'Some pun about ankle injuries'
    },
    {
        product_name: "Big Black Boots",
        price: 75.99,
        stock: 30,
        category_id: 6,
        gender: 'F',
        material: "L",
        image_url: 'https://milworld.com/eng_pl_Mil-Tec-Jungle-Panama-Boots-Black-8396_1.jpg',
        description: "They're all outta gum..."
    },
    {
        product_name: "America! The Boots",
        price: 89.99,
        stock: 30,
        category_id: 6,
        gender: 'M',
        material: "L",
        image_url: 'https://www.sheplers.com/dw/image/v2/BBCT_PRD/on/demandware.static/-/Sites-master-product-catalog-shp/default/dwcc02bbfa/images/782/038782_41_LT.JPG?sw=980&sh=980&sm=fit',
        description: "Don't tread on these"
    },

];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;