const express = require("express");
const cors = require("cors");
const { checkMonthDifference } = require("./monthlyReset");

const app = express();
app.use(express.json());

app.use(cors());

const mainRouter = require("./routes/main");
const userRouter = require("./routes/users");

app.listen(3005, () => {
  console.log("listing on port 3005");
});

checkMonthDifference();

app.use("/users", userRouter);

app.use("/", mainRouter);
