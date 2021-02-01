const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

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
    res.render('index')

});

app.get('/toask', (req, res) => {
    res.render('toAsk')
})


app.post('/savequestion', (req, res) => {
    const title = req.body.title;
    const describe = req.body.describe;
    res.send('form recebido')

})


app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
});