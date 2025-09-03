export interface User {
  id: string;
  email: string;
  emailConfirmed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateUserRequest {
  email?: string;
  // Agregar más campos según necesites
}