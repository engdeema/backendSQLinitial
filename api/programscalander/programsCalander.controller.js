const ProgramsCalander = require("../../models/ProgramsCalander");

exports.fetchProgramsCalander = async (req, res, next) => {
  try {
    const calanders = await ProgramsCalander.find();
    return res.json(calanders);
  } catch (error) {
    next(error);
  }
};

exports.createPProgramsCalander = async (req, res, next) => {
  try {
    console.log(req.body);
    const countTime = await ProgramsCalander.count({ time: req.body.time }); // it means =
    const selection = await ProgramsCalander.count({
      time: req.body.time,
      therapistId: req.body.therapistId,
    });
    if (countTime > 3 || selection > 0) {
      return res.status(403).send("Full of appointments");
    }
    console.log(req.user);
    const newCalander = await ProgramsCalander.create({
      ...req.body,
      userId: req.user._id,
    });
    sendConfirmEmail(
      req.user.email,
      `<h1>
      Appointment confirmation details</h1>
     
      <ul>
      <li>patient name: <strong>${req.user.username}</strong>  </li>
     <li> mobile number:  <strong>${req.user.mobilenumber}</strong>  </li>
     <li> appointment details: ${newCalander}</li>
      </ul>
      `,
      `open this link to activate you account http://localhost:3001/activate-account/${req.body.resetToken}`,
      "confirm email"
    );
    return res.status(201).json(newCalander);
  } catch (error) {
    next(error);
  }
};

// try {
//   const appointment = await Appointment.count({ time: req.body.time }); // it means =
//   const selection = await Appointment.count({
//     time: req.body.time,
//     therapist: req.body.therapist,
//   });
//   if (appointment > 3 || selection > 0) {
//     return res.status(403).send("Full of appointments");
//   }
//   if (req.file) {
//     req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
//   }
//   const newAppointment = await Appointment.create(req.body);
//   return res.status(201).json(newAppointment);
// } catch (error) {
//   next(error);
// }
