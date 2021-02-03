const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Question = require('./database/Question');

const PORT = 3000;

connection
    .authenticate()
    .then((result) => {
        console.log('database connection successfully')
    }).catch((err) => {
        console.log('database connection error' + err)
    });


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    Question.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(question => {
        res.render('index', {
            question: question
        });
    });
});

app.get('/toask', (req, res) => {
    res.render('toAsk')
})


app.post('/savequestion', (req, res) => {
    const title = req.body.title;
    const describe = req.body.describe;

    Question.create({
        title: title,
        description: describe
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err)
    })

})


app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
});