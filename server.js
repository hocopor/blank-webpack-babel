const express = require("express");
const app = express();
const port = 3000;

app.get("/", (request, response, next) => {
  response.json("bar");
  next();
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
