import { Request, Response, NextFunction } from 'express';
import { voiceService } from '../services/voice.service';
import { asyncHandler } from '../middleware/asyncHandler';
import { ApiResponse } from '../types';

export class VoiceController {
  create = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const audioFile = req.file;
    
    if (!audioFile) {
      return res.status(400).json({
        success: false,
        message: 'No audio file provided',
      });
    }

    console.log("Processing audio file:", audioFile.originalname);

    const text = await voiceService.speechToText(audioFile);
    console.log("Transcription:", text);

    const response: ApiResponse = {
      success: true,
      message: 'Voice processed successfully',
      data: { text },
    };

    return res.status(201).json(response);
  });
}

export const voiceController = new VoiceController();
