import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const generateRefereshToken = (user) => {
  return Jwt.sign({ email: user.email }, process.env.REFRESHTOKEN, {
    expiresIn: "2d",
  });
};
const generateAceesToken = (user) => {
  return Jwt.sign({ email: user.email }, process.env.REFRESHTOKEN, {
    expiresIn: "7d",
  });
};
const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname)
    return res.status(400).json({ message: "Fullname is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User Already Register Try To Use Different Email" });
    const userData = await User.create({ fullname, email, password });
    res.status(201).json({ message: "User Register Successfully", userData });
  } catch (error) {
    res.status(500).json({ message: "Error Occured" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No User Found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Incorrect Password" });
    const refreshToken = generateRefereshToken(user);
    const accessToken = generateAceesToken(user);
    res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Occured" });
  }
};

export { signUp, signIn };
