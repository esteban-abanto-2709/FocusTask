import { Request, Response } from "express";
import { register, login } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email y password son requeridos"
      });
    }

    const user = await register(email, password);
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email y password son requeridos"
      });
    }

    const result = await login(email, password);

    res.status(200).json({
      message: "Login exitoso",
      user: result.user,
      access_token: result.session.access_token,
      refresh_token: result.session.refresh_token,
      expires_at: result.session.expires_at,
      expires_in: result.session.expires_in
    });

  } catch (err: any) {
    res.status(401).json({
      error: err.message
    });
  }
};