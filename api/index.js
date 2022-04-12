const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const app = express();

    app.use("/api", routes);
    app.use(express.json());

    var listener = app.listen(5000, () => {
      console.log(`Server has started on port ${listener.address().port}`);
    });
  })
  .catch((e) => console.log(e));
