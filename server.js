const express = require("express");
require("dotenv").config();

//express server
const app = express();

app.get("/rest", (req, res) => {
  res.json({
    data: "API is working...",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at ${process.env.URL}${process.env.PORT}`);
});
