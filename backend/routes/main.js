const express = require("express");
const router = express.Router();

const display_controller = require("../controllers/show");
const add_controller = require("../controllers/add");

const edit_controller = require("../controllers/edit");
const delete_controller = require("../controllers/delete");

//display
router.get("/display_budget", display_controller.display_budget);
router.get("/display_expense", display_controller.display_expense);
//add
router.post("/add_budget", add_controller.add_budget);
router.post("/add_expense", add_controller.add_expense);
// edit
router.post("/edit_budget", edit_controller.edit_budget);
router.post("/edit_expense", edit_controller.edit_expense);
//remove
router.post("/remove_budget", delete_controller.delete_budget);
router.post("/remove_expense", delete_controller.delete_expense);

module.exports = router;
