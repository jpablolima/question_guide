const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const PORT = 3000;

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
    var title = req.body.title;
    var describe = req.body.describe;
    res.send('form recebido' + title + 'decrição' + describe)

})


app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
});