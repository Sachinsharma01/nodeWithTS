import express, { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { connnectToDB } from "../config/dbconfig";
import { Users } from "../models/user.model";
import cors from "cors";
import { compare, hash } from "bcryptjs";
require("dotenv").config();

const app: express.Application = express();
app.use(cors());
app.use(express.json());

const PORT: any = process.env.PORT;

app.get("/tasks", async (req: Request, res: Response) => {
  const SECRET_KEY: any = process.env.SECRET_TOKEN;

  const token: any = req.headers["x-access-token"];
  try {
    const verified: any = verify(token, SECRET_KEY);

    const user = await Users.findOne({ email: verified.email });

    res.status(200).json({ status: 200, message: "Success" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const SECRET_KEY: any = process.env.SECRET_TOKEN;
  try {
    const user: any = await Users.findOne({
      email: req.body.email,
    });

    if (!user)
      res
        .status(400)
        .json({ status: "Error", message: "User does not exists" });

    const passwordIsValid = await compare(req.body.password, user.password);
    // console.log(user)/
    if (user && passwordIsValid) {
      const token = sign(
        {
          email: req.body.email,
          userName: req.body.name,
        },
        SECRET_KEY
      );

      res.status(200).json({ status: 200, message: "Success", user: token });
    } else {
      res.status(400).json({ status: 400, message: "Error" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const hashedPassword: any = await hash(req.body.password, 10);
    await Users.create({
      userName: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.json({ status: 200, message: "Success", tasks: [{}, {}] });
  } catch (err) {
    console.log(err);
    res.json({ status: 400, message: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
  connnectToDB();
});
