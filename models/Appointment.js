const { model, Schema } = require("mongoose");

const AppointmentSchema = Schema(
  {
    therapist: { type: Schema.Types.ObjectId, ref: "Therapist" }, //id
    therapistName: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" }, //id
    userName: { type: String },
    status: { type: String, required: true, default: false },
    date: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Appointment", AppointmentSchema);
