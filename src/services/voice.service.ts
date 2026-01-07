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
                text: "You are a friendly English-speaking assistant. Your goal is to gather the user's name, email, and phone number through natural conversation. Keep responses concise and ask information all at a time. Always respond in a warm, professional tone."
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

  async textToSpeech(text: string): Promise<Buffer> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }
          }
        }
      }
    });

    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!audioData) {
      throw new Error('No audio data received from TTS service');
    }

    const rawPcmData = Buffer.from(audioData, 'base64');
    
    // Gemini returns raw PCM, need to add WAV headers
    // Assuming 24kHz, 16-bit, mono (adjust based on Gemini's actual output)
    const wavBuffer = this.addWavHeader(rawPcmData, 24000, 1, 16);
    
    return wavBuffer;
  }

  private addWavHeader(pcmData: Buffer, sampleRate: number, numChannels: number, bitsPerSample: number): Buffer {
    const blockAlign = numChannels * (bitsPerSample / 8);
    const byteRate = sampleRate * blockAlign;
    const dataSize = pcmData.length;
    
    const header = Buffer.alloc(44);
    
    // "RIFF" chunk descriptor
    header.write('RIFF', 0);
    header.writeUInt32LE(36 + dataSize, 4); // File size - 8
    header.write('WAVE', 8);
    
    // "fmt " sub-chunk
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
    header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
    header.writeUInt16LE(numChannels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    
    // "data" sub-chunk
    header.write('data', 36);
    header.writeUInt32LE(dataSize, 40);
    
    return Buffer.concat([header, pcmData]);
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

  clearSession(sessionId: string): void {
    this.chats.delete(sessionId);
  }
}


export const voiceService = new VoiceService();
