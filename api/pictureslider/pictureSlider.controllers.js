const PictureSlider = require("../../models/PictureSlider");

exports.fetchPictureSlider = async (req, res, next) => {
  try {
    const pictures = await PictureSlider.find();
    return res.json(pictures);
  } catch (error) {
    next(error);
  }
};

exports.createPictureSlider = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newPicture = await PictureSlider.create(req.body);
    return res.status(201).json(newPicture);
  } catch (error) {
    next(error);
  }
};
