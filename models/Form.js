const { model, Schema } = require("mongoose");

const FormSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    babyName: { type: String },
    birthDate: { type: String },
    mothersName: { type: String },
    phoneNumber: { type: String },
    anotherNumber: { type: String },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    diagnosis: { type: String },
    purposeOfConsul: { type: String },
    address: { type: String },
  },

  { timestamps: true }
);

module.exports = model("Form", FormSchema);
