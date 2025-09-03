import { Request, Response } from "express";
import { getUserById, updateUserProfile } from "./users.service";
import { UpdateUserRequest } from "./users.types";

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Por ahora usamos un userId hardcodeado para probar
    // Después esto vendrá del middleware de auth: req.user.id
    const userId = req.params.userId || "temp-user-id";

    console.log(userId);

    const user = await getUserById(userId);

    res.status(200).json({
      message: "Perfil obtenido exitosamente",
      user
    });

  } catch (err: any) {
    res.status(404).json({
      error: err.message
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // Por ahora usamos un userId hardcodeado para probar
    const userId = req.params.userId || "temp-user-id";
    const updates: UpdateUserRequest = req.body;

    // Validaciones básicas
    if (updates.email && !isValidEmail(updates.email)) {
      return res.status(400).json({
        error: "Email inválido"
      });
    }

    const updatedUser = await updateUserProfile(userId, updates);

    res.status(200).json({
      message: "Perfil actualizado exitosamente",
      user: updatedUser
    });

  } catch (err: any) {
    if (err.message === 'No hay datos para actualizar') {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

// Helper function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};