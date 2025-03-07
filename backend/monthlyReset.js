const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { backupData } = require("./backup_data");

exports.checkMonthDifference = async () => {
  let lastDate = await prisma.lastChecked.findMany({});
  lastDate = lastDate[0].date;
  let currentDate = new Date();
  if (
    (lastDate.getMonth() === 12 && currentDate.getMonth() === 1) ||
    lastDate.getMonth() < currentDate.getMonth()
  ) {
    backupData();
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
  const updatedExpenses = await prisma.expense.updateMany({
    where: {
      recurring: false,
    },
    data: {
      amount: 0,
    },
  });
  console.log(updatedExpenses);
};
