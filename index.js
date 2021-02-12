const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.send('Hello World!d')
});

app.get('/login', (req, res) => {
  res.send('registered')
});

app.get('/login/:chefID', (req, res) => {
  res.send(`<h1>Detailpage of chef ${req.params.chefId} </h1>`)
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});