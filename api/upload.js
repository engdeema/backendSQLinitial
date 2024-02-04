const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const { uploadFile } = require("./upload.controller");

router.post("/", upload.array("files", 10), uploadFile);

module.exports = router;
