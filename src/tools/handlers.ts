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
  const { id, ...updateData } = args;
  return userService.updateUser(id, updateData);
}

export async function updateUserByEmailTool(args: {
  email: string;
  name?: string;
  phone?: string;
}) {
  const { email, ...updateData } = args;
  return userService.updateUserByEmail(email, updateData);
}

export async function updateUserByPhoneTool(args: {
  phone: string;
  name?: string;
  email?: string;
}) {
  const { phone, ...updateData } = args;
  return userService.updateUserByPhone(phone, updateData);
}   

export async function deleteUserTool(args: {
  id: string;
}) {
  return userService.deleteUser(args.id);
}

export async function deleteUserByEmailTool(args: {
  email: string;
}) {
  return userService.deleteUserByEmail(args.email);
}

export async function deleteUserByPhoneTool(args: {
  phone: string;
}) {
  return userService.deleteUserByPhone(args.phone);
}

export async function getUserByNameTool(args: {
  name: string;
}) {
  return userService.getUserByName(args.name);
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
