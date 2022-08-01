import mongoose from "mongoose";

interface userDataInterface extends mongoose.Document {
  userName: string;
  email: string;
  password: string;
}

const userSchema: any = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      default:[]
    }
  },
  { collection: "users" }
);

export const Users = mongoose.model<userDataInterface>("Users", userSchema);
