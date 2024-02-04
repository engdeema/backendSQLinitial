const { model, Schema } = require("mongoose");

const TherapySchema = Schema(
  {
    name: { type: String },
    image: { type: String },
    therapists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Therapist",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("therapies", TherapySchema);
