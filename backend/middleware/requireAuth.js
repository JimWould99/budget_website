require("dotenv").config();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers);
  if (!authorization) {
    return res.status(401).json({ error: "Auth token required" });
  }
  const token = authorization.split(" ")[1];
  if (token === null) {
    return res.status(401).json({ error: "Auth token required" });
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.users.findUnique({
      where: {
        id: _id,
      },
      select: {
        id: true,
      },
    });
    next();
  } catch (error) {
    return res.status(403).json({ error: "token expired" });
  }
};

module.exports = requireAuth;
