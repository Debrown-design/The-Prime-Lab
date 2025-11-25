import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is handled securely
const ai = new GoogleGenAI({ apiKey });

export const generatePreGameQuestions = async (age: string): Promise<QuizQuestion[]> => {
  const numericAge = parseInt(age) || 10;
  
  // Adjust difficulty based on age
  let difficulty = "basic arithmetic (addition/subtraction)";
  if (numericAge > 8) difficulty = "multiplication and simple division";
  if (numericAge > 11) difficulty = "pre-algebra and complex order of operations";

  const model = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Generate 3 multiple-choice math questions suitable for a ${numericAge} year old child. 
      The topic should be ${difficulty}.
      The questions should be themed around "Ninja Training" (e.g., counting shurikens, dividing ninja teams).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exactly 4 options"
              },
              correctAnswerIndex: { 
                type: Type.INTEGER,
                description: "Index of the correct answer (0-3)"
              }
            },
            required: ["question", "options", "correctAnswerIndex"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion[];
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback questions if API fails
    return [
      {
        question: "To earn your headband, solve: 5 Ninja + 7 Ninja = ?",
        options: ["10", "11", "12", "13"],
        correctAnswerIndex: 2
      },
      {
        question: "Sensei has 20 stars. He gives 4 to each student. How many students?",
        options: ["4", "5", "6", "8"],
        correctAnswerIndex: 1
      },
      {
        question: "A ninja jumps 3 meters. How far in 3 jumps?",
        options: ["6m", "9m", "12m", "3m"],
        correctAnswerIndex: 1
      }
    ];
  }
};