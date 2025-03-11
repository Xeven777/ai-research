import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DocumentOutline } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  RefreshCw,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Function to generate content based on topics
const generateContent = (mainTopic: string, sectionTitle: string, subtopicTitle: string): string => {
  return `This is generated content for "${subtopicTitle}" within the section "${sectionTitle}" of the main topic "${mainTopic}".

This paragraph provides detailed information about ${subtopicTitle}. It includes relevant facts, examples, and explanations that would be valuable for the reader.

In conclusion, ${subtopicTitle} is an important aspect to consider when discussing ${mainTopic} and specifically the ${sectionTitle} section.`;
};

interface ContentGeneratorProps {
  outline: DocumentOutline;
  onOutlineUpdate: (outline: DocumentOutline) => void;
  onBack: () => void;
  onNext: () => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  outline,
  onOutlineUpdate,
  onBack,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [generatingContent, setGeneratingContent] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [localOutline, setLocalOutline] = useState<DocumentOutline>(outline);

  // Count selected subtopics
  const selectedSubtopics = outline.sections
    .filter((section) => section.isSelected)
    .flatMap((section) =>
      section.subtopics.filter((subtopic) => subtopic.isSelected)
    );

  const totalSubtopics = selectedSubtopics.length;

  // Count subtopics with content
  const subtopicsWithContent = outline.sections
    .flatMap((section) => section.subtopics)
    .filter((subtopic) => subtopic.content.length > 0).length;

  useEffect(() => {
    // Set default active tab to first selected section
    if (!activeTab && outline.sections.some((s) => s.isSelected)) {
      const firstSelectedSection = outline.sections.find((s) => s.isSelected);
      if (firstSelectedSection) {
        setActiveTab(firstSelectedSection.id);
      }
    }

    setLocalOutline(outline);

    // Calculate progress
    if (totalSubtopics > 0) {
      setProgressPercentage((subtopicsWithContent / totalSubtopics) * 100);
    }
  }, [outline, activeTab, totalSubtopics, subtopicsWithContent]);

  const generateAllContent = async () => {
    setGeneratingContent(true);

    let updatedOutline = { ...localOutline };
    let completedCount = 0;

    // Process each section and subtopic
    for (const section of updatedOutline.sections) {
      if (!section.isSelected) continue;

      for (const subtopic of section.subtopics) {
        if (!subtopic.isSelected) continue;

        // Simulate generation delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Generate content for this subtopic
        const content = generateContent(
          updatedOutline.mainTopic,
          section.title,
          subtopic.title
        );

        // Update this specific subtopic with new content
        updatedOutline = {
          ...updatedOutline,
          sections: updatedOutline.sections.map((s) =>
            s.id === section.id
              ? {
                  ...s,
                  subtopics: s.subtopics.map((st) =>
                    st.id === subtopic.id ? { ...st, content } : st
                  ),
                }
              : s
          ),
        };

        // Update state and progress
        completedCount++;
        setProgressPercentage((completedCount / totalSubtopics) * 100);
        setLocalOutline(updatedOutline);
        onOutlineUpdate(updatedOutline);
      }
    }

    setGeneratingContent(false);
  };

  const regenerateSubtopicContent = (sectionId: string, subtopicId: string) => {
    const section = localOutline.sections.find((s) => s.id === sectionId);
    const subtopic = section?.subtopics.find((st) => st.id === subtopicId);

    if (!section || !subtopic) return;

    const content = generateContent(
      localOutline.mainTopic,
      section.title,
      subtopic.title
    );

    const updatedOutline = {
      ...localOutline,
      sections: localOutline.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              subtopics: s.subtopics.map((st) =>
                st.id === subtopicId ? { ...st, content } : st
              ),
            }
          : s
      ),
    };

    setLocalOutline(updatedOutline);
    onOutlineUpdate(updatedOutline);
  };

  const allContentGenerated =
    subtopicsWithContent === totalSubtopics && totalSubtopics > 0;

  return (
    <div className="animate-fade-in">
      <Card className="w-full max-w-4xl mx-auto bg-paper border-0 shadow-md overflow-hidden transition-all duration-400">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-serif text-2xl">
                Generate Content
              </CardTitle>
              <CardDescription>
                {allContentGenerated
                  ? "All content has been generated"
                  : "Generate content for each section and subtopic"}
              </CardDescription>
            </div>
            <Button
              onClick={generateAllContent}
              disabled={generatingContent || allContentGenerated}
              className={cn(
                "transition-all duration-400",
                allContentGenerated
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {generatingContent ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : allContentGenerated ? (
                <>
                  <Check size={16} className="mr-2" />
                  Complete
                </>
              ) : (
                <>
                  <FileText size={16} className="mr-2" />
                  Generate All Content
                </>
              )}
            </Button>
          </div>
          <Progress value={progressPercentage} className="h-2 mt-2" />
        </CardHeader>

        <CardContent className="p-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start px-0 h-auto bg-secondary/40 overflow-x-auto flex-nowrap">
              {localOutline.sections
                .filter((section) => section.isSelected)
                .map((section, index) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="py-3 px-5 data-[state=active]:bg-background"
                  >
                    {index + 1}. {section.title}
                  </TabsTrigger>
                ))}
            </TabsList>

            {localOutline.sections
              .filter((section) => section.isSelected)
              .map((section) => (
                <TabsContent
                  key={section.id}
                  value={section.id}
                  className="pt-6 px-6 pb-2 focus-visible:outline-none focus-visible:ring-0"
                >
                  <ScrollArea className="h-[500px] pr-4 -mr-4">
                    <div className="space-y-8">
                      {section.subtopics
                        .filter((subtopic) => subtopic.isSelected)
                        .map((subtopic, subtopicIndex) => (
                          <div key={subtopic.id} className="space-y-3">
                            <div className="flex justify-between items-center">
                              <h3 className="font-serif text-lg font-medium">
                                {subtopicIndex + 1}. {subtopic.title}
                              </h3>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  regenerateSubtopicContent(
                                    section.id,
                                    subtopic.id
                                  )
                                }
                                className="h-8"
                              >
                                <RefreshCw size={14} className="mr-1" />
                                Regenerate
                              </Button>
                            </div>
                            <Separator />
                            <div className="pl-3 paper-content min-h-[150px]">
                              {subtopic.content ? (
                                subtopic.content
                                  .split("\n\n")
                                  .map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                  ))
                              ) : (
                                <div className="text-muted-foreground italic">
                                  Content will appear here after generation
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
          </Tabs>
        </CardContent>

        <CardFooter className="border-t border-primary/10 bg-primary/5 mt-4 flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6 flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </Button>

          <Button
            onClick={onNext}
            disabled={!allContentGenerated}
            className="px-6 flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            Preview <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentGenerator;
