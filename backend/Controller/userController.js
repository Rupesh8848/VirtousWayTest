const userModel = require("../Model/userModel");
const generateToken = require("../genereateToken");
const bcrypt = require("bcryptjs");

const userRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.json({
      exception: true,
      error: "User already exists with given email.",
    });
  }

  const user = new userModel({
    firstName,
    lastName,
    email,
    password,
  });

  const savedUser = await user.save();

  const token = generateToken(savedUser._id);

  return res.send({ userName: savedUser.userName, token });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({ exception: true, error: "Email address doesn't exist." });
  }

  const userIsValid = await bcrypt.compare(password, user.password);
  if (!userIsValid) {
    return res.json({ exception: true, error: "Password doesn't match." });
  }

  const token = await generateToken(user._id);

  return res.json({ userName: user.userName, token });
};

module.exports = { userRegister, userLogin };
