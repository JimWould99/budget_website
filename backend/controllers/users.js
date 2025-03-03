const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const userExists = async (inputEmail) => {
  const exists = await prisma.users.findUnique({
    where: {
      email: inputEmail,
    },
  });
  return exists;
};
exports.add_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Not a valid email" });
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    return res.status(400).json({
      error:
        "Password must be stronger (minimum 8 characters, 1 capital, 1 number)",
    });
  }
  if (await userExists(email)) {
    return res.status(400).json({ error: "email in use" });
  }
  salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const new_user = await prisma.users.create({
    data: {
      email,
      password: hash,
    },
  });
  let rent_id = `default_rent_${uuidv4()}`;
  let groceries_id = `default_groceries_${uuidv4()}`;
  let utilities_id = `default_utilities_${uuidv4()}`;
  await prisma.budget.create({
    data: {
      id: rent_id,
      name: "Rent",
      amount: 950,
      userId: new_user.id,
    },
  });
  await prisma.expense.create({
    data: {
      name: "current rent",
      amount: 800,
      recurring: true,
      budgetId: rent_id,
      userId: new_user.id,
    },
  });

  await prisma.budget.create({
    data: {
      id: groceries_id,
      name: "Groceries",
      amount: 450,
      userId: new_user.id,
    },
  });
  await prisma.expense.create({
    data: {
      name: "pantry staples ei.milk, eggs, bread",
      amount: 40,
      recurring: true,
      budgetId: groceries_id,
      userId: new_user.id,
    },
  });
  await prisma.expense.create({
    data: {
      name: "meat",
      amount: 80,
      recurring: true,
      budgetId: groceries_id,
      userId: new_user.id,
    },
  });
  await prisma.budget.create({
    data: {
      id: utilities_id,
      name: "Utilities",
      amount: 250,
      userId: new_user.id,
    },
  });
  await prisma.expense.create({
    data: {
      name: "water",
      amount: 50,
      recurring: true,
      budgetId: utilities_id,
      userId: new_user.id,
    },
  });
  await prisma.expense.create({
    data: {
      name: "gas",
      amount: 100,
      recurring: true,
      budgetId: utilities_id,
      userId: new_user.id,
    },
  });
  await prisma.expense.create({
    data: {
      name: "water",
      amount: 50,
      recurring: true,
      budgetId: utilities_id,
      userId: new_user.id,
    },
  });
  const token = createToken(new_user.id);
  res.json({ email, token });
};
exports.login_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  const user = await userExists(email);
  if (!user) {
    return res.status(400).json({ error: "Incorrect email or password" });
  }
  const match = bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect email or password" });
  }
  // create a token
  const token = createToken(user.id);
  res.json({ email, token });
};
