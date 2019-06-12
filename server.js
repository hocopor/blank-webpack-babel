const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.options("*", cors());

app.get("/", (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.json({ Hello: "world" });
  next();
});

app.listen(process.env.PORT || port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
