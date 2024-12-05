import mongoose from "mongoose";
import "dotenv/config";

const connDB = async () => {
  await mongoose
    .connect(process.env.DBSTRING)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("Connection error: ", err);
    });
};

export default connDB;
