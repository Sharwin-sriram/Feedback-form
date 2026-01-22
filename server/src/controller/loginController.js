import Login from "../models/Login.js";
import bcrypt from "bcrypt";
import { serverError } from "../Errors/serverError.js";

export async function login(req, res) {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await Login.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid Username" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (er) {
    console.log("Error in Login controller", er);
    serverError(req, res);
  }
}

export async function signUp(req, res) {
  try {
    const { username, email, mobile, password, confirmPassword } = req.body;

    if (!username || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input type" });
    }

    if (username.length < 3 || username.length > 16) {
      return res
        .status(400)
        .json({ message: "Username must be 3-16 characters long" });
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .json({ message: "Username can contain only letters, numbers, _" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await Login.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Login({
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    console.error("Error in signUp controller:", err);
    serverError(req, res);
  }
}

export async function getUSers(req, res) {
  try {
    const users = await Login.find();
    res.status(200).json(users);
  } catch (er) {
    console.log(er);
  }
}
