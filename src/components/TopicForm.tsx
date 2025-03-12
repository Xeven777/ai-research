import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, FileTextIcon, ArrowRightIcon } from "lucide-react";
import { Topic } from "@/lib/types";

interface TopicFormProps {
  onSubmit: (topic: Topic) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ onSubmit }) => {
  const [mainTopic, setMainTopic] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [documentLength, setDocumentLength] = useState<number>(5);
  const [outputFormat, setOutputFormat] = useState<"DOCX" | "PDF">("DOCX");
  const [citationFormat, setCitationFormat] = useState("APA");
  const [academicLevel, setAcademicLevel] = useState("Undergraduate");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainTopic.trim()) return;

    onSubmit({
      mainTopic,
      documentLength,
      outputFormat,
      topicDescription,
      citationFormat,
      academicLevel,
    });
  };

  return (
    <div className="animate-fade-in">
      <Card className="w-full mx-auto overflow-hidden">
        <CardHeader className="border-b pb-6 border-border">
          <CardTitle className=" text-2xl font-bold ">
            Research Parameters
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="py-6 space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <FileTextIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                <Label htmlFor="topic" className="font-medium ">
                  Research Topic
                </Label>
              </div>
              <Input
                id="topic"
                placeholder="Enter your research topic"
                value={mainTopic}
                onChange={(e) => setMainTopic(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide a clear and specific research topic.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                <Label htmlFor="description" className="font-medium ">
                  Topic Description
                </Label>
              </div>
              <Textarea
                id="description"
                placeholder="Provide additional details about your research topic"
                value={topicDescription}
                onChange={(e) => setTopicDescription(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include any specific aspects you want to focus on in your
                research.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="length" className="font-medium  block mb-2">
                  Document Length
                </Label>
                <Select
                  value={documentLength.toString()}
                  onValueChange={(value) => setDocumentLength(parseInt(value))}
                >
                  <SelectTrigger id="length">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Short (1-3 pages)</SelectItem>
                    <SelectItem value="5">Medium (5-10 pages)</SelectItem>
                    <SelectItem value="15">Long (15-20 pages)</SelectItem>
                    <SelectItem value="25">Extended (25+ pages)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Approximate length of your document.
                </p>
              </div>

              <div>
                <Label htmlFor="citation" className="font-medium  block mb-2">
                  Citation Format
                </Label>
                <Select
                  value={citationFormat}
                  onValueChange={setCitationFormat}
                >
                  <SelectTrigger id="citation">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APA">APA</SelectItem>
                    <SelectItem value="MLA">MLA</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Harvard">Harvard</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  The citation style for your document.
                </p>
              </div>

              <div>
                <Label htmlFor="level" className="font-medium  block mb-2">
                  Academic Level
                </Label>
                <Select value={academicLevel} onValueChange={setAcademicLevel}>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                    <SelectItem value="Doctoral">Doctoral</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  The academic level of your research.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border flex pt-6 justify-end">
            <Button type="submit" size="lg" disabled={!mainTopic.trim()}>
              Generate Outline
              <ArrowRightIcon size={16} />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default TopicForm;
