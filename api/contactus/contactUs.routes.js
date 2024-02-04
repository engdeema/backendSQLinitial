const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

const { contactUsFetch, createContactUs } = require("./contactUs.controller");

router.get("/", contactUsFetch);

router.post("/", upload.single("image"), createContactUs);

module.exports = router;
