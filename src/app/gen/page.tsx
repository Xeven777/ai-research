"use client";
import React, { useState } from "react";
import TopicForm from "@/components/TopicForm";
import OutlineGenerator from "@/components/OutlineGenerator";
import ContentGenerator from "@/components/ContentGenerator";
import DocumentPreview from "@/components/DocumentPreview";
import { AnimatePresence, motion } from "motion/react";
import {
  ClipboardList,
  Pencil,
  FileText,
  FileDown,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentOutline, Topic } from "@/lib/types";
import { generateAIOutline } from "@/lib/actions/outline";
import { toast } from "sonner";

const Index = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [topicInfo, setTopicInfo] = useState<Topic | null>(null);
  const [documentOutline, setDocumentOutline] =
    useState<DocumentOutline | null>(null);

  const handleTopicSubmit = async (topic: Topic) => {
    setTopicInfo(topic);
    setLoading(true);
    try {
      const outline = await generateAIOutline(
        topic.mainTopic,
        topic.academicLevel || "undergraduate",
        topic.documentLength
      );
      setDocumentOutline(outline);
      setStep(2);
      toast.success("Outline generated successfully!");
    } catch (error: any) {
      console.error("Failed to generate outline:", error);
      toast.error(`Failed to generate outline: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOutlineUpdate = (outline: DocumentOutline) => {
    setDocumentOutline(outline);
  };

  const goToStep = (newStep: number) => {
    setStep(newStep);
  };

  const handleGenerateProgress = (progress: number) => {
    console.log(`Content generation progress: ${progress}%`);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const workflow = [
    { icon: <ClipboardList size={24} />, label: "Outline Builder" },
    { icon: <Pencil size={24} />, label: "Content Editor" },
    { icon: <FileText size={24} />, label: "Document Formatting" },
    { icon: <FileDown size={24} />, label: "Export Document" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pt-24">
      {loading && (
        <div className="fixed flex justify-center items-center inset-0 size-full z-50 bg-background/70 ">
          <Loader className="size-28 ease-in text-primary animate-spin" />
        </div>
      )}

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Workflow Steps */}
          <div className="rounded-lg border p-6 mb-8 shadow-sm bg-card text-card-foreground">
            <div className="flex justify-between items-center relative">
              {workflow.map((item, index) => (
                <div key={index} className="flex flex-col items-center z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index + 1 === step
                        ? "bg-primary text-primary-foreground"
                        : index + 1 < step
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      index + 1 === step
                        ? "text-primary"
                        : index + 1 < step
                        ? "text-primary/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}

              {/* Progress bar */}
              <div className="absolute top-6 left-0 w-full h-0.5 overflow-hidden rounded-full">
                <div
                  className="h-0.5 bg-primary transition-all duration-300"
                  style={{
                    width: `${((step - 1) / (workflow.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex mt-6 w-full justify-between">
              {step > 1 && (
                <Button onClick={() => goToStep(step - 1)} variant={"ghost"}>
                  Previous
                </Button>
              )}

              {step < 4 && documentOutline && (
                <Button onClick={() => goToStep(step + 1)}>Next</Button>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false} custom={step}>
            {step === 1 && (
              <motion.div
                key="topic-form"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <TopicForm onSubmit={handleTopicSubmit} />
              </motion.div>
            )}

            {step === 2 && documentOutline && (
              <motion.div
                key="outline-generator"
                custom={2}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <OutlineGenerator
                  outline={documentOutline}
                  onOutlineUpdate={handleOutlineUpdate}
                  onBack={() => goToStep(1)}
                  onNext={() => goToStep(3)}
                />
              </motion.div>
            )}

            {step === 3 && documentOutline && topicInfo && (
              <motion.div
                key="content-generator"
                custom={3}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <ContentGenerator
                  outline={documentOutline}
                  topicInfo={topicInfo}
                  onOutlineUpdate={handleOutlineUpdate}
                  onBack={() => goToStep(2)}
                  onNext={() => goToStep(4)}
                  onProgressUpdate={handleGenerateProgress}
                />
              </motion.div>
            )}

            {step === 4 && documentOutline && topicInfo && (
              <motion.div
                key="document-preview"
                custom={4}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <DocumentPreview
                  outline={documentOutline}
                  topicInfo={topicInfo}
                  onBack={() => goToStep(3)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
        <p>ResearchDocs • Professional Document Generator</p>
      </footer>
    </div>
  );
};

export default Index;
