const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.checkMonthDifference = async () => {
  let lastDate = await prisma.lastChecked.findMany({});
  lastDate = lastDate[0].date;
  let currentDate = new Date();
  if (
    (lastDate.getMonth() === 12 && currentDate.getMonth() === 1) ||
    lastDate.getMonth() === currentDate.getMonth()
  ) {
    monthlyReset();
  } else {
    console.log("same month");
  }
  const remove = await prisma.lastChecked.delete({
    where: {
      id: "3b1ac58b-4b33-46f7-8202-53d4898635c1",
    },
  });
  const addNew = await prisma.lastChecked.create({
    data: {
      id: "3b1ac58b-4b33-46f7-8202-53d4898635c1",
      date: currentDate,
    },
  });
};

const monthlyReset = async () => {
  console.log("reset");
};

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
