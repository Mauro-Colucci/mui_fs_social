import mongoose from "mongoose";
/* import { users, posts } from "./seed.js";
import User from "../models/User.js";
import Post from "../models/Post.js"; */

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    /*  User.insertMany(users);
    Post.insertMany(posts); */
    console.log(`connected to ${conn.connection.name} DB`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
