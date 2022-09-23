import express, { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { connnectToDB } from "../config/dbconfig";
import { Users } from "../models/user.model";
import cors from "cors";
import { compare, hash } from "bcryptjs";
import { Workbook } from "exceljs";
import { validateSchema } from "../helpers/ValidateSchema";
import { readFileSync } from "fs";
import axios from "axios";


require("dotenv").config();

const app: express.Application = express();
app.use(cors());
app.use(express.json());

const PORT: number = Number(process.env.PORT);
const SECRET_KEY: any = Number(process.env.SECRET_TOKEN);

app.get("/getuser", async (req: Request, res: Response) => {
  // const SECRET_KEY: any = process.env.SECRET_TOKEN;

  const token: any = req.headers["x-access-token"];
  try {
    const verified: any = verify(token, SECRET_KEY);
    console.log(verified);
    if (!verified)
      res.status(401).json({ status: 500, message: "Unauthorized User" });

    const user: any = await Users.findOne({ email: verified.email });
    //TODO:: need to return the tasks user.tasks
    res.status(200).json({ status: 200, message: "Success", data: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 500, messsage: "Error" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  // const SECRET_KEY: any = process.env.SECRET_TOKEN;
  try {
    const user: any = await Users.findOne({
      email: req.body.email,
    });
    console.log(user);

    if (!user)
      res.status(404).json({ status: 500, message: "User does not exists" });

    const passwordIsValid = await compare(req.body.password, user.password);
    // console.log(user)/
    if (user && passwordIsValid) {
      const token = sign(
        {
          email: user.email,
          name: user.name,
          salary: user.salary,
          role: user.role,
        },
        SECRET_KEY
      );

      res.status(200).json({ status: 200, message: "Success", token });
    } else {
      res.status(400).json({ status: 500, message: "Error" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const validSchema: boolean = validateSchema(req.body);

    const userExists: any = Users.findOne({ email: req.body.email });

    if (userExists.name)
      res.status(404).json({ status: 500, message: "User already Exists" });

    if (!validSchema)
      res.status(500).json({ status: 500, message: "Invalid Details" });

    const hashedPassword: any = await hash(req.body.password, 10);
    await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      salary: req.body.salary,
      role: req.body.role,
    });
    res.status(200).json({ status: 200, message: "Success", data: [] });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 500, message: "Error" });
  }
});

app.post("/send-email", async (req: Request, res: Response) => {
  try {
    const token: any = req.headers["x-access-token"];

    const verified: any = verify(token, SECRET_KEY);
    console.log(verified);
    if (!verified)
      res.status(500).json({ status: 500, message: "Unauthorized User" });

    const options: any = {
      method: "POST",
      url: process.env.EMAIL_URL,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": process.env.HOST,
      },
      data: `{"personalizations":[{"to":[{"email":"arpit2252@gmail.com"}],"subject":"Hello, World!"}],"from":{"email":"arpit2252@gmail.com"},"content":[{"type":"text/plain","value":"Hello, World!"}]}`,
    };

    const response: any = await axios.request(options);
    console.log(response);
    const data = await response.json;

    res.status(200).json({ status: 200, message: "Email sent", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Error" });
  }
});

app.get("/getexcel", async (req: Request, res: Response) => {
  const token: any = req.headers["x-access-token"];

  try {
    const verified: any = verify(token, SECRET_KEY);

    if (!verified.name)
      res.status(500).json({ status: 500, message: "Unauthorized Access" });
    const users: any = await Users.find();

    const workbook: any = new Workbook();
    const worksheet: any = workbook.addWorksheet("UsersList");
    worksheet.columns = [
      { header: "S.no", key: "s_no", width: "12" },
      { header: "Name", key: "name", width: "12" },
      { header: "Email", key: "email", width: "12" },
      { header: "Role", key: "role", width: "12" },
      { header: "Salary", key: "salary", width: "12" },
      { header: "Password", key: "password", width: "12" },
    ];

    users.forEach((user: any, index: number) => {
      user.s_no = index + 1;
      worksheet.addRow(user);
    });

    workbook.xlsx.writeFile("UsersList.xlsx").then(async (data: any) => {
      const content: any = readFileSync("UsersList.xlsx");
      const buffer = new Buffer(content).toString("base64");

      res.status(200).json({ status: 200, message: "Success", data: buffer });
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
  connnectToDB();
});
