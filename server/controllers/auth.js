import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../middleware/cloudinary.js";

export const register = async (req, res) => {
  let cloudinaryPicture;
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    ocupation,
  } = req.body;
  console.log(req.body);
  try {
    if (picturePath) {
      cloudinaryPicture = await cloudinary.uploader.upload(picturePath);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      ocupation,
      //for ui purposes
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    console.log(user);
    //delete user.passwor;
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
