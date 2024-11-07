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
  let { name, amount, budgetId } = req.body;
  amount = parseInt(amount);
  const new_expense = await prisma.expense.create({
    data: {
      name,
      amount,
      budgetId,
    },
  });
  const { id, createdAt } = new_expense;
  res.json({ id, createdAt, name, amount, budgetId });
};
