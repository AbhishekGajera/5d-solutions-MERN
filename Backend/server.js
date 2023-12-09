require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const origin = ["http://localhost:3000", "http://localhost:8080"];

var corsOptions = {
  origin,
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sample application." });
});

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "./app/uploads")));

require("./app/routes/auth.routes")(app);
require("./app/routes/moment.routes")(app);

app.use((req, res, next) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
