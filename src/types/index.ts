// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  stack?: string;
}

// Conversation types
export type {
  ConversationPart,
  ConversationHistory,
  AudioFile
} from './conversation.types';

// Gemini types
export type {
  GeminiChat,
  ChatConfig
} from './gemini.types';
