const { model, Schema } = require("mongoose");

const ProgramsCalanderSchema = Schema(
  {
    date: { type: Date },
    time: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    therapyId: { type: Schema.Types.ObjectId, ref: "therapies" },
    therapistId: { type: Schema.Types.ObjectId, ref: "Therapist" },
  },
  { timestamps: true }
);

module.exports = model("ProgramsCalander", ProgramsCalanderSchema);
