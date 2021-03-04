const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const slug = require('slug');
//init app
const app = express();
const port = 3000;

const chefs=[
{"id":"beef-maki","gerechten":"Beef maki","name":"Bob","ages":25,"skills":"amateur","gender":"(M)"},
{"id":"temaki-sushi","gerechten":"Temaki","name":"Jan","ages":24,"skills":"gevorderd","gender":"(M)"},
{"id":"ebi-maki","gerechten":"EBI Fry Maki","name":"Piet","ages":35,"skills":"gevorderd","gender":"(M)"},
{"id":"zalm-maki","gerechten":"Zalm","name":"Appie","ages":20,"skills":"gevorderd","gender":"(M)"}];

const ages =["18 t/m 25 jaar", "25 t/m 35 jaar", "35 t/m 45 jaar", "45 jaar en ouder"];
const gerechten =["Beef maki", "Temaki", "EBI Fry Maki", "California Maki", "Zalm"];
const skills =["amateur", "gevorderd", "professioneel"];


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("static"));
app.set("view engine", "ejs");

//route
app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.get('/searchChef', (req, res) => {
      res.render('search', {title:'Zoek een sushi chef-kok maatje', chefs})
  });

  app.get('/searchChef/filterChef', (req, res) => {
    res.render('filter', {title: "Filter", ages, skills, gerechten});
  });
  // nadat je op "zoek sushi chef-koks" geklikt heb, volgende page
  
app.post('/searchChef/filterChef', (req,res) => {
    const id = slug(req.body.name);
    const sushiChefs = {"id": "id","gerechten": req.body.gerechten ,"name": req.body.name, "ages": req.body.ages, "chefs": req.body.chefs};
    chefs.push(sushiChefs);
    res.render('result', {title: "search Resultaten", sushiChefs})
  });
  
  // zoekt in de arry naar de id zoals find,push
  app.get('/searchChef/:chefId', (req, res) => {
      const chefShow = chefs.find( chefShow => chefShow.id == req.params.chefId);
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