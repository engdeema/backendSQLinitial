const ContactUs = require("../../models/ContactUs");
const mongoose = require("mongoose");

exports.contactUsFetch = async (req, res, next) => {
  try {
    const contact = await ContactUs.find();
    return res.json(contact);
  } catch (error) {
    next(error);
  }
};

exports.createContactUs = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newContact = await ContactUs.create(req.body);
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
