const express = require("express");
const { signup, signin, activateAccount } = require("./users.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/activate-account/:resetToken", activateAccount);

module.exports = router;
