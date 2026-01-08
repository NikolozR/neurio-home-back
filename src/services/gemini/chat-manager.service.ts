import { GoogleGenAI } from "@google/genai";
import { config } from '@/config/env';
import { toolsSchemas } from "@/tools/schemas";
import { SYSTEM_PROMPTS, GEMINI_MODELS } from '@/constants';
import { GeminiChat, ConversationHistory } from '@/types';

/**
 * Manages Gemini chat sessions
 */
export class ChatManager {
  private chats = new Map<string, GeminiChat>();
  private chatUsedTool = new Map<string, boolean>();
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: config.geminiApiKey
    });
  }

  getChat(sessionId: string): GeminiChat | undefined {
    return this.chats.get(sessionId);
  }

  hasUsedTool(sessionId: string): boolean {
    return this.chatUsedTool.get(sessionId) || false;
  }

  markToolUsed(sessionId: string): void {
    this.chatUsedTool.set(sessionId, true);
  }

  createChat(sessionId: string, history?: ConversationHistory[]): GeminiChat {
    const chatConfig = {
      model: GEMINI_MODELS.FLASH,
      config: {
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPTS.USER_DATA_COLLECTION }],
          role: "system" as const
        },
        tools: [{
          functionDeclarations: toolsSchemas
        }]
      },
      ...(history && history.length > 0 && { history })
    };

    const chat = this.ai.chats.create(chatConfig);
    this.chats.set(sessionId, chat);
    
    return chat;
  }

  recreateChat(sessionId: string, history?: ConversationHistory[]): GeminiChat {
    this.deleteChat(sessionId);
    return this.createChat(sessionId, history);
  }

  deleteChat(sessionId: string): void {
    this.chats.delete(sessionId);
    this.chatUsedTool.delete(sessionId);
  }

  clearSession(sessionId: string): void {
    this.deleteChat(sessionId);
  }
}

export const chatManager = new ChatManager();

