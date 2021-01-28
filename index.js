const express = require('express');
const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', (req, res) => {

    const name = req.params.name;
    const lang = req.params.lang;

    res.render('index', {
        name: name,
        lang: lang,
        age: 29
    })
})


app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})