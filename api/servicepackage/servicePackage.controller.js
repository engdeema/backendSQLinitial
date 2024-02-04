const ServicePackage = require("../../models/ServicePackage");
const mongoose = require("mongoose");

exports.serviceFetch = async (req, res, next) => {
  try {
    const services = await ServicePackage.find();
    return res.json(services);
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newService = await ServicePackage.create(req.body);
    return res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
};
