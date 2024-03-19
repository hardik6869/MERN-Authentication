const User = require("../model/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "user already exists! Login Instead" });
  }

  const hashPassowrd = bcrypt.hashSync(password);
  const user = new User({ name, email, password: hashPassowrd });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ message: user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return new Error(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please!" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email / Password" });
  }
  return res.status(200).json({ message: "SuccessFully LoggedIn" });
};

exports.signup = signup;
exports.login = login;
