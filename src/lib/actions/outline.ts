"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import type { DocumentOutline, Section } from "@/lib/types";
import { nanoid } from "nanoid";

const subtopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  isSelected: z.boolean(),
  content: z.string(),
});

// Schema for AI to generate basic structure
const aiSectionSchema = z.object({
  title: z.string(),
  subtopics: z.array(z.string()),
});

const aiOutlineSchema = z.object({
  sections: z.array(aiSectionSchema),
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
        Include 5-7 main sections with 2-4 subtopics each.`,
      schema: aiOutlineSchema,
    });

    const sections = object.sections.map((section) => ({
      id: nanoid(5),
      title: section.title,
      isSelected: true,
      subtopics: section.subtopics.map((subtopicTitle) => ({
        id: nanoid(5),
        title: subtopicTitle,
        isSelected: true,
        content: "",
      })),
    }));

    return {
      mainTopic: topic,
      sections: sections,
    };
  } catch (error) {
    console.error("Error generating AI outline:", error);

    // Fallback to the static outline generator
    return generateStaticOutline(topic);
  }
}

function generateStaticOutline(topic: string): DocumentOutline {
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
