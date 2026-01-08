import OpenAI from "openai";
import { config } from '@/config/env';
import { OPENAI_MODELS, DEFAULT_VOICE } from '@/constants';

/**
 * Handles Text-to-Speech using OpenAI
 */
export class OpenAITTSService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey
    });
  }

  async textToSpeech(text: string, voice: string = DEFAULT_VOICE): Promise<Buffer> {
    try {
      console.log('🔊 Starting OpenAI TTS...');
      
      const response = await this.openai.audio.speech.create({
        model: OPENAI_MODELS.TTS,
        voice: voice as any,
        input: text,
        response_format: "wav",
      });

      console.log('✅ OpenAI TTS response received');
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      console.log(`✅ Audio buffer created: ${(buffer.length / 1024).toFixed(2)} KB`);
      return buffer;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ OpenAI TTS Error:', errorMessage);
      console.error('Error details:', error);
      throw new Error(`TTS failed: ${errorMessage}`);
    }
  }
}

export const openAITTSService = new OpenAITTSService();

