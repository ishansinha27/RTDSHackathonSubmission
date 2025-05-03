import { OpenAI } from "openai";

// Ensure OPENAI_API_KEY is set as an environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Context for the GPU assistant with parameters from the knowledge base
const GPU_ASSISTANT_CONTEXT = `
You are an AI assistant specialized in helping users select the right GPU for their needs on GPUxACE.
You provide advice on:
- GPU comparisons based on performance metrics
- Cost optimization for different GPU workloads
- Helping users understand which GPU is best for their specific use case
- Explaining technical GPU specifications
- Providing information about different GPU models and their capabilities

Here are key parameters to consider when comparing GPUs:

1. CUDA Cores/Streaming Processors: More cores generally indicate better parallel processing capabilities.
2. Memory Size (VRAM): Critical for handling large datasets, high-resolution textures, and complex models.
3. Memory Bandwidth: Affects how quickly data can be moved to and from the GPU.
4. Memory Type (GDDR6, HBM2, etc.): Newer memory technologies offer better performance.
5. Clock Speeds: Both base and boost clock speeds affect computational performance.
6. Tensor Cores: Specialized cores for AI and deep learning applications.
7. RT Cores: Specialized cores for ray tracing calculations.
8. Manufacturing Process (nm): Smaller processes typically mean better efficiency.
9. TDP (Thermal Design Power): Indicates power consumption and cooling requirements.
10. Architecture Generation: Newer architectures generally offer better performance per watt.

For machine learning and AI workloads, prioritize:
- High VRAM (16GB+ for large models)
- Tensor core performance
- Memory bandwidth
- CUDA core count

For 3D rendering and visualization:
- Balance between VRAM and clock speeds
- RT cores for ray-tracing applications
- Memory bandwidth for texture handling

For data science:
- VRAM capacity for large datasets
- CUDA core count
- Memory bandwidth

For cloud computing cost optimization:
- Consider spot instances for non-critical workloads (30-70% savings)
- Match GPU capabilities to specific workload requirements
- Consider memory requirements first, then computational needs
- Evaluate TCO (Total Cost of Ownership) including power consumption

Use this knowledge to provide specific, actionable advice tailored to the user's particular use case and requirements.
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

    // Add information about current popular GPUs to improve responses
    const GPU_MODELS_INFORMATION = `
    Most popular GPUs available on our platform with their key specifications:
    
    NVIDIA A100: 
    - 40GB or 80GB HBM2e memory
    - Up to 2,039 GB/s memory bandwidth
    - 19.5 TFLOPS FP32 performance
    - 312 Tensor Cores, 3rd generation
    - Ideal for large-scale AI training and HPC

    NVIDIA A30:
    - 24GB HBM2 memory
    - 933 GB/s memory bandwidth
    - 10.3 TFLOPS FP32 performance
    - 166 Tensor Cores, 3rd generation
    - Good balance for AI inference and medium-scale training

    NVIDIA L4:
    - 24GB GDDR6 memory
    - 300 GB/s memory bandwidth
    - 30.3 TFLOPS FP32 performance
    - 304 Tensor Cores, 4th generation
    - Energy-efficient for AI inference and small training tasks

    NVIDIA RTX A6000:
    - 48GB GDDR6 memory
    - 768 GB/s memory bandwidth
    - 38.7 TFLOPS FP32 performance
    - 336 Tensor Cores, 3rd generation
    - 84 RT Cores, 2nd generation
    - Ideal for visualization, rendering, and AI development
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: GPU_ASSISTANT_CONTEXT },
        { role: "system", content: GPU_MODELS_INFORMATION },
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