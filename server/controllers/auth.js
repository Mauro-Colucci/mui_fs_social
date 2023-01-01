import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../middleware/cloudinary.js";

export const register = async (req, res) => {
  let cloudinaryPicture;
  const { firstName, lastName, email, friends, location, occupation } =
    req.body;
  try {
    if (req.file) {
      cloudinaryPicture = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "muiSocial",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath: cloudinaryPicture.secure_url || "",
      friends,
      location,
      occupation,
      //for ui purposes
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const { password, ...others } = user._doc;
    res.status(201).json(others);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;
    res.status(200).json({ token, user: others });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
