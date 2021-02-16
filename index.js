const express = require('express');
const path = require('path');
const ejs = require('ejs');

//init app
const app = express();
const port = 3000;

//home route
app.get('/', function(req, res){
  res.render('index');
});

// Load View Engine
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