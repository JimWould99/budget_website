const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.edit_budget = async (req, res) => {
  res.json({ mssg: "Not yet implemented" });
};

exports.edit_expense = async (req, res) => {
  let { id, name, newAmount, budgetId, createdAt } = await req.body;
  const userId = req.user.id;
  newAmount = parseInt(newAmount);
  const deleteExpense = await prisma.expense.delete({
    where: {
      id: req.body.id,
    },
  });
  const editedExpense = await prisma.expense.create({
    data: {
      id: req.body.id,
      name,
      amount: newAmount || 0,
      budgetId,
      userId,
      createdAt,
    },
  });
  res.json({ id, name, amount: newAmount, budgetId, userId, createdAt });
};
