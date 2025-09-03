export interface User {
  id: string;
  email: string;
  emailConfirmed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserRequest {
  email?: string;
  // Agregar más campos según necesites
}