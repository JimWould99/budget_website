const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.checkMonthDifference = async () => {
  let lastDate = await prisma.lastChecked.findMany({});
  lastDate = lastDate[0].date;
  let currentDate = new Date();
  if (lastDate.getMonth() < currentDate.getMonth()) {
    //const delete = await prisma.lastChecked.delete({})
    console.log("month change");
  } else {
    console.log("same month");
  }
};

//const monthlyReset = async;

/*
exports.monthlyReset = async () => {
  console.log("test");

  cron.schedule("0 * * * * *", () => {
    console.log("running a task every minute");
  });

  cron.schedule("0 0 1 * *", () => {
    console.log("running a task every second");
  });
};*/
