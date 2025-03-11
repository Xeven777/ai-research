"use client";
import React, { useState } from "react";
import TopicForm from "@/components/TopicForm";
import OutlineGenerator from "@/components/OutlineGenerator";
import ContentGenerator from "@/components/ContentGenerator";
import DocumentPreview from "@/components/DocumentPreview";
import { DocumentOutline, Topic, generateOutline } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardList, Pencil, FileText, FileDown } from "lucide-react";
import { Button } from "./button";

const Index = () => {
  const [step, setStep] = useState<number>(1);
  const [topicInfo, setTopicInfo] = useState<Topic | null>(null);
  const [documentOutline, setDocumentOutline] =
    useState<DocumentOutline | null>(null);

  const handleTopicSubmit = (topic: Topic) => {
    setTopicInfo(topic);
    const outline = generateOutline(topic.mainTopic);
    setDocumentOutline(outline);
    setStep(2);
  };

  const handleOutlineUpdate = (outline: DocumentOutline) => {
    setDocumentOutline(outline);
  };

  const goToStep = (newStep: number) => {
    setStep(newStep);
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
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-6 md:px-8 shadow-sm border-b">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif font-bold">ResearchDocs</h1>
        </div>
      </header>

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-2">
              Research Document Generator
            </h2>
            <p className="text-muted-foreground">
              Create professional academic research documents with our
              step-by-step workflow.
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="rounded-lg border p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center relative">
              {workflow.map((item, index) => (
                <div key={index} className="flex flex-col items-center z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index + 1 === step
                        ? "bg-primary"
                        : index + 1 < step
                        ? "bg-[#F6F1CE] text-primary"
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
                  onOutlineUpdate={handleOutlineUpdate}
                  onBack={() => goToStep(2)}
                  onNext={() => goToStep(4)}
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
