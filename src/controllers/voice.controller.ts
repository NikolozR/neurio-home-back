import { Request, Response, NextFunction } from 'express';
import { voiceService } from '../services/voice.service';
import { asyncHandler } from '../middleware/asyncHandler';
import { toolService } from '../services/tool.service';

export class VoiceController {
  create = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const startTime = Date.now();
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({
        success: false,
        message: 'No audio file provided',
      });
    }

    const sessionId = req.body.sessionId || req.headers['x-session-id'] as string || 'default-session';
    console.log(`\n🎤 [${sessionId}] Processing audio (${(audioFile.size / 1024).toFixed(2)} KB, ${audioFile.mimetype})`);

    const sttStart = Date.now();
    let LLMResponse = await voiceService.speechToText(audioFile, sessionId);
    console.log(`⏱️  STT took ${Date.now() - sttStart}ms`);

    while (LLMResponse.functionCalls && LLMResponse.functionCalls.length > 0) {
      const functionCall = LLMResponse.functionCalls[0];
      console.log(`🔧 Executing tool: ${functionCall.name}`);

      try {
        const toolStart = Date.now();
        const result = await toolService.executeTool(functionCall.name || 'unknown_tool', functionCall.args);
        console.log(`⏱️  Tool execution took ${Date.now() - toolStart}ms`);

        const feedbackStart = Date.now();
        LLMResponse = await voiceService.handleToolResponse(sessionId, functionCall.name || 'unknown_tool', result);
        console.log(`⏱️  Tool feedback to LLM took ${Date.now() - feedbackStart}ms`);

      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: 'Tool execution failed',
          error: error.message
        });
      }
    }

    // Get text response from LLM
    const textResponse = LLMResponse.text;
    
    if (!textResponse) {
      return res.status(500).json({
        success: false,
        message: 'No response generated from AI',
      });
    }

    console.log(`💬 AI Response: "${textResponse.substring(0, 50)}..."`);

    // Convert text to speech
    const ttsStart = Date.now();
    const audioBuffer = await voiceService.textToSpeech(textResponse);
    console.log(`⏱️  TTS took ${Date.now() - ttsStart}ms (${(audioBuffer.length / 1024).toFixed(2)} KB)`);
    
    const totalTime = Date.now() - startTime;
    console.log(`✅ Total processing time: ${totalTime}ms\n`);
    
    // Return audio as base64 in JSON
    return res.status(200).json({
      success: true,
      message: 'Voice processed successfully',
      data: {
        audio: audioBuffer.toString('base64'),
        text: textResponse,
        mimeType: 'audio/wav'
      }
    });
  });
}

export const voiceController = new VoiceController();
