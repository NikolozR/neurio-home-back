import { Request, Response, NextFunction } from 'express';
import { voiceService } from '../services/voice.service';
import { asyncHandler } from '../middleware/asyncHandler';
import { ApiResponse } from '../types';
import { toolService } from '../services/tool.service';

export class VoiceController {
  create = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({
        success: false,
        message: 'No audio file provided',
      });
    }


    const sessionId = req.body.sessionId || req.headers['x-session-id'] as string || 'default-session';
    console.log(`Processing audio for session: ${sessionId}`);

    let LLMResponse = await voiceService.speechToText(audioFile, sessionId);

    console.log(LLMResponse);
    while (LLMResponse.functionCalls && LLMResponse.functionCalls.length > 0) {
      const functionCall = LLMResponse.functionCalls[0];
      console.log(`Executing tool: ${functionCall.name}`);

      try {
        const result = await toolService.executeTool(functionCall.name || 'unknown_tool', functionCall.args);

        console.log(`Tool executed successfully: ${functionCall.name}`);
        console.log('Feeding tool response back to LLM...');

        LLMResponse = await voiceService.handleToolResponse(sessionId, functionCall.name || 'unknown_tool', result);

      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: 'Tool execution failed',
          error: error.message
        });
      }
    }

    const response: ApiResponse = {
      success: true,
      message: 'Voice processed successfully',
      data: LLMResponse.text,
    };

    return res.status(201).json(response);
  });
}

export const voiceController = new VoiceController();
