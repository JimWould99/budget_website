const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
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
  const { email, name, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Not a valid email" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }
  if (await userExists(email)) {
    return res.status(400).json({ error: "email in use" });
  }
  salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const new_user = await prisma.users.create({
    data: {
      email,
      name,
      username,
      password: hash,
    },
  });
  const token = createToken(new_user.id);
  console.log("new user", new_user);
  res.json({ new_user, token });
};
exports.login_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  const user = await userExists(email);
  if (!user) {
    return res.status(400).json({ error: "Incorrect email" });
  }
  const match = bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect password" });
  }
  // create a token
  const token = createToken(user.id);
  res.json({ mssg: email, token });
};
