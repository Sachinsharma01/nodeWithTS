import mongoose from "mongoose";

export  const connnectToDB = async () => {
  try {
    const URI: any = process.env.DB_URI;
    await mongoose.connect(URI).then(() => {
      console.log("DB CONNECTED");
    });
  } catch (err) {
    console.log(err);
  }
};