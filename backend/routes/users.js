const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/users");

router.post("/add_user", user_controller.add_user);
router.post("/login_user", user_controller.login_user);

module.exports = router;
