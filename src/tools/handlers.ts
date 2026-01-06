import { userService } from '../services/user.service';

export async function createUserFullDataTool(args: {
  name: string;
  email: string;
  phone: string;
}) {
  return userService.createUserFullData(args);
}

export async function createUserNotFullDataTool(args: {
  name?: string;
  email?: string;
  phone?: string;
}) {
  return userService.createUserNotFullData(args);
}

export async function updateUserTool(args: {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}) {
  return userService.updateUser(args.id, args);
}   

export async function deleteUserTool(args: {
  id: string;
}) {
  return userService.deleteUser(args.id);
}

export async function getUserByEmailTool(args: {
  email: string;
}) {
  return userService.getUserByEmail(args.email);
}

export async function getUserByPhoneTool(args: {
  phone: string;
}) {
  return userService.getUserByPhone(args.phone);
}
