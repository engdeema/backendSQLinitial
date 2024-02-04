const Form = require("../../models/Form");
const mongoose = require("mongoose");

exports.formFetch = async (req, res, next) => {
  try {
    const forms = await Form.find();
    return res.json(forms);
  } catch (error) {
    next(error);
  }
};

exports.getUserForm = async (req, res, next) => {
  try {
    const forms = await Form.findOne({ userId: req.user._id });
    return res.json(forms);
  } catch (error) {
    next(error);
  }
};

exports.createForm = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newForm = await Form.create({
      ...req.body,
      userId: req.user._id,
    });
    return res.status(201).json(newForm);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
