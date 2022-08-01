import mongoose from "mongoose";

export  const connnectToDB = async () => {
  try {
    const URI: any = process.env.DB_URI;
    await mongoose.connect("mongodb+srv://sachin006:sachin006@cluster0.hel6j.mongodb.net/NodeUsers").then(() => {
      console.log("DB CONNECTED");
    });
  } catch (err) {
    console.log(err);
  }                                                                                                                      
};