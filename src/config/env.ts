import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  nodeEnv: string;
  port: number;
  mongodbUri: string;
  corsOrigin: string;
  apiVersion: string;
  geminiApiKey: string;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const config: EnvConfig = {
  nodeEnv: getEnvVariable('NODE_ENV', 'development'),
  port: parseInt(getEnvVariable('PORT', '4000'), 10),
  mongodbUri: getEnvVariable('MONGODB_URI'),
  corsOrigin: getEnvVariable('CORS_ORIGIN', '*'),
  apiVersion: getEnvVariable('API_VERSION', 'v1'),
  geminiApiKey: getEnvVariable('GEMINI_API_KEY'),
};
