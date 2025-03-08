const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { checkMonthDifference } = require("./monthlyReset");
const { backupData } = require("./backup_data");

const app = express();
app.use(express.json());

app.use(cors());

const mainRouter = require("./routes/main");
const userRouter = require("./routes/users");

app.listen(3005, () => {
  console.log("listing on port 3005");
});

//check daily in case server goes down temporarily
cron.schedule("0 0 * * *", () => {
  checkMonthDifference();
});

//backupData();
app.use("/users", userRouter);

app.use("/", mainRouter);
