import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that helps users understand API documentation. 
When a user provides an API endpoint, explain:
- The purpose of the API
- Available methods (GET, POST, PUT, DELETE)
- Request and response formats
- Authentication requirements
- Any relevant details
Format the response in markdown for readability.
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getApiDocs(endPoint) {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Explain the API documentation for this endpoint: ${endPoint}.` },
      ],
      max_tokens: 1024,
    });

    console.log("Full API Response:", response); // Debugging

    // Check if response contains 'generated_text' (used by Hugging Face models)
    if (response && response.generated_text) {
      return response.generated_text;
    }

    // If response contains 'choices' (like OpenAI models)
    if (response && response.choices && response.choices.length > 0) {
        return response.choices[0]?.message?.content || "No explanation available.";

    }

    return "Error: Unexpected response format.";
  } catch (err) {
    console.error("Error fetching API documentation:", err.message);
    return " Failed to fetch API documentation. ";
  }
}


