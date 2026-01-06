export interface IUser {
  name: string;
  email: string;
  age?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  stack?: string;
}
