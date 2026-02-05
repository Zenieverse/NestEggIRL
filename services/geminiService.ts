
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartSwaps(item: string, category: string, price: number) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are "NestEgg AI", a supportive financial companion for busy mums. 
      The user is considering buying "${item}" in the "${category}" category for $${price}. 
      Provide two smarter, cheaper "mum-friendly" alternatives (swaps) that save money without sacrificing family happiness or essential convenience. 
      One swap should be a brand alternative, and one should be a lifestyle adjustment (e.g., bulk buy, DIY, or skip).
      Return ONLY a JSON array of objects.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Short, friendly name of the swap." },
              price: { type: Type.NUMBER, description: "Estimated price of the swap." },
              reason: { type: Type.STRING, description: "Empathetic, non-judgmental reason why this is a smart choice." },
              savings: { type: Type.NUMBER, description: "Amount saved per week." }
            },
            required: ["name", "price", "reason", "savings"]
          }
        }
      }
    });

    const data = JSON.parse(response.text);
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching smart swaps:", error);
    // Sophisticated fallback logic
    return [
      {
        name: `Generic Brand ${item}`,
        price: price * 0.65,
        reason: "Most supermarket brand equivalents are made in the same factories as premium brands for 30-40% less.",
        savings: price * 0.35
      },
      {
        name: `Wait & Bulk Buy`,
        price: price * 0.8,
        reason: "Checking the weekly specials or buying in bulk can save you significantly over the month.",
        savings: price * 0.2
      }
    ];
  }
}
