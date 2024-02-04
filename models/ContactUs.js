const { model, Schema } = require("mongoose");
const ContactUsSchema = Schema({
  name: { type: String },
  image: { type: String },
});

module.exports = model("ContactUs", ContactUsSchema);
