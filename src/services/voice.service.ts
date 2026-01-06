import {
  GoogleGenAI
} from "@google/genai";
import { config } from '../config/env';
import { toolsSchemas } from "@/tools/schemas";

export class VoiceService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: config.geminiApiKey
    });
  }

  async speechToText(audioFile: Express.Multer.File): Promise<string> {
    const { buffer, mimetype } = audioFile;

    const prompt = "Transcribe this audio file exactly as spoken. Return only the raw text.";

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: buffer.toString('base64'),
                mimeType: mimetype,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
      config: {
        tools: [{
          functionDeclarations: toolsSchemas
        }]
      }
    });

    return response.text || '';
  }
}

export const voiceService = new VoiceService();
