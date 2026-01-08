import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { asyncHandler } from '../middleware/asyncHandler';

export class UserController {
  getAllUsers = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await userService.getAllUsers();
    
    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      count: users.length,
      data: users,
    });
  });

  getUserByEmail = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { email } = req.params;
    
    const user = await userService.getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  });

  getUserByPhone = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { phone } = req.params;
    
    const user = await userService.getUserByPhone(phone);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    
    const user = await userService.deleteUser(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  });
}

export const userController = new UserController();

