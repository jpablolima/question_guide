const Sequelize = require('sequelize')
const connection = require('./database')

const Answers = connection.define("answers", {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answers.sync({ force: false }).then(() => {
    console.log('table successfully created ' + Answers)
}).catch((err) => {
    console.log('error successfully created ' + err)
});

module.exports = Answers;