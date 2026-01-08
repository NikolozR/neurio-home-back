import { GenerateContentResponse } from "@google/genai";
import { geminiService } from './gemini/gemini.service';
import { openAITTSService } from './tts/openai-tts.service';

/**
 * Unified Voice Service - Facade for STT, LLM, and TTS
 * Provides a clean interface for voice-based interactions
 */
export class VoiceService {
  /**
   * Convert speech to text and get AI response
   */
  async speechToText(
    audioFile: Express.Multer.File,
    sessionId: string = 'default-session'
  ): Promise<GenerateContentResponse> {
    const { buffer, mimetype } = audioFile;
    return geminiService.speechToText(buffer, mimetype, sessionId);
  }

  /**
   * Convert text to speech
   */
  async textToSpeech(text: string): Promise<Buffer> {
    return openAITTSService.textToSpeech(text);
  }

  /**
   * Handle tool response from function calling
   */
  async handleToolResponse(
    sessionId: string,
    toolName: string,
    toolResult: Record<string, unknown>
  ): Promise<GenerateContentResponse> {
    return geminiService.handleToolResponse(sessionId, toolName, toolResult);
  }

  /**
   * Clear a chat session
   */
  clearSession(sessionId: string): void {
    geminiService.clearSession(sessionId);
  }
}

export const voiceService = new VoiceService();

