const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

//Routes
const therapyRoutes = require("./api/therapy/therapy.routes");
const pictureSliderRoutes = require("./api/pictureslider/pictureSlider.routes");
const therapistRoutes = require("./api/therapist/therapist.routes");
const uploadRoutes = require("./api/upload");
const userRoutes = require("./api/users/users.routes");
const serviceRoutes = require("./api/servicepackage/servicePackage.routes");
const formRoutes = require("./api/form/form.routes");
const contactUsRoutes = require("./api/contactus/contactUs.routes");
// const profileRoutes = require("./api/contactus/contactUs.routes");
const appointmentRoutes = require("./api/appointment/appointment.routes");
const programsCalanderRoutes = require("./api/programscalander/programsCalander.routes");

const passport = require("passport");
// const { localStrategy, jwtStrategy } = require("./middleware/passport");
//DB
const connectDB = require("./db");

//Middleware
const logger = require("./middleware/logger");

const errorHandler = require("./middleware/errorHandler");

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
// app.use(passport.initialize());

// passport.use(localStrategy);
// passport.use(jwtStrategy);

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/therapies", therapyRoutes);
app.use("/api/pictureSliders", pictureSliderRoutes);
app.use("/api/therapist", therapistRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/contactUs", contactUsRoutes);
app.use("/api/TherapistProfiles", contactUsRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/programsCalander", programsCalanderRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

app.use(errorHandler);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
