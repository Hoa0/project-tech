const express = require('express');
const path = require('path');
const ejs = require('ejs');
//init app
const app = express();
const port = 3000;

app.use(express.static('static'));
app.set('view engine','ejs');

//route
app.get('/', function (req, res) {
  res.render('index.ejs')
});

app.get('/search', (req, res) => {
  res.render('search')
});

app.get('/test/:userQuery',(req,res)=>{
    res.render('test',{data : {userQuery: req.params.userQuery,
                               searchResults : ['Sashimi','Temaki','California roll'],
                               loggedIn : true,
                               username : 'Jan'}});
});

// page not found
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});