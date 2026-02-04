
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartSwaps(item: string, category: string, price: number) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `I am buying "${item}" in the "${category}" category for $${price}. Give me two smarter, cheaper "mum-friendly" alternatives (swaps) that save money but maintain quality or convenience.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.NUMBER },
              reason: { type: Type.STRING },
              savings: { type: Type.NUMBER }
            },
            required: ["name", "price", "reason", "savings"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching smart swaps:", error);
    // Fallback static logic if AI fails
    return [
      {
        name: `Generic Brand ${item}`,
        price: price * 0.7,
        reason: "Generic brands often use the same ingredients for 30% less cost.",
        savings: price * 0.3
      }
    ];
  }
}
