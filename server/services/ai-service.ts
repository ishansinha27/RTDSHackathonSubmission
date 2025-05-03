import { OpenAI } from "openai";

// Ensure OPENAI_API_KEY is set as an environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Context for the GPU assistant
const GPU_ASSISTANT_CONTEXT = `
You are an AI assistant specialized in helping users select the right GPU for their needs.
You provide advice on:
- GPU comparisons based on performance metrics
- Cost optimization for different GPU workloads
- Helping users understand which GPU is best for their specific use case
- Explaining technical GPU specifications
- Providing information about different GPU models and their capabilities

Use the knowledge about GPUs to answer questions in a clear, concise, and helpful manner.
`;

/**
 * Generate AI response for GPU-related questions
 * @param query The user's question about GPUs
 * @returns AI-generated response
 */
export async function generateGpuAdvice(query: string): Promise<string> {
  try {
    // If no API key is available, return a default message
    if (!process.env.OPENAI_API_KEY) {
      return "I'm sorry, I cannot provide a response at the moment. The AI service is not properly configured.";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: GPU_ASSISTANT_CONTEXT },
        { role: "user", content: query }
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating GPU advice:", error);
    return "I apologize, but I encountered an error while processing your question. Please try again later.";
  }
}