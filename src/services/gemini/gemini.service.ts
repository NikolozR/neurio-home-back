import { GenerateContentResponse } from "@google/genai";
import { chatManager } from './chat-manager.service';
import { historyManager } from './history-manager.service';

/**
 * Handles Speech-to-Text and LLM interactions using Gemini
 */
export class GeminiService {
  async speechToText(audioBuffer: Buffer, mimeType: string, sessionId: string): Promise<GenerateContentResponse> {
    let chat = chatManager.getChat(sessionId);
    const usedTool = chatManager.hasUsedTool(sessionId);
    const history = historyManager.getHistory(sessionId);

    // Recreate chat if it used tools previously (avoid Gemini SDK DataCloneError)
    if (chat && usedTool) {
      console.log('⚠️  Chat used tool previously, recreating with history...');
      chat = chatManager.recreateChat(sessionId, history);
    }

    // Create new chat if it doesn't exist
    if (!chat) {
      chat = chatManager.createChat(sessionId, history.length > 0 ? history : undefined);
      
      if (history.length > 0) {
        console.log(`🔄 Restoring ${history.length} messages from conversation history...`);
      }
    }

    try {
      const audioData = audioBuffer.toString('base64');
      
      const response = await chat.sendMessage({
        message: {
          inlineData: {
            data: audioData,
            mimeType: mimeType,
          },
        }
      });

      // Save to conversation history
      historyManager.addUserMessage(sessionId, audioData, mimeType);
      
      if (response.text) {
        historyManager.addModelResponse(sessionId, response.text);
      }

      return response;
    } catch (error: unknown) {
      return this.handleSTTError(error, audioBuffer, mimeType, sessionId);
    }
  }

  async handleToolResponse(sessionId: string, toolName: string, toolResult: unknown): Promise<GenerateContentResponse> {
    const chat = chatManager.getChat(sessionId);
    
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

    // Mark that this chat used a tool
    chatManager.markToolUsed(sessionId);

    return response;
  }

  clearSession(sessionId: string): void {
    chatManager.clearSession(sessionId);
    historyManager.clearHistory(sessionId);
  }

  private async handleSTTError(error: unknown, audioBuffer: Buffer, mimeType: string, sessionId: string): Promise<GenerateContentResponse> {
    const errorString = String(error);
    const errorMessage = error instanceof Error ? error.message : '';
    const isDataCloneError = errorString.includes('DataCloneError') || 
                            errorMessage.includes('DataCloneError') || 
                            errorMessage.includes('could not be cloned');
    
    if (isDataCloneError) {
      console.log('⚠️  DataCloneError detected, recreating chat...');
      
      // Recreate chat without history to avoid the error
      const newChat = chatManager.recreateChat(sessionId);

      // Try again with new chat
      const response = await newChat.sendMessage({
        message: {
          inlineData: {
            data: audioBuffer.toString('base64'),
            mimeType: mimeType,
          },
        }
      });

      return response;
    }
    
    // Re-throw if it's a different error
    console.error('❌ STT Error:', error);
    throw error;
  }
}

export const geminiService = new GeminiService();

