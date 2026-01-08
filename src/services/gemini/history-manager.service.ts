import { ConversationHistory } from '@/types';

/**
 * Manages conversation history for chat sessions
 */
export class HistoryManager {
  private conversationHistory = new Map<string, ConversationHistory[]>();

  getHistory(sessionId: string): ConversationHistory[] {
    return this.conversationHistory.get(sessionId) || [];
  }

  addUserMessage(sessionId: string, audioData: string, mimeType: string): void {
    const history = this.getHistory(sessionId);
    history.push({
      role: 'user',
      parts: [{ inlineData: { data: audioData, mimeType } }]
    });
    this.conversationHistory.set(sessionId, history);
  }

  addModelResponse(sessionId: string, text: string): void {
    const history = this.getHistory(sessionId);
    history.push({
      role: 'model',
      parts: [{ text }]
    });
    this.conversationHistory.set(sessionId, history);
  }

  clearHistory(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
  }

  hasHistory(sessionId: string): boolean {
    const history = this.getHistory(sessionId);
    return history.length > 0;
  }
}

export const historyManager = new HistoryManager();

