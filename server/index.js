const express = require("express");
const colors = require("colors");
const cors = require('cors')
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const schema = require("./schema/schema.js");
const connectDB = require('./config/db.js')
const app = express();
const port = process.env.PORT || 5000;

//Connect to Database
connectDB()

app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log("Server running on port " + port));
