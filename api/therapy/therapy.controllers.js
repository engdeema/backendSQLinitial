const Therapy = require("../../models/Therapy");

exports.therapyListFetch = async (req, res, next) => {
  try {
    const therap = await Therapy.find().populate("therapists");
    return res.json(therap);
  } catch (error) {
    next(error);
  }
};

exports.createTherapy = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newTherapy = await Therapy.create(req.body);
    return res.status(201).json(newTherapy);
  } catch (error) {
    next(error);
  }
};
