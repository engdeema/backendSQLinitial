const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

const { createTherapist, therapistFetch } = require("./therapist.controller");

router.get("/", therapistFetch);

router.post("/", upload.single("image"), createTherapist);

module.exports = router;
