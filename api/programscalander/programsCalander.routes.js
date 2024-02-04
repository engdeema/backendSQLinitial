const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middleware/authenticateToken");

const {
  fetchProgramsCalander,
  createPProgramsCalander,
} = require("./programsCalander.controller");

router.get("/", fetchProgramsCalander);
router.post("/", authenticateToken, createPProgramsCalander);

module.exports = router;
