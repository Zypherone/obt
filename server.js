const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const Transaction = require("./models/transaction.js");

const PORT = process.env.PORT || 7000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/budget",
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);

// routes
//app.use(require("./routes/api.js"));
require("./routes/api.js")(app, Transaction);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});