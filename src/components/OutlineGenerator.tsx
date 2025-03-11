
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DocumentOutline, Section, SubTopic } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, MinusCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface OutlineGeneratorProps {
  outline: DocumentOutline;
  onOutlineUpdate: (outline: DocumentOutline) => void;
  onBack: () => void;
  onNext: () => void;
}

const OutlineGenerator: React.FC<OutlineGeneratorProps> = ({ 
  outline, 
  onOutlineUpdate, 
  onBack,
  onNext
}) => {
  const [localOutline, setLocalOutline] = useState<DocumentOutline>(outline);

  useEffect(() => {
    setLocalOutline(outline);
  }, [outline]);

  const toggleSectionSelection = (sectionId: string) => {
    const updatedSections = localOutline.sections.map(section => {
      if (section.id === sectionId) {
        const isSelected = !section.isSelected;
        return {
          ...section,
          isSelected,
          subtopics: section.subtopics.map(subtopic => ({
            ...subtopic,
            isSelected: isSelected ? subtopic.isSelected : false,
          }))
        };
      }
      return section;
    });
    
    const updatedOutline = { ...localOutline, sections: updatedSections };
    setLocalOutline(updatedOutline);
    onOutlineUpdate(updatedOutline);
  };

  const toggleSubtopicSelection = (sectionId: string, subtopicId: string) => {
    const updatedSections = localOutline.sections.map(section => {
      if (section.id === sectionId) {
        const updatedSubtopics = section.subtopics.map(subtopic => {
          if (subtopic.id === subtopicId) {
            return { ...subtopic, isSelected: !subtopic.isSelected };
          }
          return subtopic;
        });
        
        // Check if any subtopic is selected
        const anySubtopicSelected = updatedSubtopics.some(st => st.isSelected);
        
        return {
          ...section,
          isSelected: anySubtopicSelected,
          subtopics: updatedSubtopics
        };
      }
      return section;
    });
    
    const updatedOutline = { ...localOutline, sections: updatedSections };
    setLocalOutline(updatedOutline);
    onOutlineUpdate(updatedOutline);
  };

  const anySectionSelected = localOutline.sections.some(section => section.isSelected);

  return (
    <div className="animate-fade-in">
      <Card className="w-full max-w-2xl mx-auto bg-paper border-0 shadow-md overflow-hidden transition-all duration-400">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="font-serif text-2xl">Research Outline</CardTitle>
          <CardDescription>
            Review and customize your document outline
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl mb-2">{localOutline.mainTopic}</h3>
              <Separator className="mb-4" />
            </div>
            
            <ScrollArea className="h-[400px] pr-4 -mr-4">
              <div className="space-y-4">
                {localOutline.sections.map((section, sectionIndex) => (
                  <div key={section.id} className="border border-border rounded-md overflow-hidden bg-secondary/30">
                    <div className="flex items-center p-3 bg-secondary/50 border-b border-border">
                      <Checkbox 
                        id={`section-${section.id}`}
                        checked={section.isSelected}
                        onCheckedChange={() => toggleSectionSelection(section.id)}
                        className="mr-3"
                      />
                      <label 
                        htmlFor={`section-${section.id}`} 
                        className="flex-1 font-medium cursor-pointer"
                      >
                        {sectionIndex + 1}. {section.title}
                      </label>
                    </div>
                    
                    <div className={`p-3 space-y-2 ${!section.isSelected ? 'opacity-50' : ''}`}>
                      {section.subtopics.map((subtopic, subtopicIndex) => (
                        <div 
                          key={subtopic.id} 
                          className="flex items-center ml-6"
                        >
                          <Checkbox 
                            id={`subtopic-${subtopic.id}`}
                            checked={subtopic.isSelected}
                            onCheckedChange={() => toggleSubtopicSelection(section.id, subtopic.id)}
                            disabled={!section.isSelected}
                            className="mr-3"
                          />
                          <label 
                            htmlFor={`subtopic-${subtopic.id}`} 
                            className="cursor-pointer"
                          >
                            {sectionIndex + 1}.{subtopicIndex + 1} {subtopic.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
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
            disabled={!anySectionSelected}
            className="px-6 flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            Next <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OutlineGenerator;
