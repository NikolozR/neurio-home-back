import {
  CreateUserFullDataToolSchema,
  UpdateUserToolSchema,
  UpdateUserByEmailToolSchema,
  UpdateUserByPhoneToolSchema,
  DeleteUserToolSchema,
  DeleteUserByEmailToolSchema,
  DeleteUserByPhoneToolSchema,
  GetUserByNameToolSchema,
  GetUserByEmailToolSchema,
  GetUserByPhoneToolSchema,
} from './user-schemas';

/**
 * All available tool schemas for Gemini function calling
 * Organized by domain for better maintainability
 */
export const toolsSchemas = [
  // Create
  CreateUserFullDataToolSchema,
  
  // Update
  UpdateUserToolSchema,
  UpdateUserByEmailToolSchema,
  UpdateUserByPhoneToolSchema,
  
  // Delete
  DeleteUserToolSchema,
  DeleteUserByEmailToolSchema,
  DeleteUserByPhoneToolSchema,
  
  // Read
  GetUserByNameToolSchema,
  GetUserByEmailToolSchema,
  GetUserByPhoneToolSchema,
];

