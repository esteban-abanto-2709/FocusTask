import { Request, Response } from "express";
import {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} from "./tasks.service";
import { CreateTaskRequest, UpdateTaskRequest, TasksQuery } from "./tasks.types";

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    // Por ahora usamos userId del parámetro, después vendrá del middleware de auth
    const userId = req.params.userId;
    const taskData: CreateTaskRequest = req.body;

    // Validaciones básicas
    if (!taskData.title || taskData.title.trim() === '') {
      return res.status(400).json({
        error: "El título es requerido"
      });
    }

    if (taskData.title.length > 255) {
      return res.status(400).json({
        error: "El título no puede exceder 255 caracteres"
      });
    }

    const task = await createTask(userId, taskData);

    res.status(201).json({
      message: "Tarea creada exitosamente",
      task
    });

  } catch (err: any) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getTasksHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Construir query desde query params
    const query: TasksQuery = {};

    if (req.query.status) {
      query.status = req.query.status as any;
    }

    if (req.query.priority) {
      query.priority = req.query.priority as any;
    }

    if (req.query.limit) {
      query.limit = parseInt(req.query.limit as string);
    }

    if (req.query.offset) {
      query.offset = parseInt(req.query.offset as string);
    }

    const tasks = await getTasksByUser(userId, query);

    res.status(200).json({
      message: "Tareas obtenidas exitosamente",
      tasks,
      count: tasks.length
    });

  } catch (err: any) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getTaskHandler = async (req: Request, res: Response) => {
  try {
    const { userId, taskId } = req.params;

    const task = await getTaskById(taskId, userId);

    res.status(200).json({
      message: "Tarea obtenida exitosamente",
      task
    });

  } catch (err: any) {
    if (err.message === 'Tarea no encontrada') {
      return res.status(404).json({
        error: err.message
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const { userId, taskId } = req.params;
    const updates: UpdateTaskRequest = req.body;

    // Validaciones
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "No hay datos para actualizar"
      });
    }

    if (updates.title && updates.title.length > 255) {
      return res.status(400).json({
        error: "El título no puede exceder 255 caracteres"
      });
    }

    const task = await updateTask(taskId, userId, updates);

    res.status(200).json({
      message: "Tarea actualizada exitosamente",
      task
    });

  } catch (err: any) {
    if (err.message === 'Tarea no encontrada') {
      return res.status(404).json({
        error: err.message
      });
    }

    res.status(400).json({
      error: err.message
    });
  }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const { userId, taskId } = req.params;

    await deleteTask(taskId, userId);

    res.status(200).json({
      message: "Tarea eliminada exitosamente"
    });

  } catch (err: any) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getStatsHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const stats = await getTaskStats(userId);

    res.status(200).json({
      message: "Estadísticas obtenidas exitosamente",
      stats
    });

  } catch (err: any) {
    res.status(500).json({
      error: err.message
    });
  }
};