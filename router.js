import express from "express";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send("userIndex"));
userRouter.get("/edit", (req, res) => res.send("userEdit"));
userRouter.get("/password", (req, res) => res.send("userPassword"));