import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn("Gemini API Key is missing. The chat feature will be disabled.");
}

export const generateChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  if (!ai) {
    return "I'm sorry, I cannot connect to the AI service right now (Missing API Key). Please contact Samuel via email.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the chat history for the API
    // We limit history context to last 10 messages to save tokens/keep relevance
    const recentHistory = history.slice(-10).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
      },
      history: recentHistory,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I didn't receive a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble processing your request. Please try again later.";
  }
};