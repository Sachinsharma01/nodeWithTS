import mongoose from "mongoose";

interface userDataInterface extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: any = new mongoose.Schema(
  {
    name: {
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
    salary: {
      type:Number,
      required: true,
    },
    role: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      default:[]
    }
  },
  { collection: "users" }
);

export const Users = mongoose.model<userDataInterface>("Users", userSchema);
