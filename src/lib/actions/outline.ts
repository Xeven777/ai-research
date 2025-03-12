"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import type { DocumentOutline, Section } from "@/lib/types";

const subtopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  isSelected: z.boolean(),
  content: z.string(),
});

const sectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  isSelected: z.boolean(),
  subtopics: z.array(subtopicSchema),
});

const outlineSchema = z.object({
  sections: z.array(sectionSchema),
});

export async function generateAIOutline(
  topic: string
): Promise<DocumentOutline> {
  try {
    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      system:
        "You are a helpful assistant that specializes in creating detailed research document outlines.",
      prompt: `Generate a detailed research document outline for the topic: "${topic}". 
        Include 5-7 main sections with 2-4 subtopics each.
        For each subtopic, provide a brief content paragraph that would serve as an introduction or summary.
        Make sure each section and subtopic has a unique ID and isSelected is set to true by default.`,
      schema: outlineSchema,
    });

    // Return the validated outline with the main topic
    return {
      mainTopic: topic,
      sections: object.sections,
    };
  } catch (error) {
    console.error("Error generating AI outline:", error);

    // Fallback to the static outline generator
    return generateStaticOutline(topic);
  }
}

// Fallback static outline generator
function generateStaticOutline(topic: string): DocumentOutline {
  // Same as the existing generateOutline function
  const sections: Section[] = [
    {
      id: "1",
      title: "Introduction",
      isSelected: true,
      subtopics: [
        {
          id: "1-1",
          title: "Background",
          isSelected: true,
          content: `This section provides a comprehensive background on ${topic}.`,
        },
        {
          id: "1-2",
          title: "Research Question",
          isSelected: true,
          content: `The primary research question this document addresses is related to ${topic}.`,
        },
      ],
    },
    // ...other sections like in the original generateOutline
  ];

  return {
    mainTopic: topic,
    sections,
  };
}
