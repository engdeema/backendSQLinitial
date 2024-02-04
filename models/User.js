const { model, Schema } = require("mongoose");
const UserSchema = Schema({
  username: String,
  mobilenumber: { type: String, unique: true },
  password: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  resetToken: { type: String, unique: true },
  resetTokenExpiry: Date, // time at which this token is still valid
  active: { type: Boolean, default: false }, // active user or not
  profile: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    timeOfBooking: { type: String },
    dateOfBooking: { type: Date },
    bookedBy: [{ type: Schema.Types.ObjectId, ref: "Therapist" }],
  },
});

module.exports = model("User", UserSchema);
