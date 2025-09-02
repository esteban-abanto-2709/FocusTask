import { getSupabaseClient } from "@/config/supabase";
import logger from "@/utils/logger";

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

export const login = async (email: string, password: string) => {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      logger.error(`Error en login: ${error.message}`);
      throw new Error(error.message);
    }

    if (!data.user || !data.session) {
      throw new Error('Login failed - no user or session returned');
    }

    logger.info(`Usuario logueado: ${email}`);
    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        emailConfirmed: !!data.user.email_confirmed_at
      },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
        expires_in: data.session.expires_in
      }
    };

  } catch (err: any) {
    logger.error(`Error en servicio de login: ${err.message}`);
    throw err;
  }
};