import { Router } from "express";
import {
  createTaskHandler,
  getTasksHandler,
  getTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getStatsHandler
} from "./tasks.controller";

const router = Router();

// Rutas para tareas
router.post("/:userId/create", createTaskHandler);
router.get("/:userId/getTasks", getTasksHandler);
router.get("/:userId/stats", getStatsHandler);
router.get("/:userId/getTask/:taskId", getTaskHandler);
router.put("/:userId/update/:taskId", updateTaskHandler);
router.delete("/:userId/delete/:taskId", deleteTaskHandler);

export default router;