const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
const isAuth = require("./Auth/is-auth");

const app = express();

//Connect to database
connectDB();

app.use(cors());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to my Meals Project!");
});

app.listen(port, console.log(`Server running on port ${port}`));
