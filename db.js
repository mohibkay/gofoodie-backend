const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connnected successfully."))
  .catch((error) => console.log("Error connectting to the database", error));
