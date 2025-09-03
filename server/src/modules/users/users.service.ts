import { getSupabaseAdmin } from "@/shared/config/supabase";
import logger from "@/shared/utils/logger";
import { User, UpdateUserRequest } from "./users.types";

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const supabase = getSupabaseAdmin();

    // Obtener usuario de Supabase Auth
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userId);

    if (error) {
      logger.error(`Error obteniendo usuario: ${error.message}`);
      throw new Error('Usuario no encontrado');
    }

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    logger.info(`Usuario obtenido: ${user.email}`);
    return {
      id: user.id,
      email: user.email || '',
      emailConfirmed: !!user.confirmation_sent_at,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

  } catch (err: any) {
    logger.error(`Error en servicio getUserById: ${err.message}`);
    throw err;
  }
};

export const updateUserProfile = async (userId: string, updates: UpdateUserRequest): Promise<User> => {
  try {
    const supabase = getSupabaseAdmin();

    // Validar que no esté vacío el update
    if (Object.keys(updates).length === 0) {
      throw new Error('No hay datos para actualizar');
    }

    // Actualizar usando admin API
    const { data: { user }, error } = await supabase.auth.admin.updateUserById(
      userId,
      { email: updates.email }
    );

    if (error) {
      logger.error(`Error actualizando usuario: ${error.message}`);
      throw new Error('Error al actualizar usuario');
    }

    if (!user) {
      throw new Error('Usuario no encontrado después de actualizar');
    }

    logger.info(`Usuario actualizado: ${user.email}`);
    return {
      id: user.id,
      email: user.email || '',
      emailConfirmed: !!user.confirmation_sent_at,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

  } catch (err: any) {
    logger.error(`Error en servicio updateUserProfile: ${err.message}`);
    throw err;
  }
};