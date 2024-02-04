const { model, Schema } = require("mongoose");
const TherapistSchema = Schema(
  {
    name: { type: String },
    image: { type: String },
    // bio: { type: String }, because i have added the bio in profile
    therapyIDs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Therapy",
      },
    ],
    therapistProfileID: {
      type: Schema.Types.ObjectId,
      ref: "TherapistProfiles",
    },

    booked: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true }
);

module.exports = model("Therapist", TherapistSchema);
