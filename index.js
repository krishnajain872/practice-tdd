const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
require("dotenv").config();
const app = express();

const { SERVER_PORT: port } = process.env;
const api = require("./routes");

app.use(router);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/staging", api);

app.get("/", (req, res) => {
  res.status(200).send("baking system api with tdd ");
});

app.listen(port, () => {
  try {
    console.log("server connection successfull");
  } catch (err) {
    console.log(err + "internal server error connection failed !!!");
  }
});
