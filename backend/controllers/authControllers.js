import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.status(201).json({
      message: "registered successfully",
      token

    });

  }catch (err) {
  return res.status(500).json({
    error: err.message
  });
}

}



export const login = async (req, res) => {


  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "invalid password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.json({
      message: "login successful",
      token,
        user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const profile = async(req,res)=>{
  const user =await User.findById(req.user.id);
  if (!user) {
  return res.status(404).json({
    error: "User not found"
  });
}
 return res.json(
         {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
  );
}