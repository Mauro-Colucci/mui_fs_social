import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to ${conn.connection.name} DB`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
