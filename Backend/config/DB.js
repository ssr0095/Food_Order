import mongoose from "mongoose";

const connDB = async () => {
  await mongoose
    .connect(process.env.DBSTRING)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("Connection error: ", err);
    });

  // mongoose.set("useFindAndModify", false);
};

export default connDB;
