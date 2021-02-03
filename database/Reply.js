const Sequileze = require('sequelize')
const connection = require('./database')

const Answers = connection.define("answers", {
    body: {
        type: Sequileze.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequileze.INTEGER,
        allowNull: false
    }
});

Answers.sync({ force: false }).then(() => {
    console.log('table successfully created ' + Answers)
}).catch((err) => {
    console.log('error successfully created ' + err)
});

module.exports = Answers;