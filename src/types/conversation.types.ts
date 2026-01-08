export interface ConversationPart {
  text?: string;
  inlineData?: {
    data: string;
    mimeType: string;
  };
}

export interface ConversationHistory {
  role: 'user' | 'model';
  parts: ConversationPart[];
}

export interface AudioFile {
  buffer: Buffer;
  mimetype: string;
  size: number;
}

