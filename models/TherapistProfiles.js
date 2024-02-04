const { model, Schema } = require("mongoose");
const TherapistProfilesSchema = Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    image: {
      type: String,
    },

    qualification: {
      type: String,
    },
    pastExp: {
      type: String,
    },

    bio: {
      type: String,
    },
    specialty: {
      type: String,
    },
    therapistID: {
      type: Schema.Types.ObjectId,
      ref: "Therapist",
    },
  },
  { timestamps: true }
);
module.exports = model("TherapistProfiles", TherapistProfilesSchema);
