import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

/**
 * @route   GET /api/v1/users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', userController.getAllUsers);

/**
 * @route   GET /api/v1/users/email/:email
 * @desc    Get user by email
 * @access  Public
 */
router.get('/email/:email', userController.getUserByEmail);

/**
 * @route   GET /api/v1/users/phone/:phone
 * @desc    Get user by phone
 * @access  Public
 */
router.get('/phone/:phone', userController.getUserByPhone);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user by ID
 * @access  Public
 */
router.delete('/:id', userController.deleteUser);

export default router;

