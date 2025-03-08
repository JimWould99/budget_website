const { PrismaClient } = require("@prisma/client");
const { all } = require("./routes/main");
const prisma = new PrismaClient();

exports.backupData = async () => {
  //const newBackup =
  const allUsers = await prisma.users.findMany({});
  const allBudgets = await prisma.budget.findMany({});
  const allExpenses = await prisma.expense.findMany({});
  // structure  {userid: id, amountSpend: y, amountBudgeted: x }
  // array [{userid: id, amountSpend: y, amountBudgeted: x }, {userid: id, amountSpend: y, amountBudgeted: x }]

  allUsers.forEach(async (user) => {
    userObject = { amountBudgeted: 0, amountSpend: 0 };
    allBudgets.forEach((budget) => {
      if (budget.userId === user.id) {
        userObject.amountBudgeted += budget.amount;
      }
    });
    allExpenses.forEach((expense) => {
      if (expense.userId === user.id) {
        userObject.amountSpend += expense.amount;
      }
    });
    const newHistorical = await prisma.dataSnapshot.create({
      data: {
        userId: user.id,
        amoundSpent: userObject.amountSpend,
        amountBudgeted: userObject.amountBudgeted,
      },
    });
  });

  console.log("test backup");
};
