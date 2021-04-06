const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
//init app
const app = express();
const dotenv = require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const port = 3000;

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
  // create an empty list of chefs
  let sushiChef = {};
  // look for alle chefs in database and sort them by age and name into an array
  sushiChef = await db
    .collection("chefs")
    .find({}, { sort: { name: 1 } })
    .limit(4)
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
      {
        gender: req.body.gender,
        skills: req.body.skills,
        foodDish: req.body.foodDish
      //  imageProfile: req.body.imageProfile,
       // imageFood: req.body.imageFood
      },
      { sort: { name: 1 } }
    ).toArray();

  console.log(sushiChef);
  console.log(req.body.gender);
  console.log(req.body.foodDish);
  console.log(req.body.skills);

  res.render("result.ejs", {
    titleSearch: "Resultaten",
    sushiChef
  });
});

/* favorite chefs page */
app.get("/favorite", async (req, res) => {
  let sushiChef = {};
  sushiChef = await db
    .collection("faveChefs")
    .find({}, { sort: { name: 1 } })
    .toArray();
  res.render("favorite.ejs", {
    titleSearch: "Jouw favorieten",
    sushiChef
  });
});

// delete 
app.post('/favorite', async(req, res) => {
	db.collection('faveChefs').deleteOne({});

	let sushiChef = {};

	sushiChef = await db.collection('faveChefs').find().toArray();
	const chefPeople = sushiChef.filter(function(sushiChef) {
		return sushiChef;
	});
    res.render("favorite.ejs", {
      titleSearch: "Jouw favorieten",
      sushiChef
    });
});

// page not found
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
