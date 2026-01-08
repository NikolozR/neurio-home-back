import { GoogleGenAI } from "@google/genai";

export type GeminiChat = ReturnType<GoogleGenAI['chats']['create']>;

export interface ChatConfig {
  model: 'gemini-2.5-flash';
  config: {
    systemInstruction: {
      parts: Array<{ text: string }>;
      role: 'system';
    };
    tools: Array<{
      functionDeclarations: unknown[];
    }>;
  };
  history?: Array<{
    role: 'user' | 'model';
    parts: unknown[];
  }>;
}

