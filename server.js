const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
//init app
const app = express();
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const { ObjectID } = require("mongodb");
const port = process.env.port || 3000;

// test db
console.log(process.env.TESTVAR);

let db = null;
// function connectDB
async function connectDB() {
  // get URL from .env file
  const uri = process.env.DB_URI;
  // make connection to database
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri, options);
  await client.connect();
  db = await client.db(process.env.DB_NAME);
}
connectDB()
  .then(() => {
    // if succesfull connections is made, show a message
    console.log("We have a connection to Mongo!");
  })
  .catch((error) => {
    // if connnection is unsuccesful, show errors
    console.log(error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("static"));
app.set("view engine", "ejs");

//route
app.get("/", async (req, res) => {
  let sushiChef = {};
  sushiChef = await db
    .collection("chefs")
    .find({ like: false }, { sort: { name: 1 } })
    .limit(5)
    .toArray();

  res.render("index.ejs", {
    title: "Zoek een sushi chef-kok maatje",
    titleSearch: "Nieuwe leden",
    sushiChef,
  });
});

/* filter page */
app.get("/filterChef", async (req, res) => {
  res.render("filter.ejs", {
    title: "Voorkeur opgeven"
  });
});

/* show the filter result, filter on food,gender etc */
app.post("/filterChef/result", async (req, res) => {
  let sushiChef = {};
  sushiChef = await db
    .collection("chefs")
    .find(
      { gender: req.body.gender },
      { skills: req.body.skills },
      { foodDish: req.body.foodDish },
      { categAge: req.body.categAge },
      { sort: { name: 1 } }
    ).toArray();

  res.render("result.ejs", {
    titleSearch: "Resultaten",
    sushiChef
  });
});

/* show favorite chefs page */
app.get("/favorite", async (req, res) => {
  let sushiChef = {};
  sushiChef = await db
    .collection("chefs")
    .find({ like: true }, { sort: { name: 1 } })
    .toArray();
  res.render("favorite.ejs", {
    titleSearch: "Jouw favorieten",
    sushiChef
  });
});


app.post("/favorite/like", async (req, res) => {
  const id = new ObjectID(req.body.id);
  // Bron: https://docs.mongodb.com/manual/reference/method/ObjectId/
  let sushiChef = {};

  // search for chefs, update the id and change like boolean false to true
  const chef = await db.collection('chefs')
    .updateOne({ '_id': id }, { $set: { 'like': true } });

  // search for chefs with like boolean false
  sushiChef = await db.collection('chefs')
    .find({ like: false }).toArray();
  res.render("index.ejs", {
    title: "Zoek een sushi chef-kok maatje",
    titleSearch: "Nieuwe leden",
    sushiChef
  });
});

/* dislike*/
app.post("/favorite/dislike", async (req, res) => {
  const id = new ObjectID(req.body.id);
  // Bron: https://docs.mongodb.com/manual/reference/method/ObjectId/
  let sushiChef = {};

  // search for chefs, update the id and change like boolean true to false
  const chef = await db.collection('chefs')
    .updateOne({ '_id': id }, { $set: { 'like': false } });

  // search for chefs with like boolean false
  sushiChef = await db.collection('chefs')
    .find({ like: false }).toArray();
  res.render("favorite.ejs", {
    titleSearch: "Jouw favorieten",
    sushiChef
  });
});

// delete 
/*
app.post('/favorite', async (req, res) => {
  db.collection('faveChefs').deleteOne({});

  let sushiChef = {};

  sushiChef = await db.collection('faveChefs').find().toArray();
  const chefPeople = sushiChef.filter(function (sushiChef) {
    return sushiChef;
  });
  res.render("favorite.ejs", {
    titleSearch: "Jouw favorieten",
    sushiChef
  });
});*/

// page not found
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
