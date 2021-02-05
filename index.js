const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Question = require('./database/Question');
const Reply = require('./database/Reply');


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
    });
});


app.get('/reply/:id', (req, res) => {
    const id = req.params.id;
    Question.findOne({
        where: { id: id }
    }).then(question => {
        if (question != undefined) {
            res.render('reply', {
                question: question
            })
        } else {
            res.redirect('/')
        }
    });
});


app.post('/answers', (req, res) => {
    var body = req.body.body;
    var questionId = req.body.question;

    Reply.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect('/reply/' + questionId)
    })


});

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
});