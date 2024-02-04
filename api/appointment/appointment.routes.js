const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

const {
  createAppointment,
  verifyTimeSlot,
} = require("./appointment.controller");

router.get("/:hour", verifyTimeSlot);

router.post("/", upload.single("image"), createAppointment);

module.exports = router;
