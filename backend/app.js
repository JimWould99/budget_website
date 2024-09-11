const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const mainRouter = require("./routes/main");

app.listen(3003, () => {
  console.log("listing on port 3003");
});

app.use("/", mainRouter);
