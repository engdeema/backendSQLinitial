const mongoose = require("mongoose");
const Appointment = require("../../models/Appointment");
const Therapist = require("../../models/Therapist");

exports.appointmentFetch = async (req, res, next) => {
  try {
    const appointment = await appointment.find();
    return res.json(appointment);
  } catch (error) {
    next(error);
  }
};

exports.createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.count({ time: req.body.time }); // it means =
    const selection = await Appointment.count({
      time: req.body.time,
      therapist: req.body.therapist,
    });
    if (appointment > 3 || selection > 0) {
      return res.status(403).send("Full of appointments");
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newAppointment = await Appointment.create(req.body);
    // sendConfirmEmail(
    //   req.body.email,
    //   `<h1>
    //   Appointment confirmation</h1>
    //   <a href="http://localhost:3000/activate-account/${req.body.resetToken}">activate my account</a>`,
    //   `open this link to activate you account http://localhost:3001/activate-account/${req.body.resetToken}`,
    //   "confirm email"
    // );
    return res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

exports.verifyTimeSlot = async (req, res, next) => {
  try {
    // recive the time slot from the param once the user booked an appointment
    // it will check wheather this time slot is available or not
    // first we need to save the booked houe
    const hour = req.params.hour;
    // fetch the appointment when the time = that hour
    const appointment = await Appointment.count({ time: hour }); // it means =
    const selection = await Appointment.count({
      time: hour,
      therapist: req.body.therapist,
    }); // check if that the therapist has only one patient on that time
    return res.json({ available: appointment < 4 && selection < 1 }); // because find will return multiple values " in json available returns  true or false"
  } catch (error) {
    next(error);
  }
};
