import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const {email, password, name} = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required.");
    }

    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      // 24 hours
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 
    })

    // Save to database
    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id)

    // 201 status means something was created?
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })

  } catch (error) {
    res.status(400).json({success: false, message: error.message})
  }
}

export const login = async (req, res) => {
  res.send("login route");
}

export const logout = async (req, res) => {
  // Clear the cookie to logout
  res.clearCookie("token");
  res.status(200).json({success: true, message: "Logged out successfully."})
}