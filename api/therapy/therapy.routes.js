const express = require("express");

const upload = require("../../middleware/multer");

const { therapyListFetch, createTherapy } = require("./therapy.controllers");
const router = express.Router();

router.get("/", therapyListFetch);
router.post("/", upload.single("image"), createTherapy);

module.exports = router;
