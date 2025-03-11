const { PrismaClient } = require("@prisma/client");
const { all } = require("./routes/main");
const prisma = new PrismaClient();

exports.backupData = async () => {
  //const newBackup =
  const allUsers = await prisma.users.findMany({});
  const allBudgets = await prisma.budget.findMany({});
  const allExpenses = await prisma.expense.findMany({});
  // structure  {userid: id, amountSpent: y, amountBudgeted: x }
  // array [{userid: id, amountSpent: y, amountBudgeted: x }, {userid: id, amountSpent: y, amountBudgeted: x }]

  allUsers.forEach(async (user) => {
    userObject = { amountBudgeted: 0, amountSpent: 0 };
    allBudgets.forEach((budget) => {
      if (budget.userId === user.id) {
        userObject.amountBudgeted += budget.amount;
      }
    });
    allExpenses.forEach((expense) => {
      if (expense.userId === user.id) {
        userObject.amountSpent += expense.amount;
      }
    });
    const newHistorical = await prisma.dataSnapshot.create({
      data: {
        userId: user.id,
        amountSpent: userObject.amountSpent,
        amountBudgeted: userObject.amountBudgeted,
      },
    });
  });

  // console.log("test backup");
};
