const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const slug = require('slug');
//init app
const app = express();
const dotenv=require('dotenv').config();
const { MongoClient } = require('mongodb');
const port = 3000;

// test db
console.log(process.env.TESTVAR);

const ages =["18 t/m 25 jaar", "25 t/m 35 jaar", "35 t/m 45 jaar", "45 jaar en ouder"];
const skills = ["amateur", "gevorderd", "professioneel"];

let db = null;
// function connectDB
async function connectDB(){
    // get URL from .env file
    const uri = process.env.DB_URI
    // make connection to database
    const options = {useUnifiedTopology: true};
    const client = new MongoClient(uri, options)
    await client.connect();
    db = await client.db(process.env.DB_NAME)
}
connectDB()
  .then(() => {
    // if succesfull connections is made, show a message
    console.log('We have a connection to Mongo!')
  })
  .catch( error => {
    // if connnection is unsuccesful, show errors
    console.log(error)
  });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("static"));
app.set("view engine", "ejs");

//route
app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.get('/searchChef', (req, res) => {
      res.render('search', {title:'Zoek een sushi chef-kok maatje', chefList})
  });

  app.get('/searchChef/filterChef', (req, res) => {
    res.render('filter', {title: "Filter", ages, skills, gerechten});
  });
  // nadat je op "zoek sushi chef-koks" geklikt heb, volgende page
  
app.post('/searchChef/filterChef', (req,res) => {
    const id = slug(req.body.name);
    const sushiChefs = {"id": "id","gerechten": req.body.gerechten ,"name": req.body.name, "ages": req.body.ages, "chefs": req.body.chefs};
    chefList.push(sushiChefs);
    res.render('result', {title: "search Resultaten", sushiChefs})
  });
  
  // zoekt in de arry naar de id zoals find,push
  app.get('/searchChef/:chefId', (req, res) => {
      const chefShow = chefList.find( chefShow => chefShow.id == req.params.chefId);
      res.render('result', {title: "Result", chefShow})
  });

app.get("/test/:userQuery", (req, res) => {
    res.render("test", {
        data: {
            userQuery: req.params.userQuery,
            searchResults: ["Sashimi", "Temaki", "California roll"],
            loggedIn: true,
            username: "Jan",
        },
    });
});

// page not found
app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

// start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});