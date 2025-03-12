import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";
import { DocumentOutline, Section } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Functions
export const generateOutline = (topic: string): DocumentOutline => {
  // Sample function to generate a document outline
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
          content:
            "This section provides a comprehensive background on " +
            topic +
            ".",
        },
        {
          id: "1-2",
          title: "Research Question",
          isSelected: true,
          content:
            "The primary research question this document addresses is related to " +
            topic +
            ".",
        },
      ],
    },
    {
      id: "2",
      title: "Literature Review",
      isSelected: true,
      subtopics: [
        {
          id: "2-1",
          title: "Previous Studies",
          isSelected: true,
          content:
            "Several studies have explored aspects of " +
            topic +
            " in recent years.",
        },
        {
          id: "2-2",
          title: "Theoretical Framework",
          isSelected: true,
          content:
            "The theoretical framework for analyzing " +
            topic +
            " draws from multiple disciplines.",
        },
      ],
    },
    {
      id: "3",
      title: "Methodology",
      isSelected: true,
      subtopics: [
        {
          id: "3-1",
          title: "Research Design",
          isSelected: true,
          content:
            "This research employs a mixed-methods approach to study " +
            topic +
            ".",
        },
        {
          id: "3-2",
          title: "Data Collection",
          isSelected: true,
          content:
            "Data was collected through surveys, interviews, and analysis of existing literature on " +
            topic +
            ".",
        },
      ],
    },
    {
      id: "4",
      title: "Findings",
      isSelected: true,
      subtopics: [
        {
          id: "4-1",
          title: "Primary Results",
          isSelected: true,
          content:
            "The research revealed several key findings about " + topic + ".",
        },
        {
          id: "4-2",
          title: "Data Analysis",
          isSelected: true,
          content:
            "Statistical analysis of the data shows interesting patterns related to " +
            topic +
            ".",
        },
      ],
    },
    {
      id: "5",
      title: "Discussion",
      isSelected: true,
      subtopics: [
        {
          id: "5-1",
          title: "Interpretation of Results",
          isSelected: true,
          content:
            "The results suggest several implications for understanding " +
            topic +
            ".",
        },
        {
          id: "5-2",
          title: "Limitations",
          isSelected: true,
          content:
            "There are several limitations to this study of " +
            topic +
            " that should be acknowledged.",
        },
      ],
    },
    {
      id: "6",
      title: "Conclusion",
      isSelected: true,
      subtopics: [
        {
          id: "6-1",
          title: "Summary of Findings",
          isSelected: true,
          content:
            "In summary, this research has contributed to the understanding of " +
            topic +
            " in several ways.",
        },
        {
          id: "6-2",
          title: "Future Research",
          isSelected: true,
          content:
            "Future studies should explore additional aspects of " +
            topic +
            ".",
        },
      ],
    },
  ];

  return {
    mainTopic: topic,
    sections,
  };
};

export const exportDocument = (
  outline: DocumentOutline,
  format: "DOCX" | "PDF"
) => {
  try {
    if (format === "PDF") {
      // Generate PDF
      const doc = new jsPDF();
      let yPosition = 20;

      // Title
      doc.setFontSize(18);
      doc.text(outline.mainTopic, 20, yPosition);
      yPosition += 10;

      // Content
      doc.setFontSize(12);
      outline.sections.forEach((section, sectionIndex) => {
        if (section.isSelected) {
          yPosition += 10;
          doc.setFont("helvetica", "bold");
          doc.text(`${sectionIndex + 1}. ${section.title}`, 20, yPosition);
          doc.setFont("helvetica", "normal");
          yPosition += 10;

          // Subtopics
          section.subtopics.forEach((subtopic, subtopicIndex) => {
            if (subtopic.isSelected) {
              // Subtopic title
              doc.setFont("helvetica", "bold");
              doc.text(
                `${sectionIndex + 1}.${subtopicIndex + 1}. ${subtopic.title}`,
                25,
                yPosition
              );
              doc.setFont("helvetica", "normal");
              yPosition += 7;

              // Subtopic content
              const lines = doc.splitTextToSize(subtopic.content, 170);
              lines.forEach((line: string) => {
                // Check if we need a new page
                if (yPosition > 280) {
                  doc.addPage();
                  yPosition = 20;
                }

                doc.text(line, 25, yPosition);
                yPosition += 7;
              });

              yPosition += 3;
            }
          });
        }
      });

      // Save PDF
      doc.save(`${outline.mainTopic.replace(/\s+/g, "_")}.pdf`);
      toast.success("Your document has been downloaded as a PDF.");
    } else if (format === "DOCX") {
      // Filter selected sections and subtopics
      const selectedSections = outline.sections
        .filter((section) => section.isSelected)
        .map((section) => ({
          ...section,
          subtopics: section.subtopics.filter(
            (subtopic) => subtopic.isSelected
          ),
        }));

      // Create a proper DOCX document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Title page
              new Paragraph({
                text: outline.mainTopic,
                heading: HeadingLevel.TITLE,
                alignment: "center",
                spacing: { before: 3000, after: 400 },
              }),
              new Paragraph({
                text: "Research Document",
                alignment: "center",
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: "Generated with Research Document Generator",
                alignment: "center",
              }),
              new Paragraph({
                text: new Date().toLocaleDateString(),
                alignment: "center",
                spacing: { before: 400 },
              }),
              new Paragraph({
                text: "",
                thematicBreak: true,
              }),

              // Table of Contents page
              new Paragraph({
                text: "Table of Contents",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 500, after: 300 },
              }),

              // Generate TOC entries
              ...selectedSections.flatMap((section, sectionIndex) => {
                const tocEntries = [];

                // Section entry
                tocEntries.push(
                  new Paragraph({
                    text: `${sectionIndex + 1}. ${section.title}`,
                    spacing: { before: 200, after: 80 },
                    tabStops: [
                      {
                        type: "right",
                        position: 5600,
                      },
                    ],
                    children: [
                      new TextRun({
                        text: `${sectionIndex + 1}. ${section.title}`,
                      }),
                      new TextRun({
                        text: `\t${sectionIndex + 1}`,
                        bold: false,
                      }),
                    ],
                  })
                );

                // Subtopic entries
                section.subtopics.forEach((subtopic, subtopicIndex) => {
                  tocEntries.push(
                    new Paragraph({
                      text: `${sectionIndex + 1}.${subtopicIndex + 1}. ${
                        subtopic.title
                      }`,
                      indent: { left: 400 },
                      spacing: { after: 80 },
                      tabStops: [
                        {
                          type: "right",
                          position: 5600,
                        },
                      ],
                      children: [
                        new TextRun({
                          text: `${sectionIndex + 1}.${subtopicIndex + 1}. ${
                            subtopic.title
                          }`,
                        }),
                        new TextRun({
                          text: `\t${sectionIndex + 1}`,
                          bold: false,
                        }),
                      ],
                    })
                  );
                });

                return tocEntries;
              }),

              new Paragraph({
                text: "",
                thematicBreak: true,
              }),

              // Document content
              ...selectedSections.flatMap((section, sectionIndex) => {
                const sectionContent = [
                  new Paragraph({
                    text: `${sectionIndex + 1}. ${section.title}`,
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 },
                    pageBreakBefore: sectionIndex > 0,
                  }),
                ];

                section.subtopics.forEach((subtopic, subtopicIndex) => {
                  sectionContent.push(
                    new Paragraph({
                      text: `${sectionIndex + 1}.${subtopicIndex + 1}. ${
                        subtopic.title
                      }`,
                      heading: HeadingLevel.HEADING_2,
                      spacing: { before: 300, after: 120 },
                    }),
                    // Split the content into paragraphs for better formatting
                    ...subtopic.content.split("\n\n").map(
                      (paragraph) =>
                        new Paragraph({
                          text: paragraph,
                          spacing: { after: 120 },
                        })
                    )
                  );
                });

                return sectionContent;
              }),
            ],
          },
        ],
      });

      // Generate and save the DOCX file
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${outline.mainTopic.replace(/\s+/g, "_")}.docx`);
        toast.success("Your document has been downloaded as a DOCX file.");
      });
    }
  } catch (error) {
    console.error("Error exporting document:", error);
    toast.error(
      "There was an error exporting your document. Please try again."
    );
  }
};
