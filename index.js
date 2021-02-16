const express = require('express');
const path = require('path');
const ejs = require('ejs');

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

// ejs
// https://www.youtube.com/watch?v=VM-2xSaDxJc
// https://github.com/noobcoder1137/ejs_templates_express 
app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');
app.get('/:userQuery',(req,res)=>{
    res.render('home',{data : {userQuery: req.params.userQuery,
                               searchResults : ['book1','book2','book3'],
                               loggedIn : true,
                               username : 'yooo'}});
});

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});