const sequilize = require('sequelize');

const connection = new sequilize('question_guide', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;