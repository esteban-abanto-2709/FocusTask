import { Request, Response } from "express";
import { register } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await register(email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};