const express = require("express");

const db = require("./src/config/db");
const Router = require("./src/router");

const app = express();
const port = 3000;

// connect db
db.connect();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
Router(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
