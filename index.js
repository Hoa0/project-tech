const express = require('express');
const path = require('path');
const ejs = require('ejs');
//init app
const app = express();
const port = 3000;

app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');

//route
app.get('/', function (req, res) {
  res.render('index')
});
app.get('/search', (req, res) => {
  res.render('search')
});

app.get('/sushi/:userQuery',(req,res)=>{
    res.render('home',{data : {userQuery: req.params.userQuery,
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