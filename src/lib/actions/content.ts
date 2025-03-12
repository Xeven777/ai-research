"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function generateAIContent(
  mainTopic: string,
  sectionTitle: string,
  subtopicTitle: string,
  academicLevel: string
): Promise<string> {
  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash-001", {
        useSearchGrounding: true,
      }),
      system:
        "You are a specialized academic content writer that creates well-researched, informative content. Write in a professional academic style appropriate for the specified academic level.",
      prompt: `Write detailed content for the subtopic "${subtopicTitle}" within the section "${sectionTitle}" of a research document about "${mainTopic}". 
      The content should be suitable for ${academicLevel} level.
      Include relevant information, examples, and explanations where necessary.
      Keep the academic style and within 100-120 words.
      Do not include citations in brackets, but write as if the content is well-researched. Dont return in markdown format. Just return the content directly and nothing else.`,
    });

    return text;
  } catch (error) {
    console.error("Error generating AI content:", error);
    return `An error occurred while generating content for "${subtopicTitle}". Please try again later.`;
  }
}
