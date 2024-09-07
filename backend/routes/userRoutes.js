import express from "express";
import { z } from "zod";
import { User } from "../model/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
const router = express.Router();

const signupSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Username already exist / Input invalid",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Username already exist / Input invalid",
    });
  }

  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });

  const userID = newUser._id;

  const token = jwt.sign(
    {
      userID,
    },
    JWT_SECRET,
  );
  res.json({
    message: "User created Successfully!!",
    token: token,
  });
});

export default router;
