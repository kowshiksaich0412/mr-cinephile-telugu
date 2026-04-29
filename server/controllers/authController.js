import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET is not set"); })(),
    {
      expiresIn: "7d"
    }
  );

export const seedAdminIfMissing = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const exists = await User.findOne({ email });
  if (exists) return;

  await User.create({
    username: "admin",
    email,
    password,
    role: "admin"
  });
  console.log("Admin account created from env credentials");
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const matched = await user.comparePassword(password);
  if (!matched) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user);
  return res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
};
