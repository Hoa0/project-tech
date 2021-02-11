const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.send('Hello World!d')
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});