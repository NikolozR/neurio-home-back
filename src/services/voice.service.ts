import {
  GoogleGenAI,
  GenerateContentResponse
} from "@google/genai";
import { config } from '../config/env';
import { toolsSchemas } from "@/tools/schemas";

export class VoiceService {
  private chats = new Map<string, any>();
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: config.geminiApiKey
    });
  }

  async speechToText(audioFile: Express.Multer.File, sessionId: string = 'default-session'): Promise<GenerateContentResponse> {
    const { buffer, mimetype } = audioFile;

    let chat = this.chats.get(sessionId);

    if (!chat) {
      chat = this.ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: {
            parts: [
              {
                text: "Your main target is to gather name, email and phone from user. You have tools that you can call (defined in config), or you can send a message that will be converted to speech for the user."
              }
            ],
            role: "system"
          },
          tools: [{
            functionDeclarations: toolsSchemas
          }]
        }
      });
      this.chats.set(sessionId, chat);
    }

    const response = await chat.sendMessage({
      message: {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: mimetype,
        },
      }
    });

    return response;
  }

  async handleToolResponse(sessionId: string, toolName: string, toolResult: any): Promise<GenerateContentResponse> {
    const chat = this.chats.get(sessionId);
    if (!chat) {
      throw new Error('Session not found');
    }

    const response = await chat.sendMessage({
      message: {
        functionResponse: {
          name: toolName,
          response: {
            result: toolResult
          }
        }
      }
    });

    return response;
  }
}


export const voiceService = new VoiceService();
