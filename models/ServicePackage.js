const { model, Schema } = require("mongoose");

const ServicePackageSchema = Schema(
  {
    name: { type: String },
    price: { type: String },
    details: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = model("ServicePackage", ServicePackageSchema);
