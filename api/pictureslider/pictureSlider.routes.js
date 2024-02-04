const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

const {
  fetchPictureSlider,
  createPictureSlider,
} = require("./pictureSlider.controllers");

router.get("/", fetchPictureSlider);
router.post("/", upload.single("image"), createPictureSlider);

module.exports = router;
