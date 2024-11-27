import mongoose from "mongoose";

// const uri =
//   "mongodb+srv://ssrssr0095:123123123@cluster0.bita8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const NewYork =
//   "mongodb+srv://ssrssr0095:123456000@cluster-01.rruoa.mongodb.net/";

const local = "mongodb://localhost:27017/potato";

const connDB = async () => {
  await mongoose
    .connect(local)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("Connection error: ", err);
    });
};

export default connDB;
