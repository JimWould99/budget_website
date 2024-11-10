const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.add_budget = async (req, res) => {
  let { name, amount } = req.body;
  const { id } = req.user;
  amount = parseInt(amount);
  const new_budget = await prisma.budget.create({
    data: {
      name,
      amount,
      userId: id,
    },
  });
  // console.log(new_budget);
  res.json({ mssg: new_budget });
};

exports.add_expense = async (req, res) => {
  let { name, amount, recurring, budgetId } = req.body;
  const userId = req.user.id;
  amount = parseInt(amount);
  const new_expense = await prisma.expense.create({
    data: {
      name,
      amount,
      recurring,
      budgetId,
      userId,
    },
  });
  const { id, createdAt } = new_expense;
  res.json({ name, amount, recurring, id, budgetId, userId, createdAt });
};
