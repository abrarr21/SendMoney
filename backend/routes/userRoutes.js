import express from "express";
import { z } from "zod";
import { Account, User } from "../model/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

const signupSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string().email(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
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

  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });

  const userId = user._id;

  //Adding random Balance for user on signup

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
  );
  res.json({
    message: "User created Successfully!!",
    token: token,
  });
});

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already exist / Incorrect Inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.json({
      token: token,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in ",
  });
});

const updatebodySchema = z.object({
  password: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updatebodySchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information!!",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "Updated Successfully!!",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstname: { $regex: filter },
      },
      { lastname: { $regex: filter } },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

export default router;
