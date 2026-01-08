/**
 * AI Model configurations
 */

export const GEMINI_MODELS = {
  FLASH: 'gemini-2.5-flash',
} as const;

export const OPENAI_MODELS = {
  TTS: 'tts-1',
  TTS_HD: 'tts-1-hd',
} as const;

export const OPENAI_VOICES = {
  ALLOY: 'alloy',
  ECHO: 'echo',
  FABLE: 'fable',
  ONYX: 'onyx',
  NOVA: 'nova',
  SHIMMER: 'shimmer',
} as const;

export const DEFAULT_VOICE = OPENAI_VOICES.ALLOY;

