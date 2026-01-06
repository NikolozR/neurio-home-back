import { Router } from 'express';
import { voiceController } from '../controllers/voice.controller';

const router = Router();



/**
 * @route   POST /api/v1/voice
 * @desc    Send user's voice data
 * @access  Public
 */
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route   POST /api/v1/voice
 * @desc    Send user's voice data
 * @access  Public
 */
router.post('/', upload.single('audio'), voiceController.create);

export default router;
