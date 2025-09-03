import { getSupabaseClient } from "@/shared/config/supabase";
import logger from "@/shared/utils/logger";
import { Task, CreateTaskRequest, UpdateTaskRequest, TasksQuery } from "./tasks.types";

export const createTask = async (userId: string, taskData: CreateTaskRequest): Promise<Task> => {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority || 'medium',
        user_id: userId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      logger.error(`Error creando tarea: ${error.message}`);
      throw new Error('Error al crear la tarea');
    }

    logger.info(`Tarea creada: ${data.id} para usuario: ${userId}`);
    return data;

  } catch (err: any) {
    logger.error(`Error en servicio createTask: ${err.message}`);
    throw err;
  }
};

export const getTasksByUser = async (userId: string, query: TasksQuery = {}): Promise<Task[]> => {
  try {
    const supabase = getSupabaseClient();

    let dbQuery = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Aplicar filtros opcionales
    if (query.status) {
      dbQuery = dbQuery.eq('status', query.status);
    }

    if (query.priority) {
      dbQuery = dbQuery.eq('priority', query.priority);
    }

    // Paginación
    if (query.limit) {
      dbQuery = dbQuery.limit(query.limit);
    }

    if (query.offset) {
      dbQuery = dbQuery.range(query.offset, query.offset + (query.limit || 10) - 1);
    }

    const { data, error } = await dbQuery;

    if (error) {
      logger.error(`Error obteniendo tareas: ${error.message}`);
      throw new Error('Error al obtener las tareas');
    }

    logger.info(`Tareas obtenidas para usuario ${userId}: ${data?.length || 0}`);
    return data || [];

  } catch (err: any) {
    logger.error(`Error en servicio getTasksByUser: ${err.message}`);
    throw err;
  }
};

export const getTaskById = async (taskId: string, userId: string): Promise<Task> => {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .eq('user_id', userId)
      .single();

    if (error) {
      logger.error(`Error obteniendo tarea: ${error.message}`);
      throw new Error('Tarea no encontrada');
    }

    if (!data) {
      throw new Error('Tarea no encontrada');
    }

    logger.info(`Tarea obtenida: ${taskId}`);
    return data;

  } catch (err: any) {
    logger.error(`Error en servicio getTaskById: ${err.message}`);
    throw err;
  }
};

export const updateTask = async (taskId: string, userId: string, updates: UpdateTaskRequest): Promise<Task> => {
  try {
    const supabase = getSupabaseClient();

    // Validar que hay datos para actualizar
    if (Object.keys(updates).length === 0) {
      throw new Error('No hay datos para actualizar');
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      logger.error(`Error actualizando tarea: ${error.message}`);
      throw new Error('Error al actualizar la tarea');
    }

    if (!data) {
      throw new Error('Tarea no encontrada');
    }

    logger.info(`Tarea actualizada: ${taskId}`);
    return data;

  } catch (err: any) {
    logger.error(`Error en servicio updateTask: ${err.message}`);
    throw err;
  }
};

export const deleteTask = async (taskId: string, userId: string): Promise<void> => {
  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', userId);

    if (error) {
      logger.error(`Error eliminando tarea: ${error.message}`);
      throw new Error('Error al eliminar la tarea');
    }

    logger.info(`Tarea eliminada: ${taskId}`);

  } catch (err: any) {
    logger.error(`Error en servicio deleteTask: ${err.message}`);
    throw err;
  }
};

export const getTaskStats = async (userId: string) => {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('tasks')
      .select('status')
      .eq('user_id', userId);

    if (error) {
      logger.error(`Error obteniendo estadísticas: ${error.message}`);
      throw new Error('Error al obtener estadísticas');
    }

    // Contar por status
    const stats = data?.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      total: data?.length || 0,
      pending: stats.pending || 0,
      in_progress: stats.in_progress || 0,
      completed: stats.completed || 0,
      cancelled: stats.cancelled || 0
    };

  } catch (err: any) {
    logger.error(`Error en servicio getTaskStats: ${err.message}`);
    throw err;
  }
};