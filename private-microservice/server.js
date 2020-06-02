require('dotenv').config();
const config = require("config");
const privateRoute = require("./routes/private.route");
const express = require("express");
const app = express();

const PORT = config.get('defaultPort') || 3000;

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Welcome to Private Service at http://localhost:" + PORT + "/api");
});


// private routes
app.use('/api/private', privateRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));