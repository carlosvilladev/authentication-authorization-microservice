require('dotenv').config();
const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const express = require("express");
const app = express();

const PORT = config.get('defaultPort') || 3000;

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/nodejsauth", { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Welcome to Authentication and Authorization Service at http://localhost:" + PORT + "/api");
});

//use users route for api/users
app.use("/api/users", usersRoute);

//use auth route for api/auth
app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));