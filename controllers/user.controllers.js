const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //unique email
    const userToFinde = await User.findOne({ email });
    if (userToFinde) {
      return res
        .status(400)
        .send({ errors: [{ msg: "email should be uinque" }] });
    }
    //hash password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({ ...req.body });
    newUser.password = hashedPassword;

    await newUser.save();
    //token
    const token = await jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .send({ msg: "user signUp successfully", user: newUser, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "user can not signUp", error }] });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    //unique email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Bad crédential : email !" }] });
    }
    //compare password
    const testPassword = await bcrypt.compare(password, foundUser.password);
    if (!testPassword) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Bad crédential : password !" }] });
    }
    //token
    const token = await jwt.sign(
      { id: foundUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.send({ msg: "user signin successfully ", user: foundUser, token });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: "user cant singin, plz try again !!" }] });
  }
};
