
import { GoogleGenAI, Chat, GenerateContentResponse, Part } from "@google/genai";
import { personalInfo, skillsData, portfolioData } from '../constants';
import type { ChatMessage } from '../types';

let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

const portfolioContext = `
  Name: ${personalInfo.name}
  Title: ${personalInfo.title}
  About: ${personalInfo.about}
  Skills: ${skillsData.map(s => s.name).join(', ')}
  Projects: ${portfolioData.map(p => `Title: ${p.title}, Description: ${p.description}, Technologies: ${p.tags.join(', ')}`).join('; ')}
  Contact: Email - ${personalInfo.email}, Phone - ${personalInfo.phone}, LinkedIn - ${personalInfo.linkedin}
`;

const systemInstruction = `You are a professional and friendly AI assistant for ${personalInfo.name}, a Graphic Designer. Your only purpose is to answer questions about ${personalInfo.name}'s skills, experience, and portfolio based *exclusively* on the context provided below. Do not invent information. If a question is outside this scope, politely decline to answer. Keep your answers concise and helpful.

Context:
${portfolioContext}
`;

let chat: Chat | null = null;
if (ai) {
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
}

export const getAiResponse = async (userMessage: string): Promise<string> => {
  if (!ai || !chat) {
    return "I'm sorry, my AI assistant is currently unavailable. Please try again later.";
  }

  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again.";
  }
};