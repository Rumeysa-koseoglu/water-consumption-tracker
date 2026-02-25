import express, { type Request, type Response } from "express";
import { user } from "../models/user.js";

const router = express.Router();

// Auth Routes

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    return res.status(200).json({
      message: "Logged in successfully!",
      authenticated: true,
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
    authenticated: false,
  });
});
export default router;
