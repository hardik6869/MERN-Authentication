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

exports.signup = signup;
