const { model, Schema } = require("mongoose");
const PictureSliderSchema = Schema({
  name: { type: String },
  image: { type: String },
});

module.exports = model("PictureSliders", PictureSliderSchema);
