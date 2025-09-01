import logger from "../utils/logger";

export const register = async (email: string, password: string) => {
  // Aquí en el futuro va Supabase
  logger.info(`Simulando registro -> Email: ${email}, Password: ${password}`);
  
  return { id: Date.now(), email }; // Simulamos "usuario creado"
};