const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

const { createService, serviceFetch } = require("./servicePackage.controller");

router.get("/", serviceFetch);

router.post("/", upload.single("image"), createService);

module.exports = router;
