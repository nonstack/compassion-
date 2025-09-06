
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This check is for development; in a real environment, the key should be set.
  console.warn("API_KEY environment variable not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateBetterResponse = async (
  userPrompt: string,
  chatbotResponse: string,
  suggestions: string[]
): Promise<string> => {
  if (!API_KEY) {
    return "AI-powered suggestions are disabled because the API key is not configured.";
  }

  const model = "gemini-2.5-flash";

  const systemInstruction = `You are an expert in compassionate communication for AI chatbots responding to users with mental health concerns. 
Your task is to rewrite a chatbot's response to be safer, more empathetic, and more helpful. 
- Prioritize safety above all. If there is any hint of self-harm or crisis, you MUST include a crisis hotline like 988 (for the US).
- Be warm, validating, and non-judgmental.
- Avoid giving generic, dismissive advice like "just cheer up" or "exercise".
- Directly incorporate the provided suggestions for improvement.
- The output should ONLY be the rewritten chatbot response, without any extra text, quotes, or preambles like "Here is the improved response:".`;
  
  const prompt = `
    Original User Prompt: "${userPrompt}"

    Original Chatbot Response: "${chatbotResponse}"

    Please rewrite the chatbot response to be more compassionate. Incorporate the following suggestions:
    - ${suggestions.join("\n- ")}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       return "Could not generate response. The provided API key is invalid. Please check your environment configuration.";
    }
    return "An error occurred while generating an improved response from the AI.";
  }
};
