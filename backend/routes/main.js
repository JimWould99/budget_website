const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

const display_controller = require("../controllers/show");
const add_controller = require("../controllers/add");

const edit_controller = require("../controllers/edit");
const delete_controller = require("../controllers/delete");

//note- fire middleware here to make sure user is logged in
//checks json web token

//display
router.post("/display_budgets", display_controller.display_budget);
router.post("/display_expenses", display_controller.display_expense);
router.post("/display_all_expenses", display_controller.display_expenses);
router.post("/display_user", display_controller.display_user);
//add
router.post("/add_budget", add_controller.add_budget);
router.post("/add_expense", add_controller.add_expense);

//router.post("/add_user", add_controller.add_user);
//router.post("/login_user", add_controller.login_user);
// edit
router.post("/edit_budget", edit_controller.edit_budget);
router.post("/edit_expense", edit_controller.edit_expense);
//remove
router.post("/delete_budget", delete_controller.delete_budget);
router.post("/delete_expense", delete_controller.delete_expense);
router.post("/delete_user", delete_controller.delete_user);

module.exports = router;
