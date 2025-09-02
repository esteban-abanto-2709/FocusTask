import { getSupabaseClient } from "../config/supabase";
import logger from "../utils/logger";

export const register = async (email: string, password: string) => {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      logger.error(`Error en registro: ${error.message}`);
      throw new Error(error.message);
    }

    logger.info(`Usuario registrado: ${email}`);
    return {
      id: data.user?.id,
      email: data.user?.email,
      needsConfirmation: !data.user?.email_confirmed_at
    };

  } catch (err: any) {
    logger.error(`Error en servicio de registro: ${err.message}`);
    throw err;
  }
};