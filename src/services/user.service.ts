import User, { IUser } from '../models/user.model';

export class UserService {
  // This is for creating user with full data
  async createUserFullData(data: { name: string; email: string; phone: string }): Promise<IUser> {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error(`User with email ${data.email} already exists`);
    }

    const user = await User.create(data);
    return user;
  }

  // This is for updating user by ID
  async updateUser(id: string, data: { name?: string; email?: string; phone?: string }): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  // This is for updating user by email
  async updateUserByEmail(email: string, data: { name?: string; phone?: string }): Promise<IUser | null> {
    return User.findOneAndUpdate({ email }, data, { new: true });
  }

  // This is for updating user by phone
  async updateUserByPhone(phone: string, data: { name?: string; email?: string }): Promise<IUser | null> {
    return User.findOneAndUpdate({ phone }, data, { new: true });
  }

  // This is for creating user with partial data - email or phone (we don't do creation with only name because it is not necessarily unique)
  async createUserNotFullData(data: {
    name?: string;
    email?: string;
    phone?: string;
  }): Promise<IUser> {
    if (!data.email && !data.phone) {
      throw new Error('At least one of email or phone is required');
    }

    const conditions: Record<string, string>[] = [];

    if (data.email) conditions.push({ email: data.email });
    if (data.phone) conditions.push({ phone: data.phone });

    if (conditions.length > 0) {
      const existingUser = await User.findOne({ $or: conditions });
      if (existingUser) {
        throw new Error('User already exists');
      }
    }

    return await User.create(data);
  }

  // This is for getting user by name
  async getUserByName(name: string): Promise<IUser[]> {
    // Returns array because multiple users can have the same name
    return User.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
  }

  // This is for getting user by email
  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  // This is for getting user by phone
  async getUserByPhone(phone: string): Promise<IUser | null> {
    return User.findOne({ phone });
  }

  // This is for getting all users
  async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }

  // This is for deleting user by ID
  async deleteUser(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }

  // This is for deleting user by email
  async deleteUserByEmail(email: string): Promise<IUser | null> {
    return User.findOneAndDelete({ email });
  }

  // This is for deleting user by phone
  async deleteUserByPhone(phone: string): Promise<IUser | null> {
    return User.findOneAndDelete({ phone });
  }

}

export const userService = new UserService();
