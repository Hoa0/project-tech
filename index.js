const express = require('express');

const path = require('path');
//init app
const app = express();
const port = 3000;
/*
app.use(express.static('static'))

app.get('/', (req, res) => {
  res.send('Hello World!d')
});

app.get('/chef', (req, res) => {
  res.send('Chef registered')
});

app.get('/chef/:chefID', (req, res) => {
  res.send(`<h1>Detailpage of chef ${req.params.chefId} </h1>`)
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
}); */


// Load View Engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

//home route
app.get('/', function(req, res){
  res.render('index');
});

app.get('/filter', (req, res) => {
  res.render('filter');
});

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});