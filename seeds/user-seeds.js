const { User } = require('../models');

const userData = [{
        name: "test",
        password: "test"
    },
    {
        name: "admin",
        password: "admin"
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;