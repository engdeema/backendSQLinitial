const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const authenticateToken = require("../../middleware/authenticateToken");

const { createForm, formFetch, getUserForm } = require("./form.controller");

router.get("/", formFetch);
router.get("/user", authenticateToken, getUserForm);
router.post("/", authenticateToken, upload.single("image"), createForm);

module.exports = router;
