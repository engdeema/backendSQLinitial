const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const sendConfirmEmail = require("../emailTransport");
const uuid = require("uuid");

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    mobilenumber: user.mobilenumber,
    exp: Date.now() + JWT_EXPIRATION_MS, //نزيد عليه الاكسباير
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    req.body.resetToken = uuid.v4(); // fourth version on the id generator
    req.body.resetTokenExpiry = new Date(new Date().getTime() + 15 * 60000); // () in getTime means current time
    await User.create({ ...req.body, active: false }); // so when you send it without "false" it can send anything from the modal " he is a new user but inactive"
    sendConfirmEmail(
      req.body.email,
      `<h1>
      click on the link below to activate your account</h1>
      <a href="http://localhost:3000/activate-account/${req.body.resetToken}">activate my account</a>`,
      `open this link to activate you account http://localhost:3001/activate-account/${req.body.resetToken}`,
      "confirm email"
    );
    console.log(req.body.resetToken);
    // const token = generateToken(newUser);
    // res gives me the token
    res.send("an email has been sent to you, verify your account");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ mobilenumber: req.body.mobilenumber });
  if (user) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.json({ error: "sorry wrong credentials" });
  }
};

exports.activateAccount = async (req, res, next) => {
  // now we get our toke
  const { resetToken } = req.params;
  // check if the token is valid
  try {
    const user = await User.findOne({
      resetToken,
    });
    if (!user) {
      return res
        .status(401)
        .send("your account can not be verified,Please login again");
    }
    const now = new Date();
    // can not accept tokens that passed the expiry date
    if (user.resetTokenExpiry < now) {
      return res
        .status(400)
        .send("you have missed the verification time,Please try again");
    }
    console.log(user);
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { active: true },
      {
        new: true,
      }
    );
    if (!updateUser) {
      return res.status(500).send("ERROR!");
    }
    // after he confirms his email, we send him token to login to dashboard by json
    const token = generateToken(updateUser);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

//Get User
exports.UserProfile = async (req, res, next) => {
  try {
    await User.findById(req.user);
    res.status(200).json(req.user.profile);
  } catch (error) {
    next(error);
  }
};

// UPDATE PROFILE
exports.updateUserProfile = async (req, res, next) => {
  try {
    const profile = { profile: req.body };
    const updated = await User.findByIdAndUpdate(req.user._id, profile, {
      new: true,
    });
    return res.status(201).json(updated);
  } catch (error) {
    return next(error);
  }
};
