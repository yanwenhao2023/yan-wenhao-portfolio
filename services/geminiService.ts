import { GoogleGenAI } from "@google/genai";
import { RESUME_CONTEXT } from "../constants";

// Ideally, this should be server-side or proxied to hide the key, 
// but for this client-side demo we use the env variable directly.
const apiKey = process.env.API_KEY;

let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model', parts: [{ text: string }] }[]
) => {
  if (!aiClient) {
    return "API Key not configured. Please check your environment variables.";
  }

  try {
    const model = aiClient.models;
    
    // Construct the system instruction with the resume context
    const systemInstruction = `
      You are an advanced AI assistant for Yan Wenhao's (颜文豪) personal portfolio website.
      Your goal is to answer questions from recruiters or visitors about Yan Wenhao based *strictly* on the provided resume data.
      
      Here is Yan Wenhao's Resume Data:
      ${RESUME_CONTEXT}

      Guidelines:
      1. Be professional, polite, and concise.
      2. Highlight his strengths in Product Management (Video Structure, B-end) and UI Design.
      3. If asked about contact info, provide it clearly.
      4. If asked about something not in the data, politely say you don't have that information but suggest contacting him directly.
      5. Answer in the language the user asks (Primary: Chinese, Secondary: English).
      6. Keep the tone confident but humble, matching his "optimistic and problem-solving" personality.
    `;

    // Convert history format to what Gemini expects if needed, 
    // but for simple single-turn or short multi-turn, generateContent with history context is easier 
    // or use chat session. Here we use generateContent for simplicity but prepending history is better.
    // For this implementation, we will use a fresh chat session for better context management.
    
    // Note: In a real app, we would persist the chat object. 
    // Here we will recreate the chat with history for each request to keep it stateless in this function,
    // or we assume the UI handles the "history" display and we just send the new prompt with context.
    // However, to properly use history, let's just send the message with the system instruction. 
    // The previous history is passed in 'contents' for the chat model.

    const chat = aiClient.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
      },
      history: history // Pass the history from the React state
    });

    const result = await chat.sendMessage({ message });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};
