const Therapist = require("../../models/Therapist");
const TherapistProfiles = require("../../models/TherapistProfiles");
const mongoose = require("mongoose");

exports.therapistFetch = async (req, res, next) => {
  console.log("getting by categry");
  try {
    const { therapyID } = req.query;
    let where = {};
    console.log(req.query);
    if (therapyID) {
      where = { therapyIDs: therapyID };
    }
    let result = [];
    const therap = await Therapist.find(where);
    for (therapist of therap) {
      if (therapist.therapistProfileID) {
        const therapyProfile = await TherapistProfiles.findOne({
          id: therapist.therapistProfileID,
        });
        result.push({ ...therapist._doc, therapyProfile });
      }
    }
    console.log(result);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.createTherapist = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const { name, image, therapyIDs, ...profileData } = req.body;

    const newTherapist = await Therapist.create({
      name,
      image,
      therapyIDs: therapyIDs
        .split(",")
        .map((therapyID) => mongoose.Types.ObjectId(therapyID)),
    });
    console.log(therapyIDs.split(","));
    const newProfile = await TherapistProfiles.create({
      ...profileData,
      therapistID: newTherapist._id,
    });

    await Therapist.findByIdAndUpdate(newTherapist._id, {
      therapistProfileID: newProfile._id,
    });

    return res.status(201).json(newTherapist);
  } catch (error) {
    next(error);
  }
};
